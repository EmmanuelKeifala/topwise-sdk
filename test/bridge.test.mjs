import assert from "node:assert/strict";
import test from "node:test";
import { Effect, Stream } from "effect";
import {
  Bitmap, CALLBACK_SLOT, fromBase64, toBase64, TopwiseError, layer, ready, printer, checkCard,
} from "../dist/index.js";
import { encode, decode } from "../dist/codec.js";

// ---------------------------------------------------------------- fake native

/**
 * Stands in for the Kotlin module: records what crossed the bridge and replies
 * with the same envelopes TopwiseBridgeModule produces.
 */
function fakeNative(handlers = {}) {
  const calls = [];
  let emit = () => {};
  const released = [];
  const replies = [];
  const native = {
    async invoke(module, index, method, argsJson) {
      const args = JSON.parse(argsJson);
      calls.push({ module, index, method, args });
      const handler = handlers[`${module}.${method}`];
      if (handler === undefined) return JSON.stringify({ ok: true, value: null });
      return JSON.stringify(handler(args, { emit: (...a) => emit(...a) }));
    },
    async ready() {
      return JSON.stringify({ ok: true, value: null });
    },
    async respond(replyId, value) {
      replies.push({ replyId, value });
    },
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
      return () => { emit = () => {}; };
    },
  };
  return { native, events, calls, released, replies, layer: layer(native, events) };
}

const run = (fake, program) => Effect.runPromise(Effect.scoped(program.pipe(Effect.provide(fake.layer))));

// -------------------------------------------------------------------- codec

test("base64 round-trips at every padding offset", () => {
  for (let n = 0; n < 130; n++) {
    const bytes = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) & 0xff);
    assert.deepEqual(fromBase64(toBase64(bytes)), bytes, `length ${n}`);
  }
  // Known vector, so a symmetric bug in both directions still fails.
  assert.equal(toBase64(new Uint8Array([77, 97, 110])), "TWFu");
  assert.equal(toBase64(new Uint8Array([77, 97])), "TWE=");
  assert.deepEqual(fromBase64("TWFu"), new Uint8Array([77, 97, 110]));
});

test("encode tags only what JSON cannot express", () => {
  assert.deepEqual(encode({ n: 1, s: "x", b: true, nil: null }), { n: 1, s: "x", b: true, nil: null });
  assert.deepEqual(encode(new Uint8Array([1, 2])), { __b64: "AQI=" });
  assert.deepEqual(encode(Bitmap.fromBase64("QQ==")), { __bmp: "QQ==" });
  assert.deepEqual(encode(CALLBACK_SLOT, "cb7"), { __cb: "cb7" });
  // Nested positions matter: a List<byte[]> field must survive.
  assert.deepEqual(encode({ tracks: [new Uint8Array([255])] }), { tracks: [{ __b64: "/w==" }] });
});

test("encode rejects a callback slot with no id", () => {
  assert.throws(() => encode(CALLBACK_SLOT), /callback slot/);
});

test("decode revives tagged values wherever they sit", () => {
  const revived = decode({ a: { __b64: "AQI=" }, b: [{ __bmp: "QQ==" }], c: { d: 5 } });
  assert.deepEqual(revived.a, new Uint8Array([1, 2]));
  assert.deepEqual(revived.b[0], Bitmap.fromBase64("QQ=="));
  assert.deepEqual(revived.c, { d: 5 });
});

// ------------------------------------------------------------------- bridge

test("a plain call carries module, index and decoded result", async () => {
  const fake = fakeNative({ "printer.getPrinterState": () => ({ ok: true, value: 3 }) });
  assert.equal(await run(fake, printer.getPrinterState()), 3);
  assert.deepEqual(fake.calls[0], { module: "printer", index: -1, method: "getPrinterState", args: [] });
});

test("indexed modules pass their slot through", async () => {
  const fake = fakeNative();
  const { pinpad } = await import("../dist/index.js");
  await run(fake, pinpad(1).getRandom());
  assert.equal(fake.calls[0].index, 1);
});

test("a failure envelope becomes a typed TopwiseError, not a defect", async () => {
  const fake = fakeNative({
    "printer.getPrinterState": () => ({ ok: false, code: "NOT_BOUND", message: "service not bound" }),
  });
  const exit = await Effect.runPromise(
    Effect.scoped(printer.getPrinterState().pipe(Effect.provide(fake.layer), Effect.flip)),
  );
  assert.ok(exit instanceof TopwiseError);
  assert.equal(exit.code, "NOT_BOUND");
  assert.equal(exit.module, "printer");
  assert.match(String(exit), /NOT_BOUND.*printer\.getPrinterState/);
});

test("byte arguments reach native base64-tagged", async () => {
  const fake = fakeNative({ "printer.printBuf": () => ({ ok: true, value: 0 }) });
  await run(fake, printer.printBuf(new Uint8Array([0x1b, 0x40])));
  assert.deepEqual(fake.calls[0].args, [{ __b64: "G0A=" }]);
});

test("ready() surfaces a bind timeout", async () => {
  const fake = fakeNative();
  fake.native.ready = async () =>
    JSON.stringify({ ok: false, code: "NOT_BOUND", message: "did not bind within 5000ms" });
  const err = await Effect.runPromise(
    Effect.scoped(ready(5000).pipe(Effect.provide(fake.layer), Effect.flip)),
  );
  assert.equal(err.code, "NOT_BOUND");
});

// ------------------------------------------------------------------ streams

test("listener callbacks arrive as named, tagged events", async () => {
  const fake = fakeNative({
    "checkCard.checkCard": (args, { emit }) => {
      // The listener slot is replaced by a callback id before native sees it.
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      assert.ok(slot, "callback slot was not filled in");
      setTimeout(() => {
        emit(slot.__cb, "onFindMagCard", [{ cardno: "4111", secondTrackData: null }]);
        emit(slot.__cb, "onTimeout", []);
      }, 0);
      return { ok: true, value: null };
    },
  });

  const events = await run(
    fake,
    checkCard
      .checkCard(true, true, true, 30)
      .pipe(Stream.takeUntil((e) => e._tag === "onTimeout"), Stream.runCollect, Effect.map(Array.from)),
  );

  assert.deepEqual(events, [
    { _tag: "onFindMagCard", data: { cardno: "4111", secondTrackData: null } },
    { _tag: "onTimeout" },
  ]);
});

test("the listener is released when the scope closes", async () => {
  const fake = fakeNative({
    "checkCard.checkCard": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      setTimeout(() => emit(slot.__cb, "onCanceled", []), 0);
      return { ok: true, value: null };
    },
  });

  await run(
    fake,
    checkCard
      .checkCard(true, true, true, 30)
      .pipe(Stream.takeUntil((e) => e._tag === "onCanceled"), Stream.runDrain),
  );

  assert.equal(fake.released.length, 1, "callback id was never released");
});

test("events for an unknown listener method still surface positionally", async () => {
  const fake = fakeNative({
    "checkCard.checkCard": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      setTimeout(() => emit(slot.__cb, "onSomethingNewInTheJar", [7]), 0);
      return { ok: true, value: null };
    },
  });

  const [event] = await run(
    fake,
    checkCard
      .checkCard(true, true, true, 30)
      .pipe(Stream.take(1), Stream.runCollect, Effect.map(Array.from)),
  );
  assert.deepEqual(event, { _tag: "onSomethingNewInTheJar", args: [7] });
});

// ----------------------------------------------------------- kernel handlers

test("a kernel callback is answered with the handler's value", async () => {
  const { emvL2 } = await import("../dist/index.js");
  let answered;
  const fake = fakeNative({
    "emvL2.EMV_SetCallback": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      // The kernel's timeout and fallback ride along with the registration.
      assert.equal(slot.replyTimeoutMs, 30000);
      assert.equal(slot.replyFallback, 0);
      setTimeout(() => {
        emit(slot.__cb, "cDisplayPinVerifyStatus", [2], "reply-1");
      }, 0);
      return { ok: true, value: 0 };
    },
  });

  await Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        yield* emvL2.EMV_SetCallback(stubHandlers({
          cDisplayPinVerifyStatus: ({ ucRetryTimes }) => {
            answered = ucRetryTimes;
            return Effect.succeed(77);
          },
        }));
        yield* Effect.sleep("50 millis");
      }).pipe(Effect.provide(fake.layer)),
    ),
  );

  assert.equal(answered, 2, "handler did not receive the named argument");
  assert.deepEqual(fake.replies, [{ replyId: "reply-1", value: 77 }]);
});

test("a handler that dies still unblocks the kernel, with the fallback", async () => {
  const { emvL2 } = await import("../dist/index.js");
  const fake = fakeNative({
    "emvL2.EMV_SetCallback": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      assert.equal(slot.replyFallback, -1);
      setTimeout(() => emit(slot.__cb, "cRFU1", [], "reply-9"), 0);
      return { ok: true, value: 0 };
    },
  });

  await Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        yield* emvL2.EMV_SetCallback(
          stubHandlers({ cRFU1: () => Effect.die(new Error("boom")) }),
          { fallback: -1 },
        );
        yield* Effect.sleep("50 millis");
      }).pipe(Effect.provide(fake.layer)),
    ),
  );

  assert.deepEqual(fake.replies, [{ replyId: "reply-9", value: -1 }]);
});

/** Fill in the EmvCallback methods the test does not care about. */
function stubHandlers(overrides) {
  const names = [
    "cGetOnlinePin", "cGetPlainTextPin", "cDisplayPinVerifyStatus", "cCheckCredentials",
    "cIssuerReferral", "cGetTransLogAmount", "cCheckExceptionFile",
    "cRFU1", "cRFU2", "cRFU3", "cRFU4",
  ];
  return Object.fromEntries(names.map((n) => [n, overrides[n] ?? (() => Effect.succeed(0))]));
}

// ------------------------------------------------------------------ handles

test("an interface handed back as a binder becomes a callable handle", async () => {
  const { pedestal, pedestalSerialManagerAt, serialportAt } = await import("../dist/index.js");
  const fake = fakeNative({
    "pedestal.getSerialManager": () => ({
      ok: true,
      value: { __handle: "@h1", iface: "com.topwise.cloudpos.aidl.pedestal.AidlPedestalSerialManager" },
    }),
    "@h1.getCount": () => ({ ok: true, value: 2 }),
    "@h1.getSerialport": () => ({
      ok: true,
      value: { __handle: "@h2", iface: "com.topwise.cloudpos.aidl.serialport.AidlSerialport" },
    }),
    "@h2.open": () => ({ ok: true, value: true }),
  });

  const opened = await run(
    fake,
    Effect.gen(function* () {
      const mgr = yield* pedestal.getSerialManager();
      assert.equal(mgr.__handle, "@h1");
      assert.equal(yield* pedestalSerialManagerAt(mgr).getCount(), 2);
      const port = yield* pedestalSerialManagerAt(mgr).getSerialport("ttyS1");
      return yield* serialportAt(port).open();
    }),
  );

  assert.equal(opened, true);
  // The handle, not a module name, is the call target for the chained calls.
  assert.deepEqual(
    fake.calls.map((c) => c.module),
    ["pedestal", "@h1", "@h1", "@h2"],
  );
});

test("releaseHandle reaches the native side", async () => {
  const { releaseHandle } = await import("../dist/index.js");
  const fake = fakeNative();
  await run(fake, releaseHandle({ __handle: "@h7", iface: "x" }));
  assert.deepEqual(fake.released, ["@h7"]);
});

// ------------------------------------------------------- platform value types

test("ContentValues and ComponentName cross as plain objects", async () => {
  const { system } = await import("../dist/index.js");
  const fake = fakeNative({
    "system.apnUpdate": () => ({ ok: true, value: 1 }),
    "system.getCameraDisabled": () => ({ ok: true, value: false }),
  });
  await run(fake, system.apnUpdate("3", { apn: "internet", mcc: 234, roaming: true }));
  assert.deepEqual(fake.calls[0].args, ["3", { apn: "internet", mcc: 234, roaming: true }]);

  await run(fake, system.getCameraDisabled({ packageName: "com.x", className: "com.x.Admin" }));
  assert.deepEqual(fake.calls[1].args, [{ packageName: "com.x", className: "com.x.Admin" }]);
});

test("a certificate comes back with its DER revived to bytes", async () => {
  const { packageManager } = await import("../dist/index.js");
  const fake = fakeNative({
    "packageManager.getCustomerKey": () => ({
      ok: true,
      value: {
        mX509Certificate: {
          der: { __b64: "AQID" },
          subject: "CN=Topwise",
          issuer: "CN=Topwise CA",
          serialNumber: "1461501637330902918203684832716283019655932542975",
          notBefore: "2024-01-01T00:00:00Z",
          notAfter: "2034-01-01T00:00:00Z",
        },
      },
    }),
  });
  const info = await run(fake, packageManager.getCustomerKey());
  assert.deepEqual(info.mX509Certificate.der, new Uint8Array([1, 2, 3]));
  // Serials outrun a double, so they stay strings end to end.
  assert.equal(typeof info.mX509Certificate.serialNumber, "string");
});

test("a file argument crosses as a path, not a descriptor", async () => {
  const { decoder } = await import("../dist/index.js");
  const fake = fakeNative({ "decoder.decodeByBigData": () => ({ ok: true, value: "1234567890" }) });
  await run(fake, decoder.decodeByBigData({ path: "/sdcard/scan.raw", mode: "r" }, 640, 480));
  assert.deepEqual(fake.calls[0].args, [{ path: "/sdcard/scan.raw", mode: "r" }, 640, 480]);
});

test("key events reach JS as a stream", async () => {
  const { system } = await import("../dist/index.js");
  const fake = fakeNative({
    "system.setPosKeyListener": (args, { emit }) => {
      const slot = args.find((a) => a && typeof a === "object" && "__cb" in a);
      setTimeout(() => emit(slot.__cb, "dispatchKeyEvent", [{ keyCode: 66, action: 0 }]), 0);
      return { ok: true, value: null };
    },
  });
  const [event] = await run(
    fake,
    system.setPosKeyListener().pipe(Stream.take(1), Stream.runCollect, Effect.map(Array.from)),
  );
  assert.equal(event._tag, "dispatchKeyEvent");
  assert.equal(event.keyEvent.keyCode, 66);
});

// ------------------------------------------------------------ print template

test("each PrintTemplate overload maps to its own native method", async () => {
  const { printTemplate } = await import("../dist/index.js");
  const fake = fakeNative({ "printTemplate.getPrintBitmap": () => ({ ok: true, value: { __bmp: "QQ==" } }) });

  const bitmap = await run(
    fake,
    Effect.gen(function* () {
      yield* printTemplate.init();
      yield* printTemplate.addText({ text: "ACME", fontSize: 28, align: "CENTER" });
      yield* printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" });
      yield* printTemplate.addColumns3(1, { text: "a" }, 1, { text: "b" }, 1, { text: "c" });
      yield* printTemplate.addImage({ width: 100, height: 50 });
      yield* printTemplate.addTextsThenImage([{ text: "x" }], { width: 10, height: 10 });
      yield* printTemplate.addImageThenTexts({ width: 10, height: 10 }, [{ text: "y" }]);
      return yield* printTemplate.getPrintBitmap();
    }),
  );

  // add(TextUnit) and add(ImageUnit) are both arity one in Java; they must not
  // collapse onto the same native method name.
  assert.deepEqual(
    fake.calls.map((c) => c.method),
    ["init", "addText", "addColumns2", "addColumns3", "addImage",
     "addTextsThenImage", "addImageThenTexts", "getPrintBitmap"],
  );
  assert.equal(fake.calls.every((c) => c.module === "printTemplate"), true);
  assert.deepEqual(bitmap, Bitmap.fromBase64("QQ=="));

  // Enum values cross as their Java names, and the align enum is shared.
  assert.deepEqual(fake.calls[1].args, [{ text: "ACME", fontSize: 28, align: "CENTER" }]);
});

test("a session clears the shared buffer before and after", async () => {
  const { printTemplate } = await import("../dist/index.js");
  const fake = fakeNative();
  await run(fake, printTemplate.session(printTemplate.addText({ text: "hi" })));
  assert.deepEqual(fake.calls.map((c) => c.method), ["clear", "addText", "clear"]);
});

test("a failed session still clears, so rows cannot leak into the next receipt", async () => {
  const { printTemplate } = await import("../dist/index.js");
  const fake = fakeNative();
  const result = await Effect.runPromise(
    Effect.scoped(
      printTemplate
        .session(
          Effect.gen(function* () {
            yield* printTemplate.addText({ text: "half a receipt" });
            return yield* Effect.fail("printer jammed");
          }),
        )
        .pipe(Effect.provide(fake.layer), Effect.flip),
    ),
  );
  assert.equal(result, "printer jammed");
  assert.deepEqual(fake.calls.map((c) => c.method), ["clear", "addText", "clear"]);
});

test("concurrent sessions do not interleave into one garbled page", async () => {
  const { printTemplate } = await import("../dist/index.js");
  const fake = fakeNative();

  const receipt = (name) =>
    printTemplate.session(
      Effect.gen(function* () {
        yield* printTemplate.addText({ text: `${name}-1` });
        yield* Effect.sleep("10 millis");
        yield* printTemplate.addText({ text: `${name}-2` });
      }),
    );

  await run(fake, Effect.all([receipt("A"), receipt("B")], { concurrency: 2 }));

  const texts = fake.calls.filter((c) => c.method === "addText").map((c) => c.args[0].text);
  // Whichever ran first, its two rows must be adjacent.
  assert.ok(
    texts.join(",") === "A-1,A-2,B-1,B-2" || texts.join(",") === "B-1,B-2,A-1,A-2",
    `rows interleaved: ${texts.join(",")}`,
  );
});

// -------------------------------------------------------------- out-parameters

test("a mutated out-parameter comes back as `out`, not silently dropped", async () => {
  const { keyManager } = await import("../dist/index.js");
  const fake = fakeNative({
    // The Java call returns int for status and writes the KCV into the holder.
    "keyManager.getKeyKCV": () => ({
      ok: true,
      value: 0,
      out: { "3": { data: { __b64: "q80=" }, dataLen: 2 } },
    }),
  });

  const { result, out } = await run(
    fake,
    keyManager.getKeyKCV("KEY_TYPE_TMK", 1, "KCV_VERIFY_MODE_NONE", {}),
  );

  assert.equal(result, 0);
  assert.deepEqual(out.kcvBytesTypeValue.data, new Uint8Array([0xab, 0xcd]));
  assert.equal(out.kcvBytesTypeValue.dataLen, 2);
});

test("a call with no out-parameters still returns the plain value", async () => {
  const { printer } = await import("../dist/index.js");
  const fake = fakeNative({ "printer.getPrinterState": () => ({ ok: true, value: 0 }) });
  assert.equal(await run(fake, printer.getPrinterState()), 0);
});
