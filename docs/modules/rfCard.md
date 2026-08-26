# rfCard

`com.topwise.cloudpos.aidl.rfcard.AidlRFCard`

28 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`reset`](#reset) · [`isExist`](#isexist) · [`isExistMT`](#isexistmt) · [`apduComm`](#apducomm) · [`halt`](#halt) · [`getCardType`](#getcardtype) · [`auth`](#auth) · [`readBlock`](#readblock) · [`readBlockMT`](#readblockmt) · [`writeBlock`](#writeblock) · [`addValue`](#addvalue) · [`reduceValue`](#reducevalue) · [`readBlockX`](#readblockx) · [`getCardCode`](#getcardcode) · [`getATQA`](#getatqa) · [`activateTypeAOrIDCard`](#activatetypeaoridcard) · [`getFelicaProtocolData`](#getfelicaprotocoldata) · [`felicaTransceive`](#felicatransceive) · [`getUID`](#getuid) · [`isExistExt`](#isexistext) · [`backupsBlock`](#backupsblock) · [`initCardSimulate`](#initcardsimulate) · [`exitCardSimulate`](#exitcardsimulate) · [`setCardSimulateData`](#setcardsimulatedata) · [`queryCardSimulateState`](#querycardsimulatestate) · [`getCardChipState`](#getcardchipstate)

---

### `open`

open device

```ts
rfCard.open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.open(): boolean
```

**Returns** — true:success,false:failed

---

### `close`

close device

```ts
rfCard.close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.close(): boolean
```

**Returns** — true:success,false:failed

---

### `reset`

reset rf card

```ts
rfCard.reset(cardType: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.reset(cardType: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | card type,use getCardType() to get it |

**Returns** — reset data

---

### `isExist`

does the rf card exist

```ts
rfCard.isExist(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.isExist(): boolean
```

**Returns** — true:exist,false:not exist

---

### `isExistMT`

does the rf card(meituan) exist(only use in China)

```ts
rfCard.isExistMT(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.isExistMT(): number
```

**Returns** — true:exist,false:not exist

---

### `apduComm`

send apdu command

```ts
rfCard.apduComm(apdu: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.apduComm(apdu: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `apdu` | `Uint8Array` | command |

**Returns** — return data of apdu command

---

### `halt`

halt

```ts
rfCard.halt(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.halt(): number
```

**Returns** — 0:success,others:error code

---

### `getCardType`

get card type

```ts
rfCard.getCardType(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getCardType(): number
```

**Returns** — rf card type

---

### `auth`

The following interfaces are only valid for M1 cards m1 card auth

```ts
rfCard.auth(type: number, blockaddr: number, keydata: Uint8Array, resetRes: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.auth(type: number, blockaddr: number, keydata: Uint8Array, resetRes: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `type` | `number` | card type |
| `blockaddr` | `number` | block address |
| `keydata` | `Uint8Array` | key data |
| `resetRes` | `Uint8Array` | reset Res |

**Returns** — 0:success,others:failed

---

### `readBlock`

read block data

```ts
rfCard.readBlock(blockaddr: number, blockdata: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.readBlock(blockaddr: number, blockdata: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |
| `blockdata` | `Uint8Array` | block data |

**Returns** — 0:success,others:failed

---

### `readBlockMT`

read block data(meituan,only use in China)

```ts
rfCard.readBlockMT(blockaddr: number, blockdata: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.readBlockMT(blockaddr: number, blockdata: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |
| `blockdata` | `Uint8Array` | block data |

**Returns** — 0:success,others:failed

---

### `writeBlock`

write block data

```ts
rfCard.writeBlock(blockaddr: number, data: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.writeBlock(blockaddr: number, data: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |
| `data` | `Uint8Array` | block data |

**Returns** — 0:success,others:failed

---

### `addValue`

add value

```ts
rfCard.addValue(blockaddr: number, data: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.addValue(blockaddr: number, data: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |
| `data` | `Uint8Array` | value data to be added |

**Returns** — 0:success,others:failed

---

### `reduceValue`

reduce value

```ts
rfCard.reduceValue(blockaddr: number, data: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.reduceValue(blockaddr: number, data: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |
| `data` | `Uint8Array` | value data to be reduced |

**Returns** — 0:success,others:failed

---

### `readBlockX`

write block X data

```ts
rfCard.readBlockX(blockaddr: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.readBlockX(blockaddr: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `blockaddr` | `number` | block address |

**Returns** — block data if success,null if failed

---

### `getCardCode`

get card code inside

```ts
rfCard.getCardCode(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getCardCode(): Uint8Array
```

**Returns** — card code if success,null if failed

---

### `getATQA`

get ATQA of A card

```ts
rfCard.getATQA(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getATQA(): Uint8Array
```

**Returns** — ATQA data if success,null if failed

---

### `activateTypeAOrIDCard`

Activate an A card or ID card

```ts
rfCard.activateTypeAOrIDCard(cardType: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.activateTypeAOrIDCard(cardType: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | card type,use getCardType() to get it |

**Returns** — active data

---

### `getFelicaProtocolData`

get Felica card protocol data

```ts
rfCard.getFelicaProtocolData(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getFelicaProtocolData(): Uint8Array
```

**Returns** — protocol data if success,null if failed

---

### `felicaTransceive`

send apdu command of felica card

```ts
rfCard.felicaTransceive(apdu: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.felicaTransceive(apdu: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `apdu` | `Uint8Array` | apdu command |

**Returns** — the returned data of apdu command

---

### `getUID`

get UID of card

```ts
rfCard.getUID(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getUID(): Uint8Array
```

**Returns** — UID of card

---

### `isExistExt`

does the rf card exist Ext

```ts
rfCard.isExistExt(mode: RfCardCheckMode, value: Input<RfCardValue>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.isExistExt(mode: RfCardCheckMode, value: Input<RfCardValue>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `mode` | `RfCardCheckMode` | Input Rf Card Check Mode RfCardCheckMode.MODE_DEFAULT or RfCardCheckMode.MODE_CHECK_AND_RESET |
| `value` | `Input<RfCardValue>` | Output value.getExistCardData() or value.getUID() |

---

### `backupsBlock`

```ts
rfCard.backupsBlock(arg0: number, arg1: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.backupsBlock(arg0: number, arg1: number): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `initCardSimulate`

```ts
rfCard.initCardSimulate(simulateCardType: SimulateCardType): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.initCardSimulate(simulateCardType: SimulateCardType): number
```

| Parameter | Type |
| --- | --- |
| `simulateCardType` | `SimulateCardType` |

---

### `exitCardSimulate`

```ts
rfCard.exitCardSimulate(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.exitCardSimulate(): number
```

---

### `setCardSimulateData`

```ts
rfCard.setCardSimulateData(simulateCard: Input<SimulateCard>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.setCardSimulateData(simulateCard: Input<SimulateCard>): number
```

| Parameter | Type |
| --- | --- |
| `simulateCard` | `Input<SimulateCard>` |

---

### `queryCardSimulateState`

```ts
rfCard.queryCardSimulateState(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.queryCardSimulateState(): number
```

---

### `getCardChipState`

```ts
rfCard.getCardChipState(arg0: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.rfCard.getCardChipState(arg0: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |

