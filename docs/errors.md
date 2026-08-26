# Errors

Two kinds of failure, and they are easy to confuse.

**Transport failure** — the call never reached the device, or the bridge broke.
Raised as a `TopwiseError`: an Effect failure channel, or a thrown error on the
promise client.

**In-band failure** — the call reached the device and the device said no. Most
Topwise methods report this as a non-zero `int` return, *not* an exception.
`printer.getPrinterState()` resolving with `1` is a successful call reporting
"out of paper". Check those against [constants.md](./constants.md).

```ts
// Effect
printer.printBuf(data).pipe(
  Effect.catchTag("TopwiseError", (e) => Effect.log(`bridge: ${e.code}`)),
  Effect.map((status) => status === 0 ? "printed" : `device refused: ${status}`),
)

// promise
try {
  const status = await topwise.printer.printBuf(data)
  if (status !== 0) console.warn("device refused", status)
} catch (e) {
  console.error(e.code, e.module, e.method, e.message)
}
```

## TopwiseError

```ts
class TopwiseError {
  readonly _tag: "TopwiseError"
  readonly code: TopwiseErrorCode
  readonly module: string   // "printer", "pinpad", "@h1" for a handle
  readonly method: string
  readonly message: string
  readonly cause?: unknown
}
```

| Code | Means | Do |
| --- | --- | --- |
| `NOT_BOUND` | Nothing is bound. The device service never connected. | Call `ready()` first. If it still fails, see [troubleshooting](./troubleshooting.md). |
| `MODULE_UNAVAILABLE` | Service **is** bound, but this module's accessor returned null. | Either the terminal has no such peripheral, or the app is not authorised for it. Secure peripherals are usually the latter. |
| `NO_SUCH_MODULE` | Not a module this SDK exposes, or a dead handle. | Typo, or a `RemoteHandle` you already released. |
| `NO_SUCH_METHOD` | The terminal's service is older than the jar these bindings came from. | The message names the method. Avoid it, or update the terminal. |
| `BAD_ARGUMENT` | An argument would not coerce to the declared Java type. | Check the signature in the module page. |
| `REMOTE` | The binder transaction threw `RemoteException`. | The device service died or restarted. Re-`ready()`. |
| `INVOKE` | The AIDL call itself threw. | `message` carries the Java exception. Often a peripheral in the wrong state. |
| `NO_BRIDGE` | The native module is not linked. | Rebuild the Android app; a Metro reload is not enough. |

## Distinguishing NOT_BOUND from MODULE_UNAVAILABLE

These mean different things and point at different fixes. `NOT_BOUND` means
`DeviceServiceManager` has no connection at all — usually a manifest or
platform problem. `MODULE_UNAVAILABLE` means the connection is fine and other
modules work, but this one accessor returned null — usually hardware that is
absent, or an app the vendor has not authorised for that peripheral.

If `system.getSerialNo()` succeeds and `pinpad(0).getRandom()` reports
`MODULE_UNAVAILABLE`, the bridge is working and the problem is authorisation.

## Handler failures

EMV kernel handlers have no error channel: the kernel is blocked on the binder
thread waiting for a number. If a handler throws or overruns `timeoutMs`, the
kernel receives the `fallback` you passed. Choose the value your kernel reads
as "decline" rather than leaving it at `0`.
