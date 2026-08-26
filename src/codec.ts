/**
 * Wire codec between the TS layer and the Kotlin bridge.
 *
 * The Kotlin side coerces arguments using the *declared* Java parameter types,
 * so most values cross as plain JSON. Only values JSON cannot express are
 * tagged, and they are tagged symmetrically in both directions so that nested
 * positions (a `List<byte[]>`, a field of a parcelable) work without the
 * caller having to describe the shape.
 *
 *   byte[]            <->  { "__b64": "<base64>" }
 *   android Bitmap    <->  { "__bmp": "<base64 PNG>" }
 *   listener/callback  ->  { "__cb": "<callback id>" }
 */

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/** Base64-encode without depending on `btoa`, which RN does not guarantee. */
export function toBase64(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]!;
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];
    out += B64[b0 >> 2];
    out += B64[((b0 & 3) << 4) | ((b1 ?? 0) >> 4)];
    out += b1 === undefined ? "=" : B64[((b1 & 15) << 2) | ((b2 ?? 0) >> 6)];
    out += b2 === undefined ? "=" : B64[b2 & 63];
  }
  return out;
}

const B64_INDEX = /* @__PURE__ */ (() => {
  const m = new Int16Array(128).fill(-1);
  for (let i = 0; i < B64.length; i++) m[B64.charCodeAt(i)] = i;
  return m;
})();

/** Base64-decode without depending on `atob`. Ignores whitespace and padding. */
export function fromBase64(s: string): Uint8Array {
  // Count real base64 chars first so we can allocate exactly once.
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 128 && B64_INDEX[c]! >= 0) n++;
  }
  const out = new Uint8Array((n * 3) >> 2);
  let acc = 0, bits = 0, o = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    const v = c < 128 ? B64_INDEX[c]! : -1;
    if (v < 0) continue;
    acc = (acc << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[o++] = (acc >> bits) & 0xff;
    }
  }
  return out;
}

/** An Android `Bitmap` as it crosses the bridge: a base64-encoded PNG. */
export interface Bitmap {
  readonly _tag: "Bitmap";
  readonly base64: string;
}

export const Bitmap = {
  /** Wrap a base64 PNG (no data: prefix) for passing to a printer/display call. */
  fromBase64: (base64: string): Bitmap => ({ _tag: "Bitmap", base64 }),
  fromBytes: (png: Uint8Array): Bitmap => ({ _tag: "Bitmap", base64: toBase64(png) }),
  toBytes: (b: Bitmap): Uint8Array => fromBase64(b.base64),
};

const isBitmap = (v: object): v is Bitmap =>
  (v as { _tag?: unknown })._tag === "Bitmap" && typeof (v as Bitmap).base64 === "string";

/** Marker used by generated code to reserve the listener slot in an arg list. */
export const CALLBACK_SLOT = Symbol.for("topwise/callbackSlot");

/** Encode a JS value into the JSON shape the Kotlin bridge expects. */
export function encode(
  value: unknown,
  callbackId?: string,
  callbackExtra?: Readonly<Record<string, unknown>>,
): unknown {
  if (value === null || value === undefined) return null;
  if (value === CALLBACK_SLOT) {
    if (callbackId === undefined) throw new Error("callback slot used without a callback id");
    return { __cb: callbackId, ...callbackExtra };
  }
  if (typeof value === "bigint") return Number(value);
  if (value instanceof Uint8Array) return { __b64: toBase64(value) };
  if (ArrayBuffer.isView(value)) {
    const v = value as ArrayBufferView;
    return { __b64: toBase64(new Uint8Array(v.buffer, v.byteOffset, v.byteLength)) };
  }
  if (Array.isArray(value)) return value.map((v) => encode(v, callbackId, callbackExtra));
  if (typeof value === "object") {
    if (isBitmap(value)) return { __bmp: value.base64 };
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = encode(v, callbackId, callbackExtra);
    }
    return out;
  }
  return value;
}

/** Revive tagged values coming back from Kotlin. */
export function decode(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(decode);
  const obj = value as Record<string, unknown>;
  if (typeof obj["__b64"] === "string") return fromBase64(obj["__b64"]);
  if (typeof obj["__bmp"] === "string") return Bitmap.fromBase64(obj["__bmp"]);
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[k] = decode(v);
  return out;
}

/**
 * Input counterpart of a generated data type: every field optional and
 * writable. Java has no notion of a required field on these POJOs — the bridge
 * constructs them with the no-arg constructor and applies the setters present.
 */
export type Input<T> = { -readonly [K in keyof T]?: T[K] | undefined };
