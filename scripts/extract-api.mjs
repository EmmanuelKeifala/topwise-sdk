#!/usr/bin/env node
// Extracts the Topwise AIDL API surface from the vendor jar (via javap) and
// enriches it with parameter names + docs scraped from the vendor javadoc zip.
// Output: api.json, the single source of truth for scripts/generate.mjs.
//
// Requires a JDK on PATH (javap) and `unzip`. Dev-time only; not shipped.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, readdirSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VENDOR = join(ROOT, "T1&T3&T6 SDK20250215");

/** Recursively list files under `dir` matching `pred`. */
function walk(dir, pred, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, pred, out);
    else if (pred(p)) out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------- javap parse

/**
 * javap prints one block per class:
 *   Compiled from "X.java"
 *   public interface com.foo.Bar extends android.os.IInterface {
 *     public abstract int baz(java.lang.String, byte[]) throws ...;
 *   }
 */
function parseJavap(text) {
  const classes = [];
  let cur = null;
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\r$/, "");
    if (/^Compiled from/.test(line)) continue;
    if (!/^\s/.test(line) && line.trim().endsWith("{")) {
      cur = { header: line.trim().slice(0, -1).trim(), members: [] };
      classes.push(cur);
    } else if (cur && /^\s+\S/.test(line)) {
      const m = line.trim();
      if (m === "}" || m === "static {};" || m === "") continue;
      cur.members.push(m);
    }
  }
  return classes.map(parseClass).filter(Boolean);
}

/** Split "a, b<c, d>, e[]" on top-level commas only. */
function splitTop(s) {
  const out = [];
  let depth = 0, buf = "";
  for (const ch of s) {
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    if (ch === "," && depth === 0) { out.push(buf.trim()); buf = ""; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

const MODIFIERS = new Set(["public", "protected", "private", "static", "final", "abstract",
  "synchronized", "native", "transient", "volatile", "default", "strictfp"]);

function parseClass(c) {
  const h = c.header;
  const kw = h.match(/\b(interface|enum|class)\s+([\w.$]+)/);
  if (!kw) return null;
  const [, keyword, name] = kw;
  // javap prints enums as `final class X extends java.lang.Enum<X>`
  const isEnum = keyword === "enum" || /\bextends\s+java\.lang\.Enum\b/.test(h);
  const extendsM = h.match(/\bextends\s+([\w.$<>,\s]+?)(?:\s+implements\b|$)/);
  const implementsM = h.match(/\bimplements\s+(.+)$/);

  const type = {
    name,
    simple: name.split(".").pop(),
    pkg: name.slice(0, name.length - name.split(".").pop().length - 1),
    isEnum,
    isInterface: keyword === "interface",
    extends: extendsM ? extendsM[1].trim() : null,
    implements: implementsM ? splitTop(implementsM[1]) : [],
    fields: [],
    methods: [],
    ctors: [],
  };

  for (const m of c.members) {
    const body = m.replace(/;$/, "").trim();
    const parsed = parseMember(body, type);
    if (!parsed) continue;
    if (parsed.kind === "field") type.fields.push(parsed);
    else if (parsed.kind === "ctor") type.ctors.push(parsed);
    else type.methods.push(parsed);
  }
  return type;
}

function parseMember(body, type) {
  // strip `throws ...`
  let throwsList = [];
  const t = body.match(/\bthrows\s+(.+)$/);
  if (t) { throwsList = splitTop(t[1]); body = body.slice(0, t.index).trim(); }

  const mods = [];
  // Peel leading modifiers (careful: a return type can never be a modifier keyword).
  let rest = body;
  for (;;) {
    const w = rest.match(/^(\w+)\s+/);
    if (w && MODIFIERS.has(w[1])) { mods.push(w[1]); rest = rest.slice(w[0].length); }
    else break;
  }

  const paren = rest.indexOf("(");
  if (paren === -1) {
    // field: `<type> <name>` or, with javap -constants, `<type> <name> = <value>`
    let value;
    const eq = rest.indexOf(" = ");
    if (eq !== -1) { value = rest.slice(eq + 3).trim(); rest = rest.slice(0, eq).trim(); }
    const sp = lastTopSpace(rest);
    if (sp === -1) return null;
    const f = { kind: "field", type: rest.slice(0, sp).trim(), name: rest.slice(sp + 1).trim(), mods };
    if (value !== undefined) f.value = parseConstant(value);
    return f;
  }

  const close = matchParen(rest, paren);
  const params = splitTop(rest.slice(paren + 1, close)).filter((p) => p !== "");
  const head = rest.slice(0, paren).trim();
  const sp = lastTopSpace(head);
  if (sp === -1) {
    // constructor: no return type
    if (head === type.name || head === type.simple) return { kind: "ctor", params, mods };
    return null;
  }
  return {
    kind: "method",
    ret: head.slice(0, sp).trim(),
    name: head.slice(sp + 1).trim(),
    params,
    mods,
    throws: throwsList,
  };
}

/** javap -constants renders literals as Java source: 1, -1L, 0x10, "s", 'c', 1.5f. */
function parseConstant(v) {
  if (/^".*"$/s.test(v)) return JSON.parse(v.replace(/\n/g, "\\n"));
  if (/^'.*'$/s.test(v)) return v.slice(1, -1);
  if (v === "true" || v === "false") return v === "true";
  const num = v.replace(/[lLfFdD]$/, "");
  const n = num.startsWith("0x") || num.startsWith("-0x") ? Number(num) : Number(num);
  return Number.isNaN(n) ? v : n;
}

/** Index of the last space at generic-depth 0. */
function lastTopSpace(s) {
  let depth = 0, idx = -1;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    else if (ch === " " && depth === 0) idx = i;
  }
  return idx;
}

function matchParen(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") { depth--; if (depth === 0) return i; }
  }
  return s.length;
}

// -------------------------------------------------------------- javadoc parse

const decode = (s) =>
  s.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ").trim();

/**
 * Scrape one javadoc class page into { className, doc, methods: [...] }.
 * The 2024 javadoc uses package `com.TOP.*`; the 2025 jar uses `com.topwise.*`.
 */
function parseJavadocPage(html) {
  const titleM = html.match(/<h2[^>]*class="title">\s*(?:Interface|Class|Enum|Annotation Type)\s+([^<]+)<\/h2>/);
  const pkgM = html.match(/<div class="subTitle">([\s\S]*?)<\/div>/);
  if (!titleM || !pkgM) return null;
  const simple = decode(titleM[1]).replace(/<.*/, "").trim();
  const pkg = decode(pkgM[1]);
  if (!pkg || !/^[\w.]+$/.test(pkg)) return null;
  const className = normPkg(`${pkg}.${simple.replace(/\./g, "$")}`);

  const methods = [];
  // Detail blocks: <a name="sig"> ... <h4>name</h4><pre>SIG</pre><div class="block">DOC</div><dl>...</dl>
  // The anchor must contain "-" (the signature separator) so nav anchors like
  // <a name="method.detail"> don't swallow the first real method block.
  const re = /<a name="([^"]*-[^"]*)">[\s\S]*?<h4>([^<]+)<\/h4>\s*<pre>([\s\S]*?)<\/pre>([\s\S]*?)(?=<a name="|<\/ul>\s*<\/li>\s*<\/ul>\s*<\/section|$)/g;
  let m;
  while ((m = re.exec(html))) {
    const [, anchor, name, sigHtml, tail] = m;
    const sig = decode(sigHtml);
    const paramNames = extractParamNames(sig);
    const descM = tail.match(/<div class="block">([\s\S]*?)<\/div>/);
    const params = {};
    const pRe = /<dd><code>(\w+)<\/code>\s*-\s*([\s\S]*?)<\/dd>/g;
    let p;
    const paramsSection = sliceSection(tail, "paramLabel");
    while ((p = pRe.exec(paramsSection))) params[p[1]] = decode(p[2]);
    const retSection = sliceSection(tail, "returnLabel");
    const retM = retSection.match(/<dd>([\s\S]*?)<\/dd>/);
    methods.push({
      name: name.trim(),
      anchor,
      arity: paramNames.length,
      paramNames,
      doc: descM ? decode(descM[1]) : "",
      params,
      returns: retM ? decode(retM[1]) : "",
      deprecated: /Deprecated/.test(tail.slice(0, 400)),
    });
  }

  const classDocM = html.match(/<div class="description">[\s\S]*?<div class="block">([\s\S]*?)<\/div>/);
  return { className, doc: classDocM ? decode(classDocM[1]) : "", methods };
}

/** Grab the <dd> run that follows a given <dt><span class="X"> label. */
function sliceSection(tail, label) {
  const i = tail.indexOf(`class="${label}"`);
  if (i === -1) return "";
  const rest = tail.slice(i);
  const end = rest.search(/<dt>/);
  return end === -1 ? rest : rest.slice(0, end);
}

/** `int printBuf(byte[] data)` -> ["data"] */
function extractParamNames(sig) {
  const open = sig.indexOf("(");
  if (open === -1) return [];
  const close = matchParen(sig, open);
  const inner = sig.slice(open + 1, close).trim();
  if (!inner) return [];
  return splitTop(inner).map((p, i) => {
    const sp = lastTopSpace(p);
    return sp === -1 ? `arg${i}` : p.slice(sp + 1).trim();
  });
}

const normPkg = (s) => s.replace(/\bcom\.TOP\./g, "com.topwise.");

/** Simple name of a possibly-qualified, possibly-generic, possibly-array type. */
const simpleOf = (t) =>
  t.replace(/<.*/, "").replace(/\[\]/g, "").replace(/:A/g, "").split(/[.$]/).pop();

// ------------------------------------------------------------------ main

function run() {
  const jarArg = process.argv[2];
  const jar = jarArg ?? walk(VENDOR, (p) => p.endsWith(".jar")).sort().pop();
  if (!jar || !existsSync(jar)) throw new Error(`SDK jar not found under ${VENDOR}`);

  const work = mkdtempSync(join(tmpdir(), "topwise-"));
  const classDir = join(work, "classes");
  execFileSync("unzip", ["-qo", jar, "-d", classDir]);

  const classNames = walk(classDir, (p) => p.endsWith(".class"))
    .map((p) => relative(classDir, p).replace(/\.class$/, "").replace(/\//g, "."))
    // Drop AIDL plumbing and anonymous/synthetic classes: we regenerate the
    // client side ourselves and never touch Stub/Proxy internals.
    .filter((n) => !/\$Stub($|\$)/.test(n) && !/\$\d+$/.test(n))
    .sort();

  // javap in chunks to stay under ARG_MAX.
  let out = "";
  for (let i = 0; i < classNames.length; i += 100) {
    out += execFileSync("javap", ["-classpath", classDir, "-p", "-constants", ...classNames.slice(i, i + 100)],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  }
  const parsed = parseJavap(out);

  // ---- javadoc (optional enrichment) ----
  const docs = new Map();
  const docZip = walk(VENDOR, (p) => /Doc.*\.zip$/i.test(p))[0];
  if (docZip) {
    const docDir = join(work, "doc");
    execFileSync("unzip", ["-qo", docZip, "-d", docDir]);
    for (const f of walk(docDir, (p) => p.endsWith(".html"))) {
      if (/index|package-|overview|allclasses|help-doc|deprecated|constant-values|serialized/.test(f)) continue;
      let page;
      try { page = parseJavadocPage(readFileSync(f, "utf8")); } catch { continue; }
      if (page) docs.set(page.className, page);
    }
  }

  // ---- merge docs into signatures ----
  let matched = 0, total = 0;
  for (const type of parsed) {
    const page = docs.get(type.name);
    if (page) type.doc = page.doc;
    for (const meth of type.methods) {
      total++;
      if (!page) continue;
      const cands = page.methods.filter((d) => d.name === meth.name && d.arity === meth.params.length);
      const best = cands.length === 1 ? cands[0] : cands.find((d) =>
        d.anchor.split("-").slice(1, -1).every((t, i) =>
          meth.params[i] !== undefined && simpleOf(t) === simpleOf(meth.params[i])));
      if (!best) continue;
      matched++;
      meth.doc = best.doc;
      meth.deprecated = best.deprecated;
      meth.returnDoc = best.returns;
      meth.paramNames = best.paramNames;
      meth.paramDocs = best.paramNames.map((n) => best.params[n] ?? "");
    }
  }

  // ---- modules: DeviceServiceManager getters are the only way in ----
  const dsm = parsed.find((t) => t.name.endsWith("service.DeviceServiceManager"));
  if (!dsm) throw new Error("DeviceServiceManager not found in jar");
  const modules = dsm.methods
    .filter((m) => m.mods.includes("public") && /^get/.test(m.name) &&
      m.ret.startsWith("com.topwise.cloudpos.aidl.") && m.name !== "getInstance")
    .map((m) => {
      const iface = m.ret.split(".").pop().replace(/^Aidl/, "");
      return {
        name: MODULE_ALIASES[iface] ?? lowerFirst(iface),
        getter: m.name,
        iface: m.ret,
        params: m.params,
      };
    });

  const api = {
    jar: relative(ROOT, jar),
    generatedFrom: { javap: true, javadoc: docZip ? relative(ROOT, docZip) : null },
    docCoverage: `${matched}/${total}`,
    modules,
    types: Object.fromEntries(parsed.map((t) => [t.name, t])),
  };
  writeFileSync(join(ROOT, "api.json"), JSON.stringify(api, null, 2));
  rmSync(work, { recursive: true, force: true });

  console.log(`jar        : ${api.jar}`);
  console.log(`classes    : ${parsed.length}`);
  console.log(`modules    : ${modules.length}`);
  console.log(`doc'd meths: ${matched}/${total}`);
}

// lowerFirst() mangles leading acronyms (AidlTM -> "tM"). Name these by hand.
const MODULE_ALIASES = {
  TM: "tms",
  ICCard: "icCard",
  RFCard: "rfCard",
  CPUCard: "cpuCard",
  PM: "packageManager",
  MQTT: "mqtt",
  KeyLoadDown: "keyLoadDown",
  DecoderManager: "decoder",
  CameraScanCode: "camera",
};

const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

run();
