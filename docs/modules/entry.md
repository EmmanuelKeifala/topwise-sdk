# entry

`com.topwise.cloudpos.aidl.emv.level2.AidlEntry`

20 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`initialize`](#initialize) · [`getVersion`](#getversion) · [`addCombination`](#addcombination) · [`getCombination`](#getcombination) · [`delCombination`](#delcombination) · [`delAllCombination`](#delallcombination) · [`preProcessing`](#preprocessing) · [`buildCandidate`](#buildcandidate) · [`buildCandidateByAID`](#buildcandidatebyaid) · [`finalSelect`](#finalselect) · [`getPreProcResult`](#getpreprocresult) · [`getCandList`](#getcandlist) · [`setCandList`](#setcandlist) · [`delCandListCurApp`](#delcandlistcurapp) · [`getErrorCode`](#geterrorcode) · [`setExtendFunction`](#setextendfunction) · [`getExtendFunction`](#getextendfunction) · [`getCandListNew`](#getcandlistnew) · [`setCandListNew`](#setcandlistnew) · [`getPreProcResultByAid`](#getpreprocresultbyaid)

---

### `initialize`

Initialization of entry kernel.

```ts
entry.initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.initialize(): number
```

**Returns** — EMV_OK Initialization succeeds.

---

### `getVersion`

Query the version of entry kernel.

```ts
entry.getVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version number and issue date. For example V100 2018.12.01 |
| `uiSize` | `number` | [input] The maximum length of pacVer is greater than or equal to 20 bytes. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `addCombination`

Add a Combination {AID-Kernel ID} to the application list for EntryPoint and set relevant pre-processing parameters to kernel.

```ts
entry.addCombination(stCombination: Input<Combination>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.addCombination(stCombination: Input<Combination>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCombination` | `Input<Combination>` | [input] Pointer of the combination and its parameters, refer to Chapter 8.2 Data Structure Definitions for Clss_Combination. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. EMV_OVERFLOW Memory overflows (Kernel supports 64 applications at most).

---

### `getCombination`

Get an AID from the application list. (Support EntryPoint of Book B)

```ts
entry.getCombination(ptCombination: Input<Combination>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getCombination(ptCombination: Input<Combination>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ptCombination` | `Input<Combination>` | [input/output] Pointer of the combination and its parameters, refer to Chapter 8.2 Data Structure Definitions for Clss_Combination. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. EMV_NOT_FOUND Can’t find the specified application.

---

### `delCombination`

Delete a Combination {AID-Kernel ID} from the application list for EntryPoint. (Support EntryPoint of Book B)

```ts
entry.delCombination(paucAID: string, ucAidLen: number, paucKernID: string, ucKernIDLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.delCombination(paucAID: string, ucAidLen: number, paucKernID: string, ucKernIDLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucAID` | `string` | AID |
| `ucAidLen` | `number` | Aid Length |
| `paucKernID` | `string` | Kernel ID |
| `ucKernIDLen` | `number` | The Length of Kernel ID |

**Returns** — EMV_OK Success. EMV_NOT_FOUND Can’t find the specified application. CLSS_PARAM_ERR Parameter error.

---

### `delAllCombination`

Delete all Combinations {AID-Kernel ID} from the application list for EntryPoint. (Support EntryPoint of Book B)

```ts
entry.delAllCombination(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.delAllCombination(): void
```

---

### `preProcessing`

Entry Point does Pre-Processing for a new transaction with a variable amount.

```ts
entry.preProcessing(stJniTransParam: Input<TransParam>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.preProcessing(stJniTransParam: Input<TransParam>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stJniTransParam` | `Input<TransParam>` | [input] The related parameters of transaction.Please refer to “Clss_Define.h” for the structure definition of parameters. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error CLSS_USE_CONTACT Transaction must be completed by using another interface.

---

### `buildCandidate`

Combination Selected.

```ts
entry.buildCandidate(slot: number, readLogFlag: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.buildCandidate(slot: number, readLogFlag: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `slot` | `number` | [input] This parameter has not been used at present, and 0 is recommended |
| `readLogFlag` | `number` | [input] This parameter has not been used at present,and 0 is recommended |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR IC card command failed. ICC_BLOCK IC card is blocked. EMV_NO_APP There is no application supported by the terminal. EMV_APP_BLOCK The application is blocked.

---

### `buildCandidateByAID`

Combination Selection with use aid list.

```ts
entry.buildCandidateByAID(slot: number, readLogFlag: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.buildCandidateByAID(slot: number, readLogFlag: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `slot` | `number` | [input] This parameter has not been used at present,and 0 is recommended |
| `readLogFlag` | `number` | [input] This parameter has not been used at present,and 0 is recommended |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR IC card command failed. ICC_BLOCK IC card is blocked. EMV_NO_APP There is no application supported by the terminal. EMV_APP_BLOCK The application is blocked.

---

### `finalSelect`

Final Combination Selection. The application with the highest priority will be selected automatically by the kernel

```ts
entry.finalSelect(pucKernType: Uint8Array, paucDtOut: Uint8Array, pnDtLen: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.finalSelect(pucKernType: Uint8Array, paucDtOut: Uint8Array, pnDtLen: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pucKernType` | `Uint8Array` | [output] Kernel type of final application selection. KERNTYPE_MC: MasterCard. KERNTYPE_VISA: VISA. KERNTYPE_AMEX: AMEX KERNTYPE_JCB: JCB. KERNTYPE_DPAS: DPAS/ZIP KERNTYPE_QPBOC: qPBOC. etc. |
| `paucDtOut` | `Uint8Array` | [output] Name of terminal AID selected finally. |
| `pnDtLen` | `ReadonlyArray<number>` | [output] Length of pucDtOut. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. ICC_CMD_ERR IC card command failed. EMV_RSP_ERR IC card command response code error. EMV_NO_APP There is no application in candidate list. EMV_APP_BLOCK Application is blocked. ICC_BLOCK IC card is blocked. CLSS_USE_CONTACT Try another interface. EMV_DATA_ERR Data error. If necessary, Entry_GetErrorCode can be called to get the detailed error code in this case.

---

### `getPreProcResult`

Get the first combination pre-processing result.

```ts
entry.getPreProcResult(ptInfo: Input<PreProcResult>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getPreProcResult(ptInfo: Input<PreProcResult>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ptInfo` | `Input<PreProcResult>` | [output] The related parameters of preprocessing result. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error. EMV_DATA_ERR No candidate at CandList. EMV_NOT_FOUND The right Combination preprocessing result isn't found.

---

### `getCandList`

> **Deprecated** by the vendor.

```ts
entry.getCandList(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getCandList(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: number): number
```

| Parameter | Type |
| --- | --- |
| `patCandList` | `ReadonlyArray<Input<CandList>>` |
| `pnCandListNum` | `number` |

---

### `setCandList`

> **Deprecated** by the vendor.

```ts
entry.setCandList(patCandList: ReadonlyArray<Input<CandList>>, nCandListNum: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.setCandList(patCandList: ReadonlyArray<Input<CandList>>, nCandListNum: number): number
```

| Parameter | Type |
| --- | --- |
| `patCandList` | `ReadonlyArray<Input<CandList>>` |
| `nCandListNum` | `number` |

---

### `delCandListCurApp`

Delete the current application from the candidate list.

```ts
entry.delCandListCurApp(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.delCandListCurApp(): number
```

**Returns** — EMV_OK Success.

---

### `getErrorCode`

Get the details of error code if necessary.

```ts
entry.getErrorCode(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getErrorCode(): number
```

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `setExtendFunction`

Add a set extend function interface.

```ts
entry.setExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.setExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nIndex` | `number` | [input] Index of extend function. |
| `paucExFunc` | `Uint8Array` | [input] The extend function buffer. paucExFunc[0] value could be: 0x00 : Disable USE AID LIST 0x01 : Enable USE AID LIST(Default) Others : RFU |
| `nExFuncLen` | `number` | [input] The length of extend function buffer. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `getExtendFunction`

Add a set extend function interface.

```ts
entry.getExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getExtendFunction(nIndex: number, paucExFunc: Uint8Array, nExFuncLen: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nIndex` | `number` | [input] Index of extend function. |
| `paucExFunc` | `Uint8Array` | [input] The extend function buffer. paucExFunc[0] value could be: 0x00 : Disable USE AID LIST 0x01 : Enable USE AID LIST(Default) Others : RFU |
| `nExFuncLen` | `number` | [input] The length of extend function buffer. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `getCandListNew`

Get new Candidate List.

```ts
entry.getCandListNew(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getCandListNew(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `patCandList` | `ReadonlyArray<Input<CandList>>` | Index of extend function |
| `pnCandListNum` | `ReadonlyArray<number>` | he extend function buffer. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `setCandListNew`

set Candidate List new.

```ts
entry.setCandListNew(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.setCandListNew(patCandList: ReadonlyArray<Input<CandList>>, pnCandListNum: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `patCandList` | `ReadonlyArray<Input<CandList>>` | Index of extend function |
| `pnCandListNum` | `number` | he extend function buffer. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `getPreProcResultByAid`

Get Pre Proc Result By Aid

```ts
entry.getPreProcResultByAid(paucAID: Uint8Array, ucAidLen: number, paucKernID: Uint8Array, ucKernIDLen: number, ptInfo: Input<PreProcResult>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.entry.getPreProcResultByAid(paucAID: Uint8Array, ucAidLen: number, paucKernID: Uint8Array, ucKernIDLen: number, ptInfo: Input<PreProcResult>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucAID` | `Uint8Array` | Pauc AID data |
| `ucAidLen` | `number` | Pauc AID Length |
| `paucKernID` | `Uint8Array` | Pauc Kernel ID |
| `ucKernIDLen` | `number` | Pauc Kernel ID Length |
| `ptInfo` | `Input<PreProcResult>` | PreProcResult Object |

