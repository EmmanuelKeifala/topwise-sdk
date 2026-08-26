# magCard

`com.topwise.cloudpos.aidl.magcard.AidlMagCard`

6 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`searchCard`](#searchcard) · [`searchEncryptCard`](#searchencryptcard) · [`stopSearch`](#stopsearch) · [`open`](#open) · [`close`](#close) · [`searchEncryptCardEx`](#searchencryptcardex)

---

### `searchCard`

search magnetic card

```ts
magCard.searchCard(timeout: number)
  : Stream<MagCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.magCard.searchCard(timeout: number, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeout` | `number` | Time out(ms) |

**Events** — [`MagCardListenerEvent`](../events.md#magcardlistenerevent).

---

### `searchEncryptCard`

Searching for magnetic card with track data encrypted

```ts
magCard.searchEncryptCard(timeout: number, keyIndex: number, encryptFlag: number, random: Uint8Array, pinpadType: number)
  : Stream<EncryptMagCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.magCard.searchEncryptCard(timeout: number, keyIndex: number, encryptFlag: number, random: Uint8Array, pinpadType: number, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeout` | `number` | Time out(ms) |
| `keyIndex` | `number` |  |
| `encryptFlag` | `number` |  |
| `random` | `Uint8Array` |  |
| `pinpadType` | `number` |  |

**Events** — [`EncryptMagCardListenerEvent`](../events.md#encryptmagcardlistenerevent).

---

### `stopSearch`

stop searching magnetic card

```ts
magCard.stopSearch(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.magCard.stopSearch(): void
```

---

### `open`

open device

```ts
magCard.open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.magCard.open(): boolean
```

---

### `close`

close device

```ts
magCard.close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.magCard.close(): boolean
```

---

### `searchEncryptCardEx`

Searching for magnetic card with track data encrypted

```ts
magCard.searchEncryptCardEx(timeout: number, keyIndex: number, encryptFlag: number, random: Uint8Array, pinpadType: number, isSm4: boolean)
  : Stream<EncryptMagCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.magCard.searchEncryptCardEx(timeout: number, keyIndex: number, encryptFlag: number, random: Uint8Array, pinpadType: number, isSm4: boolean, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeout` | `number` | Time out(ms) |
| `keyIndex` | `number` |  |
| `encryptFlag` | `number` |  |
| `random` | `Uint8Array` |  |
| `pinpadType` | `number` |  |
| `isSm4` | `boolean` |  |

**Events** — [`EncryptMagCardListenerEvent`](../events.md#encryptmagcardlistenerevent).

