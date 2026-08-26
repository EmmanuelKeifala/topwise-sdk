# dpas

`com.topwise.cloudpos.aidl.emv.level2.AidlDpas`

19 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`transProc`](#transproc) · [`issuerUpdateProc`](#issuerupdateproc) · [`getTrackMapData`](#gettrackmapdata) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc) · [`optFeatCheck`](#optfeatcheck) · [`updateDataContProc`](#updatedatacontproc) · [`writeDataStore`](#writedatastore)

---

### `initialize`

DPAS kernel initialization

```ts
dpas.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.initialize(): number
```

**Returns** — EMV_OK Initialization completed.

---

### `getVersion`

Query the version number of DPAS kernel.

```ts
dpas.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version number.For example V100 2020.09.01 (rear part is date). |
| `uiSize` | `number` | [input] The maximum length of pacVer is greater than or equal to 20bytes. |

**Returns** — EMV_OK Initialization completed. CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set several data elements into kernel at one time.

```ts
dpas.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
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
dpas.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `pucDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial indicated by pacTagList. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_NOT_FOUND Can’t find the tag or no data。

---

### `addCAPK`

Add a new CA public key. 1. It is recommended to delete all CA public keys in the kernel at the beginning of each transaction, and set CA public keys according to the requirements of the current application. In this way, the application only needs to set one CA public key at a time. 2. If the public key is already existed, the new key will replace the old one. 3. CA public key is provided by acquire. Sometimes, the key is not assigned with the structure of EMV_CAPK. In this case, the application must convert the public key before add it.

```ts
dpas.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key. Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error.

---

### `delAllCAPK`

Delete all CA public keys. It is suggested to call this function to delete all CA Public Keys in kernel at the beginning of each transaction, and set CA Public Key according to current application’s requirement. In this way, application needs to set only one CA Public Key each time.

```ts
dpas.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
dpas.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_OVERFLOW Memory overflow (CLSS library maximum supports 30 revoked issuer public key certifications).

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
dpas.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.delAllRevocList(): void
```

---

### `setFinalSelectData`

Initialize all data elements of kernel and set the data returned from card during final selection. 1. This function should be called after DP_Initialize. 2. After set final select data, application should set parameters according to the AID final selected.

```ts
dpas.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucFCI` | `Uint8Array` | [input] Pointer of data returned from card during final selection |
| `unFCILen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `gpoProc`

This function includes the processing of GPO. 1. This function should be called after DP_SetFinalSelectData. 2. Application should set the right TTQ and TVR before GPO with pre-process result.

```ts
dpas.gpoProc(pucPathTypeOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.gpoProc(pucPathTypeOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucPathTypeOut` | `Uint8Array` | [output] Transaction Path (it is effective only when EMV_OK is returned). CLSS_TRANSPATH_EMV - DPAS; CLSS_TRANSPATH_MAG - MagStripe CLSS_TRANSPATH_LEGACY - ZIP |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `readData`

Read application data. 1. This function should be called after DP_GPOProc. 2. After this function is performed successfully, application shall check the exception files. And add CAPK and revocation list.

```ts
dpas.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.readData(): number
```

**Returns** — EMV_OK Successful. CLSS_TERMINATE Terminate transaction.

---

### `transProc`

Offline data authentication. Cardholder Verification. Processing Restriction. Terminal Action Analysis.

```ts
dpas.transProc(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.transProc(ucExceptFileFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] PAN is present in the exception files. |

**Returns** — EMV_OK Successful. CLSS_TERMINATE Transaction terminated. CLSS_USE_CONTACT Try another interface. CLSS_TRY_ANOTHER_CARD Try another card. CLSS_DECLINE Transaction should be declined.

---

### `issuerUpdateProc`

Issuer script process, DPAS support only one script 71 or 72. Application should process script after online transaction complete with any script data and while EMV transaction path.

```ts
dpas.issuerUpdateProc(nCommuStatus: number, paucScript: Uint8Array, pnScriptLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.issuerUpdateProc(nCommuStatus: number, paucScript: Uint8Array, pnScriptLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nCommuStatus` | `number` | [input] Communication Status. |
| `paucScript` | `Uint8Array` | [input] Script data. |
| `pnScriptLen` | `ReadonlyArray<number>` | [input] Script data length. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminated. CLSS_DECLINE Transaction should be declined.

---

### `getTrackMapData`

Get mapped TRACK1 data. Get mapped TRACK2 data Transaction ZIP and D-PAS MS mode only.

```ts
dpas.getTrackMapData(ucTrackFlg: number, paucDataOut: Uint8Array, pucLenOut: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.getTrackMapData(ucTrackFlg: number, paucDataOut: Uint8Array, pucLenOut: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucTrackFlg` | `number` | [input] Track1 or 2 flag |
| `paucDataOut` | `Uint8Array` | [output] Mapped TRACK data. |
| `pucLenOut` | `ReadonlyArray<number>` | [output] Length of mapped TRACK data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. EMV_NO_DATA Get Track data failed.

---

### `getDebugInfo`

Get the debug information.

```ts
dpas.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used) |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used) |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameters error.

---

### `setExtendFunc`

Extend function to set additional information.

```ts
dpas.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |
| `paucDataIn` | `Uint8Array` | [input] RFU |
| `nDataInLen` | `number` | [input] RFU |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

---

### `optFeatCheck`

```ts
dpas.optFeatCheck(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.optFeatCheck(): void
```

---

### `updateDataContProc`

```ts
dpas.updateDataContProc(paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.updateDataContProc(paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucDataIn` | `Uint8Array` | [input] |
| `nDataInLen` | `number` |  |

---

### `writeDataStore`

```ts
dpas.writeDataStore(paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.dpas.writeDataStore(paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucDataIn` | `Uint8Array` | [input] |
| `nDataInLen` | `number` |  |

