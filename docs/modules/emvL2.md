# emvL2

`com.topwise.cloudpos.aidl.emv.level2.AidlEmvL2`

47 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`checkCard`](#checkcard) · [`cancelCheckCard`](#cancelcheckcard) · [`EMV_Initialize`](#emv-initialize) · [`EMV_GetVersion`](#emv-getversion) · [`EMV_SetTLVData`](#emv-settlvdata) · [`EMV_GetTLVData`](#emv-gettlvdata) · [`EMV_SetKernelConfig`](#emv-setkernelconfig) · [`EMV_GetKernelConfig`](#emv-getkernelconfig) · [`EMV_SetTerminalInfo`](#emv-setterminalinfo) · [`EMV_GetTerminalInfo`](#emv-getterminalinfo) · [`EMV_SetKernelType`](#emv-setkerneltype) · [`EMV_GetKernelType`](#emv-getkerneltype) · [`EMV_DelAllAIDList`](#emv-delallaidlist) · [`EMV_AddAIDList`](#emv-addaidlist) · [`EMV_DelAllCAPK`](#emv-delallcapk) · [`EMV_AddCAPK`](#emv-addcapk) · [`EMV_DelAllRevoIPK`](#emv-delallrevoipk) · [`EMV_AddRevoIPK`](#emv-addrevoipk) · [`EMV_AppCandidateBuild`](#emv-appcandidatebuild) · [`EMV_AppFinalSelect`](#emv-appfinalselect) · [`EMV_AppGetCandList`](#emv-appgetcandlist) · [`EMV_AppGetCandListCount`](#emv-appgetcandlistcount) · [`EMV_AppGetCandListItem`](#emv-appgetcandlistitem) · [`EMV_AppDelCandListItem`](#emv-appdelcandlistitem) · [`EMV_GPOProc`](#emv-gpoproc) · [`EMV_ReadRecordData`](#emv-readrecorddata) · [`EMV_OfflineDataAuth`](#emv-offlinedataauth) · [`EMV_TerminalRiskManagement`](#emv-terminalriskmanagement) · [`EMV_ProcessingRestrictions`](#emv-processingrestrictions) · [`EMV_CardHolderVerify`](#emv-cardholderverify) · [`EMV_TermActionAnalyze`](#emv-termactionanalyze) · [`EMV_OnlineTransEx`](#emv-onlinetransex) · [`EMV_ProcessOnlineRespData`](#emv-processonlinerespdata) · [`EMV_IssueToCardScript`](#emv-issuetocardscript) · [`EMV_Completion`](#emv-completion) · [`EMV_GetLastStatusWord`](#emv-getlaststatusword) · [`EMV_GetScriptResult`](#emv-getscriptresult) · [`EMV_GetDataFromICC`](#emv-getdatafromicc) · [`EMV_ReadCardLog`](#emv-readcardlog) · [`EMV_SetSupport_PBOC`](#emv-setsupport-pboc) · [`EMV_SetCallback`](#emv-setcallback) · [`EMV_FreeCallback`](#emv-freecallback) · [`EMV_SetExtendFunc`](#emv-setextendfunc) · [`EMV_GetExtendFunc`](#emv-getextendfunc) · [`checkCardEx`](#checkcardex) · [`EMV_UpdateDataContProcDPAS`](#emv-updatedatacontprocdpas) · [`EMV_GetDebugInfo`](#emv-getdebuginfo)

---

### `checkCard`

check Card

```ts
emvL2.checkCard(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number)
  : Stream<EmvAidlCheckCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.emvL2.checkCard(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `supportMag` | `boolean` | Whether to support magnetic stripe card. |
| `supportIC` | `boolean` | Whether to support IC card. |
| `supportRF` | `boolean` | Whether RF card is supported. |
| `timeout` | `number` | time out. |

**Events** — [`EmvAidlCheckCardListenerEvent`](../events.md#emvaidlcheckcardlistenerevent).

---

### `cancelCheckCard`

cancel Check Card

```ts
emvL2.cancelCheckCard(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.cancelCheckCard(): void
```

---

### `EMV_Initialize`

EMV kernel initialization

```ts
emvL2.EMV_Initialize(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_Initialize(): number
```

**Returns** — EMV_OK Initialization succeeds

---

### `EMV_GetVersion`

Get the version of EMV kernel and the releaattentionse date

```ts
emvL2.EMV_GetVersion(pacVer: Uint8Array, uiSize: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetVersion(pacVer: Uint8Array, uiSize: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pacVer` | `Uint8Array` | [output] Version and release date of kernel with the maximum length of 20 bytes. For example "V100 2020.09.01" (rear part is date). |
| `uiSize` | `number` | [input] The maximum length of pacVer. |

**Returns** — EMV_OK Success. EMV_MEMORY_NOT_ENOUGH Memory is not enough.

---

### `EMV_SetTLVData`

Set the value of the data element by specifying the tag

```ts
emvL2.EMV_SetTLVData(uiTag: number, pValue: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetTLVData(uiTag: number, pValue: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `uiTag` | `number` | [input] Tag of EMV standard or extended data element. |
| `pValue` | `Uint8Array` | [input] The value of the data element specified by the tag. |

**Returns** — EMV_OK Success. EMV_PARAMETER_ERROR Parameter error. EMV_DATA_LENGTH_ERROR Data length error. EMV_MEMORY_NOT_ENOUGH Memory is not enough.

---

### `EMV_GetTLVData`

Get the value of the data element by specifying the tag.

```ts
emvL2.EMV_GetTLVData(uiTag: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetTLVData(uiTag: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `uiTag` | `number` | [input] Tag of EMV standard or extended data element. |

**Returns** — data element by specifying the tag.

---

### `EMV_SetKernelConfig`

Set kernel information

```ts
emvL2.EMV_SetKernelConfig(stKernelConfig: Input<EmvKernelConfig>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetKernelConfig(stKernelConfig: Input<EmvKernelConfig>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stKernelConfig` | `Input<EmvKernelConfig>` | [input] The kernel information. Refer to appendix for structure EMV_KERNEL_CONFIG. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_GetKernelConfig`

Get kernel type.

```ts
emvL2.EMV_GetKernelConfig(): Effect<EmvKernelConfig, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetKernelConfig(): EmvKernelConfig
```

**Returns** — Emv L2 Kernel Config.

---

### `EMV_SetTerminalInfo`

Set Emv L2 Terminal Information

```ts
emvL2.EMV_SetTerminalInfo(stTerminalInfo: Input<EmvTerminalInfo>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetTerminalInfo(stTerminalInfo: Input<EmvTerminalInfo>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stTerminalInfo` | `Input<EmvTerminalInfo>` | [input] The terminal information. Refer to appendix for structure EMV_TERMINAL_INFO. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_GetTerminalInfo`

get Emv L2 Terminal Info

```ts
emvL2.EMV_GetTerminalInfo(): Effect<EmvTerminalInfo, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetTerminalInfo(): EmvTerminalInfo
```

**Returns** — Emv L2 Terminal Info

---

### `EMV_SetKernelType`

Set Emv L2 Kernel Type

```ts
emvL2.EMV_SetKernelType(ucKernelType: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetKernelType(ucKernelType: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `ucKernelType` | `number` | [input] The Kernel Type Value. KERNTYPE_EMV – 0x00 (Default). KERNTYPE_PBOC – 0xE1. KERNTYPE_NSICC– 0xE2. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_GetKernelType`

get Emv L2 Kernel Type

```ts
emvL2.EMV_GetKernelType(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetKernelType(): number
```

**Returns** — Kernel Type.

---

### `EMV_DelAllAIDList`

Delete All AID List

```ts
emvL2.EMV_DelAllAIDList(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_DelAllAIDList(): void
```

---

### `EMV_AddAIDList`

Add AID List

```ts
emvL2.EMV_AddAIDList(paucAID: Uint8Array, ucAIDLen: number, ucPartMatch: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AddAIDList(paucAID: Uint8Array, ucAIDLen: number, ucPartMatch: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucAID` | `Uint8Array` | [input] The AID value. |
| `ucAIDLen` | `number` | [input] The lebgr |
| `ucPartMatch` | `number` |  |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_DelAllCAPK`

Delete All CAPK

```ts
emvL2.EMV_DelAllCAPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_DelAllCAPK(): void
```

---

### `EMV_AddCAPK`

Add CAPK

```ts
emvL2.EMV_AddCAPK(stCapk: Input<EmvCapk>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AddCAPK(stCapk: Input<EmvCapk>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stCapk` | `Input<EmvCapk>` | [input] The public key. Refer to appendix for structure EMV_CAPK. |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_DelAllRevoIPK`

Delete All Revo IPK

```ts
emvL2.EMV_DelAllRevoIPK(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_DelAllRevoIPK(): void
```

---

### `EMV_AddRevoIPK`

Add Revo IPK

```ts
emvL2.EMV_AddRevoIPK(stRevoIPK: Input<EmvRevocList>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AddRevoIPK(stRevoIPK: Input<EmvRevocList>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stRevoIPK` | `Input<EmvRevocList>` | [input] The revoked issuer public key certification. Refer to appendix for structure EMV_REVOCLIST |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_AppCandidateBuild`

Building the Candidate List

```ts
emvL2.EMV_AppCandidateBuild(bIncludeBlockedApp: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppCandidateBuild(bIncludeBlockedApp: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bIncludeBlockedApp` | `number` | [input] Allow blocked AID added to candidate list. |

**Returns** — EMV_OK Success. EMV_INVALID_RESPONSE Invalid response data. EMV_MEMORY_OVERFLOW Memory overflow. EMV_NO_APP There is no IC card application supported by terminal. EMV_ICC_ERROR IC card command failed. EMV_CARD_BLOCKED IC card has been blocked. EMV_APP_BLOCK Application has been blocked.

---

### `EMV_AppFinalSelect`

Final selection with the selected candidate AID.

```ts
emvL2.EMV_AppFinalSelect(stApp: Input<EmvCandidateItem>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppFinalSelect(stApp: Input<EmvCandidateItem>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `stApp` | `Input<EmvCandidateItem>` | [input] Refer to appendix for structure EMV_CANDIDATE_ITEM. |

**Returns** — EMV_OK Success. EMV_ICC_ERROR IC card command failed. EMV_INVALID_TLV Invalid TLV. EMV_INVALID_RESPONSE Invalid response data. EMV_APP_BLOCK Application has been blocked.

---

### `EMV_AppGetCandList`

Get all candidate AID list from kernel.

```ts
emvL2.EMV_AppGetCandList(): Effect<ReadonlyArray<EmvCandidateItem>, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppGetCandList(): ReadonlyArray<EmvCandidateItem>
```

**Returns** — All candidate AID list from kernel.

---

### `EMV_AppGetCandListCount`

Get count of candidate AID list.

```ts
emvL2.EMV_AppGetCandListCount(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppGetCandListCount(): number
```

**Returns** — The count of candidate AID list.

---

### `EMV_AppGetCandListItem`

Get the candidate by index from candidate AID list.

```ts
emvL2.EMV_AppGetCandListItem(uiIndex: number): Effect<EmvCandidateItem, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppGetCandListItem(uiIndex: number): EmvCandidateItem
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `uiIndex` | `number` | The index of candidate AID. |

**Returns** — candidate.

---

### `EMV_AppDelCandListItem`

Delete the candidate by index from candidate AID list.

```ts
emvL2.EMV_AppDelCandListItem(uiIndex: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_AppDelCandListItem(uiIndex: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `uiIndex` | `number` | The index of candidate AID. |

**Returns** — EMV_TRUE Success. EMV_FALSE The index can not be found.

---

### `EMV_GPOProc`

Initiate Application Processing.

```ts
emvL2.EMV_GPOProc(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GPOProc(): number
```

**Returns** — EMV_OK Success. EMV_ICC_ERROR IC card command failed. EMV_INVALID_TLV Invalid TLV. EMV_INVALID_RESPONSE Invalid response data. EMV_TERMINATED Transaction terminated.

---

### `EMV_ReadRecordData`

Read application data.

```ts
emvL2.EMV_ReadRecordData(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_ReadRecordData(): number
```

**Returns** — EMV_OK Success. EMV_ICC_ERROR IC card command failed. EMV_INVALID_TLV Invalid TLV. EMV_INVALID_RESPONSE Invalid response data. EMV_TERMINATED Transaction terminated. EMV_DATA_NOT_EXISTS Data doesn't exist.(AFL- 94 not present.)

---

### `EMV_OfflineDataAuth`

Offline Data Authentication.

```ts
emvL2.EMV_OfflineDataAuth(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_OfflineDataAuth(): number
```

**Returns** — EMV_OK Completed. EMV_ICC_ERROR IC card command failed. EMV_TERMINATED Transaction terminated.

---

### `EMV_TerminalRiskManagement`

Terminal Risk Management.

```ts
emvL2.EMV_TerminalRiskManagement(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_TerminalRiskManagement(): number
```

**Returns** — EMV_OK Success.

---

### `EMV_ProcessingRestrictions`

Processing Restrictions.

```ts
emvL2.EMV_ProcessingRestrictions(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_ProcessingRestrictions(): number
```

**Returns** — EMV_OK Success.

---

### `EMV_CardHolderVerify`

Cardholder Verification.

```ts
emvL2.EMV_CardHolderVerify(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_CardHolderVerify(): number
```

**Returns** — EMV_OK Success. EMV_TERMINATED Transaction terminated.

---

### `EMV_TermActionAnalyze`

Terminal Action Analysis 1st GAC.

```ts
emvL2.EMV_TermActionAnalyze(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_TermActionAnalyze(): number
```

**Returns** — EMV_OK Success. EMV_ICC_ERROR IC card command failed. EMV_INVALID_TLV Invalid TLV EMV_INVALID_RESPONSE Invalid response data. EMV_TERMINATED Transaction terminated. EMV_FALLBACK ICC response 6985 in 1st GAC. Fallback. EMV_DECLINED Transaction declined. EMV_APPROVED Transaction offline approved. EMV_ONLINE_REQUEST Online request.

---

### `EMV_OnlineTransEx`

Online transaction check result

```ts
emvL2.EMV_OnlineTransEx(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_OnlineTransEx(): number
```

**Returns** — EMV_OK Success. EMV_TERMINATED Transaction terminated. EMV_DECLINED Transaction declined. EMV_APPROVED Offline Transaction approved.

---

### `EMV_ProcessOnlineRespData`

Performing online data processing

```ts
emvL2.EMV_ProcessOnlineRespData(onlineResult: number, pIssueAuthData: Uint8Array, pARC: Uint8Array, pIssuerAuthCode: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_ProcessOnlineRespData(onlineResult: number, pIssueAuthData: Uint8Array, pARC: Uint8Array, pIssuerAuthCode: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `onlineResult` | `number` | [input] EMV_ONLINE_APPROVED - Onlineapproved or online referral approved. EMV_ONLINE_CONNECT_FAILED -Online failed. EMV_ONLINE_REJECT – Online rejected or online referral rejected. If the online status is out of these ranges,the application should reject the transaction. |
| `pIssueAuthData` | `Uint8Array` | [input] Issuer Authentication Data – TAG-91. |
| `pARC` | `Uint8Array` | [input] Authorisation Response Code – TAG-8A. |
| `pIssuerAuthCode` | `Uint8Array` | [input] Length 6bytes. |

**Returns** — EMV_OK Success. EMV_PARAM_ERR Parameter error. EMV_TERMINATED Transaction terminated. EMV_DECLINED Transaction declined. EMV_APPROVED Transaction approved.

---

### `EMV_IssueToCardScript`

Script 71/72 processing before or after 2nd GAC.

```ts
emvL2.EMV_IssueToCardScript(bBefore2ndAC: number, pIssueScript: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_IssueToCardScript(bBefore2ndAC: number, pIssueScript: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bBefore2ndAC` | `number` | [input] 0x01 – Process script 71 before 2ndGAC 0x00 – Process script 72 after 2ndGAC |
| `pIssueScript` | `Uint8Array` | [input] Issuer script data in TLV format |

**Returns** — EMV_OK Success. EMV_PARAM_ERR Parameter error. EMV_ICC_ERROR IC card command failed.

---

### `EMV_Completion`

Process 2nd GAC.

```ts
emvL2.EMV_Completion(bApprove: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_Completion(bApprove: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bApprove` | `number` | Approved transaction or not. EMV_TRUE or EMV_FALSE |

**Returns** — EMV_OK Success. EMV_TERMINATED Transaction terminated. EMV_DECLINED Transaction declined. EMV_APPROVED Transaction approved.

---

### `EMV_GetLastStatusWord`

Read the response status word of the last command.

```ts
emvL2.EMV_GetLastStatusWord(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetLastStatusWord(): number
```

**Returns** — the response status word of the last command.

---

### `EMV_GetScriptResult`

Get result of script processing.

```ts
emvL2.EMV_GetScriptResult(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetScriptResult(): Uint8Array
```

**Returns** — Result of the script processing.

---

### `EMV_GetDataFromICC`

get Emv L2 data from IC Card

```ts
emvL2.EMV_GetDataFromICC(TagNum: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetDataFromICC(TagNum: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `TagNum` | `number` | [input] Tag value,Tag 9F4D/9F4F etc. |

**Returns** — Emv L2 data.

---

### `EMV_ReadCardLog`

Read Emv L2 Card Log

```ts
emvL2.EMV_ReadCardLog(aucLogEntry: Uint8Array, uiRecordNo: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_ReadCardLog(aucLogEntry: Uint8Array, uiRecordNo: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `aucLogEntry` | `Uint8Array` | [input] Log Entry value of 9F4D |
| `uiRecordNo` | `number` | [input] Record number |

**Returns** — Emv L2 Card Log

---

### `EMV_SetSupport_PBOC`

Set EMV L2 support pboc

```ts
emvL2.EMV_SetSupport_PBOC(bSMEnabled: number, bECEnabled: number, uiECFloorLimit: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetSupport_PBOC(bSMEnabled: number, bECEnabled: number, uiECFloorLimit: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bSMEnabled` | `number` | [input] SM enable flag |
| `bECEnabled` | `number` | [input] EC enable flag |
| `uiECFloorLimit` | `number` | [input] EC floor limit |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_SetCallback`

Set EMV L2 Call back

```ts
emvL2.EMV_SetCallback(handlers: EmvCallbackHandlers, options?: CallbackOptions)
  : Effect<number, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.emvL2.EMV_SetCallback(handlers, options?): number
```

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

**Handlers** — [`EmvCallbackHandlers`](../events.md#emvcallbackhandlers). The kernel
blocks on the binder thread until each handler answers, so every method
must be implemented and none may fail.

---

### `EMV_FreeCallback`

Free EMV L2 Call back

```ts
emvL2.EMV_FreeCallback(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_FreeCallback(): void
```

---

### `EMV_SetExtendFunc`

Extend function to set additional information

```ts
emvL2.EMV_SetExtendFunc(nFlag: number, paucDataIn: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_SetExtendFunc(nFlag: number, paucDataIn: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |
| `paucDataIn` | `Uint8Array` | [input] RFU |

**Returns** — EMV_OK Success. CLSS_PARAM_ERR Parameter error.

---

### `EMV_GetExtendFunc`

Extend function to get additional information

```ts
emvL2.EMV_GetExtendFunc(nFlag: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetExtendFunc(nFlag: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nFlag` | `number` | [input] RFU |

**Returns** — RFU

---

### `checkCardEx`

check Card Ext

```ts
emvL2.checkCardEx(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number, isSm4: boolean)
  : Stream<EmvAidlCheckCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.emvL2.checkCardEx(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number, isSm4: boolean, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `supportMag` | `boolean` | Whether to support magnetic stripe card |
| `supportIC` | `boolean` | Whether to support IC card |
| `supportRF` | `boolean` | Whether RF card is supported |
| `timeout` | `number` | time out |
| `isSm4` | `boolean` |  |

**Events** — [`EmvAidlCheckCardListenerEvent`](../events.md#emvaidlcheckcardlistenerevent).

---

### `EMV_UpdateDataContProcDPAS`

Update DataCont Proc DPAS

```ts
emvL2.EMV_UpdateDataContProcDPAS(paucDataIn: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_UpdateDataContProcDPAS(paucDataIn: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `paucDataIn` | `Uint8Array` | [input] RFU |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

---

### `EMV_GetDebugInfo`

Get the debug information.

```ts
emvL2.EMV_GetDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.emvL2.EMV_GetDebugInfo(nExpAssistInfoLen: number, paucAssistInfo: Uint8Array, pnErrorCode: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `nExpAssistInfoLen` | `number` | [input] RFU(0 can be used). |
| `paucAssistInfo` | `Uint8Array` | [output] RFU (NULL can be used). |
| `pnErrorCode` | `ReadonlyArray<number>` | [output] The error code. |

**Returns** — EMV_OK Successful. CLSS_PARAM_ERR Parameter error.

