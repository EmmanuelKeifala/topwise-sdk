# camera

`com.topwise.cloudpos.aidl.camera.AidlCameraScanCode`

5 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`scanCode`](#scancode) · [`stopScan`](#stopscan) · [`startDecode`](#startdecode) · [`stopDecode`](#stopdecode) · [`getDecodeLibVersion`](#getdecodelibversion)

---

### `scanCode`

scan code

```ts
camera.scanCode(params: Readonly<Record<string, unknown>>)
  : Stream<CameraScanCodeListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.camera.scanCode(params: Readonly<Record<string, unknown>>, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `params` | `Readonly<Record<string, unknown>>` | refer to AidlScanParam (AidlScanParam)params.getSerializable(AidlScanParam.SCAN_CODE); |

**Events** — [`CameraScanCodeListenerEvent`](../events.md#camerascancodelistenerevent).

---

### `stopScan`

stop scanning

```ts
camera.stopScan(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.camera.stopScan(): void
```

---

### `startDecode`

Start Decode

```ts
camera.startDecode(parameter: Input<DecodeParameter>)
  : Effect<{ result: number; events: Stream<DecodeCallBackEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.camera.startDecode(parameter: Input<DecodeParameter>)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type |
| --- | --- |
| `parameter` | `Input<DecodeParameter>` |

**Events** — [`DecodeCallBackEvent`](../events.md#decodecallbackevent).

---

### `stopDecode`

Stop Decode

```ts
camera.stopDecode(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.camera.stopDecode(): number
```

---

### `getDecodeLibVersion`

Obtain the version number of the scanning library

```ts
camera.getDecodeLibVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.camera.getDecodeLibVersion(): string
```

