# serialportAt

`com.topwise.cloudpos.aidl.serialport.AidlSerialport`

5 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`init`](#init) · [`sendData`](#senddata) · [`readData`](#readdata) · [`close`](#close)

---

### `open`

open serialport

```ts
serialportAt.open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.serialportAt.open(): boolean
```

**Returns** — true:success,false:failed

---

### `init`

init serialport

```ts
serialportAt.init(baudratebyte: number, dataBits: number, parity: number, StopBits: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.serialportAt.init(baudratebyte: number, dataBits: number, parity: number, StopBits: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `baudratebyte` | `number` | the baudrate of serialport |
| `dataBits` | `number` | data bits |
| `parity` | `number` | Check bit,default value is 0x00 |
| `StopBits` | `number` | Stop bit,default value is 0x00 |

**Returns** — true:success,false:failed

---

### `sendData`

send data

```ts
serialportAt.sendData(data: Uint8Array, timeout: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.serialportAt.sendData(data: Uint8Array, timeout: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `data` | `Uint8Array` | send data |
| `timeout` | `number` | time out(ms) |

**Returns** — true:success,false:failed

---

### `readData`

read data

```ts
serialportAt.readData(timeout: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.serialportAt.readData(timeout: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeout` | `number` | time out(ms) |

**Returns** — Data read if success, null if failed

---

### `close`

close serialport

```ts
serialportAt.close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.serialportAt.close(): boolean
```

**Returns** — true:success,false:failed

