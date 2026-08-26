/**
 * Pure-TypeScript mirrors of `com.topwise.cloudpos.struct.BytesUtil`,
 * `Tlv` and `TlvList`.
 *
 * These are pure functions over bytes, so they run in JS rather than crossing
 * the bridge - round-tripping to Kotlin to hex-encode a string, or to parse
 * the TLV blob an EMV kernel just returned, would be absurd. Being pure also
 * means they are the part of this SDK with real test coverage.
 */

const HEX = "0123456789ABCDEF";

/** `BytesUtil.bytes2HexString` */
export function bytes2HexString(bytes: Uint8Array): string {
  let out = "";
  for (const b of bytes) out += HEX[b >> 4]! + HEX[b & 0x0f]!;
  return out;
}

/** `BytesUtil.byte2HexString` */
export function byte2HexString(byte: number): string {
  const b = byte & 0xff;
  return HEX[b >> 4]! + HEX[b & 0x0f]!;
}

/** `BytesUtil.hex2byte` - the numeric value of one hex digit. */
export function hex2byte(char: string): number {
  const v = parseInt(char, 16);
  if (Number.isNaN(v)) throw new RangeError(`not a hex digit: ${JSON.stringify(char)}`);
  return v;
}

/**
 * `BytesUtil.hexString2Bytes`. Whitespace is ignored; an odd number of digits
 * is an error rather than a silent left-pad, because in this SDK a truncated
 * hex string is a bug in the caller, not an abbreviation.
 */
export function hexString2Bytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, "");
  if (clean.length % 2 !== 0) throw new RangeError(`hex string has an odd length: ${clean.length}`);
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    const hi = hex2byte(clean[i * 2]!);
    const lo = hex2byte(clean[i * 2 + 1]!);
    out[i] = (hi << 4) | lo;
  }
  return out;
}

/** `BytesUtil.subBytes` */
export function subBytes(bytes: Uint8Array, start: number, length: number): Uint8Array {
  return bytes.slice(start, start + length);
}

/** `BytesUtil.mergeBytes` / `BytesUtil.merge` */
export function merge(...parts: ReadonlyArray<Uint8Array>): Uint8Array {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

/** `BytesUtil.add` - append one byte. */
export function add(bytes: Uint8Array, byte: number): Uint8Array {
  const out = new Uint8Array(bytes.length + 1);
  out.set(bytes);
  out[bytes.length] = byte & 0xff;
  return out;
}

/**
 * Four-byte integer conversion.
 *
 * `BytesUtil.int2Bytes(int, boolean)` takes an unnamed boolean whose meaning
 * is not recoverable from the jar, so this names the parameter instead of
 * guessing at the vendor's convention - getting byte order silently wrong in a
 * payments SDK is worse than being explicit.
 */
export function int2Bytes(value: number, bigEndian = true): Uint8Array {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, value >>> 0, !bigEndian);
  return out;
}

/** Inverse of {@link int2Bytes}. */
export function bytes2Int(bytes: Uint8Array, bigEndian = true): number {
  const padded = new Uint8Array(4);
  padded.set(bytes.slice(0, 4), 4 - Math.min(bytes.length, 4));
  return new DataView(padded.buffer).getUint32(0, !bigEndian);
}

// ----------------------------------------------------------------- BER-TLV

/** `com.topwise.cloudpos.struct.Tlv` - one BER-TLV element. */
export interface Tlv {
  /** Uppercase hex, e.g. `"9F26"`. */
  readonly tag: string;
  /** Always `value.length`; carried because the Java class stores it. */
  readonly length: number;
  readonly value: Uint8Array;
}

/** Build a {@link Tlv}, keeping `length` consistent with `value`. */
export const tlv = (tag: string, value: Uint8Array | string): Tlv => {
  const bytes = typeof value === "string" ? hexString2Bytes(value) : value;
  return { tag: tag.toUpperCase(), length: bytes.length, value: bytes };
};

/** Serialise one element, tag + length + value. */
export function tlvToBytes(tlv: Tlv): Uint8Array {
  return merge(hexString2Bytes(tlv.tag), encodeLength(tlv.value.length), tlv.value);
}

export const tlvToHex = (tlv: Tlv): string => bytes2HexString(tlvToBytes(tlv));

function encodeLength(length: number): Uint8Array {
  if (length < 0x80) return Uint8Array.of(length);
  const bytes: Array<number> = [];
  for (let n = length; n > 0; n >>>= 8) bytes.unshift(n & 0xff);
  return Uint8Array.from([0x80 | bytes.length, ...bytes]);
}

/**
 * `com.topwise.cloudpos.struct.TlvList` - the tag-keyed collection EMV
 * kernels hand back, and expect back.
 *
 * Insertion order is preserved, and a repeated tag overwrites, matching the
 * Java class's `Map<String, Tlv>` backing.
 */
export class TlvList {
  private readonly items = new Map<string, Tlv>();

  static fromBytes(bytes: Uint8Array): TlvList {
    const list = new TlvList();
    let i = 0;
    while (i < bytes.length) {
      // Padding between elements is legal and common in EMV responses.
      if (bytes[i] === 0x00 || bytes[i] === 0xff) {
        i++;
        continue;
      }
      const tagStart = i;
      // A tag continues while the low 5 bits are all set, then while bit 8 is.
      if ((bytes[i]! & 0x1f) === 0x1f) {
        i++;
        while (i < bytes.length && (bytes[i]! & 0x80) !== 0) i++;
      }
      i++;
      if (i > bytes.length) throw new RangeError(`truncated TLV tag at offset ${tagStart}`);
      const tag = bytes2HexString(bytes.slice(tagStart, i));

      const first = bytes[i];
      if (first === undefined) throw new RangeError(`TLV ${tag} has no length byte`);
      i++;
      let length: number;
      if (first < 0x80) {
        length = first;
      } else {
        const n = first & 0x7f;
        if (n === 0 || i + n > bytes.length) throw new RangeError(`TLV ${tag} has a bad length`);
        length = 0;
        for (let k = 0; k < n; k++) length = (length << 8) | bytes[i + k]!;
        i += n;
      }
      if (i + length > bytes.length) {
        throw new RangeError(`TLV ${tag} claims ${length} bytes but only ${bytes.length - i} remain`);
      }
      list.addTlv(tag, bytes.slice(i, i + length));
      i += length;
    }
    return list;
  }

  static fromHex(hex: string): TlvList {
    return TlvList.fromBytes(hexString2Bytes(hex));
  }

  getBytes(): Uint8Array {
    return merge(...[...this.items.values()].map(tlvToBytes));
  }

  toHex(): string {
    return bytes2HexString(this.getBytes());
  }

  getTlv(tag: string): Tlv | undefined {
    return this.items.get(tag.toUpperCase());
  }

  /** Value of a tag, or `undefined` if absent. */
  getValue(tag: string): Uint8Array | undefined {
    return this.getTlv(tag)?.value;
  }

  addTlv(tag: string, value: Uint8Array | string): this {
    this.items.set(tag.toUpperCase(), tlv(tag, value));
    return this;
  }

  clear(): this {
    this.items.clear();
    return this;
  }

  get size(): number {
    return this.items.size;
  }

  list(): ReadonlyArray<Tlv> {
    return [...this.items.values()];
  }

  toString(): string {
    return this.list().map((t) => `${t.tag}=${bytes2HexString(t.value)}`).join(" ");
  }
}
