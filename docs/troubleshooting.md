# Troubleshooting

## `ready()` times out, everything is `NOT_BOUND`

The bind itself failed. In order of likelihood:

**Package visibility.** Android 11+ filters which packages an app can see. The
library manifest declares the `<queries>` entry for
`com.android.topwise.topusdkservice`; check it survived manifest merge. Without
it `bindService` fails silently and every accessor returns null.

**The service is missing.** Confirm it exists:

```sh
adb shell pm list packages | grep topusdkservice
```

It should be `com.android.topwise.topusdkservice`, a system app. If it is
absent, this is not a Topwise terminal, or the firmware lacks the SDK service.

**The native module is not linked.** A `NO_BRIDGE` error, or
`Native module "TopwiseBridge" is not linked`, means autolinking did not run or
you reloaded Metro instead of rebuilding. Native changes need a real build.

## Some modules work, others say `MODULE_UNAVAILABLE`

The bridge is fine. `DeviceServiceManager`'s accessor for that module returned
null, which means either the terminal has no such peripheral, or the app is not
authorised for it.

Secure peripherals — pinpad, key manager, EMV L2 kernels, key injection — are
commonly restricted to vendor-signed or whitelisted apps. A debug-signed APK
installs and binds happily, then reports `MODULE_UNAVAILABLE` for exactly those.
Get your signing certificate whitelisted by Topwise.

## `NO_SUCH_METHOD`

The terminal's service is older than the jar these bindings were generated
from. The message names the method. Either avoid it or update the terminal.

A T2N on service 2.1.73 is missing three of 760:
`AidlSystem.systemConfigurationMenuVisibilitySet`, `AidlLed.switchMarqueeSlot`,
`AidlTM.sendParamResult`.

## `ReferenceError: Property 'TextDecoder' doesn't exist`

Hermes has no `TextEncoder`/`TextDecoder`, which Effect constructs at module
load. The SDK ships the polyfill and imports it before Effect, so this should
not happen — if it does, something is importing Effect ahead of the SDK. Add
`import "text-encoding-polyfill"` as the first line of `index.js`.

## A listener fires once then goes quiet

Its scope closed, which released the binder stub. In Effect, keep the
surrounding `Effect.scoped` alive for as long as you want events. On the
promise client, hold the unsubscribe function rather than letting it fall out
of scope.

## Reading a device run over adb

The bring-up app mirrors every result to logcat:

```sh
adb logcat -c
adb shell am start -n com.topwisebringup/.MainActivity
# tap "Run all read-only", then:
adb logcat -d | grep -oE 'TOPWISE (PASS|FAIL) .*'
```

## Nothing prints, but the call succeeds

`printer` methods report failure in-band. A `0` return is success; anything
else is a device refusal — check it against
[`AidlErrorCodePrinter`](./constants.md#aidlerrorcodeprinter). `1` is out of
paper, `2` overheating. See [errors.md](./errors.md).
