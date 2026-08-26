# Getting started

```sh
npm install @slipstream/topwise-sdk
```

Then rebuild the Android app — autolinking registers the native module, and a
Metro reload will not pick it up.

## Bind first

`DeviceServiceManager` binds asynchronously and the vendor SDK exposes no
completion callback, so every module accessor returns null until it lands.
Call `ready()` once at startup and wait for it.

## With Effect

```ts
import { Effect, Stream } from "effect"
import { TopwiseBridgeLive } from "@slipstream/topwise-sdk/react-native"
import { ready, printer, checkCard } from "@slipstream/topwise-sdk"

const program = Effect.gen(function* () {
  yield* ready()

  const state = yield* printer.getPrinterState()

  const card = yield* checkCard.checkCard(true, true, true, 60).pipe(
    Stream.takeUntil((e) => e._tag !== "onFindMagCard"),
    Stream.runHead,
  )

  return { state, card }
})

Effect.runPromise(program.pipe(Effect.scoped, Effect.provide(TopwiseBridgeLive)))
```

## Without Effect

```ts
import { createTopwise } from "@slipstream/topwise-sdk/react-native"

const topwise = createTopwise()   // once, for the app's lifetime

await topwise.ready()
const state = await topwise.printer.getPrinterState()

const stop = topwise.checkCard.checkCard(true, true, true, 60, {
  onEvent: (event) => {
    if (event._tag === "onFindMagCard") console.log(event.data?.cardno)
  },
})
// later
stop()
```

## Call shapes

| AIDL method | Effect | `createTopwise()` |
| --- | --- | --- |
| plain call | `Effect<A>` | `Promise<A>` |
| listener, returns `void` | `Stream<Event>` | `(…, { onEvent }) => unsubscribe` |
| listener, returns a status | `Effect<{ result, events }>` | `Promise<{ result, events }>` |
| kernel callback | `Effect<A>`, you pass handlers | same, as a promise |
| hands back an interface | `Effect<XRef>`, then `xAt(ref)` | same, as a promise |

Listener streams never close on their own — the vendor does not mark any
callback as terminal. End them yourself with `Stream.takeUntil`, or by calling
the unsubscribe function.

## Next

- [Every module](./README.md#modules)
- [Printing receipts](./printing.md)
- [PIN entry and keys](./pin-and-keys.md)
- [Errors](./errors.md)
