# keyLoadDown

`com.topwise.cloudpos.aidl.kld.AidlKeyLoadDown`

58 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`testRandom`](#testrandom) · [`testAlgorithm`](#testalgorithm) · [`saveLog`](#savelog) · [`openSerial`](#openserial) · [`exportLog`](#exportlog) · [`encryptByTr31DMode`](#encryptbytr31dmode) · [`decryptByTr31DMode`](#decryptbytr31dmode) · [`communicateByHSM`](#communicatebyhsm) · [`setTr34Service`](#settr34service) · [`bindTr34Service`](#bindtr34service) · [`getTr34Data`](#gettr34data) · [`verifyTr34DataPack`](#verifytr34datapack) · [`unBindTr34Service`](#unbindtr34service) · [`decryptECCCipherText`](#decrypteccciphertext) · [`getTr34CipherText`](#gettr34ciphertext) · [`genSignApAsyKeyPair`](#gensignapasykeypair) · [`dukptBdkToIPEK`](#dukptbdktoipek) · [`encryptRsaPrivateKey`](#encryptrsaprivatekey) · [`decryptAndSaveRsaPrivateKey`](#decryptandsaversaprivatekey) · [`KldGetCertAndSecret`](#kldgetcertandsecret) · [`triggerKeyTransmission`](#triggerkeytransmission) · [`sendKRDPublicKey`](#sendkrdpublickey) · [`sendKRDPrivateKey`](#sendkrdprivatekey) · [`sendKRDPubPriKeyIndex`](#sendkrdpubprikeyindex) · [`sendKRDCertificate`](#sendkrdcertificate) · [`receiveCsrRequest`](#receivecsrrequest) · [`getAuditedCertificate`](#getauditedcertificate) · [`CSRRequestCertificateIssue`](#csrrequestcertificateissue) · [`sendKRDCRTPrivateKey`](#sendkrdcrtprivatekey) · [`KldReplyResult`](#kldreplyresult) · [`receiveCustomerSecret`](#receivecustomersecret) · [`eraseKMSData`](#erasekmsdata) · [`getTMK_BDKEncryptedByZMK`](#gettmk-bdkencryptedbyzmk) · [`getTMK_BDKKeyComponent`](#gettmk-bdkkeycomponent) · [`getKDHCertForKDH`](#getkdhcertforkdh) · [`getAllSecretIndex`](#getallsecretindex) · [`getSecretKeyForKDH`](#getsecretkeyforkdh) · [`verifySecretKeyKCVForKDH`](#verifysecretkeykcvforkdh) · [`getKdhCtToken`](#getkdhcttoken) · [`KdhSendCTToken`](#kdhsendcttoken) · [`getKtKdhRandomNonce`](#getktkdhrandomnonce) · [`sendKtKdhToken`](#sendktkdhtoken) · [`generatePKCS10`](#generatepkcs10) · [`getTMK_BDKKeyComponentByTr31`](#gettmk-bdkkeycomponentbytr31) · [`encryptAndMergeKeyComp`](#encryptandmergekeycomp) · [`getCaLMKKeyCompKCV`](#getcalmkkeycompkcv) · [`getUnbindKdhRandomNonce`](#getunbindkdhrandomnonce) · [`unbindDeviceCert`](#unbinddevicecert) · [`sendUnbindKdhToken`](#sendunbindkdhtoken) · [`sendUnbindResult`](#sendunbindresult) · [`getRebindKdhRandomNonce`](#getrebindkdhrandomnonce) · [`rebindDeviceCert`](#rebinddevicecert) · [`sendRebindKdhToken`](#sendrebindkdhtoken) · [`sendRebindResult`](#sendrebindresult) · [`downloadCerToSp`](#downloadcertosp) · [`exportKeyToTR31UseZMK`](#exportkeytotr31usezmk) · [`importKeyFromTR31UseZMK`](#importkeyfromtr31usezmk) · [`calKeyComponentKCV`](#calkeycomponentkcv)

---

### `testRandom`

```ts
keyLoadDown.testRandom(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.testRandom(): boolean
```

---

### `testAlgorithm`

```ts
keyLoadDown.testAlgorithm(arg0: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.testAlgorithm(arg0: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `saveLog`

```ts
keyLoadDown.saveLog(arg0: string, arg1: string, arg2: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.saveLog(arg0: string, arg1: string, arg2: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |
| `arg2` | `boolean` |

---

### `openSerial`

```ts
keyLoadDown.openSerial(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.openSerial(): boolean
```

---

### `exportLog`

```ts
keyLoadDown.exportLog()
  : Stream<KLDLogExportListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.keyLoadDown.exportLog({ onEvent }): Unsubscribe
```

**Events** — [`KLDLogExportListenerEvent`](../events.md#kldlogexportlistenerevent).

---

### `encryptByTr31DMode`

```ts
keyLoadDown.encryptByTr31DMode(arg0: number, arg1: number, arg2: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.encryptByTr31DMode(arg0: number, arg1: number, arg2: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `arg2` | `Uint8Array` |

---

### `decryptByTr31DMode`

```ts
keyLoadDown.decryptByTr31DMode(arg0: number, arg1: number, arg2: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.decryptByTr31DMode(arg0: number, arg1: number, arg2: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `arg2` | `Uint8Array` |

---

### `communicateByHSM`

```ts
keyLoadDown.communicateByHSM(arg0: number, arg1: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.communicateByHSM(arg0: number, arg1: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `Uint8Array` |

---

### `setTr34Service`

```ts
keyLoadDown.setTr34Service(arg0: string, arg1: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.setTr34Service(arg0: string, arg1: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `number` |

---

### `bindTr34Service`

```ts
keyLoadDown.bindTr34Service(arg0: string, arg1: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.bindTr34Service(arg0: string, arg1: string): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `getTr34Data`

```ts
keyLoadDown.getTr34Data(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getTr34Data(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `verifyTr34DataPack`

```ts
keyLoadDown.verifyTr34DataPack(arg0: string, arg1: string, arg2: string): Effect<Tr34Data, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.verifyTr34DataPack(arg0: string, arg1: string, arg2: string): Tr34Data
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |
| `arg2` | `string` |

---

### `unBindTr34Service`

```ts
keyLoadDown.unBindTr34Service(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.unBindTr34Service(): boolean
```

---

### `decryptECCCipherText`

```ts
keyLoadDown.decryptECCCipherText(arg0: number, arg1: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.decryptECCCipherText(arg0: number, arg1: Uint8Array): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `Uint8Array` |

---

### `getTr34CipherText`

```ts
keyLoadDown.getTr34CipherText(arg0: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getTr34CipherText(arg0: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |

---

### `genSignApAsyKeyPair`

```ts
keyLoadDown.genSignApAsyKeyPair(arg0: number, arg1: number, asyKeyPairType: Input<AsyKeyPairType>)
  : Effect<{ result: number; out: { asyKeyPairType: AsyKeyPairType } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.genSignApAsyKeyPair(arg0: number, arg1: number, asyKeyPairType: Input<AsyKeyPairType>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `asyKeyPairType` | `Input<AsyKeyPairType>` |

**Out-parameters** — Java writes the payload into `asyKeyPairType`
rather than returning it; read it from `out`.

---

### `dukptBdkToIPEK`

```ts
keyLoadDown.dukptBdkToIPEK(arg0: Uint8Array, arg1: Uint8Array, arg2: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.dukptBdkToIPEK(arg0: Uint8Array, arg1: Uint8Array, arg2: number): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |
| `arg1` | `Uint8Array` |
| `arg2` | `number` |

---

### `encryptRsaPrivateKey`

```ts
keyLoadDown.encryptRsaPrivateKey(arg0: number, arg1: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.encryptRsaPrivateKey(arg0: number, arg1: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `Uint8Array` |

---

### `decryptAndSaveRsaPrivateKey`

```ts
keyLoadDown.decryptAndSaveRsaPrivateKey(arg0: number, arg1: number, arg2: Uint8Array, arg3: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.decryptAndSaveRsaPrivateKey(arg0: number, arg1: number, arg2: Uint8Array, arg3: Uint8Array): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `arg2` | `Uint8Array` |
| `arg3` | `Uint8Array` |

---

### `KldGetCertAndSecret`

```ts
keyLoadDown.KldGetCertAndSecret(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.KldGetCertAndSecret(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `triggerKeyTransmission`

```ts
keyLoadDown.triggerKeyTransmission(arg0: number, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.triggerKeyTransmission(arg0: number, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendKRDPublicKey`

```ts
keyLoadDown.sendKRDPublicKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKRDPublicKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendKRDPrivateKey`

```ts
keyLoadDown.sendKRDPrivateKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKRDPrivateKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendKRDPubPriKeyIndex`

```ts
keyLoadDown.sendKRDPubPriKeyIndex(arg0: number, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKRDPubPriKeyIndex(arg0: number, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendKRDCertificate`

```ts
keyLoadDown.sendKRDCertificate(arg0: string, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKRDCertificate(arg0: string, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `receiveCsrRequest`

```ts
keyLoadDown.receiveCsrRequest(certificateType: CertificateType, arg1: string, arg2: string, requestFrom: RequestFrom): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.receiveCsrRequest(certificateType: CertificateType, arg1: string, arg2: string, requestFrom: RequestFrom): string
```

| Parameter | Type |
| --- | --- |
| `certificateType` | `CertificateType` |
| `arg1` | `string` |
| `arg2` | `string` |
| `requestFrom` | `RequestFrom` |

---

### `getAuditedCertificate`

```ts
keyLoadDown.getAuditedCertificate(arg0: string, certificateType: CertificateType, arg2: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getAuditedCertificate(arg0: string, certificateType: CertificateType, arg2: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `certificateType` | `CertificateType` |
| `arg2` | `string` |

---

### `CSRRequestCertificateIssue`

```ts
keyLoadDown.CSRRequestCertificateIssue(arg0: string, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.CSRRequestCertificateIssue(arg0: string, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `sendKRDCRTPrivateKey`

```ts
keyLoadDown.sendKRDCRTPrivateKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKRDCRTPrivateKey(arg0: string, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `KldReplyResult`

```ts
keyLoadDown.KldReplyResult(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.KldReplyResult(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `receiveCustomerSecret`

```ts
keyLoadDown.receiveCustomerSecret(customerSecret: Input<CustomerSecret>): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.receiveCustomerSecret(customerSecret: Input<CustomerSecret>): string
```

| Parameter | Type |
| --- | --- |
| `customerSecret` | `Input<CustomerSecret>` |

---

### `eraseKMSData`

```ts
keyLoadDown.eraseKMSData(kMSCerType: KMSCerType, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.eraseKMSData(kMSCerType: KMSCerType, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `kMSCerType` | `KMSCerType` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `getTMK_BDKEncryptedByZMK`

```ts
keyLoadDown.getTMK_BDKEncryptedByZMK(arg0: string, arg1: number, arg2: number, arg3: string, arg4: number, arg5: number, arg6: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getTMK_BDKEncryptedByZMK(arg0: string, arg1: number, arg2: number, arg3: string, arg4: number, arg5: number, arg6: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `number` |
| `arg2` | `number` |
| `arg3` | `string` |
| `arg4` | `number` |
| `arg5` | `number` |
| `arg6` | `Uint8Array` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `getTMK_BDKKeyComponent`

```ts
keyLoadDown.getTMK_BDKKeyComponent(arg0: number, arg1: number, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getTMK_BDKKeyComponent(arg0: number, arg1: number, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `getKDHCertForKDH`

```ts
keyLoadDown.getKDHCertForKDH(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getKDHCertForKDH(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `getAllSecretIndex`

```ts
keyLoadDown.getAllSecretIndex(arg0: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getAllSecretIndex(arg0: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `getSecretKeyForKDH`

```ts
keyLoadDown.getSecretKeyForKDH(arg0: string, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getSecretKeyForKDH(arg0: string, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `verifySecretKeyKCVForKDH`

```ts
keyLoadDown.verifySecretKeyKCVForKDH(arg0: string, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.verifySecretKeyKCVForKDH(arg0: string, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `getKdhCtToken`

```ts
keyLoadDown.getKdhCtToken(bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getKdhCtToken(bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `KdhSendCTToken`

```ts
keyLoadDown.KdhSendCTToken(arg0: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.KdhSendCTToken(arg0: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `getKtKdhRandomNonce`

```ts
keyLoadDown.getKtKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getKtKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendKtKdhToken`

```ts
keyLoadDown.sendKtKdhToken(arg0: Uint8Array, arg1: number, arg2: number, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendKtKdhToken(arg0: Uint8Array, arg1: number, arg2: number, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |
| `arg1` | `number` |
| `arg2` | `number` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `generatePKCS10`

```ts
keyLoadDown.generatePKCS10(arg0: number, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.generatePKCS10(arg0: number, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `string` |

---

### `getTMK_BDKKeyComponentByTr31`

```ts
keyLoadDown.getTMK_BDKKeyComponentByTr31(arg0: number, arg1: string, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getTMK_BDKKeyComponentByTr31(arg0: number, arg1: string, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `string` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `encryptAndMergeKeyComp`

```ts
keyLoadDown.encryptAndMergeKeyComp(symAlgType: SymAlgType, arg1: Uint8Array, arg2: Uint8Array, arg3: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.encryptAndMergeKeyComp(symAlgType: SymAlgType, arg1: Uint8Array, arg2: Uint8Array, arg3: number): string
```

| Parameter | Type |
| --- | --- |
| `symAlgType` | `SymAlgType` |
| `arg1` | `Uint8Array` |
| `arg2` | `Uint8Array` |
| `arg3` | `number` |

---

### `getCaLMKKeyCompKCV`

```ts
keyLoadDown.getCaLMKKeyCompKCV(symAlgType: SymAlgType, arg1: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getCaLMKKeyCompKCV(symAlgType: SymAlgType, arg1: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `symAlgType` | `SymAlgType` |
| `arg1` | `Uint8Array` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `getUnbindKdhRandomNonce`

```ts
keyLoadDown.getUnbindKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getUnbindKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `unbindDeviceCert`

```ts
keyLoadDown.unbindDeviceCert(arg0: string, arg1: boolean): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.unbindDeviceCert(arg0: string, arg1: boolean): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |

---

### `sendUnbindKdhToken`

```ts
keyLoadDown.sendUnbindKdhToken(arg0: string, arg1: boolean, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendUnbindKdhToken(arg0: string, arg1: boolean, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendUnbindResult`

```ts
keyLoadDown.sendUnbindResult(arg0: string, arg1: number, arg2: boolean): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendUnbindResult(arg0: string, arg1: number, arg2: boolean): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `number` |
| `arg2` | `boolean` |

---

### `getRebindKdhRandomNonce`

```ts
keyLoadDown.getRebindKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.getRebindKdhRandomNonce(bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `rebindDeviceCert`

```ts
keyLoadDown.rebindDeviceCert(arg0: string, arg1: boolean): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.rebindDeviceCert(arg0: string, arg1: boolean): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |

---

### `sendRebindKdhToken`

```ts
keyLoadDown.sendRebindKdhToken(arg0: string, arg1: boolean, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendRebindKdhToken(arg0: string, arg1: boolean, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `sendRebindResult`

```ts
keyLoadDown.sendRebindResult(arg0: string, arg1: number, arg2: boolean): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.sendRebindResult(arg0: string, arg1: number, arg2: boolean): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `number` |
| `arg2` | `boolean` |

---

### `downloadCerToSp`

```ts
keyLoadDown.downloadCerToSp(arg0: string, spCerType: SpCerType, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.downloadCerToSp(arg0: string, spCerType: SpCerType, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `spCerType` | `SpCerType` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

---

### `exportKeyToTR31UseZMK`

```ts
keyLoadDown.exportKeyToTR31UseZMK(arg0: string, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.exportKeyToTR31UseZMK(arg0: string, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `importKeyFromTR31UseZMK`

```ts
keyLoadDown.importKeyFromTR31UseZMK(arg0: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: number, arg6: string, arg7: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.importKeyFromTR31UseZMK(arg0: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: number, arg6: string, arg7: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |
| `arg2` | `string` |
| `arg3` | `string` |
| `arg4` | `string` |
| `arg5` | `number` |
| `arg6` | `string` |
| `arg7` | `string` |

---

### `calKeyComponentKCV`

```ts
keyLoadDown.calKeyComponentKCV(symAlgType: SymAlgType, arg1: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)
  : Effect<{ result: number; out: { bytesTypeValue: BytesTypeValue } }, TopwiseError, TopwiseBridge>

// promise client
await topwise.keyLoadDown.calKeyComponentKCV(symAlgType: SymAlgType, arg1: Uint8Array, bytesTypeValue: Input<BytesTypeValue>)  // -> { result, out }
```

| Parameter | Type |
| --- | --- |
| `symAlgType` | `SymAlgType` |
| `arg1` | `Uint8Array` |
| `bytesTypeValue` | `Input<BytesTypeValue>` |

**Out-parameters** — Java writes the payload into `bytesTypeValue`
rather than returning it; read it from `out`.

