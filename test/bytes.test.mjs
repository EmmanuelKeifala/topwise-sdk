import assert from "node:assert/strict";
import test from "node:test";
import {
  add, bytes2HexString, bytes2Int, byte2HexString, hexString2Bytes, int2Bytes,
  merge, subBytes, tlv, tlvToHex, TlvList,
} from "../dist/index.js";

test("hex conversion round-trips and is uppercase", () => {
  assert.equal(bytes2HexString(new Uint8Array([0x00, 0x0f, 0xa5, 0xff])), "000FA5FF");
  assert.equal(byte2HexString(0x0a), "0A");
  assert.deepEqual(hexString2Bytes("000fa5FF"), new Uint8Array([0, 15, 165, 255]));
  assert.deepEqual(hexString2Bytes("9F 26 08"), new Uint8Array([0x9f, 0x26, 0x08]));
  assert.deepEqual(hexString2Bytes(""), new Uint8Array([]));
});

test("an odd-length hex string is an error, not a silent pad", () => {
  assert.throws(() => hexString2Bytes("ABC"), /odd length/);
  assert.throws(() => hexString2Bytes("ZZ"), /not a hex digit/);
});

test("byte helpers", () => {
  assert.deepEqual(subBytes(new Uint8Array([1, 2, 3, 4, 5]), 1, 3), new Uint8Array([2, 3, 4]));
  assert.deepEqual(merge(new Uint8Array([1]), new Uint8Array([2, 3])), new Uint8Array([1, 2, 3]));
  assert.deepEqual(merge(), new Uint8Array([]));
  assert.deepEqual(add(new Uint8Array([1]), 0x1ff), new Uint8Array([1, 0xff]));
});

test("int conversion is explicit about byte order", () => {
  assert.deepEqual(int2Bytes(0x01020304), new Uint8Array([1, 2, 3, 4]));
  assert.deepEqual(int2Bytes(0x01020304, false), new Uint8Array([4, 3, 2, 1]));
  assert.equal(bytes2Int(new Uint8Array([1, 2, 3, 4])), 0x01020304);
  assert.equal(bytes2Int(new Uint8Array([0x12, 0x34])), 0x1234, "short input is left-padded");
  assert.equal(bytes2Int(int2Bytes(0xdeadbeef)), 0xdeadbeef, "unsigned round-trip");
});

// ------------------------------------------------------------------- BER-TLV

test("parses a single-byte tag", () => {
  const list = TlvList.fromHex("5A084111111111111111");
  assert.equal(list.size, 1);
  assert.deepEqual(list.getValue("5A"), hexString2Bytes("4111111111111111"));
  assert.equal(list.getTlv("5A").length, 8);
});

test("parses a multi-byte tag", () => {
  // 9F26 is a two-byte tag: 0x9F has its low five bits set, so the tag continues.
  const list = TlvList.fromHex("9F260812345678ABCDEF01");
  assert.equal(list.size, 1);
  assert.equal(list.getTlv("9F26").tag, "9F26");
  assert.deepEqual(list.getValue("9F26"), hexString2Bytes("12345678ABCDEF01"));
});

test("parses several elements and preserves order", () => {
  const list = TlvList.fromHex("5A08411111111111111182021C009F360200FF");
  assert.deepEqual(list.list().map((t) => t.tag), ["5A", "82", "9F36"]);
  assert.deepEqual(list.getValue("82"), hexString2Bytes("1C00"));
  assert.deepEqual(list.getValue("9F36"), hexString2Bytes("00FF"));
});

test("parses long-form lengths", () => {
  const payload = new Uint8Array(200).fill(0xab);
  // 0x81 says "one length byte follows"; 200 = 0xC8.
  const encoded = merge(hexString2Bytes("7081C8"), payload);
  const list = TlvList.fromBytes(encoded);
  assert.equal(list.getTlv("70").length, 200);
  assert.deepEqual(list.getValue("70"), payload);

  // 0x82 says "two length bytes follow".
  const big = new Uint8Array(300).fill(1);
  const encoded2 = merge(hexString2Bytes("7082012C"), big);
  assert.equal(TlvList.fromBytes(encoded2).getTlv("70").length, 300);
});

test("skips 00 and FF padding between elements", () => {
  const list = TlvList.fromHex("00FF5A02123400FF82021C00FF");
  assert.deepEqual(list.list().map((t) => t.tag), ["5A", "82"]);
});

test("round-trips through bytes and hex", () => {
  const hex = "5A08411111111111111182021C009F360200FF";
  assert.equal(TlvList.fromHex(hex).toHex(), hex);

  const built = new TlvList()
    .addTlv("5A", "4111111111111111")
    .addTlv("82", hexString2Bytes("1C00"))
    .addTlv("9F36", "00FF");
  assert.equal(built.toHex(), hex);
});

test("long-form lengths are re-encoded in long form", () => {
  const built = new TlvList().addTlv("70", new Uint8Array(200).fill(0xab));
  assert.equal(built.toHex().slice(0, 6), "7081C8");
  assert.equal(TlvList.fromHex(built.toHex()).getTlv("70").length, 200);
});

test("a repeated tag overwrites, matching the Java Map backing", () => {
  const list = new TlvList().addTlv("5A", "1111").addTlv("5A", "2222");
  assert.equal(list.size, 1);
  assert.deepEqual(list.getValue("5A"), hexString2Bytes("2222"));
});

test("truncated input fails loudly rather than returning a partial parse", () => {
  // Claims 8 bytes of value but supplies 2.
  assert.throws(() => TlvList.fromHex("5A081234"), /claims 8 bytes/);
  assert.throws(() => TlvList.fromHex("5A"), /no length byte/);
});

test("tag lookup is case-insensitive and length stays consistent", () => {
  const list = new TlvList().addTlv("9f26", "AABB");
  assert.equal(list.getTlv("9F26").tag, "9F26");
  assert.deepEqual(list.getValue("9f26"), hexString2Bytes("AABB"));
  assert.equal(tlvToHex(tlv("5A", "41411111")), "5A0441411111");
});
