# icCard

`com.topwise.cloudpos.aidl.iccard.AidlICCard`

7 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`reset`](#reset) · [`isExist`](#isexist) · [`apduComm`](#apducomm) · [`halt`](#halt) · [`setICCardParameter`](#seticcardparameter)

---

### `open`

open device

```ts
icCard.open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.open(): boolean
```

**Returns** — true:success,false:failed

---

### `close`

close device

```ts
icCard.close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.close(): boolean
```

**Returns** — true:success,false:failed

---

### `reset`

reset ic card

```ts
icCard.reset(cardType: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.reset(cardType: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | ic card type,2: 4442 CPU Card,others: IC Card |

**Returns** — reset data

---

### `isExist`

Does the card exist

```ts
icCard.isExist(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.isExist(): boolean
```

**Returns** — true:exist,false:not exist

---

### `apduComm`

Send APDU Command

```ts
icCard.apduComm(apdu: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.apduComm(apdu: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `apdu` | `Uint8Array` | APDU Command |

**Returns** — The APDU Command returns data

---

### `halt`

halt

```ts
icCard.halt(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.halt(): number
```

---

### `setICCardParameter`

Set IC Card APDU Parameter

```ts
icCard.setICCardParameter(voltageMode: ICVoltageMode, supportPPS: boolean, rateMode: ICRateMode, specType: ICSpecType, autoSendGetResponse: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.icCard.setICCardParameter(voltageMode: ICVoltageMode, supportPPS: boolean, rateMode: ICRateMode, specType: ICSpecType, autoSendGetResponse: boolean): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `voltageMode` | `ICVoltageMode` | Voltage Mode;ICVoltageMode.VOLTAGE_3V |
| `supportPPS` | `boolean` | Support PPS;default:false |
| `rateMode` | `ICRateMode` | Rate Mode;ICRateMode.RATE_9600 |
| `specType` | `ICSpecType` | Spec Type;ICSpecType.SPEC_TYPE_EMV |
| `autoSendGetResponse` | `boolean` | Auto Send Get Response;default:false |

**Returns** — 0:success;other:fail code

