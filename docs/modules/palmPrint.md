# palmPrint

`com.topwise.cloudpos.aidl.palmprint.AidlPalmPrint`

14 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`resetDevice`](#resetdevice) · [`isDeviceOpened`](#isdeviceopened) · [`enroll`](#enroll) · [`cancelEnroll`](#cancelenroll) · [`verify`](#verify) · [`getIdList`](#getidlist) · [`writePalm`](#writepalm) · [`clearAll`](#clearall) · [`deletePalm`](#deletepalm) · [`readPalmMap`](#readpalmmap) · [`registerImageCallback`](#registerimagecallback) · [`unregisterImageCallback`](#unregisterimagecallback) · [`registerResultCallbackCallback`](#registerresultcallbackcallback) · [`unregisterResultCallbackCallback`](#unregisterresultcallbackcallback)

---

### `resetDevice`

```ts
palmPrint.resetDevice(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.resetDevice(): number
```

---

### `isDeviceOpened`

```ts
palmPrint.isDeviceOpened(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.isDeviceOpened(): boolean
```

---

### `enroll`

```ts
palmPrint.enroll(arg0: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.enroll(arg0: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `cancelEnroll`

```ts
palmPrint.cancelEnroll(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.cancelEnroll(): void
```

---

### `verify`

```ts
palmPrint.verify(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.verify(): void
```

---

### `getIdList`

```ts
palmPrint.getIdList(): Effect<ReadonlyArray<string>, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.getIdList(): ReadonlyArray<string>
```

---

### `writePalm`

```ts
palmPrint.writePalm(arg0: string, arg1: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.writePalm(arg0: string, arg1: string): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `clearAll`

```ts
palmPrint.clearAll(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.clearAll(): number
```

---

### `deletePalm`

```ts
palmPrint.deletePalm(arg0: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.deletePalm(arg0: string): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `readPalmMap`

```ts
palmPrint.readPalmMap(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.palmPrint.readPalmMap(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `registerImageCallback`

```ts
palmPrint.registerImageCallback()
  : Stream<ImageCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.palmPrint.registerImageCallback({ onEvent }): Unsubscribe
```

**Events** — [`ImageCallbackEvent`](../events.md#imagecallbackevent).

---

### `unregisterImageCallback`

```ts
palmPrint.unregisterImageCallback()
  : Stream<ImageCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.palmPrint.unregisterImageCallback({ onEvent }): Unsubscribe
```

**Events** — [`ImageCallbackEvent`](../events.md#imagecallbackevent).

---

### `registerResultCallbackCallback`

```ts
palmPrint.registerResultCallbackCallback()
  : Stream<ResultCallbackCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.palmPrint.registerResultCallbackCallback({ onEvent }): Unsubscribe
```

**Events** — [`ResultCallbackCallbackEvent`](../events.md#resultcallbackcallbackevent).

---

### `unregisterResultCallbackCallback`

```ts
palmPrint.unregisterResultCallbackCallback()
  : Stream<ResultCallbackCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.palmPrint.unregisterResultCallbackCallback({ onEvent }): Unsubscribe
```

**Events** — [`ResultCallbackCallbackEvent`](../events.md#resultcallbackcallbackevent).

