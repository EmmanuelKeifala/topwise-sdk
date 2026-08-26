# pedestalSerialManagerAt

`com.topwise.cloudpos.aidl.pedestal.AidlPedestalSerialManager`

3 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getCount`](#getcount) · [`enumSerialports`](#enumserialports) · [`getSerialport`](#getserialport)

---

### `getCount`

Count the number of base serial ports

```ts
pedestalSerialManagerAt.getCount(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pedestalSerialManagerAt.getCount(): number
```

**Returns** — serial ports size

---

### `enumSerialports`

Enumerate the base serial port

```ts
pedestalSerialManagerAt.enumSerialports(): Effect<ReadonlyArray<string>, TopwiseError, TopwiseBridge>

// promise client
await topwise.pedestalSerialManagerAt.enumSerialports(): ReadonlyArray<string>
```

**Returns** — list of serial device names

---

### `getSerialport`

get Serial port

```ts
pedestalSerialManagerAt.getSerialport(portName: string): Effect<SerialportRef, TopwiseError, TopwiseBridge>

// promise client
await topwise.pedestalSerialManagerAt.getSerialport(portName: string): SerialportRef
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `portName` | `string` | port name |

**Returns** — Serial port binder

