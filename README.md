# @slipstream/topwise-sdk

Effect-TS bindings for the Topwise T1/T3/T6 Android POS SDK, on React Native.
Usable without Effect too — see [Without Effect](#without-effect).

**760 of 760** AIDL methods across 39 device modules, generated from the vendor
jar and its javadoc. See [CODEGEN_REPORT.md](./CODEGEN_REPORT.md) for coverage
detail and [CONTRIBUTING.md](./CONTRIBUTING.md) for how generation works.

## Install

```sh
npm install @slipstream/topwise-sdk
```

Add `effect` yourself only if your own code imports it.

Then register the native package in `MainApplication.kt`:

```kotlin
import com.slipstream.topwise.TopwisePackage

override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply { add(TopwisePackage()) }
```

Rebuild the Android app — a Metro reload will not pick up a new native module.

The library manifest already declares the vendor's `CLOUDPOS_*` permissions.
They are signature-level: the terminal only grants them to an app the vendor
has signed or whitelisted, so an unsigned build fails at bind time rather than
at install time.

## Use

```ts
import { Effect, Stream } from "effect"
import { TopwiseBridgeLive } from "@slipstream/topwise-sdk/react-native"
import { ready, printer, checkCard, Constants } from "@slipstream/topwise-sdk"

const takePayment = Effect.gen(function* () {
  // DeviceServiceManager binds asynchronously; do this once at startup.
  yield* ready()

  const card = yield* checkCard
    .checkCard(true, true, true, 60)
    .pipe(
      Stream.takeUntil((e) => e._tag !== "onFindMagCard"),
      Stream.runHead,
    )

  const state = yield* printer.getPrinterState()
  if (state === Constants.PrinterConstantPrinterState.PRINTER_NOPAPER) {
    return yield* Effect.fail("out of paper" as const)
  }
  return card
})

Effect.runPromise(
  takePayment.pipe(Effect.scoped, Effect.provide(TopwiseBridgeLive)),
)
```

## Without Effect

Every binding returns an `Effect`, which is the right shape if you already run
Effect and an obstacle if you don't. `createTopwise()` gives you the same
bridge as promises and callbacks — no Effect in your code at all:

```ts
import { createTopwise } from "@slipstream/topwise-sdk/react-native"

const topwise = createTopwise()   // once, for the app's lifetime

await topwise.ready()
const state = await topwise.printer.getPrinterState()

// Listener methods take a handlers object and return an unsubscribe function.
const stop = topwise.checkCard.checkCard(true, true, true, 60, {
  onEvent: (event) => {
    if (event._tag === "onFindMagCard") console.log(event.data?.cardno)
  },
  onError: (error) => console.error(error),
})
// later
stop()
```

Printing reads the same way:

```ts
await topwise.printTemplate.init()

const bitmap = await topwise.printTemplate.session(async () => {
  await topwise.printTemplate.addText({ text: "ACME", fontSize: 30, align: "CENTER" })
  await topwise.printTemplate.addColumns2(3, { text: "Total" }, 1, { text: "4.50", align: "RIGHT" })
  return topwise.printTemplate.getPrintBitmap()
})

const stop = topwise.printer.printBmp(0, 384, 0, bitmap, {
  onEvent: (e) => { if (e._tag === "onPrintFinish") stop() },
})
```

Failures are thrown, not returned, so ordinary `try`/`catch` works — and what
you catch is the same `TopwiseError`, with its `code`, `module` and `method`
intact.

See [`example-plain/`](./example-plain) for a working app.

### Shapes you will meet

The shape a method returns follows what the underlying AIDL method does:

| AIDL method | Effect | `createTopwise()` |
| --- | --- | --- |
| plain call | `Effect<A>` | `Promise<A>` |
| listener, returns `void` | `Stream<Event>` | `(…, { onEvent }) => unsubscribe` |
| listener, returns a status | `Effect<{ result, events }>` | `Promise<{ result, events }>` |
| kernel callback (EMV L2) | `Effect<A>`, you pass handlers | same, as a promise |
| hands back another interface | `Effect<XRef>`, then `xAt(ref)` | same, as a promise |

Listener streams stay open until their scope closes, because the vendor never
marks a callback as terminal. Close them yourself:

```ts
printer.printText(items).pipe(
  Stream.takeUntil((e) => e._tag === "onPrintFinish" || e._tag === "onError"),
  Stream.runDrain,
)
```

### EMV kernel callbacks

`emvL2.EMV_SetCallback`, `paypass.setCallback` and `qpboc.setCallback` are not
notifications — the kernel *asks* the app a question and blocks the binder
thread on the answer. Those take a handler record, and every handler must
produce a value:

```ts
yield* emvL2.EMV_SetCallback(
  {
    cGetOnlinePin: ({ bAllowBypass, pPAN }) => promptForPin(pPAN, bAllowBypass),
    cCheckExceptionFile: () => Effect.succeed(0),
    // …all 11 methods are required
  },
  { timeoutMs: 30_000, fallback: 0 },
)
```

Handlers have no error channel on purpose: the kernel is stalled waiting, so
you must decide what to answer rather than let it time out. If a handler dies
or overruns `timeoutMs`, the kernel receives `fallback` — pick the value your
kernel reads as "decline".

### Interfaces handed back as binders

A few methods return another AIDL interface rather than data. The object stays
native and JS gets a handle:

```ts
const mgr  = yield* pedestal.getSerialManager()          // PedestalSerialManagerRef
const ports = yield* pedestalSerialManagerAt(mgr).enumSerialports()
const port = yield* pedestalSerialManagerAt(mgr).getSerialport(ports[0])
yield* serialportAt(port).open()                          // SerialportRef
```

Handles are keyed by binder identity natively, so asking twice returns the
same one. Call `releaseHandle(ref)` only if you churn through them.

`scanner` and `triggerStatus` (tamper detection) have no `DeviceServiceManager`
getter at all — they exist only on the root `AidlDeviceService`, which the
manager keeps private. They are reached reflectively and exposed as ordinary
modules.

### Android types

Platform types that appear in the AIDL surface have hand-written mappings in
[`src/android.ts`](./src/android.ts), each with a matching rule in
`TopwiseCodec.kt`:

| Java | TypeScript |
| --- | --- |
| `ContentValues` | `Record<string, string \| number \| boolean \| Uint8Array \| null>` |
| `ComponentName`, `Rect` | plain objects |
| `KeyEvent`, `UsageStats` | flattened to their accessors |
| `X509Certificate` | `{ der, subject, issuer, serialNumber, notBefore, notAfter }` |
| `BigDecimal`, `BigInteger` | `string` (exact — serials and money outrun a double) |
| `SparseIntArray`, `SparseArray`, `ArrayMap` | `Record<string, T>` |
| `Typeface` | `TypefaceSpec` — a request to load a font |
| `ParcelFileDescriptor` | `FileRef` — a path; the fd is opened and closed natively |
| `IBinder` | `RemoteHandle` |

### Printing a receipt

`PrintTemplate` is the layout builder: rows go in, a bitmap comes out, and that
bitmap is what the printer puts on paper. It is hand-written on both sides —
it holds an Android `Context`, and its six `add` overloads differ only by
argument *type*, which reflective dispatch cannot tell apart once the arguments
are JSON. Each overload gets a distinct name:

| Java | here |
| --- | --- |
| `add(TextUnit)` | `addText` |
| `add(int, TextUnit, int, TextUnit)` | `addColumns2` |
| `add(int, TextUnit, int, TextUnit, int, TextUnit)` | `addColumns3` |
| `add(ImageUnit)` | `addImage` |
| `add(List<TextUnit>, ImageUnit)` | `addTextsThenImage` |
| `add(ImageUnit, List<TextUnit>)` | `addImageThenTexts` |
| `init(Context)` / `init(Context, Typeface)` | `init` / `initWithTypeface` |

```ts
import { printTemplate, printer } from "@slipstream/topwise-sdk"

const receipt = Effect.gen(function* () {
  yield* printTemplate.init()

  const bitmap = yield* printTemplate.session(
    Effect.gen(function* () {
      yield* printTemplate.addText({ text: "ACME STORE", fontSize: 28, align: "CENTER", isBold: true })
      yield* printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" })
      yield* printTemplate.addColumns2(3, { text: "Total" }, 1, { text: "4.50", align: "RIGHT" })
      return yield* printTemplate.getPrintBitmap()
    }),
  )

  yield* printer.printBmp(0, 384, 0, bitmap).pipe(
    Stream.takeUntil((e) => e._tag === "onPrintFinish" || e._tag === "onError"),
    Stream.runDrain,
  )
})
```

`PrintTemplate` is a process-wide singleton, so its row buffer is shared by
every caller — two receipts built concurrently would interleave into one
garbled page. `session` takes the lock, clears on the way in and on the way
out, and so a failure part way through cannot leak rows into the next receipt.
Use it for every receipt.

### Bytes and TLV

`BytesUtil`, `Tlv` and `TlvList` are mirrored as **pure TypeScript** in
[`src/bytes.ts`](./src/bytes.ts) — they are functions over bytes, so crossing
the bridge to hex-encode a string or parse the TLV an EMV kernel just returned
would be pointless. Being pure also makes them the part of this SDK with real
test coverage.

```ts
import { TlvList, hexString2Bytes } from "@slipstream/topwise-sdk"

const tags = TlvList.fromBytes(kernelResponse)
const pan  = tags.getValue("5A")
const aid  = tags.getValue("9F06")

const request = new TlvList().addTlv("9F02", "000000001000").addTlv("5F2A", "0840").getBytes()
```

`int2Bytes`/`bytes2Int` take a named `bigEndian` argument. The Java originals
take an unnamed boolean whose meaning is not recoverable from the jar, and
guessing at byte order in a payments SDK is worse than being explicit.

### PIN entry

`pinpad(n).getPin` and `getMac` take an `android.os.Bundle` whose keys exist
only inside `PinParam.getParam()`. Rather than hard-code key names scraped out
of a method body, the parameters cross as data and Java builds the Bundle:

```ts
const bundle = yield* helpers.pinParamToBundle({
  keyIndex: 1, pinType: 0, keyType: 1, panBlock, timeOut: 60,
  keyMinLength: 4, keyMaxLength: 12,
})
yield* pinpad(0).getPin(bundle).pipe(Stream.takeUntil(...), Stream.runHead)
```

### Errors

`TopwiseError` is *transport* failure: unbound service, unavailable module,
dead binder. The codes worth knowing apart:

- `NOT_BOUND` — nothing is bound yet; call `ready()` first.
- `MODULE_UNAVAILABLE` — the service **is** bound, but `DeviceServiceManager`'s
  accessor for that module returned null. Either the terminal has no such
  peripheral, or the app is not authorised for it. Secure peripherals (pinpad,
  key manager, EMV kernels) are usually the latter.
- `NO_SUCH_METHOD` — the terminal's service predates the jar these bindings
  were generated from. Most Topwise calls report business failure in-band as a non-zero
`int`; check those against the generated constants:

```ts
import { Constants } from "@slipstream/topwise-sdk"
Constants.AidlErrorCodePrinter.ERROR_PRINT_NOPAPER // 1
```

## Regenerating after a vendor jar drop

Requires a JDK (for `javap`) and `unzip`.

```sh
cp new-sdk.jar "T1&T3&T6 SDK20250215/SDK Jar/"
cp new-sdk.jar android/libs/
npm run codegen   # rewrites api.json, src/generated/*, TopwiseGenerated.kt
npm run typecheck && npm test
```

`api.json` is the committed intermediate representation — diff it to see
exactly what the vendor changed.

## Layout

| Path | |
| --- | --- |
| `scripts/extract-api.mjs` | jar + javadoc → `api.json` |
| `scripts/generate.mjs` | `api.json` → TS bindings + Kotlin dispatch |
| `src/bridge.ts` | the Effect service, hand-written |
| `src/codec.ts` | wire format, hand-written |
| `src/bytes.ts` | `BytesUtil` / `Tlv` / `TlvList`, pure TS |
| `src/print-template.ts` | receipt builder, hand-written |
| `src/helpers.ts` | Java-side behaviour (`getParam()`), hand-written |
| `src/promise.ts` | promise facade for non-Effect callers |
| `src/generated/` | do not edit |
| `android/…/TopwiseBridgeModule.kt` | reflective dispatch, hand-written |
| `android/…/TopwisePrintTemplate.kt` | receipt builder executor, hand-written |
| `android/…/TopwiseHelpers.kt` | `getParam()` bundles, hand-written |
| `android/…/TopwiseGenerated.kt` | module map + binder stubs, generated |

## Verified on hardware

Built and run on a **Topwise T2N** (Android 11, API 30, armeabi-v7a, service
`com.android.topwise.topusdkservice` 2.1.73). The SDK jar is branded T1/T3/T6;
all 39 AIDL interfaces are present on the T2N, and only 3 of 760 methods are
missing from that firmware — `AidlSystem.systemConfigurationMenuVisibilitySet`,
`AidlLed.switchMarqueeSlot`, `AidlTM.sendParamResult`, which return
`NO_SUCH_METHOD`.

Confirmed working against the real device service: system identity, printer
status and telemetry, `printTemplate` receipt rendering, `helpers`
(`PinParam.getParam()`), `scanner` and `triggerStatus` (both reachable only
through the manager's private root service), RF card open/close, TMS file
list, and the pure-TS BER-TLV codec.

On that unit the secure peripherals — pinpad, key manager, EMV L2 kernels,
key injection — report `MODULE_UNAVAILABLE`: the service is bound, but their
accessors return null for an app the vendor has not authorised.

## Gotchas

- Java `long` becomes a JS `number`. Values past 2^53 lose precision; none of
  the SDK's `long` returns (mileage, timestamps) get near it. `BigDecimal` and
  certificate serials cross as strings instead, so those stay exact.
- Three classes hold a live Android object and so have no value to send:
  `PrintTemplate` (mirrored by hand as `printTemplate`), `PrnTextView` (an
  internal `TextView` subclass, never in a signature) and `DeviceServiceManager`
  itself (exposed as the `manager` module). Everything else in the jar with
  instance state has a generated TypeScript mirror, including carriers no
  current AIDL method references — the pre-L2 `EmvTransData`, `TerminalParam`,
  `CandidateApp`, `CardInfo`, `PCardLoadLog`, `PCardTransLog`.
- Device calls are serialized **per module**, so a blocking PIN entry does not
  stall the printer. Two callers driving the *same* peripheral still queue.
- The bridge dispatches by method name and reads data carriers field by field,
  so `com.topwise.cloudpos.**` must not be obfuscated. The shipped
  `consumerProguardFiles` handles this.
- Android 11 and later filter package visibility. The library manifest declares
  the `<queries>` entry for `com.android.topwise.topusdkservice`; without it
  `bindService` fails silently and every accessor returns null.
