# Topwise — plain React Native example

The same SDK, used **without Effect**. `App.tsx` is ordinary async/await React:
no `Effect` import, no `Layer`, no `Stream`.

For the Effect-native version, and the exhaustive 51-check bring-up app, see
[`../example`](../example).

## How it differs

`createTopwise()` returns a client where the whole API has been turned inside
out for you:

| Effect API | here |
| --- | --- |
| `Effect<A>` | `Promise<A>` |
| `Stream<Event>` | `fn(..., { onEvent }) => unsubscribe` |
| typed failure channel | a thrown `TopwiseError` — use `try`/`catch` |
| `Effect.scoped` | handled internally; `unsubscribe()` releases the listener |

```ts
const topwise = createTopwise()
await topwise.ready()

const serial = await topwise.system.getSerialNo()

const stop = topwise.checkCard.checkCard(true, true, true, 60, {
  onEvent: (event) => console.log(event._tag),
})
```

## What the app does

Bind on start, then a button each for: system info, printer status, printing a
receipt, a beep, waiting for a card (with a stop button), and parsing a TLV
string with no device involved. Everything is logged on screen.

## Setup

```sh
npx @react-native-community/cli@latest init TopwisePlain --version 0.76.5
cp -r example-plain/App.tsx example-plain/index.js example-plain/app.json TopwisePlain/
cd TopwisePlain

npm run --prefix .. build && npm pack --prefix ..
npm install ../slipstream-topwise-sdk-0.1.0.tgz

npx react-native run-android
```

Autolinking picks up the package's `android/` module; there is no
`MainApplication.kt` edit. See [`../example/README.md`](../example/README.md)
for troubleshooting a failed bind.
