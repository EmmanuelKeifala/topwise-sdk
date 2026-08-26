import assert from "node:assert/strict";
import test from "node:test";
import { layer, makeTopwiseClient, TopwiseError } from "../dist/index.js";

/** Same fake native module the Effect tests use, minus the Effect plumbing. */
function fakeClient(handlers = {}) {
  const calls = [];
  const released = [];
  let emit = () => {};
  const native = {
    async invoke(module, index, method, argsJson) {
      const args = JSON.parse(argsJson);
      calls.push({ module, index, method, args });
      const h = handlers[`${module}.${method}`];
      return JSON.stringify(h ? h(args, { emit: (...a) => emit(...a) }) : { ok: true, value: null });
    },
    async ready() {
      return JSON.stringify({ ok: true, value: null });
    },
    async respond() {},
    async release(id) {
      released.push(id);
    },
    async releaseHandle(id) {
      released.push(id);
    },
  };
  const events = {
    subscribe(handler) {
      emit = (callbackId, method, args, replyId) => handler({ callbackId, method, args, replyId });
      return () => {
        emit = () => {};
      };
    },
  };
  return { client: makeTopwiseClient(layer(native, events)), calls, released };
}

test("a plain call resolves with the value", async () => {
  const { client, calls } = fakeClient({
    "printer.getPrinterState": () => ({ ok: true, value: 3 }),
  });
  assert.equal(await client.printer.getPrinterState(), 3);
  assert.deepEqual(calls[0], { module: "printer", index: -1, method: "getPrinterState", args: [] });
  await client.dispose();
});

test("ready() resolves without the caller touching Effect", async () => {
  const { client } = fakeClient();
  await client.ready(3000);
  await client.dispose();
});

test("a failure rejects with the TopwiseError itself, not a FiberFailure", async () => {
  const { client } = fakeClient({
    "printer.getPrinterState": () => ({ ok: false, code: "MODULE_UNAVAILABLE", message: "no printer" }),
  });
  await assert.rejects(
    () => client.printer.getPrinterState(),
    (err) => {
      assert.ok(err instanceof TopwiseError, `expected TopwiseError, got ${err?.constructor?.name}`);
      assert.equal(err.code, "MODULE_UNAVAILABLE");
      assert.equal(err.module, "printer");
      return true;
    },
  );
  await client.dispose();
});

test("indexed modules stay callable and return promises", async () => {
  const { client, calls } = fakeClient({
    "pinpad.getRandom": () => ({ ok: true, value: { __b64: "AQI=" } }),
  });
  const random = await client.pinpad(1).getRandom();
  assert.deepEqual(random, new Uint8Array([1, 2]));
  assert.equal(calls[0].index, 1);
  await client.dispose();
});

test("byte arguments still cross as base64", async () => {
  const { client, calls } = fakeClient({ "printer.printBuf": () => ({ ok: true, value: 0 }) });
  await client.printer.printBuf(new Uint8Array([0x1b, 0x40]));
  assert.deepEqual(calls[0].args, [{ __b64: "G0A=" }]);
  await client.dispose();
});

test("a listener call becomes a subscription with an unsubscribe", async () => {
  const { client, released } = fakeClient({
    "checkCard.checkCard": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      setTimeout(() => {
        emit(slot.__cb, "onFindMagCard", [{ cardno: "4111" }]);
        emit(slot.__cb, "onTimeout", []);
      }, 0);
      return { ok: true, value: null };
    },
  });

  const seen = [];
  const stop = client.checkCard.checkCard(true, true, true, 30, {
    onEvent: (e) => seen.push(e._tag),
  });
  assert.equal(typeof stop, "function");

  await new Promise((r) => setTimeout(r, 60));
  assert.deepEqual(seen, ["onFindMagCard", "onTimeout"]);

  stop();
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(released.length, 1, "unsubscribe did not release the listener");
  await client.dispose();
});

test("forgetting the handlers on a stream call fails loudly", async () => {
  const { client } = fakeClient();
  assert.throws(() => client.checkCard.checkCard(true, true, true, 30), /handlers object/);
  await client.dispose();
});

test("printTemplate.session takes an async builder", async () => {
  const { client, calls } = fakeClient({
    "printTemplate.getPrintBitmap": () => ({ ok: true, value: { __bmp: "QQ==" } }),
  });
  const bitmap = await client.printTemplate.session(async () => {
    await client.printTemplate.addText({ text: "hello" });
    return client.printTemplate.getPrintBitmap();
  });
  assert.equal(bitmap.base64, "QQ==");
  assert.deepEqual(
    calls.map((c) => c.method),
    ["clear", "addText", "getPrintBitmap", "clear"],
  );
  await client.dispose();
});

test("out-parameters survive the promise facade", async () => {
  const { client } = fakeClient({
    "keyManager.getKeyKCV": () => ({
      ok: true,
      value: 0,
      out: { "3": { data: { __b64: "q80=" }, dataLen: 2 } },
    }),
  });
  const { result, out } = await client.keyManager.getKeyKCV("KEY_TYPE_TMK", 1, "KCV_VERIFY_MODE_NONE", {});
  assert.equal(result, 0);
  assert.deepEqual(out.kcvBytesTypeValue.data, new Uint8Array([0xab, 0xcd]));
  await client.dispose();
});
