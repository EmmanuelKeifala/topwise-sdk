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

### Errors

`TopwiseError` is *transport* failure. Most device calls report business
failure in-band as a non-zero `int` — a `0` return is success, anything else
is the device refusing. Full code table in [docs/errors.md](./docs/errors.md).

## Documentation

Full reference in [docs/](./docs) — every method, its signature in both styles,
parameters, return meanings and events. Generated from the jar, so it stays in
step with the bindings.

- [Getting started](./docs/getting-started.md)
- [Printing receipts](./docs/printing.md)
- [PIN entry and keys](./docs/pin-and-keys.md)
- [Errors](./docs/errors.md) · [Troubleshooting](./docs/troubleshooting.md)
- [Concepts](./docs/concepts.md) — handles, Android types, bytes and TLV
- [All modules](./docs/README.md#modules)

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
