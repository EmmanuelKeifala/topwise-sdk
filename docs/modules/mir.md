# mir

`com.topwise.cloudpos.aidl.emv.level2.AidlMir`

19 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`startTrans`](#starttrans) · [`cardAuth`](#cardauth) · [`dataExchange`](#dataexchange) · [`transInitiate2`](#transinitiate2) · [`transProcess2`](#transprocess2) · [`transComplete2`](#transcomplete2) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

Mir kernel initialization.

```ts
mir.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.initialize(): number
```

**Returns** — EMV_OK Initialization completed.

---

### `getVersion`

Query the version number of Mir kernel.

```ts
mir.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.getVersion(pacVer: Uint8Array, uiSize: number): number
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
mir.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.setTLVDataList(pacTlvData: Uint8Array, unDataLen: number): number
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
mir.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.getTLVDataList(pacTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, pucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
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
mir.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key.Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error. EMV_OVERFLOW Memory overflow.

---

### `delAllCAPK`

Delete all CA public keys.

```ts
mir.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
mir.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_DATA_ERR Input data error (the pointer is null). EMV_OVERFLOW Memory overflow.

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
mir.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.delAllRevocList(): void
```

---

### `setFinalSelectData`

Initialize all data elements of kernel and set the data returned from card during final selection. 1. This function should be called after DP_Initialize. 2. After set final select data, application should set parameters according to the AID final selected.

```ts
mir.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number, outBuf: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.setFinalSelectData(paucFCI: Uint8Array, unFCILen: number, outBuf: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucFCI` | `Uint8Array` | [input] Pointer of data returned from card during final selection |
| `unFCILen` | `number` | [input] Length of data. |
| `outBuf` | `Uint8Array` | [output] |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `gpoProc`

This function includes the processing of GPO. 1. This function should be called after DP_SetFinalSelectData. 2. Application should set the right TTQ and TVR before GPO with pre-process result.

```ts
mir.gpoProc(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.gpoProc(): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `readData`

This function includes read record and Processing Restrictions.

```ts
mir.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.readData(): number
```

**Returns** — EMV_OK Successful; CLSS_PARAM_ERR Parameter error; CLSS_DECLINE Transaction declined; CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `startTrans`

Processing Restriction. Cardholder Verification. Terminal Risk Management. Terminal Action Analysis and 1stGAC.

```ts
mir.startTrans(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.startTrans(ucExceptFileFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] PAN is present in the exception files. |

**Returns** — EMV_OK Successful. CLSS_USE_CONTACT Try another interface. CLSS_REFER_CONSUMER_DEVICE please see phone. CLSS_DECLINE Transaction should be declined. CLSS_TORN_RECOVER Present Torn Recover , try again. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_TERMINATE Transaction terminated.

---

### `cardAuth`

Offline data authentication.

```ts
mir.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.cardAuth(): number
```

**Returns** — EMV_OK Successful; CLSS_TERMINATE Transaction terminated.

---

### `dataExchange`

The kernel transmits to the terminal the set of tags, specified in the Data Exchange Tag List and received by the kernel from the card inside the Signed Application Tags (tag BF61) and Unsigned Application Tags (tag BF62) templates.

```ts
mir.dataExchange(paucRspIn: Uint8Array, nRspLen: number, paucDataOut: Uint8Array, nDataOutLen: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.dataExchange(paucRspIn: Uint8Array, nRspLen: number, paucDataOut: Uint8Array, nDataOutLen: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucRspIn` | `Uint8Array` | [input] Pointer of data returned from card during final selection. |
| `nRspLen` | `number` | [input] Length of data. |
| `paucDataOut` | `Uint8Array` | [output] Data Exchange data buffer out. |
| `nDataOutLen` | `Uint8Array` | [output] The Length of paucDataOut. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_DATA_ERR Data error found.

---

### `transInitiate2`

Transaction Processing Initialization.(Protocol 02 only)

```ts
mir.transInitiate2(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.transInitiate2(): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminated. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `transProcess2`

End of interaction with payment device. (Protocol 02 only)

```ts
mir.transProcess2(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.transProcess2(): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminated. CLSS_TRY_AGAIN Try present card again. CLSS_DECLINE Transaction should be declined.

---

### `transComplete2`

Processing Restrictions. Cardholder Verification. Application Authentication. Kernel Action Analysis. (Protocol 02 only)

```ts
mir.transComplete2(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.transComplete2(): number
```

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Transaction terminated. CLSS_DECLINE Transaction should be declined.

---

### `getDebugInfo`

Get the debug information.

```ts
mir.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used) |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used) |
| `pnErrorCode` | `ReadonlyArray<number>` | [out put] The error code. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameters error.

---

### `setExtendFunc`

Extend function to set additional information

```ts
mir.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mir.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |
| `paucDataIn` | `Uint8Array` | [input] RFU |
| `nDataInLen` | `number` | [input] RFU |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

