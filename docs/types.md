# Data types

63 carriers mirrored from the jar. Fields are nullable because Java's are.

## CustomUsageStats

`android.app.pos.CustomUsageStats`

| Field | Type |
| --- | --- |
| `mPackageName` | `string \| null` |
| `mPackageToken` | `number \| null` |
| `mBeginTimeStamp` | `number \| null` |
| `mEndTimeStamp` | `number \| null` |
| `mLastTimeUsed` | `number \| null` |
| `mLastTimeVisible` | `number \| null` |
| `mTotalTimeInForeground` | `number \| null` |
| `mTotalTimeVisible` | `number \| null` |
| `mLastTimeForegroundServiceUsed` | `number \| null` |
| `mTotalTimeForegroundServiceUsed` | `number \| null` |
| `mLaunchCount` | `number \| null` |
| `mAppLaunchCount` | `number \| null` |
| `mLastEvent` | `number \| null` |
| `mActivities` | `Readonly<Record<string, number>> \| null` |
| `mForegroundServices` | `Readonly<Record<string, number>> \| null` |
| `mChooserCounts` | `Readonly<Record<string, Readonly<Record<string, number>>>> \| null` |
| `mChooserCountsObfuscated` | `Readonly<Record<string, Readonly<Record<string, number>>>> \| null` |

## ExpandFunctionConstantError

`com.topwise.cloudpos.ExpandFunctionConstant$Error`

| Field | Type |
| --- | --- |
| `this$0` | `number \| null` |

## ExpandFunctionConstantKey

`com.topwise.cloudpos.ExpandFunctionConstant$Key`

| Field | Type |
| --- | --- |
| `this$0` | `number \| null` |

## DecodeParameter

`com.topwise.cloudpos.aidl.camera.DecodeParameter`

| Field | Type |
| --- | --- |
| `flashLightTimeout` | `number \| null` |
| `decodeIntervalTime` | `number \| null` |
| `decodeMode` | `number \| null` |
| `decodeSingleTimeout` | `number \| null` |
| `supportCodeTypeList` | `ReadonlyArray<string> \| null` |
| `noSupportCodeTypeList` | `ReadonlyArray<string> \| null` |
| `autoDetect` | `number \| null` |

## CandidateApp

`com.topwise.cloudpos.aidl.emv.CandidateApp`

| Field | Type |
| --- | --- |
| `aidLen` | `number \| null` |
| `aid` | `Uint8Array \| null` |
| `appLabelLen` | `number \| null` |
| `appLabel` | `Uint8Array \| null` |
| `apidFLag` | `number \| null` |
| `apid` | `number \| null` |
| `langPrefLen` | `number \| null` |
| `langPref` | `Uint8Array \| null` |
| `issCTIndexFlag` | `number \| null` |
| `issCTIndex` | `number \| null` |
| `apnLen` | `number \| null` |
| `apn` | `Uint8Array \| null` |
| `kernelIDLen` | `number \| null` |
| `kernelID` | `Uint8Array \| null` |

## CardInfo

`com.topwise.cloudpos.aidl.emv.CardInfo`

| Field | Type |
| --- | --- |
| `cardno` | `string \| null` |

## EmvTransData

`com.topwise.cloudpos.aidl.emv.EmvTransData`

| Field | Type |
| --- | --- |
| `transtype` | `number \| null` |
| `requestAmtPosition` | `number \| null` |
| `isEcashEnable` | `boolean \| null` |
| `isSmEnable` | `boolean \| null` |
| `isForceOnline` | `boolean \| null` |
| `emvFlow` | `number \| null` |
| `slotType` | `number \| null` |
| `reserv` | `Uint8Array \| null` |

## PCardLoadLog

`com.topwise.cloudpos.aidl.emv.PCardLoadLog`

| Field | Type |
| --- | --- |
| `putdata_p1` | `string \| null` |
| `putdata_p2` | `string \| null` |
| `before_putdata` | `string \| null` |
| `after_putdata` | `string \| null` |
| `transDate` | `string \| null` |
| `transTime` | `string \| null` |
| `appTransCount` | `Uint8Array \| null` |

## PCardTransLog

`com.topwise.cloudpos.aidl.emv.PCardTransLog`

| Field | Type |
| --- | --- |
| `transDate` | `string \| null` |
| `transTime` | `string \| null` |
| `amt` | `string \| null` |
| `otheramt` | `string \| null` |
| `countryCode` | `string \| null` |
| `moneyCode` | `string \| null` |
| `merchantName` | `string \| null` |
| `transtype` | `number \| null` |
| `appTransCount` | `Uint8Array \| null` |

## TerminalParam

`com.topwise.cloudpos.aidl.emv.TerminalParam`

| Field | Type |
| --- | --- |
| `IFDSn` | `Uint8Array \| null` |
| `terminalType` | `number \| null` |
| `countryCode` | `Uint8Array \| null` |
| `currencyCode` | `Uint8Array \| null` |
| `capability` | `Uint8Array \| null` |
| `addCapability` | `Uint8Array \| null` |

## ApduL2Resp

`com.topwise.cloudpos.aidl.emv.level2.ApduL2Resp`

| Field | Type |
| --- | --- |
| `lenOut` | `number \| null` |
| `dataOut` | `Uint8Array \| null` |
| `swa` | `number \| null` |
| `swb` | `number \| null` |

## ApduL2Send

`com.topwise.cloudpos.aidl.emv.level2.ApduL2Send`

| Field | Type |
| --- | --- |
| `command` | `Uint8Array \| null` |
| `lc` | `number \| null` |
| `dataIn` | `Uint8Array \| null` |
| `le` | `number \| null` |

## CandList

`com.topwise.cloudpos.aidl.emv.level2.CandList`

| Field | Type |
| --- | --- |
| `ucIccAidLen` | `number \| null` |
| `aucIccAID` | `Uint8Array \| null` |
| `ucAppLabelLen` | `number \| null` |
| `aucAppLabel` | `Uint8Array \| null` |
| `ucPreferNameLen` | `number \| null` |
| `aucPreferName` | `Uint8Array \| null` |
| `ucPriority` | `number \| null` |
| `ucKernIDLen` | `number \| null` |
| `aucKernelID` | `Uint8Array \| null` |
| `ucTmAidLen` | `number \| null` |
| `aucTmAID` | `Uint8Array \| null` |
| `aucIssCountryCode` | `Uint8Array \| null` |
| `aucIssIDNum` | `Uint8Array \| null` |
| `ucReqKernIDLen` | `number \| null` |
| `aucReqKernelID` | `Uint8Array \| null` |
| `ucExtendedSelLen` | `number \| null` |
| `aucExtendedSel` | `Uint8Array \| null` |
| `aucReaderTTQ` | `Uint8Array \| null` |

## ClssTornLogRecord

`com.topwise.cloudpos.aidl.emv.level2.ClssTornLogRecord`

| Field | Type |
| --- | --- |
| `aucPAN` | `Uint8Array \| null` |
| `ucPANLen` | `number \| null` |
| `ucPANSeqFlg` | `number \| null` |
| `ucPANSeq` | `number \| null` |
| `aucRFU` | `Uint8Array \| null` |
| `aucTornData` | `Uint8Array \| null` |
| `unTornDataLen` | `number \| null` |

## Combination

`com.topwise.cloudpos.aidl.emv.level2.Combination`

| Field | Type |
| --- | --- |
| `ulTermFLmt` | `number \| null` |
| `aucRdClssTxnLmt` | `Uint8Array \| null` |
| `aucRdCVMLmt` | `Uint8Array \| null` |
| `aucRdClssFLmt` | `Uint8Array \| null` |
| `aucAID` | `Uint8Array \| null` |
| `aucKernelID` | `Uint8Array \| null` |
| `aucReaderTTQ` | `Uint8Array \| null` |
| `aucRFU` | `Uint8Array \| null` |
| `ucTermFLmtFlg` | `number \| null` |
| `ucRdClssTxnLmtFlg` | `number \| null` |
| `ucRdCVMLmtFlg` | `number \| null` |
| `ucRdClssFLmtFlg` | `number \| null` |
| `ucZeroAmtNoAllowed` | `number \| null` |
| `ucCrypto17Flg` | `number \| null` |
| `ucExSelectSuppFlg` | `number \| null` |
| `ucStatusCheckFlg` | `number \| null` |
| `ucAidLen` | `number \| null` |
| `ucPartMatch` | `number \| null` |
| `ucKernIDLen` | `number \| null` |

## EmvCandidateItem

`com.topwise.cloudpos.aidl.emv.level2.EmvCandidateItem`

| Field | Type |
| --- | --- |
| `aucAID` | `Uint8Array \| null` |
| `aucAppLabel` | `Uint8Array \| null` |
| `aucPreferAppName` | `Uint8Array \| null` |
| `aucDisplayName` | `Uint8Array \| null` |
| `ucPriority` | `number \| null` |
| `ucNeedConfirm` | `number \| null` |
| `aucRFU` | `Uint8Array \| null` |

## EmvCapk

`com.topwise.cloudpos.aidl.emv.level2.EmvCapk`

| Field | Type |
| --- | --- |
| `RID` | `Uint8Array \| null` |
| `KeyID` | `number \| null` |
| `HashInd` | `number \| null` |
| `ArithInd` | `number \| null` |
| `ModulLen` | `number \| null` |
| `Modul` | `Uint8Array \| null` |
| `ExponentLen` | `number \| null` |
| `Exponent` | `Uint8Array \| null` |
| `ExpDate` | `Uint8Array \| null` |
| `CheckSum` | `Uint8Array \| null` |

## EmvKernelConfig

`com.topwise.cloudpos.aidl.emv.level2.EmvKernelConfig`

| Field | Type |
| --- | --- |
| `bPSE` | `number \| null` |
| `bCardHolderConfirm` | `number \| null` |
| `bPreferredDisplayOrder` | `number \| null` |
| `bLanguateSelect` | `number \| null` |
| `bRevocationOfIssuerPublicKey` | `number \| null` |
| `bDefaultDDOL` | `number \| null` |
| `bBypassPINEntry` | `number \| null` |
| `bSubBypassPINEntry` | `number \| null` |
| `bGetdataForPINTryCounter` | `number \| null` |
| `bFloorLimitCheck` | `number \| null` |
| `bRandomTransSelection` | `number \| null` |
| `bVelocityCheck` | `number \| null` |
| `bTransactionLog` | `number \| null` |
| `bExceptionFile` | `number \| null` |
| `bTerminalActionCode` | `number \| null` |
| `bDefaultActionCodeMethod` | `number \| null` |
| `bTACIACDefaultSkipedWhenUnableToGoOnline` | `number \| null` |
| `bCDAFailureDetectedPriorTerminalActionAnalysis` | `number \| null` |
| `bCDAMethod` | `number \| null` |
| `bForcedOnline` | `number \| null` |
| `bForcedAcceptance` | `number \| null` |
| `bAdvices` | `number \| null` |
| `bIssuerReferral` | `number \| null` |
| `bBatchDataCapture` | `number \| null` |
| `bOnlineDataCapture` | `number \| null` |
| `bDefaultTDOL` | `number \| null` |
| `bTerminalSupportAccountTypeSelection` | `number \| null` |
| `bPCIPINEntry` | `number \| null` |
| `bDisplayPINTryCounter` | `number \| null` |
| `aucRFU` | `Uint8Array \| null` |

## EmvRevocList

`com.topwise.cloudpos.aidl.emv.level2.EmvRevocList`

| Field | Type |
| --- | --- |
| `ucRid` | `Uint8Array \| null` |
| `ucIndex` | `number \| null` |
| `ucCertSn` | `Uint8Array \| null` |

## EmvTerminalInfo

`com.topwise.cloudpos.aidl.emv.level2.EmvTerminalInfo`

| Field | Type |
| --- | --- |
| `unTerminalFloorLimit` | `number \| null` |
| `unThresholdValue` | `number \| null` |
| `aucTerminalID` | `string \| null` |
| `aucIFDSerialNumber` | `string \| null` |
| `aucTerminalCountryCode` | `Uint8Array \| null` |
| `aucMerchantID` | `string \| null` |
| `aucMerchantCategoryCode` | `Uint8Array \| null` |
| `aucMerchantNameLocation` | `Uint8Array \| null` |
| `aucTransCurrencyCode` | `Uint8Array \| null` |
| `ucTransCurrencyExp` | `number \| null` |
| `aucTransRefCurrencyCode` | `Uint8Array \| null` |
| `ucTransRefCurrencyExp` | `number \| null` |
| `ucTerminalEntryMode` | `number \| null` |
| `aucTerminalAcquireID` | `string \| null` |
| `aucAppVersion` | `Uint8Array \| null` |
| `aucDefaultDDOL` | `Uint8Array \| null` |
| `aucDefaultTDOL` | `Uint8Array \| null` |
| `aucTACDenial` | `Uint8Array \| null` |
| `aucTACOnline` | `Uint8Array \| null` |
| `aucTACDefault` | `Uint8Array \| null` |
| `ucTerminalType` | `number \| null` |
| `aucTerminalCapabilities` | `Uint8Array \| null` |
| `aucAddtionalTerminalCapabilities` | `Uint8Array \| null` |
| `ucTargetPercentage` | `number \| null` |
| `ucMaxTargetPercentage` | `number \| null` |
| `ucAccountType` | `number \| null` |
| `ucIssuerCodeTableIndex` | `number \| null` |
| `aucRFU` | `Uint8Array \| null` |

## PreProcResult

`com.topwise.cloudpos.aidl.emv.level2.PreProcResult`

| Field | Type |
| --- | --- |
| `aucAID` | `Uint8Array \| null` |
| `ucAidLen` | `number \| null` |
| `ucZeroAmtFlg` | `number \| null` |
| `ucStatusCheckFlg` | `number \| null` |
| `aucReaderTTQ` | `Uint8Array \| null` |
| `ucCLAppNotAllowed` | `number \| null` |
| `ucTermFLmtExceed` | `number \| null` |
| `ucRdCLTxnLmtExceed` | `number \| null` |
| `ucRdCVMLmtExceed` | `number \| null` |
| `ucRdCLFLmtExceed` | `number \| null` |
| `ucTermFLmtFlg` | `number \| null` |
| `aucTermFLmt` | `Uint8Array \| null` |
| `ucCrypto17Flg` | `number \| null` |
| `ucRandomSelect` | `number \| null` |

## ProgramID

`com.topwise.cloudpos.aidl.emv.level2.ProgramID`

| Field | Type |
| --- | --- |
| `aucProgramId` | `Uint8Array \| null` |
| `ucPrgramIdLen` | `number \| null` |
| `aucRdClssTxnLmt` | `Uint8Array \| null` |
| `aucRdClssFLmt` | `Uint8Array \| null` |
| `aucRdCVMLmt` | `Uint8Array \| null` |
| `aucTermFLmt` | `Uint8Array \| null` |
| `ucRdClssTxnLmtFlg` | `number \| null` |
| `ucRdClssFLmtFlg` | `number \| null` |
| `ucRdCVMLmtFlg` | `number \| null` |
| `ucTermFLmtFlg` | `number \| null` |
| `ucStatusCheckFlg` | `number \| null` |
| `ucAmtZeroCheckFlg` | `number \| null` |
| `ucAmtZeroNoAllowed` | `number \| null` |
| `aucRFU` | `Uint8Array \| null` |

## TransParam

`com.topwise.cloudpos.aidl.emv.level2.TransParam`

| Field | Type |
| --- | --- |
| `ulTransNo` | `number \| null` |
| `aucAmount` | `Uint8Array \| null` |
| `aucAmountOther` | `Uint8Array \| null` |
| `aucTransDate` | `Uint8Array \| null` |
| `aucTransTime` | `Uint8Array \| null` |
| `aucUnNumber` | `Uint8Array \| null` |
| `aucTransCurCode` | `Uint8Array \| null` |
| `aucRFU` | `Uint8Array \| null` |
| `ucTransType` | `number \| null` |

## FingerprintParam

`com.topwise.cloudpos.aidl.fingerprint.FingerprintParam`

| Field | Type |
| --- | --- |
| `width` | `number \| null` |
| `height` | `number \| null` |
| `threshold` | `number \| null` |
| `timeOut` | `number \| null` |
| `format` | `number \| null` |
| `compress` | `number \| null` |
| `mSecurityLevel` | `number \| null` |
| `mFingerPosition` | `number \| null` |
| `mLfdLevel` | `number \| null` |

## FingerprintResult

`com.topwise.cloudpos.aidl.fingerprint.FingerprintResult`

| Field | Type |
| --- | --- |
| `fp_data_len` | `number \| null` |
| `fp_data` | `Uint8Array \| null` |
| `fp_img_data_len` | `number \| null` |
| `fp_img_data` | `Uint8Array \| null` |
| `fpFeatureDataLen` | `number \| null` |
| `fpFeatureData` | `Uint8Array \| null` |
| `imageQuality` | `number \| null` |

## FingerprintVerifyResult

`com.topwise.cloudpos.aidl.fingerprint.FingerprintVerifyResult`

| Field | Type |
| --- | --- |
| `error` | `number \| null` |
| `similarity` | `number \| null` |
| `isMatched` | `boolean \| null` |

## AsyKeyPairType

`com.topwise.cloudpos.aidl.keymanager.AsyKeyPairType`

| Field | Type |
| --- | --- |
| `data` | `Uint8Array \| null` |
| `dataLen` | `number \| null` |

## AsymmetricKey

`com.topwise.cloudpos.aidl.keymanager.AsymmetricKey`

| Field | Type |
| --- | --- |
| `keyIndex` | `number \| null` |
| `keyType` | `number \| null` |
| `mAsyKeyRsaN` | `Uint8Array \| null` |
| `mAsyKeyRsaNLen` | `number \| null` |
| `mAsyKeyRsaE` | `Uint8Array \| null` |
| `mAsyKeyRsaELen` | `number \| null` |
| `mAsyKeyRsaD` | `Uint8Array \| null` |
| `mAsyKeyRsaDLen` | `number \| null` |
| `mAsyKeyRsaP` | `Uint8Array \| null` |
| `mAsyKeyRsaPLen` | `number \| null` |
| `mAsyKeyRsaQ` | `Uint8Array \| null` |
| `mAsyKeyRsaQLen` | `number \| null` |
| `mAsyKeyECCPubX` | `Uint8Array \| null` |
| `mAsyKeyECCPubXLen` | `number \| null` |
| `mAsyKeyECCPubY` | `Uint8Array \| null` |
| `mAsyKeyECCPubYLen` | `number \| null` |
| `mAsyKeyECCPri` | `Uint8Array \| null` |
| `mAsyKeyECCPriLen` | `number \| null` |

## BytesTypeValue

`com.topwise.cloudpos.aidl.keymanager.BytesTypeValue`

| Field | Type |
| --- | --- |
| `data` | `Uint8Array \| null` |
| `dataLen` | `number \| null` |

## IntArrayTypeValue

`com.topwise.cloudpos.aidl.keymanager.IntArrayTypeValue`

| Field | Type |
| --- | --- |
| `data` | `ReadonlyArray<number> \| null` |
| `dataLen` | `number \| null` |

## AuditedCertificateData

`com.topwise.cloudpos.aidl.kld.AuditedCertificateData`

| Field | Type |
| --- | --- |
| `errorMsg` | `string \| null` |
| `deviceId` | `string \| null` |
| `certificateId` | `string \| null` |
| `certificateType` | `number \| null` |
| `certificateValue` | `string \| null` |

## CACerIssueData

`com.topwise.cloudpos.aidl.kld.CACerIssueData`

| Field | Type |
| --- | --- |
| `errorMsg` | `string \| null` |
| `deviceId` | `string \| null` |
| `certValue` | `string \| null` |

## CustomerSecret

`com.topwise.cloudpos.aidl.kld.CustomerSecret`

| Field | Type |
| --- | --- |
| `abbreviation` | `string \| null` |
| `bdkType` | `BDKType \| null` |
| `customerId` | `string \| null` |
| `customerName` | `string \| null` |
| `deviceModel` | `string \| null` |
| `secretAlgorithm` | `SecretAlgorithm \| null` |
| `secretKCV` | `string \| null` |
| `secretLen` | `SecretLen \| null` |
| `secretType` | `SecretType \| null` |
| `secretValue` | `string \| null` |
| `storageIndex` | `number \| null` |

## KDHCertSecret

`com.topwise.cloudpos.aidl.kld.KDHCertSecret`

| Field | Type |
| --- | --- |
| `deviceCert` | `string \| null` |
| `deviceId` | `string \| null` |
| `publicKey` | `string \| null` |
| `privateKey` | `string \| null` |
| `errorMsg` | `string \| null` |

## KDHCertValue

`com.topwise.cloudpos.aidl.kld.KDHCertValue`

| Field | Type |
| --- | --- |
| `certValue` | `string \| null` |
| `errorMsg` | `string \| null` |

## KDHRebind

`com.topwise.cloudpos.aidl.kld.KDHRebind`

| Field | Type |
| --- | --- |
| `errorMsg` | `string \| null` |
| `deviceId` | `string \| null` |
| `rebindToken` | `string \| null` |

## KDHSecretKey

`com.topwise.cloudpos.aidl.kld.KDHSecretKey`

| Field | Type |
| --- | --- |
| `bdkType` | `BDKType \| null` |
| `customerId` | `string \| null` |
| `customerName` | `string \| null` |
| `deviceModel` | `string \| null` |
| `ksn` | `string \| null` |
| `secretAlgorithm` | `SecretAlgorithm \| null` |
| `secretEncryptValue` | `string \| null` |
| `secretIndex` | `string \| null` |
| `secretLen` | `SecretLen \| null` |
| `secretType` | `number \| null` |
| `secretValue` | `string \| null` |
| `storageIndex` | `number \| null` |
| `errorMsg` | `string \| null` |

## KDHSecretKeyKCV

`com.topwise.cloudpos.aidl.kld.KDHSecretKeyKCV`

| Field | Type |
| --- | --- |
| `secretIndex` | `string \| null` |
| `verifyResult` | `number \| null` |
| `deviceId` | `string \| null` |
| `errorMsg` | `string \| null` |

## KDHUnbind

`com.topwise.cloudpos.aidl.kld.KDHUnbind`

| Field | Type |
| --- | --- |
| `errorMsg` | `string \| null` |
| `deviceId` | `string \| null` |
| `unbindToken` | `string \| null` |

## ReceiveCsrData

`com.topwise.cloudpos.aidl.kld.ReceiveCsrData`

| Field | Type |
| --- | --- |
| `errorMsg` | `string \| null` |
| `deviceId` | `string \| null` |
| `certificateId` | `string \| null` |

## SecretIndexData

`com.topwise.cloudpos.aidl.kld.SecretIndexData`

| Field | Type |
| --- | --- |
| `secretIndex` | `string \| null` |
| `secretType` | `number \| null` |

## Tr34Data

`com.topwise.cloudpos.aidl.kld.Tr34Data`

| Field | Type |
| --- | --- |
| `mTr34Data` | `string \| null` |
| `mTr34PackPubEncryptData` | `string \| null` |
| `mTr34PackCBCIV` | `string \| null` |
| `mTr34PackCBCEncryptData` | `string \| null` |
| `mTr34PackSignData` | `string \| null` |
| `mTr34PackRandom` | `string \| null` |
| `mTr34PackKBH` | `string \| null` |

## TrackData

`com.topwise.cloudpos.aidl.magcard.TrackData`

| Field | Type |
| --- | --- |
| `firstTrackData` | `string \| null` |
| `secondTrackData` | `string \| null` |
| `thirdTrackData` | `string \| null` |
| `cardno` | `string \| null` |
| `formatTrackData` | `string \| null` |
| `expiryDate` | `string \| null` |
| `serviceCode` | `string \| null` |

## MQTTMessage

`com.topwise.cloudpos.aidl.mqtt.MQTTMessage`

| Field | Type |
| --- | --- |
| `payload` | `string \| null` |
| `qos` | `number \| null` |
| `retained` | `boolean \| null` |
| `dup` | `boolean \| null` |
| `messageId` | `number \| null` |

## MQTTOptions

`com.topwise.cloudpos.aidl.mqtt.MQTTOptions`

| Field | Type |
| --- | --- |
| `keepAliveInterval` | `number \| null` |
| `cleanSession` | `boolean \| null` |
| `connectionTimeout` | `number \| null` |
| `automaticReconnect` | `boolean \| null` |
| `serverIp` | `string \| null` |
| `connectDevice` | `string \| null` |
| `userName` | `string \| null` |
| `password` | `string \| null` |

## MacParam

`com.topwise.cloudpos.aidl.pinpad.MacParam`

| Field | Type |
| --- | --- |
| `keyType` | `number \| null` |
| `keyIndex` | `number \| null` |
| `algType` | `number \| null` |
| `macData` | `Uint8Array \| null` |
| `isUseSm4` | `boolean \| null` |
| `paddingMode` | `number \| null` |

## PinPadAlgParam

`com.topwise.cloudpos.aidl.pinpad.PinPadAlgParam`

| Field | Type |
| --- | --- |
| `keyType` | `number \| null` |
| `keyIndex` | `number \| null` |
| `algBaseType` | `number \| null` |
| `algExtendType` | `number \| null` |
| `extendData` | `Uint8Array \| null` |
| `data` | `Uint8Array \| null` |

## PinParam

`com.topwise.cloudpos.aidl.pinpad.PinParam`

| Field | Type |
| --- | --- |
| `keyIndex` | `number \| null` |
| `pinType` | `number \| null` |
| `panBlock` | `string \| null` |
| `keyType` | `number \| null` |
| `inputPinMode` | `string \| null` |
| `algType` | `number \| null` |
| `timeOut` | `number \| null` |
| `keyMinLength` | `number \| null` |
| `keyMaxLength` | `number \| null` |
| `isUseSm4` | `boolean \| null` |
| `keyLayout` | `Uint8Array \| null` |
| `buttonNum` | `Uint8Array \| null` |
| `random` | `Uint8Array \| null` |
| `refresh` | `boolean \| null` |
| `pinButtonBackground` | `ReadonlyArray<string> \| null` |
| `pinButtonTextColor` | `ReadonlyArray<string> \| null` |
| `pinButtonText` | `ReadonlyArray<string> \| null` |
| `pinButtonTextSize` | `ReadonlyArray<number> \| null` |
| `showTop` | `boolean \| null` |
| `topText` | `string \| null` |
| `pinKeySoundEnable` | `boolean \| null` |

## CertificateInfo

`com.topwise.cloudpos.aidl.pm.CertificateInfo`

| Field | Type |
| --- | --- |
| `mX509Certificate` | `X509CertificateData \| null` |

## ImageUnit

`com.topwise.cloudpos.aidl.printer.ImageUnit`

| Field | Type |
| --- | --- |
| `margins` | `Rect \| null` |
| `width` | `number \| null` |
| `height` | `number \| null` |
| `align` | `Align \| null` |
| `image` | `Bitmap \| null` |

## PrintItemEnhancedObj

`com.topwise.cloudpos.aidl.printer.PrintItemEnhancedObj`

| Field | Type |
| --- | --- |
| `scaleX` | `number \| null` |
| `scaleY` | `number \| null` |

## PrintItemObj

`com.topwise.cloudpos.aidl.printer.PrintItemObj`

| Field | Type |
| --- | --- |
| `text` | `string \| null` |
| `fontSize` | `number \| null` |
| `isBold` | `boolean \| null` |
| `align` | `PrintItemObjALIGN \| null` |
| `isUnderline` | `boolean \| null` |
| `isWordWrap` | `boolean \| null` |
| `lineHeight` | `number \| null` |
| `letterSpacing` | `number \| null` |
| `marginLeft` | `number \| null` |

## PrinterMessage

`com.topwise.cloudpos.aidl.printer.PrinterMessage`

| Field | Type |
| --- | --- |
| `printerGray` | `number \| null` |
| `printerVoltage` | `number \| null` |
| `printerTemperature` | `number \| null` |
| `printerCount` | `number \| null` |
| `printerMileage` | `number \| null` |

## TextUnit

`com.topwise.cloudpos.aidl.printer.TextUnit`

| Field | Type |
| --- | --- |
| `text` | `string \| null` |
| `fontSize` | `number \| null` |
| `isBold` | `boolean \| null` |
| `isReverse` | `boolean \| null` |
| `fontType` | `TypefaceSpec \| null` |
| `align` | `Align \| null` |
| `isUnderline` | `boolean \| null` |
| `isWordWrap` | `boolean \| null` |
| `lineSpacing` | `number \| null` |
| `letterSpacing` | `number \| null` |
| `scaleX` | `number \| null` |
| `scaleY` | `number \| null` |

## TextUnitTextSize

`com.topwise.cloudpos.aidl.printer.TextUnit$TextSize`

| Field | Type |
| --- | --- |
| `this$0` | `TextUnit \| null` |

## RfCardValue

`com.topwise.cloudpos.aidl.rfcard.RfCardValue`

| Field | Type |
| --- | --- |
| `mode` | `number \| null` |
| `valueLen` | `number \| null` |
| `value` | `Uint8Array \| null` |

## SimulateCard

`com.topwise.cloudpos.aidl.rfcard.SimulateCard`

| Field | Type |
| --- | --- |
| `data` | `Uint8Array \| null` |
| `allData` | `Uint8Array \| null` |
| `textNDEF` | `ReadonlyArray<string> \| null` |
| `uriNDEF` | `ReadonlyArray<string> \| null` |
| `mimeNDEF` | `ReadonlyArray<string> \| null` |
| `mimeTypes` | `ReadonlyArray<string> \| null` |

## ApnInfo

`com.topwise.cloudpos.aidl.system.ApnInfo`

| Field | Type |
| --- | --- |
| `key` | `string \| null` |
| `name` | `string \| null` |
| `apn` | `string \| null` |
| `type` | `string \| null` |
| `mvnoType` | `string \| null` |
| `mvnoMatchData` | `string \| null` |
| `sourcetype` | `number \| null` |

## ApnInfoExt

`com.topwise.cloudpos.aidl.system.ApnInfoExt`

| Field | Type |
| --- | --- |
| `key` | `number \| null` |
| `name` | `string \| null` |
| `apn` | `string \| null` |
| `mcc` | `string \| null` |
| `mnc` | `string \| null` |
| `user` | `string \| null` |
| `server` | `string \| null` |
| `password` | `string \| null` |
| `proxy` | `string \| null` |
| `port` | `string \| null` |
| `mmsproxy` | `string \| null` |
| `mmsport` | `string \| null` |
| `mmsc` | `string \| null` |
| `authtype` | `number \| null` |
| `type` | `string \| null` |
| `current` | `number \| null` |
| `sourcetype` | `number \| null` |
| `csdnum` | `string \| null` |
| `protocol` | `string \| null` |
| `roaming_protocol` | `string \| null` |
| `omacpid` | `string \| null` |
| `napid` | `string \| null` |
| `proxyid` | `string \| null` |
| `carrier_enabled` | `boolean \| null` |
| `bearer` | `number \| null` |
| `spn` | `string \| null` |
| `imsi` | `string \| null` |
| `pnn` | `string \| null` |
| `ppp` | `string \| null` |
| `mvno_type` | `string \| null` |
| `mvno_match_data` | `string \| null` |
| `sub_id` | `number \| null` |
| `profile_id` | `number \| null` |
| `modem_cognitive` | `boolean \| null` |
| `max_conns` | `number \| null` |
| `wait_time` | `number \| null` |
| `max_conns_time` | `number \| null` |
| `mtu` | `number \| null` |

## AppUsageBattery

`com.topwise.cloudpos.aidl.system.AppUsageBattery`

| Field | Type |
| --- | --- |
| `packageName` | `string \| null` |
| `batteryUsage` | `string \| null` |

## TmsMerchant

`com.topwise.cloudpos.aidl.tm.TmsMerchant`

| Field | Type |
| --- | --- |
| `msg` | `string \| null` |
| `publicKey` | `string \| null` |
| `result` | `string \| null` |
| `token` | `string \| null` |
| `total` | `string \| null` |
| `deviceId` | `string \| null` |
| `merchantAddress` | `string \| null` |
| `merchantId` | `string \| null` |
| `merchantName` | `string \| null` |
| `merchantPhone` | `string \| null` |
| `tid` | `string \| null` |
| `timestamp` | `number \| null` |

## TmsMerchantState

`com.topwise.cloudpos.aidl.tm.TmsMerchantState`

| Field | Type |
| --- | --- |
| `msg` | `string \| null` |
| `publicKey` | `string \| null` |
| `result` | `string \| null` |
| `token` | `string \| null` |
| `total` | `string \| null` |

## AidlScanParam

`com.topwise.cloudpos.data.AidlScanParam`

| Field | Type |
| --- | --- |
| `mCameraId` | `number \| null` |
| `mTimeOut` | `number \| null` |
| `mTitle` | `string \| null` |
| `mReminder` | `string \| null` |
| `mAmount` | `string \| null` |

