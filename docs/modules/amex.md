# amex

`com.topwise.cloudpos.aidl.emv.level2.AidlAmex`

18 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setDRLParam`](#setdrlparam) · [`setTransData`](#settransdata) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`cardAuth`](#cardauth) · [`startTrans`](#starttrans) · [`getTrackMapData`](#gettrackmapdata) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

AMEX kernel initialization.

```ts
amex.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.initialize(): number
```

**Returns** — EMV_OK Initialization completed.

---

### `getVersion`

Query the version number of AMEX kernel.

```ts
amex.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version number. For example V100 2019.11.01 (rear part is date). |
| `uiSize` | `number` | [input] The maximum length of pacVer is greater than or equal to 20bytes. |

**Returns** — EMV_OK Initialization completed. CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set several data elements into kernel at one time.

```ts
amex.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTlvData` | `Uint8Array` | [input] The data elements list with TLV format. |
| `unDataLen` | `number` | [input] The Length of pucTLVData. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_DATA_ERR Data error found.

---

### `getTLVDataList`

Get a data element specified by the tag.

```ts
amex.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pacDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pacDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `pacDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements.Specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial.Indicated by pacTagList. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_NOT_FOUND Can’t find the tag or no data。

---

### `addCAPK`

Add a new CA public key.

```ts
amex.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key.Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error.

---

### `delAllCAPK`

Delete all CA public keys.

```ts
amex.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
amex.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_OVERFLOW Memory overflow. (CLSS library maximum supports 30 revoked issuer public key certifications).

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
amex.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.delAllRevocList(): void
```

---

### `setDRLParam`

Set DRL parameter.

```ts
amex.setDRLParam(stDRLParam: Input<ProgramID>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.setDRLParam(stDRLParam: Input<ProgramID>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stDRLParam` | `Input<ProgramID>` | [input] DRL parameters; Please refer to “Clss_Define.h” for structure definition. |

**Returns** — EMV_OK Successful. EMV_OVERFLOW Memory overflow.

---

### `setTransData`

Set the transaction related parameters and the result of Pre-processing.

```ts
amex.setTransData(stTransParam: Input<TransParam>, stInfo: Input<PreProcResult>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.setTransData(stTransParam: Input<TransParam>, stInfo: Input<PreProcResult>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stTransParam` | `Input<TransParam>` | [input] The related parameters of transaction. Please refer to “Clss_Define.h” for the structure definition of parameters. |
| `stInfo` | `Input<PreProcResult>` | [input] The result of Pre-processing. Please refer to “Clss_Define.h” for the structure definition of parameters. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `setFinalSelectData`

Initialize all data elements of kernel and set the data returned from card during final selection.

```ts
amex.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucRspIn` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `nRspLen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. EMV_DATA_ERR Data error found.

---

### `gpoProc`

This function includes the processing of GPO.

```ts
amex.gpoProc(pucTransMode: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.gpoProc(pucTransMode: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucTransMode` | `Uint8Array` | [output] Transaction Mode. (It is effective only when EMV_OK is returned) CLSS_TRANSPATH_EMV –EMV. CLSS_TRANSPATH_MAG –MagStripe. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_RESELECT_APP Contactless transaction limit is exceeded or GPO response code is 6985. Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `readData`

Read application data.

```ts
amex.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.readData(): number
```

**Returns** — EMV_OK Successful. EMV_RSP_ERR Status Code returned by IC card is not 9000. EMV_DATA_ERR Data error found.

---

### `cardAuth`

Offline data authentication.

```ts
amex.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.cardAuth(): number
```

**Returns** — EMV_OK Successful.

---

### `startTrans`

Apply Dynamic Reader Limits. Processing Restriction. Cardholder Verification. Terminal Risk Management. Terminal Action Analysis and 1stGAC.

```ts
amex.startTrans(ucExceptFileFlg: number, pucAdviceFlag: Uint8Array, pucACType: Uint8Array, pucDelayAuth: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.startTrans(ucExceptFileFlg: number, pucAdviceFlag: Uint8Array, pucACType: Uint8Array, pucDelayAuth: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] PAN is present in the exception files. |
| `pucAdviceFlag` | `Uint8Array` | [output] Ask advice flag. |
| `pucACType` | `Uint8Array` | [output] AC Type(It is effective only whenEMV_OK is returned): AC_ AAC: Decline AC_ TC: Offline Approve AC_ ARQC: Online Request |
| `pucDelayAuth` | `Uint8Array` | [output] Ask delay authorization flag. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_USE_CONTACT Try another interface. CLSS_TRY_ANOTHER_CARD Try another card. CLSS_REFER_CONSUMER_DEVICE please see phone.Status Code returned by IC card is 6986. CLSS_DECLINE Transaction should be declined. CLSS_CVMDECLINE CVM result in decline for AE. CLSS_TERMINATE Must terminate the transaction.

---

### `getTrackMapData`

Get mapped TRACK1 data. Get mapped TRACK2 data

```ts
amex.getTrackMapData(ucTrackFlg: number, pucDataOut: Uint8Array, pucLenOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.getTrackMapData(ucTrackFlg: number, pucDataOut: Uint8Array, pucLenOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucTrackFlg` | `number` | [input] Track1 or 2 flag. |
| `pucDataOut` | `Uint8Array` | [output] Mapped TRACK data. |
| `pucLenOut` | `Uint8Array` | [output] Length of mapped TRACK data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_FAILED Get Track data failed.

---

### `getDebugInfo`

Get the debug information.

```ts
amex.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used). |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used). |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `setExtendFunc`

Extend function to set additional information.

```ts
amex.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.amex.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] 1: Set supported AMEX version. Other: RFU |
| `paucDataIn` | `Uint8Array` | [input] If nFlag is 1, 1 Byte shall be set.Byte 1:0x31 - AE 3.1 ;0x40 - AE 4.0.x (Default) |
| `nDataInLen` | `number` | [input] The length of paucDataIn input.If nFlag is 1: The length shall be 1.Other value will not be allowed. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

