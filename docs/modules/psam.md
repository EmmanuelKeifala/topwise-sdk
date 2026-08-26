# psam

`com.topwise.cloudpos.aidl.psam.AidlPsam`

5 methods.

Takes a slot index: `psam(0)`. Slots are 0-based and model-specific;
an absent slot fails with `MODULE_UNAVAILABLE`.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`reset`](#reset) · [`apduComm`](#apducomm) · [`setETU`](#setetu)

---

### `open`

open device

```ts
psam(index).open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.psam(index).open(): boolean
```

**Returns** — true:success,false:failed

---

### `close`

close device

```ts
psam(index).close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.psam(index).close(): boolean
```

**Returns** — true:success,false:failed

---

### `reset`

reset psam card

```ts
psam(index).reset(cardType: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.psam(index).reset(cardType: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | card type,default is 0x00 |

**Returns** — Successful return data, failure return null

---

### `apduComm`

send apdu command

```ts
psam(index).apduComm(apdu: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.psam(index).apduComm(apdu: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `apdu` | `Uint8Array` | apdu command |

**Returns** — return data of apdu command

---

### `setETU`

set ETU time

```ts
psam(index).setETU(etuVal: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.psam(index).setETU(etuVal: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `etuVal` | `number` | ETU time value |

**Returns** — true:success,false:failed

