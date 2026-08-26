# Events

Callbacks delivered by the device, one union per AIDL listener.

## CameraScanCodeListenerEvent

`com.topwise.cloudpos.aidl.camera.AidlCameraScanCodeListener`

| `_tag` | Fields |
| --- | --- |
| `onResult` | `result: string` |
| `onCancel` | — |
| `onError` | `code: number` |
| `onTimeout` | — |
| `onPreview` | `arg0: Uint8Array`<br>`arg1: number`<br>`arg2: number` |

## DecodeCallBackEvent

`com.topwise.cloudpos.aidl.camera.AidlDecodeCallBack`

| `_tag` | Fields |
| --- | --- |
| `onResult` | `result: string` |
| `onError` | `code: number` |

## CardAidlCheckCardListenerEvent

`com.topwise.cloudpos.aidl.card.AidlCheckCardListener`

| `_tag` | Fields |
| --- | --- |
| `onFindMagCard` | `data: TrackData` |
| `onSwipeCardFail` | — |
| `onFindICCard` | — |
| `onFindRFCard` | — |
| `onTimeout` | — |
| `onCanceled` | — |
| `onError` | `errCode: number` |

## EmvAidlCheckCardListenerEvent

`com.topwise.cloudpos.aidl.emv.AidlCheckCardListener`

| `_tag` | Fields |
| --- | --- |
| `onFindMagCard` | `data: TrackData` |
| `onSwipeCardFail` | — |
| `onFindICCard` | — |
| `onFindRFCard` | — |
| `onTimeout` | — |
| `onCanceled` | — |
| `onError` | `errCode: number` |

## EmvCallbackEvent

`com.topwise.cloudpos.aidl.emv.level2.EmvCallback`

| `_tag` | Fields |
| --- | --- |
| `cGetOnlinePin` | `bAllowBypass: boolean`<br>`pPAN: Uint8Array`<br>`uiPAN: number`<br>`pbBypass: ReadonlyArray<boolean>` |
| `cGetPlainTextPin` | `bAllowBypass: boolean`<br>`pPIN: Uint8Array`<br>`uiPINSize: number`<br>`pbBypass: ReadonlyArray<boolean>` |
| `cDisplayPinVerifyStatus` | `ucRetryTimes: number` |
| `cCheckCredentials` | `bCredentialsType: number`<br>`pszCredentialNumber: Uint8Array`<br>`uiCNLen: number`<br>`pCheckSuccess: ReadonlyArray<boolean>` |
| `cIssuerReferral` | `pPAN: Uint8Array`<br>`uiPAN: number` |
| `cGetTransLogAmount` | `pPAN: Uint8Array`<br>`uiPAN: number`<br>`ucPANSeq: number` |
| `cCheckExceptionFile` | `pPAN: Uint8Array`<br>`uiPAN: number`<br>`ucPANSeq: number` |
| `cRFU1` | — |
| `cRFU2` | — |
| `cRFU3` | — |
| `cRFU4` | — |

### EmvCallbackHandlers

The kernel blocks waiting for each of these. Every method must be
implemented and return a number; none may fail.

## PaypassCallbackEvent

`com.topwise.cloudpos.aidl.emv.level2.PaypassCallback`

| `_tag` | Fields |
| --- | --- |
| `cSendDEKData` | `pucDEKData: Uint8Array`<br>`unDEKDataLen: number` |
| `cReceiveDETData` | `pucDETData: Uint8Array`<br>`punDETDataLen: ReadonlyArray<number>`<br>`pucAnotherDETFlg: Uint8Array` |
| `cAddAPDUToTransLog` | `ptApduSend: ApduL2Send`<br>`ptApduRecv: ApduL2Resp` |
| `cSendTransDataOutput` | `ucMsgFlag: number` |
| `cRFU1` | — |
| `cRFU2` | — |

### PaypassCallbackHandlers

The kernel blocks waiting for each of these. Every method must be
implemented and return a number; none may fail.

## QpbocCallbackEvent

`com.topwise.cloudpos.aidl.emv.level2.QpbocCallback`

| `_tag` | Fields |
| --- | --- |
| `cCheckExceptionFile` | `PAN: Uint8Array`<br>`PANLen: number`<br>`sequenceNumber: number` |
| `cRFU1` | — |
| `cRFU2` | — |

### QpbocCallbackHandlers

The kernel blocks waiting for each of these. Every method must be
implemented and return a number; none may fail.

## FingerprintListenerEvent

`com.topwise.cloudpos.aidl.fingerprint.FingerprintListener`

| `_tag` | Fields |
| --- | --- |
| `onSuccess` | `result: FingerprintResult` |
| `onProcess` | `result: FingerprintResult` |
| `onFail` | `error: number` |

## KLDLogExportListenerEvent

`com.topwise.cloudpos.aidl.kld.AidlKLDLogExportListener`

| `_tag` | Fields |
| --- | --- |
| `onProgress` | `arg0: number` |
| `onError` | `arg0: string` |

## EncryptMagCardListenerEvent

`com.topwise.cloudpos.aidl.magcard.EncryptMagCardListener`

| `_tag` | Fields |
| --- | --- |
| `onTimeout` | — |
| `onError` | `errorCode: number` |
| `onCanceled` | — |
| `onSuccess` | `trackData: ReadonlyArray<string>` |
| `onGetTrackFail` | — |

## MagCardListenerEvent

`com.topwise.cloudpos.aidl.magcard.MagCardListener`

| `_tag` | Fields |
| --- | --- |
| `onTimeout` | — |
| `onError` | `errorCode: number` |
| `onCanceled` | — |
| `onSuccess` | `trackData: TrackData` |
| `onGetTrackFail` | — |

## TransRequestCallbackEvent

`com.topwise.cloudpos.aidl.mdb.TransRequestCallback`

| `_tag` | Fields |
| --- | --- |
| `onReceived` | `arg0: string` |

## MQTTActionListenerEvent

`com.topwise.cloudpos.aidl.mqtt.AidlMQTTActionListener`

| `_tag` | Fields |
| --- | --- |
| `messageArrived` | `topic: string`<br>`msgStr: MQTTMessage` |
| `deliveryComplete` | `msgStr: MQTTMessage` |
| `connectionLost` | `throwable: string` |

## MQTTListenerEvent

`com.topwise.cloudpos.aidl.mqtt.AidlMQTTListener`

| `_tag` | Fields |
| --- | --- |
| `onSuccess` | — |
| `onFailure` | `error: number` |

## ImageCallbackEvent

`com.topwise.cloudpos.aidl.palmprint.ImageCallback`

| `_tag` | Fields |
| --- | --- |
| `onImageCaptured` | `bitmap: Bitmap` |

## ResultCallbackCallbackEvent

`com.topwise.cloudpos.aidl.palmprint.ResultCallbackCallback`

| `_tag` | Fields |
| --- | --- |
| `onResult` | `arg0: number`<br>`arg1: string` |

## GetPinListenerEvent

`com.topwise.cloudpos.aidl.pinpad.GetPinListener`

| `_tag` | Fields |
| --- | --- |
| `onInputKey` | `len: number`<br>`msg: string` |
| `onError` | `errorCode: number` |
| `onConfirmInput` | `pin: Uint8Array` |
| `onCancelKeyPress` | — |
| `onStopGetPin` | — |
| `onTimeout` | — |

## PrinterListenerEvent

`com.topwise.cloudpos.aidl.printer.AidlPrinterListener`

| `_tag` | Fields |
| --- | --- |
| `onError` | `errorCode: number` |
| `onPrintFinish` | — |

## InstructionSendDataCallbackEvent

`com.topwise.cloudpos.aidl.shellmonitor.InstructionSendDataCallback`

| `_tag` | Fields |
| --- | --- |
| `onReceiveData` | `resultCode: number`<br>`tlvArray: Uint8Array` |

## PosKeyListenerEvent

`com.topwise.cloudpos.aidl.system.AidlPosKeyListener`

| `_tag` | Fields |
| --- | --- |
| `dispatchKeyEvent` | `keyEvent: KeyEventData` |

## InstallAppObserverEvent

`com.topwise.cloudpos.aidl.system.InstallAppObserver`

| `_tag` | Fields |
| --- | --- |
| `onInstallFinished` | — |
| `onInstallError` | `errorCode: number` |

## UninstallAppObserverEvent

`com.topwise.cloudpos.aidl.system.UninstallAppObserver`

| `_tag` | Fields |
| --- | --- |
| `onUninstallFinished` | — |
| `onUninstallError` | `errorCode: number` |

## TMListenerEvent

`com.topwise.cloudpos.aidl.tm.AidlTMListener`

| `_tag` | Fields |
| --- | --- |
| `onResult` | `result: string` |
| `onError` | `error: string` |
| `onTimeOut` | — |

