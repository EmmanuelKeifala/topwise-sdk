# Codegen report

Source jar: `T1&T3&T6 SDK20250215/SDK Jar/T1_V2_20251009.jar`
Javadoc: `T1&T3&T6 SDK20250215/SDK Manual/TopUsdkService-Doc-20240628.zip` (1480/2184 methods documented)

## Coverage

**760 of 760** methods on the exposed interfaces cross the bridge.

- modules: 39
- handle-addressed interfaces: 2
- listener interfaces: 23
- enums: 40
- data carriers: 63
- constant tables: 59

## Skipped methods

None. Every method on every exposed interface is bound.

## Skipped fields

None. Every field of every reachable data carrier is bound.

## Mirrored but unreferenced

Data carriers with a full TypeScript mirror that no current AIDL signature
mentions - leftovers from an earlier SDK generation. Kept so the TS surface
maps the jar one-to-one.

- `com.topwise.cloudpos.ExpandFunctionConstant$Error`
- `com.topwise.cloudpos.ExpandFunctionConstant$Key`
- `com.topwise.cloudpos.aidl.emv.CandidateApp`
- `com.topwise.cloudpos.aidl.emv.CardInfo`
- `com.topwise.cloudpos.aidl.emv.EmvTransData`
- `com.topwise.cloudpos.aidl.emv.PCardLoadLog`
- `com.topwise.cloudpos.aidl.emv.PCardTransLog`
- `com.topwise.cloudpos.aidl.emv.TerminalParam`
- `com.topwise.cloudpos.aidl.kld.AuditedCertificateData`
- `com.topwise.cloudpos.aidl.kld.CACerIssueData`
- `com.topwise.cloudpos.aidl.kld.KDHCertSecret`
- `com.topwise.cloudpos.aidl.kld.KDHCertValue`
- `com.topwise.cloudpos.aidl.kld.KDHRebind`
- `com.topwise.cloudpos.aidl.kld.KDHSecretKey`
- `com.topwise.cloudpos.aidl.kld.KDHSecretKeyKCV`
- `com.topwise.cloudpos.aidl.kld.KDHUnbind`
- `com.topwise.cloudpos.aidl.kld.ReceiveCsrData`
- `com.topwise.cloudpos.aidl.kld.SecretIndexData`
- `com.topwise.cloudpos.aidl.pinpad.MacParam`
- `com.topwise.cloudpos.aidl.pinpad.PinPadAlgParam`
- `com.topwise.cloudpos.aidl.pinpad.PinParam`
- `com.topwise.cloudpos.aidl.printer.ImageUnit`
- `com.topwise.cloudpos.aidl.printer.TextUnit`
- `com.topwise.cloudpos.aidl.printer.TextUnit$TextSize`
- `com.topwise.cloudpos.aidl.tm.TmsMerchant`
- `com.topwise.cloudpos.aidl.tm.TmsMerchantState`
- `com.topwise.cloudpos.data.AidlScanParam`

## Hand-written

Parts of the jar that cannot be generated, mirrored by hand instead:

- `PrintTemplate` -> `printTemplate` (src/print-template.ts + TopwisePrintTemplate.kt)
  - holds a `Context`; its six `add` overloads differ only by argument type,
    which reflective dispatch cannot resolve from JSON
- `PinParam.getParam()`, `MacParam.getParam()`, `SmallScreenUtil` -> `helpers`
  (src/helpers.ts + TopwiseHelpers.kt) - behaviour that lives in Java
- `BytesUtil`, `Tlv`, `TlvList` -> src/bytes.ts - pure functions over bytes,
  so they run in JS rather than round-tripping across the bridge

## Not data

Classes holding a live Android object (a `Context`, a `View`, a
`ServiceConnection`), so there is no value to send - only a reference into
the app's object graph. These are native-side helpers, driven from Kotlin:

- `com.topwise.cloudpos.aidl.printer.PrintTemplate` - mirrored by hand as the `printTemplate` module
- `com.topwise.cloudpos.aidl.printer.PrnTextView`
- `com.topwise.cloudpos.service.DeviceServiceManager`
