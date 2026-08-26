# rupay

`com.topwise.cloudpos.aidl.emv.level2.AidlRupay`

19 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`setTagPresent`](#settagpresent) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`cardAuth`](#cardauth) · [`transProc`](#transproc) · [`startTrans`](#starttrans) · [`completeTrans`](#completetrans) · [`issuerScriptProc`](#issuerscriptproc) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

RuPay kernel initialization.

```ts
rupay.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.initialize(): number
```

**Returns** — EMV_OK Initialization completed

---

### `getVersion`

Query the version number of PURE kernel.

```ts
rupay.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.getVersion(pacVer: Uint8Array, uiSize: number): number
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
rupay.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
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
rupay.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `pucDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial indicated by pacTagList. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_NOT_FOUND Can’t find the tag or no data.

---

### `setTagPresent`

Set Tag Present

```ts
rupay.setTagPresent(aucPrivateTag: Uint8Array, ucPresent: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.setTagPresent(aucPrivateTag: Uint8Array, ucPresent: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `aucPrivateTag` | `Uint8Array` | [input] Private Tag |
| `ucPresent` | `number` | [input] uc Present |

**Returns** — EMV_OK Successful。

---

### `addCAPK`

Add a new CA public key

```ts
rupay.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key.Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful。 EMV_SUM_ERR CAPK checksum error. EMV_OVERFLOW Memory overflow.(CLSS Kernel supports only one CA public keys at most).

---

### `delAllCAPK`

Delete all CA public keys.

```ts
rupay.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
rupay.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. |

**Returns** — EMV_OK Successful. EMV_DATA_ERR Input data error. EMV_OVERFLOW Memory overflow.

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
rupay.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.delAllRevocList(): void
```

---

### `setFinalSelectData`

Initialize all data elements of kernel and Set the data returned from card during final selection.

```ts
rupay.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucFCI` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `unFCILen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminate. CLSS_RESELECT_APP Select next AID. CLSS_USE_CONTACT Use contact.

---

### `gpoProc`

This function includes the processing of GPO.

```ts
rupay.gpoProc(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.gpoProc(): number
```

**Returns** — EMV_OK Successful. CLSS_RESELECT_APP Contactless transaction limit is exceeded or GPO response code is 6985. Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead. CLSS_TERMINATE Transaction terminated.

---

### `readData`

This function includes the read record.

```ts
rupay.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.readData(): number
```

**Returns** — EMV_OK Successful. ICC_CMD_ERR Command error. EMV_RSP_ERR Command response code is not 9000. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead. CLSS_TERMINATE Transaction terminated.

---

### `cardAuth`

Offline data authentication.

```ts
rupay.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.cardAuth(): number
```

**Returns** — EMV_OK Successful.

---

### `transProc`

Processing Restriction. Cardholder Verification. Terminal Risk Management.

```ts
rupay.transProc(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.transProc(ucExceptFileFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] Except file present flag. |

**Returns** — EMV_OK Successful. EMV_DATA_ERR Data error.

---

### `startTrans`

Terminal Action Analysis and 1stGAC.

```ts
rupay.startTrans(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.startTrans(): number
```

**Returns** — EMV_OK Successful. EMV_DATA_ERR Data error. CLSS_TERMINATE Transaction terminate. CLSS_DECLINE Transaction declined.

---

### `completeTrans`

2nd GAC and Issuer Script 72.

```ts
rupay.completeTrans(nCommuStatus: number, paucScriptIn: Uint8Array, unScriptLenIn: number, paucScriptRstOut: Uint8Array, punRstLenOut: ReadonlyArray<number>, pucACTypeOut: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.completeTrans(nCommuStatus: number, paucScriptIn: Uint8Array, unScriptLenIn: number, paucScriptRstOut: Uint8Array, punRstLenOut: ReadonlyArray<number>, pucACTypeOut: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nCommuStatus` | `number` | [input] Communication online result |
| `paucScriptIn` | `Uint8Array` | [input] Script data. |
| `unScriptLenIn` | `number` | [input] Script data length |
| `paucScriptRstOut` | `Uint8Array` | [output] Script result data. |
| `punRstLenOut` | `ReadonlyArray<number>` | [output] Script result data length. |
| `pucACTypeOut` | `Uint8Array` | [output] AC type. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminate. CLSS_DECLINE Transaction declined.

---

### `issuerScriptProc`

Issuer script 72 only process for block app. Select AID return 6283, Ask to unblock app script.

```ts
rupay.issuerScriptProc(paucScriptIn: Uint8Array, unScriptLenIn: number, paucScriptRstOut: Uint8Array, punRstLenOut: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.issuerScriptProc(paucScriptIn: Uint8Array, unScriptLenIn: number, paucScriptRstOut: Uint8Array, punRstLenOut: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucScriptIn` | `Uint8Array` | [input] Script data. |
| `unScriptLenIn` | `number` | [input] Script data length. |
| `paucScriptRstOut` | `Uint8Array` | [output] Script result data. |
| `punRstLenOut` | `ReadonlyArray<number>` | [output] Script result data length |

**Returns** — EMV_OK Successful.

---

### `getDebugInfo`

Get the debug information.

```ts
rupay.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used) |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used) |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. EMV_PARAM_ERR The parameters are error.

---

### `setExtendFunc`

Extend function to set additional information.

```ts
rupay.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.rupay.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |
| `paucDataIn` | `Uint8Array` | [input] RFU |
| `nDataInLen` | `number` | [input] RFU |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

