# pinpad

`com.topwise.cloudpos.aidl.pinpad.AidlPinpad`

49 methods.

Takes a slot index: `pinpad(0)`. Slots are 0-based and model-specific;
an absent slot fails with `MODULE_UNAVAILABLE`.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getPin`](#getpin) · [`stopGetPin`](#stopgetpin) · [`confirmGetPin`](#confirmgetpin) · [`loadMainkey`](#loadmainkey) · [`loadWorkKey`](#loadworkkey) · [`getMac`](#getmac) · [`encryptByTdk`](#encryptbytdk) · [`getRandom`](#getrandom) · [`display`](#display) · [`loadTEK`](#loadtek) · [`loadTWK`](#loadtwk) · [`loadEncryptMainkey`](#loadencryptmainkey) · [`setPinKeyboardMode`](#setpinkeyboardmode) · [`getKeyState`](#getkeystate) · [`encryptByRandomWk`](#encryptbyrandomwk) · [`loadDuKPTkey`](#loaddukptkey) · [`getDUKPTKsn`](#getdukptksn) · [`algorithmCal`](#algorithmcal) · [`algorithDecrypt`](#algorithdecrypt) · [`loadKeyCommonMethod`](#loadkeycommonmethod) · [`getButtonNum`](#getbuttonnum) · [`deletePedKey`](#deletepedkey) · [`loadDukptIPEK`](#loaddukptipek) · [`loadDukptBDK`](#loaddukptbdk) · [`cryptByTdk`](#cryptbytdk) · [`cryptByDukptDataKey`](#cryptbydukptdatakey) · [`getKeyCheckValue`](#getkeycheckvalue) · [`loadTr31EncryptMainkey`](#loadtr31encryptmainkey) · [`dukptKeyBdkToIpek`](#dukptkeybdktoipek) · [`getKeyKin`](#getkeykin) · [`cryptByFixedTdk`](#cryptbyfixedtdk) · [`genRandomTekEncryptByTek`](#genrandomtekencryptbytek) · [`loadKey`](#loadkey) · [`setPinPadLayout`](#setpinpadlayout) · [`loadMainkeyEx`](#loadmainkeyex) · [`loadWorkKeyEx`](#loadworkkeyex) · [`encryptByTdkEx`](#encryptbytdkex) · [`loadTEKEx`](#loadtekex) · [`loadEncryptMainkeyEx`](#loadencryptmainkeyex) · [`loadTWKEx`](#loadtwkex) · [`checkkey`](#checkkey) · [`getDUKPTKsnExt`](#getdukptksnext) · [`storedRecord`](#storedrecord) · [`algCalculate`](#algcalculate) · [`getKeyCheckValueExt`](#getkeycheckvalueext) · [`getInstalledKey`](#getinstalledkey) · [`loadKeyByTr31Mode`](#loadkeybytr31mode) · [`getTr31SaveKeyType`](#gettr31savekeytype) · [`genKBPKKey`](#genkbpkkey)

---

### `getPin`

Start entering Pin.

```ts
pinpad(index).getPin(param: Readonly<Record<string, unknown>>)
  : Stream<GetPinListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.pinpad(index).getPin(param: Readonly<Record<string, unknown>>, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `param` | `Readonly<Record<string, unknown>>` | Create a PinParam object PinParam.getParam(),Please refer to PinParam for specific details |

**Events** — [`GetPinListenerEvent`](../events.md#getpinlistenerevent).

---

### `stopGetPin`

Cancel entering Pin.

```ts
pinpad(index).stopGetPin(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).stopGetPin(): void
```

---

### `confirmGetPin`

Confirm Pin.

```ts
pinpad(index).confirmGetPin(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).confirmGetPin(): void
```

---

### `loadMainkey`

Inject master key.

```ts
pinpad(index).loadMainkey(keyIndex: number, key: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadMainkey(keyIndex: number, key: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Master key index. |
| `key` | `Uint8Array` | Master key value. |
| `checkValue` | `Uint8Array` | Master key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadWorkKey`

Inject work key.

```ts
pinpad(index).loadWorkKey(keyType: number, masterkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadWorkKey(keyType: number, masterkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Work key type. |
| `masterkeyIndex` | `number` | Master key index. |
| `wkeyIndex` | `number` | Work key index. |
| `keyValue` | `Uint8Array` | Work key value. |
| `checkValue` | `Uint8Array` | Work key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `getMac`

Computes the MAC value of the specified data.

```ts
pinpad(index).getMac(param: Readonly<Record<string, unknown>>, mac: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getMac(param: Readonly<Record<string, unknown>>, mac: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `param` | `Readonly<Record<string, unknown>>` | Create a MacParam object MacParam.getParam(),Please refer to MacParam for specific details |
| `mac` | `Uint8Array` | Byte array to store MAC values. |

**Returns** — 0: Calculate MAC successful; Other: Calculate MAC failed.

---

### `encryptByTdk`

Encrypting data with TDK.

```ts
pinpad(index).encryptByTdk(keyIndex: number, mode: number, random: Uint8Array, data: Uint8Array, encryptData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).encryptByTdk(keyIndex: number, mode: number, random: Uint8Array, data: Uint8Array, encryptData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Work key index. |
| `mode` | `number` | Encryption algorithm mode, 0: ECB, 1: CBC. |
| `random` | `Uint8Array` | Random number. |
| `data` | `Uint8Array` | Data to be encrypted. |
| `encryptData` | `Uint8Array` | Encrypted data. |

**Returns** — 0: Encrypted data successful; Other: Encrypted data failed.

---

### `getRandom`

Get random number.

```ts
pinpad(index).getRandom(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getRandom(): Uint8Array
```

**Returns** — random number: Get random number successful; null: Get random number failed.

---

### `display`

Password keyboard LED display information (external)

```ts
pinpad(index).display(line1: string, line2: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).display(line1: string, line2: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `line1` | `string` | The first line |
| `line2` | `string` | The second line |

**Returns** — true:success,false:failed

---

### `loadTEK`

Inject TEK.

```ts
pinpad(index).loadTEK(keyIndex: number, key: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadTEK(keyIndex: number, key: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | TEK index. |
| `key` | `Uint8Array` | TEK value. |
| `checkValue` | `Uint8Array` | TEK check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadTWK`

Inject TEK encrypted work key.

```ts
pinpad(index).loadTWK(keyType: number, tekkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadTWK(keyType: number, tekkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Work key type. |
| `tekkeyIndex` | `number` | TEK index. |
| `wkeyIndex` | `number` | Work key index. |
| `keyValue` | `Uint8Array` | Work key value. |
| `checkValue` | `Uint8Array` | Work key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadEncryptMainkey`

Inject TEK encrypted master key.

```ts
pinpad(index).loadEncryptMainkey(tekkeyIndex: number, keyIndex: number, key: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadEncryptMainkey(tekkeyIndex: number, keyIndex: number, key: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tekkeyIndex` | `number` | TEK index. |
| `keyIndex` | `number` | Master key index. |
| `key` | `Uint8Array` | Master key value. |
| `checkValue` | `Uint8Array` | Master key check value |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `setPinKeyboardMode`

Set Pinpad Mode

```ts
pinpad(index).setPinKeyboardMode(mode: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).setPinKeyboardMode(mode: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `mode` | `number` | 0: Each key of password keyboard is fixed; 1: Each key of password keyboard is random. |

**Returns** — true: Set Pinpad mode successful; false: Set Pinpad mode failed.

---

### `getKeyState`

Get key status(whether the key exists).

```ts
pinpad(index).getKeyState(keyType: number, keyIndex: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getKeyState(keyType: number, keyIndex: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Key type. |
| `keyIndex` | `number` | Key index. |

**Returns** — true: Key exists; false: Key not exists.

---

### `encryptByRandomWk`

> **Deprecated** by the vendor.

```ts
pinpad(index).encryptByRandomWk(keyIndex: number, flag: boolean, random: Uint8Array, data: Uint8Array, encryptData: Uint8Array, mac: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).encryptByRandomWk(keyIndex: number, flag: boolean, random: Uint8Array, data: Uint8Array, encryptData: Uint8Array, mac: Uint8Array): boolean
```

| Parameter | Type |
| --- | --- |
| `keyIndex` | `number` |
| `flag` | `boolean` |
| `random` | `Uint8Array` |
| `data` | `Uint8Array` |
| `encryptData` | `Uint8Array` |
| `mac` | `Uint8Array` |

---

### `loadDuKPTkey`

Inject DUKPT key.

```ts
pinpad(index).loadDuKPTkey(keyType: number, keyIndex: number, key: Uint8Array, ksn: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadDuKPTkey(keyType: number, keyIndex: number, key: Uint8Array, ksn: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Key type. |
| `keyIndex` | `number` | Key index. |
| `key` | `Uint8Array` | Key value. |
| `ksn` | `Uint8Array` | KSN value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `getDUKPTKsn`

Get the current KSN value of Dukpt.

```ts
pinpad(index).getDUKPTKsn(keyIndex: number, isIncrease: boolean): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getDUKPTKsn(keyIndex: number, isIncrease: boolean): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `isIncrease` | `boolean` | Whether to auto increment. false: incremented; true: not incremented. |

**Returns** — KSN value: Get KSN successful; null: Get KSN failed.

---

### `algorithmCal`

> **Deprecated** by the vendor.

```ts
pinpad(index).algorithmCal(keyIndex: number, keyType: number, data: Uint8Array, cbcData: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).algorithmCal(keyIndex: number, keyType: number, data: Uint8Array, cbcData: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `keyIndex` | `number` |
| `keyType` | `number` |
| `data` | `Uint8Array` |
| `cbcData` | `Uint8Array` |

---

### `algorithDecrypt`

> **Deprecated** by the vendor.

```ts
pinpad(index).algorithDecrypt(keyIndex: number, data: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).algorithDecrypt(keyIndex: number, data: Uint8Array): boolean
```

| Parameter | Type |
| --- | --- |
| `keyIndex` | `number` |
| `data` | `Uint8Array` |

---

### `loadKeyCommonMethod`

> **Deprecated** by the vendor.

```ts
pinpad(index).loadKeyCommonMethod(encryptKeyType: number, encryptKeyIndex: number, decryptKeyType: number, decryptKeyIndex: number, decryptAlg: number, vectorData: Uint8Array, encryptData: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadKeyCommonMethod(encryptKeyType: number, encryptKeyIndex: number, decryptKeyType: number, decryptKeyIndex: number, decryptAlg: number, vectorData: Uint8Array, encryptData: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type |
| --- | --- |
| `encryptKeyType` | `number` |
| `encryptKeyIndex` | `number` |
| `decryptKeyType` | `number` |
| `decryptKeyIndex` | `number` |
| `decryptAlg` | `number` |
| `vectorData` | `Uint8Array` |
| `encryptData` | `Uint8Array` |
| `checkValue` | `Uint8Array` |

---

### `getButtonNum`

Get pinpad sequence.

```ts
pinpad(index).getButtonNum(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getButtonNum(): Uint8Array
```

**Returns** — Pinpad sequence: Get pinpad sequence successful; null: Get pinpad sequence failed.

---

### `deletePedKey`

Delete key.

```ts
pinpad(index).deletePedKey(keyType: number, keyIndex: number, mode: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).deletePedKey(keyType: number, keyIndex: number, mode: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Key type. |
| `keyIndex` | `number` | Key index. |
| `mode` | `number` | Delete mode. 0(default): Delete a single key; 1: Delete entire key; 2: Delete all keys under a key type. |

**Returns** — true: Delete key successful; false: Deleting key failed.

---

### `loadDukptIPEK`

Inject IPEK in DUKPT.

```ts
pinpad(index).loadDukptIPEK(keyIndex: number, key: Uint8Array, ksn: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadDukptIPEK(keyIndex: number, key: Uint8Array, ksn: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `key` | `Uint8Array` | Key type. |
| `ksn` | `Uint8Array` | KSN. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadDukptBDK`

Inject BDK in DUKPT.

```ts
pinpad(index).loadDukptBDK(keyIndex: number, key: Uint8Array, ksn: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadDukptBDK(keyIndex: number, key: Uint8Array, ksn: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `key` | `Uint8Array` | Key type. |
| `ksn` | `Uint8Array` | KSN. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `cryptByTdk`

Encrypted data with TDK.

```ts
pinpad(index).cryptByTdk(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, cryptData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).cryptByTdk(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, cryptData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `mode` | `number` | Encryption algorithm mode. |
| `data` | `Uint8Array` | Data to be encrypted. |
| `iv` | `Uint8Array` | iv. |
| `cryptData` | `Uint8Array` | Encrypt data. |

**Returns** — 0: Encrypted data successful; Other: Encrypted data failed.

---

### `cryptByDukptDataKey`

Encrypt data with DUKPT key.

```ts
pinpad(index).cryptByDukptDataKey(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, cryptData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).cryptByDukptDataKey(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, cryptData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `mode` | `number` | Encryption algorithm mode. |
| `data` | `Uint8Array` | Data to be encrypted. |
| `iv` | `Uint8Array` | iv. |
| `cryptData` | `Uint8Array` | Encrypt data. |

**Returns** — 0: Encrypted data successful; Other: Encrypted data failed.

---

### `getKeyCheckValue`

Get key check value.

```ts
pinpad(index).getKeyCheckValue(keyType: number, keyIndex: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getKeyCheckValue(keyType: number, keyIndex: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Key type. |
| `keyIndex` | `number` | Key index. |

**Returns** — Check value: Get key check value successful; null: Get key check value failed.

---

### `loadTr31EncryptMainkey`

Inject Tr31 encrypted master key.

```ts
pinpad(index).loadTr31EncryptMainkey(tekkeyIndex: number, keyIndex: number, tr31KeyData: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadTr31EncryptMainkey(tekkeyIndex: number, keyIndex: number, tr31KeyData: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tekkeyIndex` | `number` | TEK key index. |
| `keyIndex` | `number` | Master key index. |
| `tr31KeyData` | `Uint8Array` | TR31 key value. |
| `checkValue` | `Uint8Array` | Key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `dukptKeyBdkToIpek`

Generate IPEK using BDK in DUKPT.

```ts
pinpad(index).dukptKeyBdkToIpek(keyIndex: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).dukptKeyBdkToIpek(keyIndex: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |

**Returns** — 0: Generate IPEK successful; Other: Generate IPEK failed.

---

### `getKeyKin`

> **Deprecated** by the vendor.

```ts
pinpad(index).getKeyKin(recordIndex: number, keyType: number, keyIndex: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getKeyKin(recordIndex: number, keyType: number, keyIndex: number): number
```

| Parameter | Type |
| --- | --- |
| `recordIndex` | `number` |
| `keyType` | `number` |
| `keyIndex` | `number` |

---

### `cryptByFixedTdk`

Encrypt data with fixed TDK.

```ts
pinpad(index).cryptByFixedTdk(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, encryptData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).cryptByFixedTdk(keyIndex: number, mode: number, data: Uint8Array, iv: Uint8Array, encryptData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `mode` | `number` | Encryption algorithm mode. |
| `data` | `Uint8Array` | Data to be encrypted. |
| `iv` | `Uint8Array` | iv. |
| `encryptData` | `Uint8Array` | Encrypt data. |

**Returns** — 0: Encrypted data successful; Other: Encrypted data failed.

---

### `genRandomTekEncryptByTek`

> **Deprecated** by the vendor.

```ts
pinpad(index).genRandomTekEncryptByTek(masterIndex: number, subIndex: number, keyLen: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).genRandomTekEncryptByTek(masterIndex: number, subIndex: number, keyLen: number): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `masterIndex` | `number` |
| `subIndex` | `number` |
| `keyLen` | `number` |

---

### `loadKey`

Inject key.

```ts
pinpad(index).loadKey(keyIndex: number, keyType: number, key: Uint8Array, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadKey(keyIndex: number, keyType: number, key: Uint8Array, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `keyType` | `number` | Key type. |
| `key` | `Uint8Array` | Key value. |
| `checkValue` | `Uint8Array` | Key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `setPinPadLayout`

Set custom pinpad layout

```ts
pinpad(index).setPinPadLayout(layout: Uint8Array): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).setPinPadLayout(layout: Uint8Array): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `layout` | `Uint8Array` | pinpad layout |

---

### `loadMainkeyEx`

Inject master key.(Extend)

```ts
pinpad(index).loadMainkeyEx(keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadMainkeyEx(keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Master key index. |
| `key` | `Uint8Array` | Master key value. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `checkValue` | `Uint8Array` | Master key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadWorkKeyEx`

Inject work key.(Extend)

```ts
pinpad(index).loadWorkKeyEx(keyType: number, masterkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, algoFlag: number, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadWorkKeyEx(keyType: number, masterkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, algoFlag: number, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Work key type. |
| `masterkeyIndex` | `number` | Master key index. |
| `wkeyIndex` | `number` | Work key index. |
| `keyValue` | `Uint8Array` | Work key value. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `checkValue` | `Uint8Array` | Work key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `encryptByTdkEx`

Encrypted data with TDK.(Extend)

```ts
pinpad(index).encryptByTdkEx(keyIndex: number, mode: number, random: Uint8Array, data: Uint8Array, algoFlag: number, encryptData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).encryptByTdkEx(keyIndex: number, mode: number, random: Uint8Array, data: Uint8Array, algoFlag: number, encryptData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Work key index. |
| `mode` | `number` | Encryption algorithm mode. 0: ECB; 1: CBC. |
| `random` | `Uint8Array` | Random number. |
| `data` | `Uint8Array` | Data to be encrypted. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `encryptData` | `Uint8Array` | Encrypt data. |

**Returns** — 0: Encrypted data successful; Other: Encrypted data failed.

---

### `loadTEKEx`

Inject TEK.(Extend)

```ts
pinpad(index).loadTEKEx(keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadTEKEx(keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | TEK index. |
| `key` | `Uint8Array` | TEK value. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `checkValue` | `Uint8Array` | TEK check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadEncryptMainkeyEx`

Inject TEK encrypted master key.(Extend)

```ts
pinpad(index).loadEncryptMainkeyEx(tekkeyIndex: number, keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadEncryptMainkeyEx(tekkeyIndex: number, keyIndex: number, key: Uint8Array, algoFlag: number, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tekkeyIndex` | `number` | TEK index. |
| `keyIndex` | `number` | Master key index. |
| `key` | `Uint8Array` | Master key value. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `checkValue` | `Uint8Array` | Master key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `loadTWKEx`

Inject TEK encrypted work key.(Extend)

```ts
pinpad(index).loadTWKEx(keyType: number, tekkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, algoFlag: number, checkValue: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadTWKEx(keyType: number, tekkeyIndex: number, wkeyIndex: number, keyValue: Uint8Array, algoFlag: number, checkValue: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Work key type. |
| `tekkeyIndex` | `number` | TEK index. |
| `wkeyIndex` | `number` | Work key index. |
| `keyValue` | `Uint8Array` | Work key value. |
| `algoFlag` | `number` | Algo Flag sm4=1. |
| `checkValue` | `Uint8Array` | Work key check value. |

**Returns** — true: Inject key successful; false: Inject key failed.

---

### `checkkey`

Calculate the key check value

```ts
pinpad(index).checkkey(mkeyIndexx: number, wKeyType: number, isSm4: boolean): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).checkkey(mkeyIndexx: number, wKeyType: number, isSm4: boolean): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `mkeyIndexx` | `number` | Work key index. |
| `wKeyType` | `number` | Work key type. |
| `isSm4` | `boolean` | Is it SM4. true: yes; false: no. |

**Returns** — true: Calculate the key check value successful; false: Calculate the key check value failed.

---

### `getDUKPTKsnExt`

Get the current KSN value of Dukpt.(Extend)

```ts
pinpad(index).getDUKPTKsnExt(keyIndex: number, increaseType: number, keyType: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getDUKPTKsnExt(keyIndex: number, increaseType: number, keyType: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyIndex` | `number` | Key index. |
| `increaseType` | `number` | Whether to auto increment. 1: incremented; 2: not incremented. |
| `keyType` | `number` | Key type. |

**Returns** — KSN value: Get KSN successful; null: Get KSN failed.

---

### `storedRecord`

Data write and reading

```ts
pinpad(index).storedRecord(actionType: number, recordNumber: number, data: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).storedRecord(actionType: number, recordNumber: number, data: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `actionType` | `number` | PinpadConstant.ACTION_READ or PinpadConstant.ACTION_WRITE |
| `recordNumber` | `number` | Read Data or Write Data Record Number |
| `data` | `Uint8Array` | Data to be written (null if none) |

**Returns** — If the data is returned in read mode

---

### `algCalculate`

Calculate Data

```ts
pinpad(index).algCalculate(data: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).algCalculate(data: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `data` | `Uint8Array` | Data to be calculated and packaging format PinPadAlgParam.getPinPadAlgParamData |

**Returns** — Calculation results

---

### `getKeyCheckValueExt`

Get key check value.

```ts
pinpad(index).getKeyCheckValueExt(keyType: number, KeyIndex: number, kcvMode: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getKeyCheckValueExt(keyType: number, KeyIndex: number, kcvMode: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `number` | Key type. |
| `KeyIndex` | `number` | Key index. |
| `kcvMode` | `number` | kcvMode： PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_ZERO PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_SN PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_CMAC |

**Returns** — Check value: Get key check value successful; null: Get key check value failed.

---

### `getInstalledKey`

Get Installed Key

```ts
pinpad(index).getInstalledKey(keyType: KeyType, maxKeyNum: number, keyIndex: Input<IntArrayTypeValue>)
  : Effect<{ result: number; out: { keyIndex: IntArrayTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getInstalledKey(keyType: KeyType, maxKeyNum: number, keyIndex: Input<IntArrayTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `maxKeyNum` | `number` | Output maximum number of keys |
| `keyIndex` | `Input<IntArrayTypeValue>` | Output Key Index |

**Returns** — 0: successful,Other: failed.

**Out-parameters** — Java writes the payload into `keyIndex`
rather than returning it; read it from `out`.

---

### `loadKeyByTr31Mode`

Load Key By Tr31 Mode Data

```ts
pinpad(index).loadKeyByTr31Mode(kbpkKeyType: KeyType, kbpkKeyIndex: number, saveKeyIndex: number, tr31Data: string, ksn: Uint8Array, packageName: Uint8Array, keyCheckValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { keyCheckValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).loadKeyByTr31Mode(kbpkKeyType: KeyType, kbpkKeyIndex: number, saveKeyIndex: number, tr31Data: string, ksn: Uint8Array, packageName: Uint8Array, keyCheckValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `kbpkKeyType` | `KeyType` |  |
| `kbpkKeyIndex` | `number` | kbpk Key Index |
| `saveKeyIndex` | `number` | Save Tr31 Key Index |
| `tr31Data` | `string` | Tr31 Data |
| `ksn` | `Uint8Array` |  |
| `packageName` | `Uint8Array` |  |
| `keyCheckValue` | `Input<BytesTypeValue>` |  |

**Returns** — 0: successful,Other: failed.

**Out-parameters** — Java writes the payload into `keyCheckValue`
rather than returning it; read it from `out`.

---

### `getTr31SaveKeyType`

Obtain the key type saved in tr31 through tr31Data

```ts
pinpad(index).getTr31SaveKeyType(tr31Data: string): Effect<KeyType, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).getTr31SaveKeyType(tr31Data: string): KeyType
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tr31Data` | `string` | tr31 Data |

**Returns** — KeyType Key Type

---

### `genKBPKKey`

Gen KBPK Key

```ts
pinpad(index).genKBPKKey(tr31Mode: Tr31Mode, kbpkKeyType: KeyType, kbpkKeyIndex: number, key: Input<AsymmetricKey>, packageName: Uint8Array, encryptedDataValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { encryptedDataValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.pinpad(index).genKBPKKey(tr31Mode: Tr31Mode, kbpkKeyType: KeyType, kbpkKeyIndex: number, key: Input<AsymmetricKey>, packageName: Uint8Array, encryptedDataValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tr31Mode` | `Tr31Mode` |  |
| `kbpkKeyType` | `KeyType` |  |
| `kbpkKeyIndex` | `number` | Gen KBPK Key Index |
| `key` | `Input<AsymmetricKey>` |  |
| `packageName` | `Uint8Array` |  |
| `encryptedDataValue` | `Input<BytesTypeValue>` |  |

**Returns** — 0: successful,Other: failed.

**Out-parameters** — Java writes the payload into `encryptedDataValue`
rather than returning it; read it from `out`.

