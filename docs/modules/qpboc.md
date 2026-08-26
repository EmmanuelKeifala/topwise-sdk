# qpboc

`com.topwise.cloudpos.aidl.emv.level2.AidlQpboc`

16 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`getTLVData`](#gettlvdata) · [`setTLVData`](#settlvdata) · [`delAllCAPK`](#delallcapk) · [`addCAPK`](#addcapk) · [`delAllRevoIPK`](#delallrevoipk) · [`addRevoIPK`](#addrevoipk) · [`setFinalSelectData`](#setfinalselectdata) · [`gpoProc`](#gpoproc) · [`readData`](#readdata) · [`cardAuth`](#cardauth) · [`setCallback`](#setcallback) · [`getDebugInfo`](#getdebuginfo) · [`setExtendFunc`](#setextendfunc) · [`setTLVDataList`](#settlvdatalist)

---

### `initialize`

Qpboc kernel initialization.

```ts
qpboc.initialize(bQKernelType: number, bSMEnabled: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.initialize(bQKernelType: number, bSMEnabled: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bQKernelType` | `number` | Qpboc kernel type |
| `bSMEnabled` | `number` | SM Enable 0x00 : Not support Data Exchange |

**Returns** — EMV_OK Initialization completed. CLSS_PARAM_ERR Parameter error.Such as ucDESupportFlag is neither 1 or 0

---

### `getVersion`

Query the version number of Qpboc kernel.

```ts
qpboc.getVersion(pVer: Uint8Array, size: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.getVersion(pVer: Uint8Array, size: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pVer` | `Uint8Array` | Version number. |
| `size` | `number` | The maximum length |

**Returns** — EMV_OK Initialization completed; CLSS_PARAM_ERR Parameter error.

---

### `getTLVData`

Get the value of the data element by specifying the tag.

```ts
qpboc.getTLVData(tag: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.getTLVData(tag: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tag` | `number` | Tag of EMV standard or extended data element |

**Returns** — data element by specifying the tag.

---

### `setTLVData`

Set the value of the data element by specifying the tag

```ts
qpboc.setTLVData(tag: number, value: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.setTLVData(tag: number, value: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tag` | `number` | Tag of EMV standard or extended data element. |
| `value` | `Uint8Array` | The value of the data element specified by the tag. |

**Returns** — EMV_OK Succeed. EMV_PARAMETER_ERROR Parameter error. EMV_DATA_LENGTH_ERROR Data length error. EMV_MEMORY_NOT_ENOUGH Memory not enough.

---

### `delAllCAPK`

Delete all CA public keys.

```ts
qpboc.delAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.delAllCAPK(): void
```

---

### `addCAPK`

Add a new CA public key

```ts
qpboc.addCAPK(stCapk: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.addCAPK(stCapk: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCapk` | `Input<EmvCapk>` | The CA public key. |

**Returns** — EMV_OK Successful; EMV_SUM_ERR Check sum error; EMV_OVERFLOW Memory overflows

---

### `delAllRevoIPK`

Delete All Revo IPK

```ts
qpboc.delAllRevoIPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.delAllRevoIPK(): void
```

---

### `addRevoIPK`

Add Revo IPK

```ts
qpboc.addRevoIPK(stRevoIPK: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.addRevoIPK(stRevoIPK: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevoIPK` | `Input<EmvRevocList>` | Emv Revoc List |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error

---

### `setFinalSelectData`

Initialize all data elements of kernel and Set the data returned from card during final selection.

```ts
qpboc.setFinalSelectData(pFCI: Uint8Array, iFCILen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.setFinalSelectData(pFCI: Uint8Array, iFCILen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pFCI` | `Uint8Array` | Pointer of data returned from card during final selection. |
| `iFCILen` | `number` | Length of data. |

**Returns** — EMV_OK Successful; CLSS_PARAM_ERR Parameter error; CLSS_TERMINATE Transaction terminate; CLSS_RESELECT_APP Select next AID; CLSS_USE_CONTACT Use contact.

---

### `gpoProc`

This function includes the processing of GPO.

```ts
qpboc.gpoProc(pTransPath: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.gpoProc(pTransPath: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pTransPath` | `Uint8Array` | Transaction Path (it is effective only when EMV_OK is returned) CLSS_TRANSPATH_EMV - DPAS; CLSS_TRANSPATH_MAG - MagStripe CLSS_TRANSPATH_LEGACY - ZIP |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error. CLSS_TERMINATE Terminate transaction. CLSS_RESELECT_APP Delete current application from the candidate list, and then execute final selection again to select the next application. CLSS_USE_CONTACT Terminate CLSS transaction and use contactinterface to process transaction instead.

---

### `readData`

Read application data

```ts
qpboc.readData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.readData(): number
```

**Returns** — EMV_OK Successful. CLSS_TERMINATE Terminate transaction

---

### `cardAuth`

Offline data authentication.

```ts
qpboc.cardAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.cardAuth(): number
```

**Returns** — EMV_OK Successful.

---

### `setCallback`

Callback function required by PayPass library

```ts
qpboc.setCallback(handlers: QpbocCallbackHandlers, options?: CallbackOptions)
  : Effect<number, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.qpboc.setCallback(handlers, options?): number
```

**Returns** — EMV_OK Set successfully; CLSS_PARAM_ERR Parameter error.

**Handlers** — [`QpbocCallbackHandlers`](../events.md#qpboccallbackhandlers). The kernel
blocks on the binder thread until each handler answers, so every method
must be implemented and none may fail.

---

### `getDebugInfo`

Get the debug information.

```ts
qpboc.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.getDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | RFU(0 can be used) |
| `paucAssistInfo` | `Uint8Array` | RFU (NULL can be used) |
| `pnErrorCode` | `ReadonlyArray<number>` | The error code. |

**Returns** — EMV_OK Successful; EMV_PARAM_ERR The parameters are error.

---

### `setExtendFunc`

Extend function to set additional information

```ts
qpboc.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.setExtendFunc(nFlag: number, paucDataIn: Uint8Array, nDataInLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | RFU |
| `paucDataIn` | `Uint8Array` | RFU |
| `nDataInLen` | `number` | RFU |

**Returns** — EMV_OK Successful; CLSS_PARAM_ERR Parameter error.

---

### `setTLVDataList`

Set several data elements into kernel at one time.

```ts
qpboc.setTLVDataList(pucTLVDatas: Uint8Array, unDataLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.qpboc.setTLVDataList(pucTLVDatas: Uint8Array, unDataLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucTLVDatas` | `Uint8Array` |  |
| `unDataLen` | `number` | [input] The Length of pucTLVData. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.(Null pointer) EMV_DATA_ERR Data error found.

