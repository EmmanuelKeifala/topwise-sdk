# keyManager

`com.topwise.cloudpos.aidl.keymanager.AidlKeyManager`

18 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`loadSymKey`](#loadsymkey) · [`loadSymProtectKey`](#loadsymprotectkey) · [`loadDukptKey`](#loaddukptkey) · [`loadDukptProtectKey`](#loaddukptprotectkey) · [`loadAsyKey`](#loadasykey) · [`getDukptKSN`](#getdukptksn) · [`genAsyKeyPair`](#genasykeypair) · [`readAsyKey`](#readasykey) · [`getKeyKCV`](#getkeykcv) · [`symCalculateByIndex`](#symcalculatebyindex) · [`macCalculateByIndex`](#maccalculatebyindex) · [`dukptCalculateByIndex`](#dukptcalculatebyindex) · [`asyCalculateByIndex`](#asycalculatebyindex) · [`deleteKeyByIndex`](#deletekeybyindex) · [`deleteAllKey`](#deleteallkey) · [`getKeyStatus`](#getkeystatus) · [`getRandom`](#getrandom) · [`calKeyKCVByCmac`](#calkeykcvbycmac)

---

### `loadSymKey`

Load symmetric key

```ts
keyManager.loadSymKey(keyType: KeyType, keyIndex: number, algType: SymAlgType, keyData: Uint8Array, keyDataLen: number, keyCheckValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { keyCheckValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.loadSymKey(keyType: KeyType, keyIndex: number, algType: SymAlgType, keyData: Uint8Array, keyDataLen: number, keyCheckValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algType` | `SymAlgType` | Symmetric algorithm Type |
| `keyData` | `Uint8Array` | [INPUT] Key data to be injected |
| `keyDataLen` | `number` | [INPUT] Key data length to be injected |
| `keyCheckValue` | `Input<BytesTypeValue>` | [OUTPUT] Key Check Value |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `keyCheckValue`
rather than returning it; read it from `out`.

---

### `loadSymProtectKey`

Load symmetric key encrypted by key

```ts
keyManager.loadSymProtectKey(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, protectKeyType: KeyType, protectKeyIndex: number, keyData: Uint8Array, keyDataLen: number, keyCheckValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { keyCheckValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.loadSymProtectKey(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, protectKeyType: KeyType, protectKeyIndex: number, keyData: Uint8Array, keyDataLen: number, keyCheckValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algMode` | `SymAlgMode` | Symmetric algorithm ENCRYPT MODE |
| `protectKeyType` | `KeyType` | protect Key Type |
| `protectKeyIndex` | `number` | protect Key Index |
| `keyData` | `Uint8Array` | [INPUT] Key data to be injected |
| `keyDataLen` | `number` | [INPUT] Key data length to be injected |
| `keyCheckValue` | `Input<BytesTypeValue>` | [OUTPUT] Key Check Value |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `keyCheckValue`
rather than returning it; read it from `out`.

---

### `loadDukptKey`

Load derived unique key per transaction

```ts
keyManager.loadDukptKey(keyType: KeyType, keyIndex: number, algType: SymAlgType, keyData: Uint8Array, iKsnData: Uint8Array, keyCheckValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { keyCheckValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.loadDukptKey(keyType: KeyType, keyIndex: number, algType: SymAlgType, keyData: Uint8Array, iKsnData: Uint8Array, keyCheckValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algType` | `SymAlgType` | Symmetric algorithm Type |
| `keyData` | `Uint8Array` | [INPUT] Key data to be injected |
| `iKsnData` | `Uint8Array` | [INPUT] Key data length to be injected |
| `keyCheckValue` | `Input<BytesTypeValue>` | [OUTPUT] Key Check Value |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `keyCheckValue`
rather than returning it; read it from `out`.

---

### `loadDukptProtectKey`

Load derived unique key per transaction key encrypted by key

```ts
keyManager.loadDukptProtectKey(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, protectKeyType: KeyType, protectKeyIndex: number, keyData: Uint8Array, iKsnData: Uint8Array, keyCheckValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { keyCheckValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.loadDukptProtectKey(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, protectKeyType: KeyType, protectKeyIndex: number, keyData: Uint8Array, iKsnData: Uint8Array, keyCheckValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algMode` | `SymAlgMode` | Symmetric algorithm ENCRYPT MODE |
| `protectKeyType` | `KeyType` | protect Key Type |
| `protectKeyIndex` | `number` | protect Key Index |
| `keyData` | `Uint8Array` | [INPUT] Key data to be injected |
| `iKsnData` | `Uint8Array` | [INPUT] ksn data to be injected |
| `keyCheckValue` | `Input<BytesTypeValue>` | [OUTPUT] Key Check Value |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `keyCheckValue`
rather than returning it; read it from `out`.

---

### `loadAsyKey`

Load asymmetric public-private key pairs

```ts
keyManager.loadAsyKey(key: Input<AsymmetricKey>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.loadAsyKey(key: Input<AsymmetricKey>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `key` | `Input<AsymmetricKey>` | public-private key pairs |

**Returns** — 0:success,other:fail

---

### `getDukptKSN`

get Dukput KSN data

```ts
keyManager.getDukptKSN(type: DukptKeyType, keyIndex: number, increaseMode: IncreaseMode, ksnBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { ksnBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.getDukptKSN(type: DukptKeyType, keyIndex: number, increaseMode: IncreaseMode, ksnBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `type` | `DukptKeyType` | Dukpt Key Type |
| `keyIndex` | `number` | Key Index |
| `increaseMode` | `IncreaseMode` | Autoincrement Mode |
| `ksnBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT] dukput KSN data |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `ksnBytesTypeValue`
rather than returning it; read it from `out`.

---

### `genAsyKeyPair`

Generate asymmetric public-private key pairs

```ts
keyManager.genAsyKeyPair(asyKeyType: AsyKeyType, keyIndex: number, rsaBits: number, asyKeyPairType: Input<AsyKeyPairType>)
  : Effect<{ result: number; out: { asyKeyPairType: AsyKeyPairType } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.genAsyKeyPair(asyKeyType: AsyKeyType, keyIndex: number, rsaBits: number, asyKeyPairType: Input<AsyKeyPairType>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `asyKeyType` | `AsyKeyType` | Asymmetric Key Type |
| `keyIndex` | `number` | Key Index |
| `rsaBits` | `number` | Generate asymmetric public-private rsa Bits(1024,2048) |
| `asyKeyPairType` | `Input<AsyKeyPairType>` | [OUTPUT] Asymmetric Key Pair Data |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `asyKeyPairType`
rather than returning it; read it from `out`.

---

### `readAsyKey`

Read asymmetric key

```ts
keyManager.readAsyKey(asyKeyType: AsyKeyType, keyIndex: number, asyKeyPairType: Input<AsyKeyPairType>)
  : Effect<{ result: number; out: { asyKeyPairType: AsyKeyPairType } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.readAsyKey(asyKeyType: AsyKeyType, keyIndex: number, asyKeyPairType: Input<AsyKeyPairType>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `asyKeyType` | `AsyKeyType` | Asymmetric Key Type |
| `keyIndex` | `number` | Key Index |
| `asyKeyPairType` | `Input<AsyKeyPairType>` | [OUTPUT] Asymmetric Key Pair Data |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `asyKeyPairType`
rather than returning it; read it from `out`.

---

### `getKeyKCV`

Get key check value.

```ts
keyManager.getKeyKCV(keyType: KeyType, keyIndex: number, verifyMode: KCVVerifyMode, kcvBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { kcvBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.getKeyKCV(keyType: KeyType, keyIndex: number, verifyMode: KCVVerifyMode, kcvBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key type. |
| `keyIndex` | `number` | Key index. |
| `verifyMode` | `KCVVerifyMode` | PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_ZERO PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_SN PinpadConstant.KCVVerifyMode.KCV_ENCRYPT_CMAC |
| `kcvBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT]key check value |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `kcvBytesTypeValue`
rather than returning it; read it from `out`.

---

### `symCalculateByIndex`

Symmetric algorithm data calculation through index

```ts
keyManager.symCalculateByIndex(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, initVector: Uint8Array, vectorLen: number, data: Uint8Array, dataLen: number, paddingMode: SymPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { resultBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.symCalculateByIndex(keyType: KeyType, keyIndex: number, algMode: SymAlgMode, initVector: Uint8Array, vectorLen: number, data: Uint8Array, dataLen: number, paddingMode: SymPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algMode` | `SymAlgMode` | Symmetric algorithm Mode |
| `initVector` | `Uint8Array` | [INPUT]Init Vector Data |
| `vectorLen` | `number` | [INPUT]Init Vector Data length |
| `data` | `Uint8Array` | [INPUT]Data to be calculated |
| `dataLen` | `number` | [INPUT] Data length to be calculated |
| `paddingMode` | `SymPaddingMode` | Padding Mode |
| `resultBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT]Calculation results |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `resultBytesTypeValue`
rather than returning it; read it from `out`.

---

### `macCalculateByIndex`

data mac calculation through index

```ts
keyManager.macCalculateByIndex(keyType: KeyType, keyIndex: number, algMode: MacAlgMode, data: Uint8Array, dataLen: number, macBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { macBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.macCalculateByIndex(keyType: KeyType, keyIndex: number, algMode: MacAlgMode, data: Uint8Array, dataLen: number, macBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `algMode` | `MacAlgMode` | MAC algorithm Mode |
| `data` | `Uint8Array` | [INPUT]Data to be calculated |
| `dataLen` | `number` | [INPUT] Data length to be calculated |
| `macBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT]Calculation results |

**Returns** — sultBytesTypeValue [OUTPUT]Calculation results * @return 0:success,other:fail

**Out-parameters** — Java writes the payload into `macBytesTypeValue`
rather than returning it; read it from `out`.

---

### `dukptCalculateByIndex`

dukpt data calculation through index

```ts
keyManager.dukptCalculateByIndex(keyType: KeyType, keyIndex: number, keyUsage: KeyUsage, algMode: SymAlgMode, initVector: Uint8Array, vectorLen: number, data: Uint8Array, dataLen: number, paddingMode: SymPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { resultBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.dukptCalculateByIndex(keyType: KeyType, keyIndex: number, keyUsage: KeyUsage, algMode: SymAlgMode, initVector: Uint8Array, vectorLen: number, data: Uint8Array, dataLen: number, paddingMode: SymPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |
| `keyUsage` | `KeyUsage` | Key Usage |
| `algMode` | `SymAlgMode` | Symmetric algorithm Mode |
| `initVector` | `Uint8Array` | [INPUT]Init Vector Data |
| `vectorLen` | `number` | [INPUT]Init Vector Data length |
| `data` | `Uint8Array` | [INPUT]Data to be calculated |
| `dataLen` | `number` | [INPUT] Data length to be calculated |
| `paddingMode` | `SymPaddingMode` | Padding Mode |
| `resultBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT]Calculation results |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `resultBytesTypeValue`
rather than returning it; read it from `out`.

---

### `asyCalculateByIndex`

Asymmetric algorithm data calculation through index

```ts
keyManager.asyCalculateByIndex(asyKeyType: AsyKeyType, calType: AsyCalType, keyIndex: number, data: Uint8Array, dataLen: number, paddingMode: AsyPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { resultBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.asyCalculateByIndex(asyKeyType: AsyKeyType, calType: AsyCalType, keyIndex: number, data: Uint8Array, dataLen: number, paddingMode: AsyPaddingMode, resultBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `asyKeyType` | `AsyKeyType` | Asymmetric Key Type |
| `calType` | `AsyCalType` | Asymmetric calculation type |
| `keyIndex` | `number` | Key Index |
| `data` | `Uint8Array` | [INPUT]Data to be calculated |
| `dataLen` | `number` | [INPUT] Data length to be calculated |
| `paddingMode` | `AsyPaddingMode` | Padding Mode |
| `resultBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT]Calculation results |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `resultBytesTypeValue`
rather than returning it; read it from `out`.

---

### `deleteKeyByIndex`

Delete device key through index

```ts
keyManager.deleteKeyByIndex(keyType: KeyType, keyIndex: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.deleteKeyByIndex(keyType: KeyType, keyIndex: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |

**Returns** — 0:success,other:fail

---

### `deleteAllKey`

Delete Device All Key

```ts
keyManager.deleteAllKey(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.deleteAllKey(): number
```

**Returns** — 0:success,other:fail

---

### `getKeyStatus`

Detect whether the key exists

```ts
keyManager.getKeyStatus(keyType: KeyType, keyIndex: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.getKeyStatus(keyType: KeyType, keyIndex: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyType` | `KeyType` | Key Type |
| `keyIndex` | `number` | Key Index |

**Returns** — 0:success,other:non-existent

---

### `getRandom`

Get Random

```ts
keyManager.getRandom(number: number, resultBytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { resultBytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.getRandom(number: number, resultBytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `number` | `number` | [INPUT] Random number(Maximum 512) |
| `resultBytesTypeValue` | `Input<BytesTypeValue>` | [OUTPUT] Random data |

**Returns** — 0:success,other:fail

**Out-parameters** — Java writes the payload into `resultBytesTypeValue`
rather than returning it; read it from `out`.

---

### `calKeyKCVByCmac`

```ts
keyManager.calKeyKCVByCmac(keyType: KeyType, arg1: number, arg2: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyManager.calKeyKCVByCmac(keyType: KeyType, arg1: number, arg2: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `keyType` | `KeyType` |
| `arg1` | `number` |
| `arg2` | `Uint8Array` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

