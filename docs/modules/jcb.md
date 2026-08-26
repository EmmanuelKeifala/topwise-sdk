# jcb

`com.topwise.cloudpos.aidl.emv.level2.AidlJcb`

16 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`setTLVDataList`](#settlvdatalist) · [`getTLVDataList`](#gettlvdatalist) · [`addCAPK`](#addcapk) · [`delAllCAPK`](#delallcapk) · [`addRevocList`](#addrevoclist) · [`delAllRevocList`](#delallrevoclist) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`startTrans`](#starttrans) · [`cardAuth`](#cardauth) · [`completeTrans`](#completetrans) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc)

---

### `initialize`

JCB kernel initialization

```ts
jcb.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.initialize(): number
```

**Returns** — CLSS_OK Initialization completed.

---

### `getVersion`

Get the version information of the JCB kernel.

```ts
jcb.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] The version and release date of the kernel, the minimum length is 20 bytes. Examples: "V101 2023.06.01", "V101": Version number. "2023.06.01": Released date. |
| `uiSize` | `number` | [input] The size of the "pacVer" buffer. |

**Returns** — CLSS_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set the data value of the specified tag list into the kernel, and the data is filled in TLV format.

```ts
jcb.setTLVDataList(data: Uint8Array, dataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.setTLVDataList(data: Uint8Array, dataLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `data` | `Uint8Array` | [input] The data elements list with TLV format. |
| `dataLen` | `number` | [input] The Length of pucTLVData. |

**Returns** — CLSS_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_DATA_ERR Data format error.

---

### `getTLVDataList`

Get one data element specified by the tag.

```ts
jcb.getTLVDataList(paucTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, paucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.getTLVDataList(paucTagList: Uint8Array, ucTagListLen: number, unExpectDataLen: number, paucDataOut: Uint8Array, punActualDataOutLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucTagList` | `Uint8Array` | [input] Tag list of EMV standard or extended data. The max length of one tag is 3 bytes and only one tag is allowed at present. |
| `ucTagListLen` | `number` | [input] The length of pacTagList. |
| `unExpectDataLen` | `number` | [input] Equal to the max length of pacDataOut. |
| `paucDataOut` | `Uint8Array` | [output] The TLV data serial of the data elements specified by pacTagList. |
| `punActualDataOutLen` | `ReadonlyArray<number>` | [output] The actual length of the TLV data serial indicated by pacTagList. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_NOT_FOUND Can’t find the tag or no data。

---

### `addCAPK`

Add a new CA public key. 1. It is recommended to delete all CA public keys in the kernel at the beginning of each transaction, and set CA public keys according to the requirements of the current application. In this way, the application only needs to set one CA public key at a time. 2. If the public key is already existed, the new key will replace the old one. 3. CA public key is provided by acquire. Sometimes, the key is not assigned with the structure of EMV_CAPK. In this case, the application must convert the public key before add it.

```ts
jcb.addCAPK(stCAPK: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.addCAPK(stCAPK: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCAPK` | `Input<EmvCapk>` | [input] The CA public key. Please refer to “Clss_Define.h” for structure definition of EMV_CAPK. |

**Returns** — EMV_OK Successful. EMV_SUM_ERR CAPK checksum error.

---

### `delAllCAPK`

Delete all CA public keys. It is suggested to call this function to delete all CA Public Keys in kernel at the beginning of each transaction, and set CA Public Key according to current application’s requirement. In this way, application needs to set only one CA Public Key each time.

```ts
jcb.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.delAllCAPK(): void
```

---

### `addRevocList`

Add a revoked issuer public key certification to certification revocation list.

```ts
jcb.addRevocList(stRevocList: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.addRevocList(stRevocList: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevocList` | `Input<EmvRevocList>` | [input] The pointer of the revoked issuer public key certification. Please refer to “Clss_Define.h” for structure definition of EMV_REVOCLIST. |

**Returns** — EMV_OK Successful. EMV_OVERFLOW Memory overflow (CLSS library maximum supports 30 revoked issuer public key certifications).

---

### `delAllRevocList`

Delete all revoked issuer public key certifications.

```ts
jcb.delAllRevocList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.delAllRevocList(): void
```

---

### `setFinalSelectData`

Initialize all data elements of kernel and set the data returned from card during final selection. 1. This funtion should be called after JCB_Initialize.

```ts
jcb.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.setFinalSelectData(paucRspIn: Uint8Array, nRspLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucRspIn` | `Uint8Array` | [input] Pointer of data returned from card during final selection |
| `nRspLen` | `number` | [input] Length of data. |

**Returns** — CLSS_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contact interface to process transaction instead.

---

### `gpoProc`

Processing of GPO. 1. This function should be called after JCB_SetFinalSelectData. 2. Before calling this function, you should set transaction and terminal parameters into kernel.

```ts
jcb.gpoProc(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.gpoProc(): number
```

**Returns** — CLSS_OK Successful. ICC_CMD_ERR IC card command is failed. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application.

---

### `readData`

Read application data. 1. This function should be called after JCB_GPOProc 2. After this function is performed successfully, application shall check the exception files. And add CAPK and revocation list.

```ts
jcb.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.readData(): number
```

**Returns** — CLSS_OK Successful. CLSS_TERMINATE Terminate transaction. ICC_CMD_ERR IC card command is failed.

---

### `startTrans`

Transaction processing, including Terminal Risk Management, Processing Restrictions, Terminal Action Analysis and Cardholder Verification. This function should be called after JCB_ReadData.

```ts
jcb.startTrans(ucExceptFileFlg: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.startTrans(ucExceptFileFlg: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucExceptFileFlg` | `number` | [input] PAN is present in the exception files. |

**Returns** — CLSS_OK Successful. CLSS_TERMINATE Terminate transaction. CLSS_USE_CONTACT Try another interface. CLSS_DECLINE Transaction declined. CLSS_REFER_CONSUMER_DEVICE See phone and try again.

---

### `cardAuth`

Offline Data Authentication processing. 1、This function should be called after JCB_StartTrans. 2、After executing this function successfully, you should call JCB_GetTLVDataList to get the OPS Status and CVM，, and perform CVM and online processing according to the OPS CVM.

```ts
jcb.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.cardAuth(): number
```

**Returns** — CLSS_OK Successful. CLSS_DECLINE Transaction declined.

---

### `completeTrans`

Issuer script processing

```ts
jcb.completeTrans(nCommuStatus: number, paucScript: Uint8Array, nScriptLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.completeTrans(nCommuStatus: number, paucScript: Uint8Array, nScriptLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nCommuStatus` | `number` | The online status. |
| `paucScript` | `Uint8Array` | Issuer script data. |
| `nScriptLen` | `number` | The length of issuer script data. |

**Returns** — CLSS_OK Successful. CLSS_TERMINATE Terminate transaction. CLSS_PARAM_ERR Parameter error.

---

### `getDebugInfo`

Get the debug information.

```ts
jcb.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | Expected length of assist information. |
| `paucAssistInfo` | `Uint8Array` | Assist information. |
| `pnErrorCode` | `ReadonlyArray<number>` | Transaction error code. |

**Returns** — EMV_OK Successful. EMV_PARAM_ERR Parameter error.

---

### `setExtendFunc`

Extend function to set additional information.

```ts
jcb.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.jcb.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] 1: Set supported AMEX version. Other: RFU |
| `paucDataIn` | `Uint8Array` | [input] If nFlag is 1, 1 Byte shall be set.Byte 1:0x31 - AE 3.1 ;0x40 - AE 4.0.x (Default) |
| `nDataInLen` | `number` | [input] The length of paucDataIn input.If nFlag is 1: The length shall be 1.Other value will not be allowed. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer)

