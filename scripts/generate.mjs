#!/usr/bin/env node
// Generates the TypeScript bindings and the Kotlin dispatch/listener code from
// api.json. Run `npm run codegen` after dropping in a new vendor jar.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const api = JSON.parse(readFileSync(join(ROOT, "api.json"), "utf8"));
const T = api.types;

const KOTLIN_PKG = "com.slipstream.topwise";
const KOTLIN_DIR = join(ROOT, "android/src/main/java", ...KOTLIN_PKG.split("."));
const TS_DIR = join(ROOT, "src/generated");

const report = { skippedMethods: [], skippedFields: [], notes: [] };

/**
 * Vendor classes with a hand-written TypeScript definition that supersedes a
 * generated field mirror. `Tlv` is the wire shape *and* the type the pure-TS
 * BER-TLV codec in src/bytes.ts uses - two definitions of it would be one too
 * many.
 */
const HAND_WRITTEN = {
  "com.topwise.cloudpos.struct.Tlv": "B.Tlv",
};
/** Hand-written elsewhere and referenced by nothing; do not generate a mirror. */
const NOT_GENERATED = new Set([
  "com.topwise.cloudpos.struct.Tlv",
  "com.topwise.cloudpos.struct.TlvList",
]);

// ------------------------------------------------------------ classification

const serviceIfaces = new Set(api.modules.map((m) => m.iface));

/**
 * Some AIDL methods hand back another interface as a raw `IBinder` instead of
 * data. The binder itself carries its interface descriptor at runtime, but
 * codegen needs it statically to emit typed bindings, so the chain is named
 * here. Anything returning IBinder that is *not* listed still crosses, as an
 * untyped `RemoteHandle`, and is called out in the codegen report.
 */
const HANDLE_RETURNS = {
  "com.topwise.cloudpos.aidl.pedestal.AidlPedestal.getSerialManager":
    "com.topwise.cloudpos.aidl.pedestal.AidlPedestalSerialManager",
  "com.topwise.cloudpos.aidl.pedestal.AidlPedestalSerialManager.getSerialport":
    "com.topwise.cloudpos.aidl.serialport.AidlSerialport",
};
const handleTargets = new Set(Object.values(HANDLE_RETURNS));

/**
 * Types the vendor uses purely as output holders: the method returns `int` for
 * status and writes its real payload into one of these. A value-passing bridge
 * drops that silently, so the mutated object is echoed back and surfaced as
 * `out` on the result. Keep in step with OUT_HOLDERS in TopwiseCodec.kt.
 */
const OUT_HOLDERS = new Set([
  "com.topwise.cloudpos.aidl.keymanager.BytesTypeValue",
  "com.topwise.cloudpos.aidl.keymanager.IntArrayTypeValue",
  "com.topwise.cloudpos.aidl.keymanager.AsyKeyPairType",
]);

/**
 * Interfaces the root `AidlDeviceService` offers but `DeviceServiceManager`
 * has no getter for. They are reached through the manager's private
 * `mDeviceService` field (see TopwiseDeviceService.kt) and exposed as ordinary
 * modules, since there is nothing handle-shaped about them from JS's side.
 */
const EXTRA_MODULES = [
  {
    name: "scanner",
    iface: "com.topwise.cloudpos.aidl.scanner.AidlScannerManager",
    via: "getScanner",
  },
  {
    name: "triggerStatus",
    iface: "com.topwise.cloudpos.aidl.trigger.AidlTriggerStatus",
    via: "getPosTriggerStatus",
  },
];

/**
 * `DeviceServiceManager`'s own methods that are not module getters.
 * `expandFunction` is the vendor's escape hatch for per-model features.
 */
const MANAGER_METHODS = ["expandFunction"];
const MANAGER_CLASS = "com.topwise.cloudpos.service.DeviceServiceManager";

/**
 * The methods of an exposed type that JS can actually call. Restricts the
 * manager to its whitelist, and drops the synthetic `access$NNN` bridges javac
 * emits for private access - one of those takes an AidlDeviceService and would
 * otherwise make the root service look like a callback interface.
 */
function exposedMethodsOf(iface) {
  if (iface === MANAGER_CLASS) {
    return T[iface].methods.filter((m) => MANAGER_METHODS.includes(m.name));
  }
  return T[iface].methods.filter((m) => !m.name.startsWith("access$") && !m.mods.includes("private"));
}

/** Every interface JS can reach: module getters, extras, and handle targets. */
const exposedIfaces = new Set([
  ...serviceIfaces,
  ...handleTargets,
  ...EXTRA_MODULES.map((m) => m.iface),
  MANAGER_CLASS,
]);
const rawType = (t) => t.trim().replace(/<.*>/, "").replace(/\[\]/g, "");

/**
 * A listener is an IInterface that some exposed service method actually takes
 * as a parameter. Interfaces that merely lack a DeviceServiceManager getter
 * (AidlDeviceService, AidlScannerManager, AidlTriggerStatus) are services we
 * do not expose - generating binder stubs for them is dead code that does not
 * even compile, since their methods return values.
 */
const listenerIfaces = new Set(
  [...exposedIfaces]
    .flatMap((iface) => exposedMethodsOf(iface).flatMap((m) => m.params.map(rawType)))
    .filter((n) => T[n]?.isInterface && String(T[n].extends ?? "").includes("IInterface")),
);

/**
 * Callbacks the EMV kernels use to *ask* the app something and block on the
 * answer. These cannot be a fire-and-forget stream: JS has to reply.
 */
const respondIfaces = new Set(
  [...listenerIfaces].filter((n) => T[n].methods.some((m) => m.ret !== "void")),
);
const enumTypes = new Set(Object.values(T).filter((t) => t.isEnum).map((t) => t.name));

const instanceFields = (t) =>
  t.fields.filter((f) => !f.mods.includes("static") && f.name !== "CREATOR" && !f.name.startsWith("$"));
const constantFields = (t) =>
  t.fields.filter((f) => f.mods.includes("static") && f.mods.includes("final") &&
    f.mods.includes("public") && f.value !== undefined);

/** Classes that only carry `public static final` primitives, e.g. AidlErrorCode$Printer. */
const constantTypes = new Set(
  Object.values(T)
    .filter((t) => !t.isEnum && !t.isInterface && constantFields(t).length > 0 && instanceFields(t).length === 0)
    .map((t) => t.name),
);
/** Split "java.util.Map<K, List<V>>" into every type token it mentions. */
function typeTokens(t, out = []) {
  t = String(t).trim();
  const lt = t.indexOf("<");
  if (lt === -1) { out.push(t.replace(/\[\]/g, "")); return out; }
  out.push(t.slice(0, lt).replace(/\[\]/g, ""));
  for (const arg of splitGenericArgs(t.slice(lt + 1, t.lastIndexOf(">")))) typeTokens(arg, out);
  return out;
}
function splitGenericArgs(inner) {
  const out = [];
  let depth = 0, buf = "";
  for (const ch of inner) {
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    if (ch === "," && depth === 0) { out.push(buf); buf = ""; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf);
  return out;
}

/**
 * Types actually reachable from the exposed API, walking through data-carrier
 * fields and listener signatures.
 *
 * Without this gate the jar's Kotlin-side helpers (PrintTemplate holds a
 * Context and a LinearLayout; DeviceServiceManager holds a ServiceConnection)
 * get treated as data carriers, emit nothing useful, and show up in the
 * codegen report as if they were gaps in coverage. They are not part of the
 * bridge surface at all - no AIDL signature mentions them.
 */
const reachable = (() => {
  const seen = new Set();
  const queue = [];
  for (const iface of exposedIfaces) {
    for (const m of exposedMethodsOf(iface)) for (const t of [...m.params, m.ret]) queue.push(...typeTokens(t));
  }
  while (queue.length > 0) {
    const n = queue.pop();
    if (seen.has(n)) continue;
    seen.add(n);
    const t = T[n];
    if (t === undefined) continue;
    for (const f of t.fields) {
      if (f.mods.includes("static")) continue;
      queue.push(...typeTokens(f.type));
    }
    if (t.isInterface) {
      for (const m of t.methods) for (const x of [...m.params, m.ret]) queue.push(...typeTokens(x));
    }
  }
  return seen;
})();

/**
 * Field types that are a live Android object rather than data: there is no
 * value to send, only a reference into the app's object graph. A class holding
 * one is not a data carrier at all - it is a native-side helper, and mirroring
 * half of it would produce a type nobody can construct.
 */
const LIVE_ANDROID = [
  "android.content.Context",
  "android.content.ServiceConnection",
  "android.database.Cursor",
  "android.view.View",
  "android.view.ViewGroup",
  "android.widget.",
  "android.app.Activity",
  "android.os.Handler",
  "android.os.Looper",
];
const holdsLiveObject = (t) =>
  instanceFields(t).some((f) => {
    const ty = typeTokens(f.type)[0];
    return LIVE_ANDROID.some((bad) => ty === bad || ty.startsWith(bad));
  }) ||
  // A View subclass is itself a live object.
  LIVE_ANDROID.some((bad) => String(t.extends ?? "").startsWith(bad));

/**
 * Every class with instance state gets a TypeScript mirror unless it holds a
 * live Android object. Reachability is deliberately *not* a gate: the jar
 * carries carriers no current AIDL method mentions (the pre-L2 EMV types), and
 * mirroring them costs nothing while keeping the TS surface a faithful map of
 * the jar.
 */
const withState = Object.values(T)
  .filter((t) => !t.isEnum && !t.isInterface && instanceFields(t).length > 0);
const dataTypes = new Set(
  withState.filter((t) => !holdsLiveObject(t) && !NOT_GENERATED.has(t.name)).map((t) => t.name),
);
/** Classes that cannot be data because they hold a live Android object. */
const offSurface = withState.filter((t) => holdsLiveObject(t)).map((t) => t.name).sort();
/** Carriers no current AIDL signature mentions - mirrored, but unreferenced. */
const unreferenced = [...dataTypes].filter((n) => !reachable.has(n)).sort();

// -------------------------------------------------------------------- naming

/** `com.a.b.Outer$Inner` -> `OuterInner`; collisions get a package-segment prefix. */
function baseName(fqn) {
  return fqn.split(".").pop().split("$").join("");
}
const tsNames = new Map();
{
  const byBase = new Map();
  for (const fqn of Object.keys(T)) {
    const b = baseName(fqn);
    if (!byBase.has(b)) byBase.set(b, []);
    byBase.get(b).push(fqn);
  }
  for (const [b, fqns] of byBase) {
    if (fqns.length === 1) { tsNames.set(fqns[0], b); continue; }
    for (const fqn of fqns) {
      const seg = fqn.split(".").slice(-2, -1)[0] ?? "";
      tsNames.set(fqn, cap(seg) + b);
    }
  }
  const seen = new Set();
  for (const [fqn, n] of tsNames) {
    if (seen.has(n)) throw new Error(`unresolved TS name collision: ${n} (${fqn})`);
    seen.add(n);
  }
}
const tsName = (fqn) => tsNames.get(fqn) ?? baseName(fqn);
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function lowerFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

// --------------------------------------------------------------- type mapping

const PRIMITIVE_NUM = new Set(["byte", "short", "int", "long", "float", "double", "char"]);
const BOXED = {
  "java.lang.Integer": "number", "java.lang.Long": "number", "java.lang.Short": "number",
  "java.lang.Byte": "number", "java.lang.Float": "number", "java.lang.Double": "number",
  "java.lang.Boolean": "boolean", "java.lang.Character": "string", "java.lang.CharSequence": "string",
};

/**
 * Android and JDK types with a hand-written mapping in `src/android.ts` and a
 * matching rule in `TopwiseCodec.kt`.
 */
const ANDROID_TYPES = {
  "android.content.ContentValues": "A.ContentValues",
  "android.content.ComponentName": "A.ComponentName",
  "android.graphics.Rect": "A.Rect",
  "android.graphics.Typeface": "A.TypefaceSpec",
  "android.view.KeyEvent": "A.KeyEventData",
  "android.app.usage.UsageStats": "A.UsageStatsData",
  "java.security.cert.X509Certificate": "A.X509CertificateData",
  // Money and certificate serials outrun a double; keep them exact as strings.
  "java.math.BigDecimal": "string",
  "java.math.BigInteger": "string",
  "android.os.ParcelFileDescriptor": "A.FileRef",
  "android.os.IBinder": "A.RemoteHandle",
};

class Unsupported extends Error {
  constructor(type) { super(`unsupported type ${type}`); this.type = type; }
}

/** Split `java.util.List<X>` into ["java.util.List", ["X"]]. */
function generics(t) {
  const lt = t.indexOf("<");
  if (lt === -1) return [t, []];
  const raw = t.slice(0, lt);
  const inner = t.slice(lt + 1, t.lastIndexOf(">"));
  const args = [];
  let depth = 0, buf = "";
  for (const ch of inner) {
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    if (ch === "," && depth === 0) { args.push(buf.trim()); buf = ""; continue; }
    buf += ch;
  }
  if (buf.trim()) args.push(buf.trim());
  return [raw, args];
}

/**
 * Map a Java type to TypeScript. `position` is "in" or "out": data carriers are
 * accepted loosely on the way in (`Input<T>`) and returned fully on the way out.
 * Throws {@link Unsupported} for anything the bridge cannot marshal.
 */
function tsType(java, position) {
  const t = java.trim();
  if (t === "void") return "void";
  if (t === "boolean") return "boolean";
  if (PRIMITIVE_NUM.has(t)) return "number";
  if (t === "java.lang.String") return "string";
  if (BOXED[t]) return BOXED[t];
  if (t === "byte[]") return "Uint8Array";
  if (t.endsWith("[]")) return `ReadonlyArray<${tsType(t.slice(0, -2), position)}>`;
  if (t === "android.graphics.Bitmap") return "Bitmap";
  if (t === "android.os.Bundle") return "Readonly<Record<string, unknown>>";
  if (HAND_WRITTEN[t] !== undefined) return HAND_WRITTEN[t];
  if (ANDROID_TYPES[t] !== undefined) return ANDROID_TYPES[t];

  const [raw, args] = generics(t);
  if (raw === "java.util.List" || raw === "java.util.ArrayList" || raw === "java.util.Collection") {
    return `ReadonlyArray<${args.length ? tsType(args[0], position) : "unknown"}>`;
  }
  if (raw === "java.util.Map" || raw === "java.util.HashMap" || raw === "android.util.ArrayMap") {
    return `Readonly<Record<string, ${args.length > 1 ? tsType(args[1], position) : "unknown"}>>`;
  }
  // Sparse arrays are int-keyed maps; JSON object keys are strings either way.
  if (raw === "android.util.SparseIntArray") return "Readonly<Record<string, number>>";
  if (raw === "android.util.SparseArray" || raw === "android.util.SparseBooleanArray") {
    return `Readonly<Record<string, ${args.length ? tsType(args[0], position) : "unknown"}>>`;
  }
  if (enumTypes.has(raw)) return tsName(raw);
  if (emittedData.has(raw)) return position === "in" ? `Input<${tsName(raw)}>` : tsName(raw);
  if (constantTypes.has(raw)) return "number";
  throw new Unsupported(t);
}

const isListener = (java) => listenerIfaces.has(generics(java)[0]);

// ------------------------------------------------- what actually gets emitted

const emittedData = new Set(dataTypes);
const dataProps = new Map();
const listenerVariants = new Map();
const emittedListeners = new Set();

/**
 * A data carrier is only emitted if at least one field survives type mapping,
 * and dropping one can strip fields from carriers that referenced it - so
 * iterate to a fixpoint. A listener is emitted only if at least one callback
 * survives. Runs once, before anything is written.
 */
function computeEmitted() {
  for (;;) {
    let changed = false;
    for (const fqn of dataTypes) {
      if (!emittedData.has(fqn)) continue;
      const props = [];
      for (const f of instanceFields(T[fqn])) {
        try { props.push({ name: f.name, ty: tsType(f.type, "out") }); }
        catch (e) { report.skippedFields.push(`${fqn}.${f.name}: ${e.type}`); }
      }
      dataProps.set(fqn, props);
      if (props.length === 0) { emittedData.delete(fqn); changed = true; }
    }
    if (!changed) break;
  }

  for (const fqn of listenerIfaces) {
    const variants = [];
    for (const m of T[fqn].methods) {
      if (respondIfaces.has(fqn) && m.ret !== "int" && m.ret !== "void") {
        report.skippedMethods.push(`${fqn}.${m.name} (reply type ${m.ret}; only int replies cross the bridge)`);
        continue;
      }
      const names = [];
      const fields = [];
      let bad = false;
      for (let i = 0; i < m.params.length; i++) {
        const pn = safeParam(m.paramNames?.[i], i, m.params[i]);
        let ty;
        try { ty = tsType(m.params[i], "out"); }
        catch (e) { report.skippedMethods.push(`${fqn}.${m.name} (callback arg ${e.type})`); bad = true; break; }
        names.push(pn);
        fields.push({ name: pn, ty });
      }
      if (!bad) variants.push({ name: m.name, names, fields });
    }
    if (variants.length > 0) { listenerVariants.set(fqn, variants); emittedListeners.add(fqn); }
  }
}

// ------------------------------------------------------------------ TS output

const RESERVED = new Set(["default", "function", "new", "delete", "in", "class", "var", "let",
  "const", "return", "typeof", "case", "switch", "interface", "enum", "package", "with", "this"]);
const isUsableName = (n) => Boolean(n) && /^[A-Za-z_$][\w$]*$/.test(n) && !RESERVED.has(n);

/**
 * Parameter name for generated signatures. The javadoc predates the jar, so
 * ~a quarter of methods have no documented names; deriving one from the type
 * (`KeyEvent event` -> `keyEvent`) beats `arg0` for every one of them.
 */
function safeParam(n, i, javaType) {
  if (isUsableName(n)) return n;
  if (javaType !== undefined) {
    const t = String(javaType).replace(/<.*>/, "");
    const arr = t.endsWith("[]");
    const base = t.replace(/\[\]/g, "").split(/[.$]/).pop();
    const derived = lowerFirst(base.replace(/^Aidl/, "")) + (arr ? "s" : "");
    if (isUsableName(derived) && !/^(int|long|short|byte|boolean|float|double|char|string|object)s?$/i.test(derived)) {
      return derived;
    }
  }
  return `arg${i}`;
}

function jsdoc(lines, indent = "  ") {
  const body = lines.filter((l) => l != null && String(l).trim() !== "");
  if (body.length === 0) return "";
  if (body.length === 1) return `${indent}/** ${body[0]} */\n`;
  return `${indent}/**\n${body.map((l) => `${indent} * ${l}`).join("\n")}\n${indent} */\n`;
}
const escapeDoc = (s) => String(s).replace(/\*\//g, "*\\/").trim();

// ---- enums ----
function emitEnums() {
  const out = [header(), ""];
  for (const fqn of [...enumTypes].sort()) {
    const t = T[fqn];
    const values = t.fields.filter((f) => f.type === fqn && f.mods.includes("static")).map((f) => f.name);
    if (values.length === 0) continue;
    const n = tsName(fqn);
    out.push(jsdoc([escapeDoc(t.doc ?? ""), `Java: \`${fqn}\``], ""));
    out.push(`export type ${n} =`);
    out.push(values.map((v) => `  | ${JSON.stringify(v)}`).join("\n") + ";");
    out.push(`export const ${n}: ReadonlyArray<${n}> = [${values.map((v) => JSON.stringify(v)).join(", ")}];`);
    out.push("");
  }
  return out.join("\n");
}

// ---- constants ----
function emitConstants() {
  const out = [header(), ""];
  for (const fqn of [...constantTypes].sort()) {
    const t = T[fqn];
    const fields = constantFields(t);
    if (fields.length === 0) continue;
    const n = tsName(fqn);
    out.push(jsdoc([escapeDoc(t.doc ?? ""), `Java: \`${fqn}\``], ""));
    out.push(`export const ${n} = {`);
    for (const f of fields) {
      out.push(`  ${JSON.stringify(f.name)}: ${JSON.stringify(f.value)},`);
    }
    out.push("} as const;");
    out.push("");
  }
  return out.join("\n");
}

// ---- data carriers ----
function emitTypes() {
  const out = [header(), "", 'import type { Bitmap, Input } from "../codec.js";',
    'import type * as A from "../android.js";',
    'import type * as B from "../bytes.js";',
    'import type * as E from "./enums.js";', ""];
  for (const fqn of [...emittedData].sort()) {
    const t = T[fqn];
    const n = tsName(fqn);
    const props = dataProps.get(fqn) ?? [];
    if (props.length === 0) continue;
    out.push(jsdoc([escapeDoc(t.doc ?? ""), `Java: \`${fqn}\``], ""));
    out.push(`export interface ${n} {`);
    for (const p of props) out.push(`  readonly ${p.name}: ${qualifyEnums(p.ty)} | null;`);
    out.push("}");
    out.push("");
  }
  out.push("export type { Bitmap, Input };");
  return out.join("\n");
}

/** Enum names live in enums.ts; prefix references inside types.ts. */
function qualifyEnums(ty) {
  const names = new Set([...enumTypes].map(tsName));
  return ty.replace(/\b[A-Z]\w*\b/g, (m) => (names.has(m) ? `E.${m}` : m));
}

// ---- listener event unions ----
function listenerEventName(fqn) {
  return tsName(fqn).replace(/^Aidl/, "") + "Event";
}
function listenerShapeName(fqn) {
  return lowerFirst(tsName(fqn).replace(/^Aidl/, "")) + "Shape";
}
function listenerHandlersName(fqn) {
  return tsName(fqn).replace(/^Aidl/, "") + "Handlers";
}

function emitListeners() {
  const out = [header(), "", 'import type { Effect } from "effect";',
    'import type * as A from "../android.js";',
    'import type * as B from "../bytes.js";',
    'import type * as Types from "./types.js";',
    'import type * as E from "./enums.js";', 'import type { Bitmap } from "../codec.js";', ""];
  for (const fqn of [...emittedListeners].sort()) {
    const t = T[fqn];
    const variants = [];
    const shape = [];
    for (const v of listenerVariants.get(fqn)) {
      const fields = v.fields.map((f) => `    readonly ${f.name}: ${qualifyRefs(f.ty)};`);
      variants.push(`  | {\n    readonly _tag: ${JSON.stringify(v.name)};\n${fields.join("\n")}${fields.length ? "\n" : ""}  }`);
      shape.push(`  ${JSON.stringify(v.name)}: [${v.names.map((n) => JSON.stringify(n)).join(", ")}],`);
    }
    if (variants.length === 0) continue;
    const n = listenerEventName(fqn);
    out.push(jsdoc([`Callbacks delivered by \`${fqn}\`.`, escapeDoc(t.doc ?? "")], ""));
    out.push(`export type ${n} =`);
    out.push(variants.join("\n") + ";");
    out.push("");
    out.push(`/** @internal positional-to-named argument map for ${n}. */`);
    out.push(`export const ${listenerShapeName(fqn)} = {`);
    out.push(shape.join("\n"));
    out.push("} as const;");
    out.push("");

    if (respondIfaces.has(fqn)) {
      const hn = listenerHandlersName(fqn);
      out.push(jsdoc([
        `Handlers for \`${fqn}\`.`,
        "The kernel blocks on the binder thread until each handler produces a",
        "value, so every method must be implemented and none may fail - decide",
        "the fallback yourself rather than letting the kernel time out.",
      ], ""));
      out.push(`export interface ${hn} {`);
      for (const v of listenerVariants.get(fqn)) {
        const meth = T[fqn].methods.find((m) => m.name === v.name);
        const argType = v.fields.length === 0
          ? "{}"
          : `{ ${v.fields.map((f) => `readonly ${f.name}: ${qualifyRefs(f.ty)}`).join("; ")} }`;
        const ret = meth.ret === "void" ? "void" : "number";
        out.push(`  readonly ${v.name}: (args: ${argType}) => Effect.Effect<${ret}>;`);
      }
      out.push("}");
      out.push("");
      out.push(`/** @internal methods of ${hn} whose reply the kernel waits for. */`);
      out.push(`export const ${lowerFirst(tsName(fqn).replace(/^Aidl/, ""))}Replies: ReadonlyArray<string> = [`);
      out.push(listenerVariants.get(fqn)
        .filter((v) => T[fqn].methods.find((m) => m.name === v.name).ret !== "void")
        .map((v) => `  ${JSON.stringify(v.name)},`).join("\n"));
      out.push("];");
      out.push("");
    }
  }
  return out.join("\n");
}

/** Prefix data-type and enum references with their module alias. */
function qualifyRefs(ty) {
  const enums = new Set([...enumTypes].map(tsName));
  const data = new Set([...emittedData].map(tsName));
  return ty.replace(/\b[A-Z]\w*\b/g, (m) =>
    enums.has(m) ? `E.${m}` : data.has(m) ? `Types.${m}` : m);
}

// ---- modules ----
/** `AidlSerialport` -> `SerialportRef`, the token identifying one live binder. */
const refTypeName = (fqn) => tsName(fqn).replace(/^Aidl/, "") + "Ref";
/** `AidlSerialport` -> `serialportAt`, bindings addressed by handle. */
const handleBindingName = (fqn) => lowerFirst(tsName(fqn).replace(/^Aidl/, "")) + "At";

function emitModules() {
  const out = [
    header(), "",
    'import type { Effect } from "effect";',
    'import type { Stream } from "effect";',
    'import { CALLBACK_SLOT, call, callOut, callStream, callWithEvents, callWithHandlers, type CallbackOptions, type TopwiseBridge } from "../bridge.js";',
    'import type { TopwiseError } from "../errors.js";',
    'import type { Bitmap, Input } from "../codec.js";',
    'import type * as A from "../android.js";',
    'import type * as B from "../bytes.js";',
    'import type * as Types from "./types.js";',
    'import type * as E from "./enums.js";',
    'import * as L from "./listeners.js";',
    "",
    "type Scope = import(\"effect/Scope\").Scope;",
    "",
  ];

  // Handle-addressed interfaces need a token type before anything references it.
  for (const fqn of [...handleTargets].sort()) {
    out.push(jsdoc([
      `A live \`${fqn}\` held natively.`,
      `Pass it to \`${handleBindingName(fqn)}(ref)\` to call through it.`,
    ], ""));
    out.push(`export type ${refTypeName(fqn)} = A.RemoteHandle & { readonly _iface: ${JSON.stringify(tsName(fqn))} };`);
    out.push("");
  }

  const targets = [
    ...api.modules.map((mod) => ({
      name: mod.name,
      iface: mod.iface,
      indexed: mod.params.length > 0,
      modExpr: JSON.stringify(mod.name),
      doc: `Java: \`DeviceServiceManager.${mod.getter}(${mod.params.join(", ")})\``,
      open: mod.params.length > 0
        ? `export const ${mod.name} = (index: number) => ({`
        : `export const ${mod.name} = {`,
      close: mod.params.length > 0 ? "});" : "} as const;",
      extraDoc: mod.params.length > 0 ? "@param index selects the hardware slot (0-based)." : null,
    })),
    ...EXTRA_MODULES.map((extra) => ({
      name: extra.name,
      iface: extra.iface,
      indexed: false,
      modExpr: JSON.stringify(extra.name),
      doc: `Java: \`AidlDeviceService.${extra.via}()\` - reached through the manager's root service.`,
      open: `export const ${extra.name} = {`,
      close: "} as const;",
      extraDoc: null,
    })),
    {
      name: "manager",
      iface: MANAGER_CLASS,
      indexed: false,
      modExpr: JSON.stringify("manager"),
      doc: "Java: `DeviceServiceManager` itself.",
      open: "export const manager = {",
      close: "} as const;",
      extraDoc: null,
      only: MANAGER_METHODS,
    },
    ...[...handleTargets].sort().map((fqn) => ({
      name: handleBindingName(fqn),
      iface: fqn,
      indexed: false,
      modExpr: "ref.__handle",
      doc: `Called through a live binder rather than a DeviceServiceManager getter.`,
      open: `export const ${handleBindingName(fqn)} = (ref: ${refTypeName(fqn)}) => ({`,
      close: "});",
      extraDoc: `@param ref from the call that handed out this interface.`,
    })),
  ];

  for (const target of targets) {
    const iface = T[target.iface];
    const body = [];
    for (const m of exposedMethodsOf(target.iface)) {
      const emitted = emitMethod(target, m);
      if (emitted) body.push(emitted);
    }
    if (body.length === 0) continue;

    out.push(jsdoc([
      escapeDoc(iface.doc ?? "") || `Bindings for \`${target.iface}\`.`,
      target.doc,
      target.extraDoc,
    ], "").trimEnd());
    out.push(target.open);
    out.push(body.join("\n\n"));
    out.push(target.close);
    out.push("");
  }
  return out.join("\n");
}

/** Every binding emitted, in the form the docs need. */
const surface = [];

function emitMethod(mod, m) {
  const idxExpr = mod.indexed ? "index" : "-1";
  const modExpr = mod.modExpr;
  const docLinesExtra = [];

  const params = [];
  const paramInfo = [];
  const argExprs = [];
  const outParams = [];
  let listenerFqn = null;

  for (let i = 0; i < m.params.length; i++) {
    const jt = m.params[i];
    if (isListener(jt)) {
      if (listenerFqn) {
        report.skippedMethods.push(`${mod.iface}.${m.name} (multiple listener params)`);
        return null;
      }
      listenerFqn = generics(jt)[0];
      if (!emittedListeners.has(listenerFqn)) {
        report.skippedMethods.push(`${mod.iface}.${m.name} (listener ${listenerFqn} is not marshallable)`);
        return null;
      }
      argExprs.push("CALLBACK_SLOT");
      continue;
    }
    let ty;
    try { ty = tsType(jt, "in"); }
    catch (e) {
      report.skippedMethods.push(`${mod.iface}.${m.name} (param ${e.type})`);
      return null;
    }
    const pn = safeParam(m.paramNames?.[i], i, jt);
    if (OUT_HOLDERS.has(rawType(jt))) outParams.push({ index: i, name: pn, ty: tsType(jt, "out") });
    params.push(`${pn}: ${qualifyRefs(ty)}`);
    paramInfo.push({ name: pn, type: qualifyRefs(ty), java: jt, doc: escapeDoc(m.paramDocs?.[i] ?? "") });
    argExprs.push(pn);
  }

  let ret;
  try { ret = tsType(m.ret, "out"); }
  catch (e) {
    report.skippedMethods.push(`${mod.iface}.${m.name} (return ${e.type})`);
    return null;
  }
  ret = qualifyRefs(ret);

  // A method handing back another interface returns a typed handle when we
  // know which interface it is, and a bare RemoteHandle otherwise.
  if (m.ret === "android.os.IBinder") {
    const targetIface = HANDLE_RETURNS[`${mod.iface}.${m.name}`];
    if (targetIface === undefined) {
      report.notes.push(`${mod.iface}.${m.name} returns an untyped RemoteHandle; add it to HANDLE_RETURNS in scripts/generate.mjs`);
    } else {
      ret = refTypeName(targetIface);
      docLinesExtra.push(`@returns a handle - pass it to \`${handleBindingName(targetIface)}(ref)\`.`);
    }
  }

  const docLines = [
    escapeDoc(m.doc ?? ""),
    ...(m.paramNames ?? []).map((n, i) =>
      m.paramDocs?.[i] ? `@param ${safeParam(n, i, m.params[i])} ${escapeDoc(m.paramDocs[i])}` : null),
    m.returnDoc ? `@returns ${escapeDoc(m.returnDoc)}` : null,
    m.deprecated ? "@deprecated" : null,
    ...docLinesExtra,
  ];

  const argList = `[${argExprs.join(", ")}]`;
  const sig = params.join(", ");

  const record = (extra) =>
    surface.push({
      module: mod.name,
      iface: mod.iface,
      indexed: Boolean(mod.indexed),
      method: m.name,
      params: paramInfo,
      doc: escapeDoc(m.doc ?? ""),
      returnDoc: escapeDoc(m.returnDoc ?? ""),
      deprecated: Boolean(m.deprecated),
      ...extra,
    });

  if (listenerFqn && respondIfaces.has(listenerFqn)) {
    const shape = `L.${listenerShapeName(listenerFqn)}`;
    const handlers = `L.${listenerHandlersName(listenerFqn)}`;
    const replies = `L.${lowerFirst(tsName(listenerFqn).replace(/^Aidl/, ""))}Replies`;
    const sig2 = [...params, `handlers: ${handlers}`, "options?: CallbackOptions"].join(", ");
    docLines.push(
      "@remarks The kernel blocks waiting for each handler's value; the",
      "registration stays live until the surrounding scope closes.",
    );
    record({ kind: "handlers", ret, handlers: listenerHandlersName(listenerFqn), listener: listenerFqn });
    return jsdoc(docLines) +
      `  ${m.name}: (${sig2}): Effect.Effect<${ret}, TopwiseError, TopwiseBridge | Scope> =>\n` +
      `    callWithHandlers(${modExpr}, ${idxExpr}, ${JSON.stringify(m.name)}, ${argList}, ${shape}, handlers as never, ${replies}, options),`;
  }

  if (listenerFqn) {
    const ev = `L.${listenerEventName(listenerFqn)}`;
    const shape = `L.${listenerShapeName(listenerFqn)}`;
    if (m.ret === "void") {
      docLines.push(
        "@remarks Emits until the surrounding scope closes; combine with",
        "`Stream.takeUntil` on the terminal event you care about.",
      );
      record({ kind: "stream", ret: "void", event: listenerEventName(listenerFqn), listener: listenerFqn });
      return jsdoc(docLines) +
        `  ${m.name}: (${sig}): Stream.Stream<${ev}, TopwiseError, TopwiseBridge> =>\n` +
        `    callStream(${modExpr}, ${idxExpr}, ${JSON.stringify(m.name)}, ${argList}, ${shape}),`;
    }
    docLines.push("@remarks Returns the call's synchronous result alongside the callback stream.");
    record({ kind: "events", ret, event: listenerEventName(listenerFqn), listener: listenerFqn });
    return jsdoc(docLines) +
      `  ${m.name}: (${sig}): Effect.Effect<{ readonly result: ${ret}; readonly events: Stream.Stream<${ev}, TopwiseError> }, TopwiseError, TopwiseBridge | Scope> =>\n` +
      `    callWithEvents(${modExpr}, ${idxExpr}, ${JSON.stringify(m.name)}, ${argList}, ${shape}),`;
  }

  if (outParams.length > 0) {
    const outType = `{ ${outParams.map((p) => `readonly ${p.name}: ${qualifyRefs(p.ty)}`).join("; ")} }`;
    const names = `{ ${outParams.map((p) => `${JSON.stringify(String(p.index))}: ${JSON.stringify(p.name)}`).join(", ")} }`;
    docLines.push(
      `@returns \`result\` is the status code; \`out\` carries ${outParams.map((p) => `\`${p.name}\``).join(", ")},`,
      "which the Java side fills in by mutating the argument you pass.",
    );
    record({ kind: "out", ret, out: outParams.map((o) => ({ name: o.name, type: qualifyRefs(o.ty) })) });
    return jsdoc(docLines) +
      `  ${m.name}: (${sig}): Effect.Effect<{ readonly result: ${ret}; readonly out: ${outType} }, TopwiseError, TopwiseBridge> =>\n` +
      `    callOut(${modExpr}, ${idxExpr}, ${JSON.stringify(m.name)}, ${argList}, ${names}),`;
  }

  record({ kind: "plain", ret });
  return jsdoc(docLines) +
    `  ${m.name}: (${sig}): Effect.Effect<${ret}, TopwiseError, TopwiseBridge> =>\n` +
    `    call(${modExpr}, ${idxExpr}, ${JSON.stringify(m.name)}, ${argList}),`;
}

// -------------------------------------------------------------- Kotlin output

function emitKotlin() {
  const L = [];
  L.push("// " + BANNER.replace(/\n/g, "\n// "));
  L.push(`package ${KOTLIN_PKG}`, "");
  L.push("import com.topwise.cloudpos.service.DeviceServiceManager", "");
  L.push("import org.json.JSONArray", "");
  L.push("/** Receives callbacks from a generated binder stub. */");
  L.push("internal interface TopwiseCallbackSink {");
  L.push("  /** Fire-and-forget callback. */");
  L.push("  fun notify(method: String, args: JSONArray)");
  L.push("  /** Callback whose return value the caller blocks on. */");
  L.push("  fun request(method: String, args: JSONArray): Long");
  L.push("}", "");
  L.push("/** Generated dispatch: module name -> AIDL interface, and binder stubs for listeners. */");
  L.push("internal object TopwiseGenerated {", "");

  // module resolution
  L.push("  /** Module names exposed to JS, resolved through DeviceServiceManager. */");
  L.push("  fun resolveModule(name: String, index: Int): Any? {");
  L.push("    val dsm = DeviceServiceManager.getInstance()");
  L.push("    return when (name) {");
  for (const mod of api.modules) {
    const call = mod.params.length > 0 ? `dsm.${mod.getter}(index)` : `dsm.${mod.getter}()`;
    L.push(`      ${JSON.stringify(mod.name)} -> ${call}`);
  }
  for (const extra of EXTRA_MODULES) {
    L.push(`      ${JSON.stringify(extra.name)} ->`);
    L.push(`        TopwiseDeviceService.get()?.${extra.via}()?.let { ${extra.iface}.Stub.asInterface(it) }`);
  }
  L.push('      "manager" -> dsm');
  L.push("      else -> null");
  L.push("    }");
  L.push("  }", "");
  L.push("  /** Distinguishes \"no such module\" from \"module exists but the service is unbound\". */");
  L.push("  fun isKnownModule(name: String): Boolean = name in MODULES", "");
  L.push("  private val MODULES = setOf(");
  L.push([...api.modules.map((m) => m.name), ...EXTRA_MODULES.map((m) => m.name), "manager"]
    .map((n) => `    ${JSON.stringify(n)},`).join("\n"));
  L.push("  )", "");

  // listener stubs
  L.push("  /**");
  L.push("   * Build a binder stub for `iface`, forwarding every callback to JS.");
  L.push("   * AIDL `Stub`s are abstract Binder subclasses, so these cannot be");
  L.push("   * reflected into existence - they are generated one per interface.");
  L.push("   */");
  L.push("  fun createListener(iface: String, sink: TopwiseCallbackSink): Any? = when (iface) {");
  for (const fqn of [...emittedListeners].sort()) {
    const t = T[fqn];
    L.push(`    ${JSON.stringify(fqn)} -> object : ${fqn}.Stub() {`);
    for (const v of listenerVariants.get(fqn)) {
      const m = t.methods.find((x) => x.name === v.name);
      const ps = m.params.map((p, i) => `p${i}: ${kotlinType(p)}`).join(", ");
      const args = m.params.map((_, i) => `.put(TopwiseCodec.encode(p${i}))`).join("");
      if (m.ret === "void") {
        L.push(`      override fun ${m.name}(${ps}) {`);
        L.push(`        sink.notify(${JSON.stringify(m.name)}, JSONArray()${args})`);
        L.push("      }");
      } else {
        // The kernel blocks on this thread until JS answers.
        L.push(`      override fun ${m.name}(${ps}): Int {`);
        L.push(`        return sink.request(${JSON.stringify(m.name)}, JSONArray()${args}).toInt()`);
        L.push("      }");
      }
    }
    L.push("    }");
  }
  L.push("    else -> null");
  L.push("  }");
  L.push("}");
  return L.join("\n") + "\n";
}

/** Java type -> Kotlin type, for the generated stub overrides. */
function kotlinType(java) {
  const t = java.trim();
  switch (t) {
    case "void": return "Unit";
    case "boolean": return "Boolean";
    case "byte": return "Byte";
    case "short": return "Short";
    case "int": return "Int";
    case "long": return "Long";
    case "float": return "Float";
    case "double": return "Double";
    case "char": return "Char";
    case "byte[]": return "ByteArray";
    case "int[]": return "IntArray";
    case "boolean[]": return "BooleanArray";
    case "long[]": return "LongArray";
    case "short[]": return "ShortArray";
    case "java.lang.String": return "String?";
    case "java.lang.String[]": return "Array<String?>?";
  }
  if (t.endsWith("[]")) return `Array<${kotlinType(t.slice(0, -2)).replace(/\?$/, "")}?>?`;
  const [raw, args] = generics(t);
  if (raw === "java.util.List" || raw === "java.util.ArrayList") {
    return `MutableList<${args.length ? kotlinType(args[0]).replace(/\?$/, "") : "Any"}?>?`;
  }
  if (raw === "java.util.Map") return "MutableMap<Any?, Any?>?";
  return `${raw}?`;
}


// ---------------------------------------------------------------- docs output

const DOCS_DIR = join(ROOT, "docs");
/** `|` breaks markdown tables. */
const cell = (t) => String(t).replace(/\|/g, "\\|");
/** Strip the module aliases codegen uses internally; callers import bare names. */
const plain = (t) => String(t).replace(/\b(?:Types|Events|E|A|B|L)\./g, "");
const anchor = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** How a binding is called, in both styles. */
function signatures(entry) {
  const call = entry.indexed ? `${entry.module}(index)` : entry.module;
  const args = entry.params.map((p) => `${p.name}: ${plain(p.type)}`).join(", ");
  const withArgs = (extra) => [args, extra].filter(Boolean).join(", ");

  switch (entry.kind) {
    case "stream":
      return [
        `${call}.${entry.method}(${args})`,
        `  : Stream<${entry.event}, TopwiseError, TopwiseBridge>`,
        ``,
        `// promise client`,
        `topwise.${call}.${entry.method}(${withArgs("{ onEvent }")}): Unsubscribe`,
      ].join("\n");
    case "events":
      return [
        `${call}.${entry.method}(${args})`,
        `  : Effect<{ result: ${plain(entry.ret)}; events: Stream<${entry.event}> }, TopwiseError, TopwiseBridge | Scope>`,
        ``,
        `// promise client`,
        `await topwise.${call}.${entry.method}(${args})`,
        `  // -> { result, events }  - pass events to topwise.subscribe(...)`,
      ].join("\n");
    case "handlers":
      return [
        `${call}.${entry.method}(${withArgs(`handlers: ${entry.handlers}, options?: CallbackOptions`)})`,
        `  : Effect<${plain(entry.ret)}, TopwiseError, TopwiseBridge | Scope>`,
        ``,
        `// promise client`,
        `await topwise.${call}.${entry.method}(${withArgs("handlers, options?")}): ${plain(entry.ret)}`,
      ].join("\n");
    case "out": {
      const out = entry.out.map((o) => `${o.name}: ${plain(o.type)}`).join("; ");
      return [
        `${call}.${entry.method}(${args})`,
        `  : Effect<{ result: ${plain(entry.ret)}; out: { ${out} } }, TopwiseError, TopwiseBridge>`,
        ``,
        `// promise client`,
        `await topwise.${call}.${entry.method}(${args})  // -> { result, out }`,
      ].join("\n");
    }
    default:
      return [
        `${call}.${entry.method}(${args}): Effect<${plain(entry.ret)}, TopwiseError, TopwiseBridge>`,
        ``,
        `// promise client`,
        `await topwise.${call}.${entry.method}(${args}): ${plain(entry.ret)}`,
      ].join("\n");
  }
}

function docsForModule(name, entries) {
  const iface = entries[0].iface;
  const indexed = entries[0].indexed;
  const out = [
    `# ${name}`, "",
    `\`${iface}\``, "",
    `${entries.length} method${entries.length === 1 ? "" : "s"}.`, "",
  ];
  if (indexed) {
    out.push(
      `Takes a slot index: \`${name}(0)\`. Slots are 0-based and model-specific;`,
      `an absent slot fails with \`MODULE_UNAVAILABLE\`.`, "",
    );
  }
  out.push(
    "Every method here can fail with any of the transport codes in",
    "[errors.md](../errors.md). Method-specific meanings are noted below.", "",
    "## Methods", "",
    entries.map((e) => `[\`${e.method}\`](#${anchor(e.method)})`).join(" · "), "",
  );

  for (const e of entries) {
    out.push("---", "", `### \`${e.method}\``, "");
    if (e.deprecated) out.push("> **Deprecated** by the vendor.", "");
    if (e.doc && !/^deprecated\.?$/i.test(e.doc)) out.push(e.doc, "");
    out.push("```ts", signatures(e), "```", "");

    if (e.params.length > 0) {
      const documented = e.params.some((p) => p.doc);
      out.push(
        documented ? "| Parameter | Type | Notes |" : "| Parameter | Type |",
        documented ? "| --- | --- | --- |" : "| --- | --- |",
      );
      for (const p of e.params) {
        const base = `| \`${p.name}\` | \`${cell(plain(p.type))}\` |`;
        out.push(documented ? `${base} ${cell(p.doc)} |` : base);
      }
      out.push("");
    }
    if (e.returnDoc) out.push(`**Returns** — ${e.returnDoc}`, "");
    if (e.kind === "stream" || e.kind === "events") {
      out.push(`**Events** — [\`${e.event}\`](../events.md#${anchor(e.event)}).`, "");
    }
    if (e.kind === "handlers") {
      out.push(
        `**Handlers** — [\`${e.handlers}\`](../events.md#${anchor(e.handlers)}). The kernel`,
        "blocks on the binder thread until each handler answers, so every method",
        "must be implemented and none may fail.", "",
      );
    }
    if (e.kind === "out") {
      out.push(
        `**Out-parameters** — Java writes the payload into ${e.out.map((o) => `\`${o.name}\``).join(", ")}`,
        "rather than returning it; read it from `out`.", "",
      );
    }
  }
  return out.join("\n");
}

function emitDocs() {
  mkdirSync(join(DOCS_DIR, "modules"), { recursive: true });

  const byModule = new Map();
  for (const e of surface) {
    if (!byModule.has(e.module)) byModule.set(e.module, []);
    byModule.get(e.module).push(e);
  }
  const names = [...byModule.keys()].sort();
  for (const name of names) {
    writeFileSync(join(DOCS_DIR, "modules", `${name}.md`), docsForModule(name, byModule.get(name)) + "\n");
  }

  // ---- events ----
  const ev = [`# Events`, "", "Callbacks delivered by the device, one union per AIDL listener.", ""];
  for (const fqn of [...emittedListeners].sort()) {
    const variants = listenerVariants.get(fqn);
    ev.push(`## ${listenerEventName(fqn)}`, "", `\`${fqn}\``, "");
    ev.push("| `_tag` | Fields |", "| --- | --- |");
    for (const v of variants) {
      const fields = v.fields.map((f) => `\`${f.name}: ${cell(plain(qualifyRefs(f.ty)))}\``).join("<br>") || "—";
      ev.push(`| \`${v.name}\` | ${fields} |`);
    }
    ev.push("");
    if (respondIfaces.has(fqn)) {
      ev.push(
        `### ${listenerHandlersName(fqn)}`, "",
        "The kernel blocks waiting for each of these. Every method must be",
        "implemented and return a number; none may fail.", "",
      );
    }
  }
  writeFileSync(join(DOCS_DIR, "events.md"), ev.join("\n") + "\n");

  // ---- data types ----
  const ty = [`# Data types`, "", `${emittedData.size} carriers mirrored from the jar. Fields are nullable because Java's are.`, ""];
  for (const fqn of [...emittedData].sort()) {
    const props = dataProps.get(fqn) ?? [];
    if (props.length === 0) continue;
    ty.push(`## ${tsName(fqn)}`, "", `\`${fqn}\``, "");
    ty.push("| Field | Type |", "| --- | --- |");
    for (const p of props) ty.push(`| \`${p.name}\` | \`${cell(plain(qualifyRefs(p.ty)))} \\| null\` |`);
    ty.push("");
  }
  writeFileSync(join(DOCS_DIR, "types.md"), ty.join("\n") + "\n");

  // ---- enums ----
  const en = [`# Enums`, "", "Java enums as string-literal unions; pass the name.", ""];
  for (const fqn of [...enumTypes].sort()) {
    const values = T[fqn].fields.filter((f) => f.type === fqn && f.mods.includes("static")).map((f) => f.name);
    if (values.length === 0) continue;
    en.push(`## ${tsName(fqn)}`, "", `\`${fqn}\``, "", values.map((v) => `\`"${v}"\``).join(" · "), "");
  }
  writeFileSync(join(DOCS_DIR, "enums.md"), en.join("\n") + "\n");

  // ---- constants ----
  const co = [
    `# Constants`, "",
    "Vendor constant tables. Most device calls report business failure in-band",
    "as a non-zero `int`; check the return against the matching table here.", "",
  ];
  for (const fqn of [...constantTypes].sort()) {
    const fields = constantFields(T[fqn]);
    if (fields.length === 0) continue;
    co.push(`## ${tsName(fqn)}`, "", `\`${fqn}\``, "");
    co.push("| Name | Value |", "| --- | --- |");
    for (const f of fields) co.push(`| \`${f.name}\` | \`${cell(JSON.stringify(f.value))}\` |`);
    co.push("");
  }
  writeFileSync(join(DOCS_DIR, "constants.md"), co.join("\n") + "\n");

  // ---- index ----
  const total = surface.length;
  const idx = [
    `# API reference`, "",
    `${total} methods across ${names.length} modules, generated from \`${api.jar}\`.`,
    "Re-run \`npm run codegen\` after a vendor jar drop and these regenerate.", "",
    "## Guides", "",
    "- [Getting started](./getting-started.md)",
    "- [Printing receipts](./printing.md)",
    "- [PIN entry and keys](./pin-and-keys.md)",
    "- [Concepts](./concepts.md) — handles, Android types, bytes and TLV",
    "- [Errors](./errors.md)",
    "- [Troubleshooting](./troubleshooting.md)", "",
    "## Reference", "",
    "- [Events](./events.md) — listener callback unions",
    "- [Data types](./types.md)",
    "- [Enums](./enums.md)",
    "- [Constants](./constants.md) — including the `AidlErrorCode*` tables", "",
    "## Modules", "",
    "One page per module, generated from the jar. `printTemplate` and `helpers`",
    "are hand-written and documented in the guides above.", "",
    "| Module | Methods | AIDL interface |",
    "| --- | --- | --- |",
    ...names.map((n) => {
      const es = byModule.get(n);
      const label = es[0].indexed ? `${n}(index)` : n;
      return `| [\`${label}\`](./modules/${n}.md) | ${es.length} | \`${es[0].iface.split(".").pop()}\` |`;
    }),
    "",
  ];
  writeFileSync(join(DOCS_DIR, "README.md"), idx.join("\n") + "\n");

  return { modules: names.length, methods: total };
}

// ------------------------------------------------------------------ assembly

const BANNER = "GENERATED by scripts/generate.mjs from api.json. Do not edit by hand.";
function header() {
  return `/* eslint-disable */\n// ${BANNER}\n// Source jar: ${api.jar}`;
}

function main() {
  computeEmitted();
  mkdirSync(TS_DIR, { recursive: true });
  mkdirSync(KOTLIN_DIR, { recursive: true });

  writeFileSync(join(TS_DIR, "enums.ts"), emitEnums());
  writeFileSync(join(TS_DIR, "constants.ts"), emitConstants());
  writeFileSync(join(TS_DIR, "types.ts"), emitTypes());
  writeFileSync(join(TS_DIR, "listeners.ts"), emitListeners());
  writeFileSync(join(TS_DIR, "modules.ts"), emitModules());
  writeFileSync(join(KOTLIN_DIR, "TopwiseGenerated.kt"), emitKotlin());

  const docs = emitDocs();

  const exposedMethods = [...exposedIfaces].reduce((n, i) => n + exposedMethodsOf(i).length, 0);
  const skippedMethods = unique(report.skippedMethods);
  const skippedFields = unique(report.skippedFields);

  const lines = [
    "# Codegen report", "",
    `Source jar: \`${api.jar}\``,
    `Javadoc: \`${api.generatedFrom.javadoc ?? "none"}\` (${api.docCoverage} methods documented)`, "",
    "## Coverage", "",
    `**${exposedMethods - skippedMethods.length} of ${exposedMethods}** methods on the exposed interfaces cross the bridge.`, "",
    `- modules: ${api.modules.length + EXTRA_MODULES.length + 1}`,
    `- handle-addressed interfaces: ${handleTargets.size}`,
    `- listener interfaces: ${emittedListeners.size}`,
    `- enums: ${enumTypes.size}`,
    `- data carriers: ${emittedData.size}`,
    `- constant tables: ${constantTypes.size}`, "",
    "## Skipped methods", "",
    skippedMethods.length === 0
      ? "None. Every method on every exposed interface is bound."
      : "These take or return a type the bridge cannot marshal:",
    ...skippedMethods.map((s) => `- \`${s}\``), "",
    "## Skipped fields", "",
    skippedFields.length === 0
      ? "None. Every field of every reachable data carrier is bound."
      : "These fields are dropped from their data carrier:",
    ...skippedFields.map((s) => `- \`${s}\``), "",
    "## Mirrored but unreferenced", "",
    "Data carriers with a full TypeScript mirror that no current AIDL signature",
    "mentions - leftovers from an earlier SDK generation. Kept so the TS surface",
    "maps the jar one-to-one.", "",
    ...unreferenced.map((s) => `- \`${s}\``), "",
    "## Hand-written", "",
    "Parts of the jar that cannot be generated, mirrored by hand instead:", "",
    "- `PrintTemplate` -> `printTemplate` (src/print-template.ts + TopwisePrintTemplate.kt)",
    "  - holds a `Context`; its six `add` overloads differ only by argument type,",
    "    which reflective dispatch cannot resolve from JSON",
    "- `PinParam.getParam()`, `MacParam.getParam()`, `SmallScreenUtil` -> `helpers`",
    "  (src/helpers.ts + TopwiseHelpers.kt) - behaviour that lives in Java",
    "- `BytesUtil`, `Tlv`, `TlvList` -> src/bytes.ts - pure functions over bytes,",
    "  so they run in JS rather than round-tripping across the bridge", "",
    "## Not data", "",
    "Classes holding a live Android object (a `Context`, a `View`, a",
    "`ServiceConnection`), so there is no value to send - only a reference into",
    "the app's object graph. These are native-side helpers, driven from Kotlin:", "",
    ...offSurface.map((s) => `- \`${s}\`${s.endsWith("PrintTemplate") ? " - mirrored by hand as the `printTemplate` module" : ""}`), "",
    ...(report.notes.length > 0
      ? ["## Notes", "", ...unique(report.notes).map((s) => `- ${s}`), ""]
      : []),
  ];
  writeFileSync(join(ROOT, "CODEGEN_REPORT.md"), lines.join("\n"));

  console.log(`modules   : ${api.modules.length}`);
  console.log(`listeners : ${emittedListeners.size}`);
  console.log(`enums     : ${enumTypes.size}`);
  console.log(`data      : ${emittedData.size}`);
  console.log(`constants : ${constantTypes.size}`);
  console.log(`skipped   : ${unique(report.skippedMethods).length} methods, ${unique(report.skippedFields).length} fields`);
  console.log(`docs      : ${docs.methods} methods across ${docs.modules} module pages`);
}

const unique = (a) => [...new Set(a)].sort();

main();
