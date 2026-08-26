# pure

`com.topwise.cloudpos.aidl.emv.level2.AidlPure`

16 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`startTrans`](#starttrans) · [`cardAuth`](#cardauth) · [`completeTrans`](#completetrans) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

PURE kernel initialization.

```ts
pure.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.initialize(): number
```

**Returns** — EMV_OK Initialization completed.

---

### `getVersion`

Query the version number of PURE kernel.

```ts
pure.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.getVersion(pacVer: Uint8Array, uiSize: number): number
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
pure.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
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
pure.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
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

### `addCAPK`

Add a new CA public key.

```ts
pure.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key.Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error.

---

### `delAllCAPK`

Delete all CA public keys.

```ts
pure.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
pure.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_OVERFLOW Memory overflow.(CLSS library maximum supports 30 revoked issuer public key certifications).

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
pure.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.delAllRevocList(): void
```

---

### `setFinalSelectData`

Initialize all data elements of kernel and Set the data returned from card during final selection

```ts
pure.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucFCI` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `unFCILen` | `number` | [input] Length of data. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application.

---

### `gpoProc`

This function includes the processing of GPO。

```ts
pure.gpoProc(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.gpoProc(): number
```

**Returns** — EMV_OK Successful. ICC_CMD_ERR Command error. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead. CLSS_REFER_CONSUMER_DEVICE Please see phone.Try Again. CLSS_DECLINE Transaction declined. CLSS_TERMINATE Transaction terminate.

---

### `readData`

Read application data.

```ts
pure.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.readData(): number
```

**Returns** — EMV_OK Successful. ICC_CMD_ERR Command error. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application.

---

### `startTrans`

Processing Restriction. Cardholder Verification. Terminal Risk Management. Terminal Action Analysis and 1stGAC.

```ts
pure.startTrans(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.startTrans(ucExceptFileFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] PAN is present in the exception files. |

**Returns** — EMV_OK Successful. CLSS_USE_CONTACT Try another interface. CLSS_REFER_CONSUMER_DEVICE please see phone. CLSS_DECLINE Transaction should be declined. CLSS_TORN_RECOVER Present Torn Recover , try again. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_TERMINATE Transaction terminated.

---

### `cardAuth`

Offline data authentication.

```ts
pure.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.cardAuth(): number
```

**Returns** — EMV_OK Successful. CLSS_TERMINATE Transaction terminated.

---

### `completeTrans`

2nd GAC and Issuer Script 71/72.

```ts
pure.completeTrans(paucScript: Uint8Array, unScriptLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.completeTrans(paucScript: Uint8Array, unScriptLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucScript` | `Uint8Array` | [input] Script data. |
| `unScriptLen` | `number` | [input] Script data length. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminate. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_TORN_RECOVER Present Torn Recover , try again. CLSS_DECLINE Transaction declined.

---

### `getDebugInfo`

Get the debug information.

```ts
pure.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used) |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used) |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameters error.

---

### `setExtendFunc`

Extend function to set additional information

```ts
pure.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.pure.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |
| `paucDataIn` | `Uint8Array` | [input] RFU |
| `nDataInLen` | `number` | [input] RFU |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

