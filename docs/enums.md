# Enums

Java enums as string-literal unions; pass the name.

## DecodeMode

`com.topwise.cloudpos.aidl.camera.DecodeMode`

`"MODE_DEFAULT"` · `"MODE_SINGLE_SCAN_CODE"` · `"MODE_CONTINUE_SCAN_CODE"`

## ICRateMode

`com.topwise.cloudpos.aidl.iccard.ICRateMode`

`"RATE_9600"` · `"RATE_38400"`

## ICSpecType

`com.topwise.cloudpos.aidl.iccard.ICSpecType`

`"SPEC_TYPE_EMV"` · `"SPEC_TYPE_ISO7816_3"`

## ICVoltageMode

`com.topwise.cloudpos.aidl.iccard.ICVoltageMode`

`"VOLTAGE_1_8V"` · `"VOLTAGE_3V"` · `"VOLTAGE_5V"`

## AlgType

`com.topwise.cloudpos.aidl.keymanager.AlgType`

`"ALG_TYPE_SYM"` · `"ALG_TYPE_RSA"` · `"ALG_TYPE_ECC"`

## AsyCalType

`com.topwise.cloudpos.aidl.keymanager.AsyCalType`

`"ASY_CAL_PUB"` · `"ASY_CAL_PRI"`

## AsyKeyType

`com.topwise.cloudpos.aidl.keymanager.AsyKeyType`

`"ASY_KEY_TYPE_SM2"` · `"ASY_KEY_TYPE_RSA"` · `"ASY_KEY_TYPE_ECC"`

## AsyPaddingMode

`com.topwise.cloudpos.aidl.keymanager.AsyPaddingMode`

`"NO_PADDING"` · `"PKCS1_PADDING_ZERO"` · `"PKCS1_PADDING_FF"` · `"PKCS1_PADDING_RANDOM"`

## DukptKeyType

`com.topwise.cloudpos.aidl.keymanager.DukptKeyType`

`"DUKPT_KEY_DES"` · `"DUKPT_KEY_AES"`

## IncreaseMode

`com.topwise.cloudpos.aidl.keymanager.IncreaseMode`

`"INCREASE_MODE_NULL"` · `"INCREASE_MODE_BEFORE"` · `"INCREASE_MODE_AFTER"`

## KCVVerifyMode

`com.topwise.cloudpos.aidl.keymanager.KCVVerifyMode`

`"KCV_ENCRYPT_ZERO"` · `"KCV_ENCRYPT_SN"` · `"KCV_ENCRYPT_CMAC"`

## KeyType

`com.topwise.cloudpos.aidl.keymanager.KeyType`

`"KEY_TYPE_NULL"` · `"KEY_TYPE_TMK"` · `"KEY_TYPE_FIXED_PEK"` · `"KEY_TYPE_FIXED_MAK"` · `"KEY_TYPE_FIXED_TDK"` · `"KEY_TYPE_PEK"` · `"KEY_TYPE_MAK"` · `"KEY_TYPE_TDK"` · `"KEY_TYPE_SPECIAL"` · `"KEY_TYPE_TEK"` · `"KEY_TYPE_DKEY"` · `"KEY_TYPE_PROCESS_KEY"` · `"KEY_TYPE_DAM_KEY"` · `"KEY_TYPE_DUKPT_DES_IPEK"` · `"KEY_TYPE_DUKPT_DES_BDK"` · `"KEY_TYPE_DUKPT_DES_KSN"` · `"KEY_TYPE_DUKPT_AES_BDK"` · `"KEY_TYPE_DUKPT_AES_IPEK"` · `"KEY_TYPE_DUKPT_AES_AES128"` · `"KEY_TYPE_DUKPT_AES_AES192"` · `"KEY_TYPE_DUKPT_AES_AES256"` · `"KEY_TYPE_DUKPT_AES_2TDES"` · `"KEY_TYPE_DUKPT_AES_3TDES"` · `"KEY_TYPE_ROOT"`

## KeyUsage

`com.topwise.cloudpos.aidl.keymanager.KeyUsage`

`"DUKPT_AES_USE_PEK"` · `"DUKPT_AES_USE_PIN_KEY"` · `"DUKPT_AES_USE_MSG_GEN"` · `"DUKPT_AES_USE_MSG_VERIFY"` · `"DUKPT_AES_USE_MSG_BOTH"` · `"DUKPT_AES_USE_DATA_ENC"` · `"DUKPT_AES_USE_DATA_DEC"` · `"DUKPT_AES_USE_DATA_BOTH"` · `"DUKPT_AES_USE_KEY_ENC_KEY"` · `"DUKPT_AES_USE_DERIVED_KEY"` · `"DUKPT_DES_USE_DERIVED_KEY"` · `"DUKPT_DES_USE_PIN_KEY"` · `"DUKPT_DES_USE_MAC_REQ"` · `"DUKPT_DES_USE_MAC_RESPON"` · `"DUKPT_DES_USE_DATA_REQ"` · `"DUKPT_DES_USE_DATA_RESPON"`

## MacAlgMode

`com.topwise.cloudpos.aidl.keymanager.MacAlgMode`

`"MAC_ALG_ANSI_X99CBC_MODE"` · `"MAC_ALG_ANSI_X99ECB_MODE"` · `"MAC_ALG_EMV2000"` · `"MAC_ALG_CUP"` · `"MAC_ALG_ANSI_X919"`

## MacPaddingMode

`com.topwise.cloudpos.aidl.keymanager.MacPaddingMode`

`"NO_PADDING"` · `"ISO9797_1_PADDING_METHOD_1"` · `"ISO9797_1_PADDING_METHOD_2"` · `"ISO9797_1_PADDING_METHOD_3"`

## SymAlgMode

`com.topwise.cloudpos.aidl.keymanager.SymAlgMode`

`"ALG_ENCRYPT_DES_CBC"` · `"ALG_DECRYPT_DES_CBC"` · `"ALG_ENCRYPT_DES_ECB"` · `"ALG_DECRYPT_DES_ECB"` · `"ALG_ENCRYPT_AES_CBC"` · `"ALG_DECRYPT_AES_CBC"` · `"ALG_ENCRYPT_AES_ECB"` · `"ALG_DECRYPT_AES_ECB"` · `"ALG_ENCRYPT_SM4_CBC"` · `"ALG_DECRYPT_SM4_CBC"` · `"ALG_ENCRYPT_SM4_ECB"` · `"ALG_DECRYPT_SM4_ECB"`

## SymAlgType

`com.topwise.cloudpos.aidl.keymanager.SymAlgType`

`"SYM_ALG_TYPE_DEFAULT"` · `"SYM_ALG_TYPE_DES"` · `"SYM_ALG_TYPE_AES"` · `"SYM_ALG_TYPE_SM4"`

## SymPaddingMode

`com.topwise.cloudpos.aidl.keymanager.SymPaddingMode`

`"NO_PADDING"` · `"PKCS7_PADDING"`

## Tr31Mode

`com.topwise.cloudpos.aidl.keymanager.Tr31Mode`

`"MODE_NULL"` · `"MODE_A"` · `"MODE_B"` · `"MODE_C"` · `"MODE_D"` · `"MODE_E"`

## BDKType

`com.topwise.cloudpos.aidl.kld.BDKType`

`"BDK_TYPE_NULL"` · `"BDK_TYPE_1"` · `"BDK_TYPE_2"` · `"BDK_TYPE_3"` · `"BDK_TYPE_4"` · `"BDK_TYPE_5"`

## CertificateType

`com.topwise.cloudpos.aidl.kld.CertificateType`

`"CER_TYPE_NULL"` · `"CER_TYPE_ROOT"` · `"CER_TYPE_WORKING_CA"` · `"CER_TYPE_KDH_CA"` · `"CER_TYPE_KDH"` · `"CER_TYPE_KDH_CRL"` · `"CER_TYPE_KRD_CA"` · `"CER_TYPE_KRD_POS"` · `"CER_TYPE_KLD"` · `"CER_TYPE_KRD_INIT"` · `"CER_TYPE_UNBIND_CA"`

## KMSCerType

`com.topwise.cloudpos.aidl.kld.KMSCerType`

`"KMS_CER_TYPE_NULL"` · `"KMS_CER_TYPE_ALL"` · `"KMS_CER_TYPE_ROOT"` · `"KMS_CER_TYPE_CA_WORK"` · `"KMS_CER_TYPE_CA_KDH"` · `"KMS_CER_TYPE_CA_KRD"` · `"KMS_CER_TYPE_KDH"` · `"KMS_CER_TYPE_KRD"` · `"KMS_CER_TYPE_KRD_PUB"` · `"KMS_CER_TYPE_KRD_PRI"`

## RequestFrom

`com.topwise.cloudpos.aidl.kld.RequestFrom`

`"REQUEST_FROM_NULL"` · `"REQUEST_FROM_POI"` · `"REQUEST_FROM_KLD"` · `"REQUEST_FROM_KDH"`

## SecretAlgorithm

`com.topwise.cloudpos.aidl.kld.SecretAlgorithm`

`"SECRET_ALG_NULL"` · `"SECRET_ALG_DES"` · `"SECRET_ALG_AES"` · `"SECRET_ALG_RSA"` · `"SECRET_ALG_ECC"`

## SecretLen

`com.topwise.cloudpos.aidl.kld.SecretLen`

`"SECRET_LEN_NULL"` · `"SECRET_LEN_DES_DOUBLE"` · `"SECRET_LEN_DES_TRIPLE"` · `"SECRET_LEN_AES_128"` · `"SECRET_LEN_AES_192"` · `"SECRET_LEN_AES_256"` · `"SECRET_LEN_RSA_2048"` · `"SECRET_LEN_RSA_4096"`

## SecretType

`com.topwise.cloudpos.aidl.kld.SecretType`

`"SECRET_TYPE_NULL"` · `"SECRET_TYPE_TMK"` · `"SECRET_TYPE_PEK"` · `"SECRET_TYPE_MAK"` · `"SECRET_TYPE_DEK"` · `"SECRET_TYPE_BDK"` · `"SECRET_TYPE_IPEK"`

## SecretType2

`com.topwise.cloudpos.aidl.kld.SecretType2`

`"SECRET_TYPE_NULL"` · `"SECRET_TYPE_TMK"` · `"SECRET_TYPE_PEK"` · `"SECRET_TYPE_MAK"` · `"SECRET_TYPE_BDK"` · `"SECRET_TYPE_IPEK"`

## SpCerType

`com.topwise.cloudpos.aidl.kld.SpCerType`

`"SP_CER_ROOT"` · `"SP_CER_CA_WORK"` · `"SP_CER_CA_KDH"` · `"SP_CER_CA_KRD"` · `"SP_CER_CA_UNBIND"` · `"SP_CER_CA_WORK_TIMESTAMP"` · `"SP_CER_CA_TIMESTAMP"` · `"SP_CER_CA_TIMESTAMP_CRL"`

## PinParamPinButton

`com.topwise.cloudpos.aidl.pinpad.PinParam$PinButton`

`"PIN_BUTTON_TEXT"` · `"PIN_BUTTON_DELETE"` · `"PIN_BUTTON_CLEAR"` · `"PIN_BUTTON_ENTER"`

## Align

`com.topwise.cloudpos.aidl.printer.Align`

`"LEFT"` · `"CENTER"` · `"RIGHT"`

## PrintCuttingMode

`com.topwise.cloudpos.aidl.printer.PrintCuttingMode`

`"CUTTING_MODE_HALT"` · `"CUTTING_MODE_FULL"`

## PrintItemObjALIGN

`com.topwise.cloudpos.aidl.printer.PrintItemObj$ALIGN`

`"LEFT"` · `"CENTER"` · `"RIGHT"`

## RfCardCheckMode

`com.topwise.cloudpos.aidl.rfcard.RfCardCheckMode`

`"MODE_DEFAULT"` · `"MODE_CHECK_AND_RESET"`

## SimulateCardType

`com.topwise.cloudpos.aidl.rfcard.SimulateCardType`

`"TYPE_1"` · `"TYPE_2"` · `"TYPE_3"` · `"TYPE_4"`

## BitmapAlign

`com.topwise.cloudpos.aidl.smallscreen.BitmapAlign`

`"BITMAP_ALIGN_LEFT"` · `"BITMAP_ALIGN_CENTER"` · `"BITMAP_ALIGN_RIGHT"`

## SmallScreenDisplayMode

`com.topwise.cloudpos.aidl.smallscreen.SmallScreenDisplayMode`

`"TEXT_DISPLAY_MODE_UP_NORMAL"` · `"TEXT_DISPLAY_MODE_UP_OPPOSITE"` · `"TEXT_DISPLAY_MODE_UP_CENTER"`

## SmallScreenTextSize

`com.topwise.cloudpos.aidl.smallscreen.SmallScreenTextSize`

`"TEXT_SIZE_SMALL"` · `"TEXT_SIZE_NORMAL"` · `"TEXT_SIZE_LARGE"` · `"TEXT_SIZE_XLARGE"`

## POWER_TYPE

`com.topwise.cloudpos.aidl.system.POWER_TYPE`

`"NONE"` · `"SHUTDOWN"` · `"REBOOT"`

## MessageType

`com.topwise.cloudpos.aidl.tm.MessageType`

`"MESSAGE_TYPE_TRANSACTION"`

## ParameterType

`com.topwise.cloudpos.aidl.tm.ParameterType`

`"PARAMETER_TYPE_ALL"` · `"PARAMETER_TYPE_PUB"` · `"PARAMETER_TYPE_PRI"` · `"PARAMETER_TYPE_SYS"` · `"PARAMETER_TYPE_PUB_PRI"` · `"PARAMETER_TYPE_PUB_SYS"` · `"PARAMETER_TYPE_PRI_SYS"`

