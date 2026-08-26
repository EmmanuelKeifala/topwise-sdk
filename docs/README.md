# API reference

765 methods across 41 modules, generated from `T1&T3&T6 SDK20250215/SDK Jar/T1_V2_20251009.jar`.
Re-run `npm run codegen` after a vendor jar drop and these regenerate.

## Guides

- [Getting started](./getting-started.md)
- [Printing receipts](./printing.md)
- [PIN entry and keys](./pin-and-keys.md)
- [Concepts](./concepts.md) — handles, Android types, bytes and TLV
- [Errors](./errors.md)
- [Troubleshooting](./troubleshooting.md)

## Reference

- [Events](./events.md) — listener callback unions
- [Data types](./types.md)
- [Enums](./enums.md)
- [Constants](./constants.md) — including the `AidlErrorCode*` tables

## Modules

One page per module, generated from the jar. `printTemplate` and `helpers`
are hand-written and documented in the guides above.

| Module | Methods | AIDL interface |
| --- | --- | --- |
| [`amex`](./modules/amex.md) | 18 | `AidlAmex` |
| [`buzzer`](./modules/buzzer.md) | 2 | `AidlBuzzer` |
| [`camera`](./modules/camera.md) | 5 | `AidlCameraScanCode` |
| [`checkCard`](./modules/checkCard.md) | 2 | `AidlCheckCard` |
| [`cpuCard`](./modules/cpuCard.md) | 17 | `AidlCPUCard` |
| [`decoder`](./modules/decoder.md) | 4 | `AidlDecoderManager` |
| [`dpas`](./modules/dpas.md) | 19 | `AidlDpas` |
| [`emvL2`](./modules/emvL2.md) | 47 | `AidlEmvL2` |
| [`entry`](./modules/entry.md) | 20 | `AidlEntry` |
| [`fingerprint`](./modules/fingerprint.md) | 5 | `AidlFingerprint` |
| [`icCard`](./modules/icCard.md) | 7 | `AidlICCard` |
| [`jcb`](./modules/jcb.md) | 16 | `AidlJcb` |
| [`keyLoadDown`](./modules/keyLoadDown.md) | 58 | `AidlKeyLoadDown` |
| [`keyManager`](./modules/keyManager.md) | 18 | `AidlKeyManager` |
| [`led`](./modules/led.md) | 9 | `AidlLed` |
| [`magCard`](./modules/magCard.md) | 6 | `AidlMagCard` |
| [`manager`](./modules/manager.md) | 1 | `DeviceServiceManager` |
| [`mdbSerialport(index)`](./modules/mdbSerialport.md) | 6 | `AidlMdbSerialport` |
| [`mir`](./modules/mir.md) | 19 | `AidlMir` |
| [`mqtt`](./modules/mqtt.md) | 7 | `AidlMQTT` |
| [`packageManager`](./modules/packageManager.md) | 20 | `AidlPM` |
| [`palmPrint`](./modules/palmPrint.md) | 14 | `AidlPalmPrint` |
| [`paypass`](./modules/paypass.md) | 21 | `AidlPaypass` |
| [`paywave`](./modules/paywave.md) | 21 | `AidlPaywave` |
| [`pedestal`](./modules/pedestal.md) | 2 | `AidlPedestal` |
| [`pedestalSerialManagerAt`](./modules/pedestalSerialManagerAt.md) | 3 | `AidlPedestalSerialManager` |
| [`pinpad(index)`](./modules/pinpad.md) | 49 | `AidlPinpad` |
| [`printer`](./modules/printer.md) | 33 | `AidlPrinter` |
| [`psam(index)`](./modules/psam.md) | 5 | `AidlPsam` |
| [`pure`](./modules/pure.md) | 16 | `AidlPure` |
| [`qpboc`](./modules/qpboc.md) | 16 | `AidlQpboc` |
| [`rfCard`](./modules/rfCard.md) | 28 | `AidlRFCard` |
| [`rupay`](./modules/rupay.md) | 19 | `AidlRupay` |
| [`scanner`](./modules/scanner.md) | 3 | `AidlScannerManager` |
| [`serialport(index)`](./modules/serialport.md) | 5 | `AidlSerialport` |
| [`serialportAt`](./modules/serialportAt.md) | 5 | `AidlSerialport` |
| [`shellMonitor`](./modules/shellMonitor.md) | 10 | `AidlShellMonitor` |
| [`smallScreen`](./modules/smallScreen.md) | 9 | `AidlSmallScreen` |
| [`system`](./modules/system.md) | 188 | `AidlSystem` |
| [`tms`](./modules/tms.md) | 9 | `AidlTM` |
| [`triggerStatus`](./modules/triggerStatus.md) | 3 | `AidlTriggerStatus` |

