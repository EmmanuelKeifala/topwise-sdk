# paywave

`com.topwise.cloudpos.aidl.emv.level2.AidlPaywave`

21 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setDRLParam`](#setdrlparam) · [`setTransData`](#settransdata) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`procRestric`](#procrestric) · [`cardAuth`](#cardauth) · [`issuerAuth`](#issuerauth) · [`issScriptProc`](#issscriptproc) · [`getMSDType`](#getmsdtype) · [`getTrackMapData`](#gettrackmapdata) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

payWave kernel initialization.

```ts
paywave.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.initialize(): number
```

**Returns** — EMV_OK Initialization completed.

---

### `getVersion`

Query the version number of payWave kernel.

```ts
paywave.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version number.For example V100 2020.09.01 (rear part is date) |
| `uiSize` | `number` | [input] The maximum length of pacVer is greater than or equal to 20bytes. |

**Returns** — EMV_OK Initialization completed. CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set several data elements into kernel at one time.

```ts
paywave.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTlvData` | `Uint8Array` | [input] The data elements list with TLV format. |
| `unDataLen` | `number` | [input] The Length of pucTLVData. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_DATA_ERR Data error found.

---

### `getTLVDataList`

Get one data element specified by the tag.

```ts
paywave.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `pucDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial indicated by pacTagList. |

**Returns** — EMV_OK Successful. EMV_NOT_FOUND Can’t find the tag or no data。

---

### `addCAPK`

Add a new CA public key.

```ts
paywave.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key.Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error. EMV_OVERFLOW Memory overflow.(CLSS Kernel supports only one CA public keys at most).

---

### `delAllCAPK`

Delete all CA public keys.

```ts
paywave.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
paywave.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_DATA_ERR Input data error (the pointer is null). EMV_OVERFLOW Memory overflow.

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
paywave.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.delAllRevocList(): void
```

---

### `setDRLParam`

Set DRL parameters.

```ts
paywave.setDRLParam(stDRLParam: Input<ProgramID>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.setDRLParam(stDRLParam: Input<ProgramID>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stDRLParam` | `Input<ProgramID>` | [input] DRL parameters. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

---

### `setTransData`

Set the transaction related parameters and the result of Pre-processing.

```ts
paywave.setTransData(stTransParam: Input<TransParam>, stInfo: Input<PreProcResult>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.setTransData(stTransParam: Input<TransParam>, stInfo: Input<PreProcResult>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stTransParam` | `Input<TransParam>` | [input] The related parameters of transaction. |
| `stInfo` | `Input<PreProcResult>` | [input] The result of Pre-processing. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error(the pointer is null).

---

### `setFinalSelectData`

Initialize all data elements of kernel and set the data returned from card during final selection.

```ts
paywave.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucFCI` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `unFCILen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. EMV_DATA_ERR Data format error.

---

### `gpoProc`

This function includes the processing of GPO.

```ts
paywave.gpoProc(pucTransPath: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.gpoProc(pucTransPath: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucTransPath` | `Uint8Array` | [output] Transaction Path (it is effective only when EMV_OK is returned) CLSS_TRANSPATH_EMV –qVSDC. CLSS_TRANSPATH_MAG –MagStripe. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `readData`

This function includes read record and Processing Restrictions.

```ts
paywave.readData(pucACType: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.readData(pucACType: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucACType` | `Uint8Array` | [output] AC Type(It is effective only when EMV_OK is returned): AC_ AAC: Decline. AC_ TC: Offline Approve. AC_ ARQC: Online Request. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_DECLINE Transaction declined. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `procRestric`

> **Deprecated** by the vendor.

```ts
paywave.procRestric(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.procRestric(ucExceptFileFlg: number): number
```

| Parameter | Type |
| --- | --- |
| `ucExceptFileFlg` | `number` |

---

### `cardAuth`

Do offline data authentication and return AC type.

```ts
paywave.cardAuth(pucACType: Uint8Array, pucODAFailFlg: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.cardAuth(pucACType: Uint8Array, pucODAFailFlg: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucACType` | `Uint8Array` | [output] AC Type:(value: AC_ AAC, AC_ TC, or AC_ARQC) |
| `pucODAFailFlg` | `Uint8Array` | [output] Failure flag of DDA authentication:1:fail 0:success |

**Returns** — EMV_OK Successful. CLSS_USE_CONTACT Use other transaction interface.

---

### `issuerAuth`

Issuer authentication

```ts
paywave.issuerAuth(paucIAuthData: Uint8Array, unIAuthDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.issuerAuth(paucIAuthData: Uint8Array, unIAuthDataLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucIAuthData` | `Uint8Array` | [input] Issuer Authentication data. |
| `unIAuthDataLen` | `number` | [input] Length of Issuer Authentication data |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminated.

---

### `issScriptProc`

Issuer script process.

```ts
paywave.issScriptProc(paucScript: Uint8Array, unScriptLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.issScriptProc(paucScript: Uint8Array, unScriptLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucScript` | `Uint8Array` | [input] Script data. |
| `unScriptLen` | `number` | [input] Script data length. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `getMSDType`

> **Deprecated** by the vendor.

```ts
paywave.getMSDType(ucMSDType: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.getMSDType(ucMSDType: Uint8Array): number
```

| Parameter | Type |
| --- | --- |
| `ucMSDType` | `Uint8Array` |

---

### `getTrackMapData`

Get mapped TRACK1 data. Get mapped TRACK2 data

```ts
paywave.getTrackMapData(ucTrackFlg: number, pTrackData: Uint8Array, pLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.getTrackMapData(ucTrackFlg: number, pTrackData: Uint8Array, pLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucTrackFlg` | `number` | [input] Track1 or 2 flag. |
| `pTrackData` | `Uint8Array` | [input] Mapped TRACK data |
| `pLen` | `ReadonlyArray<number>` | [output] Length of mapped TRACK data. |

**Returns** — EMV_OK Successful; EMV_DATA_ERR Mandatory data is missing. CLSS_PARAM_ERR Parameter error.

---

### `getDebugInfo`

Get the debug information.

```ts
paywave.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used). |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used). |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. EMV_PARAM_ERR The parameters are error.

---

### `setExtendFunc`

Extend function to set additional information.

```ts
paywave.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paywave.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] 1: set the behavior of AUC processing for cash and cashback transactions. 2: set AC Type requested when qVSDC online ODA is failed. Other: RFU. |
| `paucDataIn` | `Uint8Array` | [input] If nFlag is 1, 2 Bytes shall be set. Byte 1: AUC is not checked for Cash transaction. 0x00 – no; 0x01 – Yes. Byte 2: AUC is not checked for Cashback transaction. 0x00 – no; 0x01 –Yes. If nFlag is 2, 3 Bytes shall be set. Byte 1: Transaction gets declined offline or forwarded online when online ODA fails. 0x00 - declined offline; 0x01 - forwarded online. Byte 2: fDDA is supported or not for online ODA. 0x00 – No; 0x01 – Yes Byte 3: SDA is supported or not for online ODA. 0x00 – No; 0x01 - Yes |
| `nDataInLen` | `number` | [input] The length of paucDataIn input. If nFlag is 1: The length shall be 2. If nFlag is 2: The length shall be 3. Other value will not be allowed. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

