# decoder

`com.topwise.cloudpos.aidl.decoder.AidlDecoderManager`

4 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`init`](#init) · [`decode`](#decode) · [`exit`](#exit) · [`decodeByBigData`](#decodebybigdata)

---

### `init`

Initialize the decoder

```ts
decoder.init(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.decoder.init(): number
```

---

### `decode`

Start decoding

```ts
decoder.decode(imageData: Uint8Array, imageWidth: number, imageHeight: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.decoder.decode(imageData: Uint8Array, imageWidth: number, imageHeight: number): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `imageData` | `Uint8Array` | image Data |
| `imageWidth` | `number` | image Width |
| `imageHeight` | `number` | image Height |

**Returns** — Decoding data

---

### `exit`

exit decoding

```ts
decoder.exit(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.decoder.exit(): void
```

---

### `decodeByBigData`

Start decoding by big data

```ts
decoder.decodeByBigData(descriptor: FileRef, imageWidth: number, imageHeight: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.decoder.decodeByBigData(descriptor: FileRef, imageWidth: number, imageHeight: number): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `descriptor` | `FileRef` |  |
| `imageWidth` | `number` | image Width |
| `imageHeight` | `number` | image Height |

**Returns** — Decoding data

