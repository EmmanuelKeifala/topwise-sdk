# paypass

`com.topwise.cloudpos.aidl.emv.level2.AidlPaypass`

21 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`setTagPresent`](#settagpresent) · [`setExtendFunction`](#setextendfunction) · [`getExtendFunction`](#getextendfunction) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`transProcMag`](#transprocmag) · [`transProcMChip`](#transprocmchip) · [`cleanTornLogMChip`](#cleantornlogmchip) · [`setTornLogMChip`](#settornlogmchip) · [`getTornLogMChip`](#gettornlogmchip) · [`setCallback`](#setcallback) · [`getDebugInfo`](#getdebuginfo)

---

### `initialize`

PayPass kernel initialization.

```ts
paypass.initialize(ucDESupportFlag: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.initialize(ucDESupportFlag: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucDESupportFlag` | `number` | [input] 0x01 : Support Data Exchange. 0x00 : Not support Data Exchange. |

**Returns** — EMV_OK Initialization completed. CLSS_PARAM_ERR Parameter error.Such as ucDESupportFlag is neither 1 or 0.

---

### `getVersion`

Query the version number of PayPass kernel.

```ts
paypass.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version number and issue date.For example V100 2018.12.01. |
| `uiSize` | `number` | [input] The maximum length of pacVer is greater than or equal to 20bytes. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set several data elements into kernel at one time.

```ts
paypass.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
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
paypass.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pacDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pacDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `pacDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements.Specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial.Indicated by pacTagList. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error(Null pointer). EMV_OVERFLOW punActualDataOutLen is bigger than unExpectDataLen. The actual data has been truncated to fit the spaces of pucDataOut.The application needs to offer a bigger space equal to punActualDataOutLen for pucDataOut to get the whole data if necessary. EMV_NO_DATA The tag is not present. EMV_NOT_FOUND The tag cannot be found in kernel.(Unknown Tag).

---

### `setTagPresent`

Set a data element to be present or not indicated by tag.

```ts
paypass.setTagPresent(pucTag: Uint8Array, ucPresent: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.setTagPresent(pucTag: Uint8Array, ucPresent: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucTag` | `Uint8Array` | [input] The Tag to be set. |
| `ucPresent` | `number` | [input] 0x01 : be present. (data element is empty,the length is 0) 0x00 : not present. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error(Null pointer). EMV_NOT_FOUND The tag is not defined in kernel.

---

### `setExtendFunction`

Set extend function in kernel

```ts
paypass.setExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.setExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nIndex` | `number` | [input] Index of extend function.0x01 : Set Timer;Other : RFU |
| `paucExFunc` | `Uint8Array` | [input] The extend function buffer. |
| `nExFuncLen` | `number` | [input] The length of extend function buffer. |

**Returns** — EMV_OK Successful; CLSS_PARAM_ERR Parameter error.(Null pointer)

---

### `getExtendFunction`

Get extend function from kernel.(RFU)

```ts
paypass.getExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.getExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nIndex` | `number` | [input] Index of extend function. |
| `paucExFunc` | `Uint8Array` | [output] The extend function buffer. |
| `nExFuncLen` | `number` | [input] The length of extend function buffer. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

---

### `addCAPK`

Add only one CA public key.

```ts
paypass.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The EMV CA public key.Please refer to “Clss_Define.h”for its data structure definition. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error. EMV_OVERFLOW Memory overflow.

---

### `delAllCAPK`

Delete all CA public keys.

```ts
paypass.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
paypass.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. |

**Returns** — EMV_OK Successful. EMV_DATA_ERR Input data error (the pointer is null). EMV_OVERFLOW Memory overflow.

---

### `delAllRevocList`

Delete all revoked issuer public key certifications

```ts
paypass.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.delAllRevocList(): void
```

---

### `setFinalSelectData`

Set the data returned from card during final selection.

```ts
paypass.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucRspIn` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `nRspLen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_RESELECT_APP Select next AID.

---

### `gpoProc`

Initiate application processing (GPO).

```ts
paypass.gpoProc(pucPathTypeOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.gpoProc(pucPathTypeOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucPathTypeOut` | `Uint8Array` | [output] Continue transaction path type: CLSS_TRANSPATH_EMV –M/Chip. CLSS_TRANSPATH_MAG –MagStripe. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR Command error. EMV_DATA_ERR Data error. EMV_TIME_OUT Receive DET Data timeout.There are still some PDOL data elements missing. (DE only) CLSS_RESELECT_APP Select next AID. GPO response code.

---

### `readData`

Read application data.

```ts
paypass.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.readData(): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR Command error. EMV_RSP_ERR Command response code is not 9000. EMV_DATA_ERR Data error. EMV_TIME_OUT Receive DET Data timeout.There are still some data needed elements missing. (DE only) CLSS_RESELECT_APP Select next AID.Amount, Authorized (Numeric) greater than Reader.Contactless Transaction Limit.

---

### `transProcMag`

PayPass MagStripe transaction processing

```ts
paypass.transProcMag(pucACTypeOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.transProcMag(pucACTypeOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucACTypeOut` | `Uint8Array` | [output] AC type: AC_AAC: Decline. AC_ARQC: Online Requested. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR Command error. EMV_RSP_ERR Command response code is not 9000. EMV_DATA_ERR Data error.

---

### `transProcMChip`

Complete transaction and return the final AC type.

```ts
paypass.transProcMChip(pucACTypeOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.transProcMChip(pucACTypeOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucACTypeOut` | `Uint8Array` | [output] The AC type: AC_AAC: Decline. AC_TC: Offline Approve. AC_ARQC: Online Requested. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR Command error. EMV_RSP_ERR Command response code is not 9000. EMV_DATA_ERR Data error. CLSS_TERMINATE Terminate transaction.

---

### `cleanTornLogMChip`

Delete the expired record from Torn Transaction Log.

```ts
paypass.cleanTornLogMChip(pucCurrentDateTime: Uint8Array, nDateTimeLen: number, ucCleanAllFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.cleanTornLogMChip(pucCurrentDateTime: Uint8Array, nDateTimeLen: number, ucCleanAllFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucCurrentDateTime` | `Uint8Array` | [input] Current date and time. |
| `nDateTimeLen` | `number` | [input] The length of pucCurrentDateTime, it must be 6. |
| `ucCleanAllFlg` | `number` | [input] 0- Just delete the records which are expired. 1- Delete all records regardless they are expired or not. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. EMV_DATA_ERR Data error NO_TRANS_LOG There is no record in Torn Transaction Log. EMV_NO_DATA Max Lifetime of Torn Transaction Log Record (DF811C) is absent.

---

### `setTornLogMChip`

Set Torn Transaction Log into kernel.

```ts
paypass.setTornLogMChip(ptTornLog: ReadonlyArray<Input<ClssTornLogRecord>>, nTornNum: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.setTornLogMChip(ptTornLog: ReadonlyArray<Input<ClssTornLogRecord>>, nTornNum: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ptTornLog` | `ReadonlyArray<Input<ClssTornLogRecord>>` | [input] Torn Transaction Log.The max number of record can be saved in kernel is 5. |
| `nTornNum` | `number` | [input] The number of record of Torn Transaction Log.the max number can be saved in kernel is 5. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `getTornLogMChip`

Get Torn Transaction Log from kernel.

```ts
paypass.getTornLogMChip(ptTornLog: ReadonlyArray<Input<ClssTornLogRecord>>, pnTornNum: ReadonlyArray<number>, pnUpdatedFlg: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.getTornLogMChip(ptTornLog: ReadonlyArray<Input<ClssTornLogRecord>>, pnTornNum: ReadonlyArray<number>, pnUpdatedFlg: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ptTornLog` | `ReadonlyArray<Input<ClssTornLogRecord>>` | [output] Torn Transaction Log. |
| `pnTornNum` | `ReadonlyArray<number>` | [output] The number of record of Torn Transaction Log. |
| `pnUpdatedFlg` | `ReadonlyArray<number>` | [output] Indicates the whether the Torn Transaction Log has been updated in the kernel.1-YES, 0-NO. The application shall save the Torn transaction Log if it has been updated. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. EMV_NO_DATA There is no log.

---

### `setCallback`

Callback function required by PayPass library。

```ts
paypass.setCallback(handlers: PaypassCallbackHandlers, options?: CallbackOptions)
  : Effect<number, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.paypass.setCallback(handlers, options?): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

**Handlers** — [`PaypassCallbackHandlers`](../events.md#paypasscallbackhandlers). The kernel
blocks on the binder thread until each handler answers, so every method
must be implemented and none may fail.

---

### `getDebugInfo`

Get debug information from kernel.

```ts
paypass.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.paypass.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] The length of assist information expected to get. The kernel will send the assist information according to this length as a max length(RFU). |
| `paucAssistInfo` | `Uint8Array` | [output] The assist information such as Terminal Capabilities, Terminal Type and so on. The application shall define it as an array with the length the same as nExpInfoLen(RFU). |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] Detailed error code when transaction is terminated.Such as checking the reason of CDA failed when the return code of PP_TransProc_MChip is CLSS_TERMINATE. |

**Returns** — EMV_OK Successful; CLSS_PARAM_ERR Parameter error.

