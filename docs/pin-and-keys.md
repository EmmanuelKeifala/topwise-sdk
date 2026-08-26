# PIN entry and keys

## The Bundle problem

`pinpad(n).getPin` and `getMac` take an `android.os.Bundle` whose keys are
defined only inside `PinParam.getParam()` / `MacParam.getParam()` — they exist
in a Java method body, not in any interface. Rather than hard-code names
scraped out of that body, the parameters cross as data and Java builds the
Bundle:

```ts
const bundle = yield* helpers.pinParamToBundle({
  keyIndex: 1,
  pinType: 0,
  keyType: 1,
  panBlock,
  timeOut: 60,
  keyMinLength: 4,
  keyMaxLength: 12,
})

yield* pinpad(0).getPin(bundle).pipe(
  Stream.takeUntil((e) => e._tag !== "onInput"),
  Stream.runHead,
)
```

See [`PinParam`](./types.md#pinparam) for every field.

## Out-parameters

Most of `keyManager` and `keyLoadDown` returns `int` for status and writes the
real payload into an argument you pass. A value-passing bridge would drop that,
so those methods return both:

```ts
const { result, out } = yield* keyManager.getKeyKCV("KEY_TYPE_TMK", 1, "KCV_VERIFY_MODE_NONE", {})
if (result === 0) console.log(out.kcvBytesTypeValue.data)   // Uint8Array
```

`result` is the status code; check it against
[`KeyManagerErrorCode`](./constants.md#keymanagererrorcode). Pass `{}` for the
holder unless you need to pre-size a buffer.

The methods that behave this way are marked **Out-parameters** on their module
page.

## Authorisation

Pinpad, key manager, EMV kernels and key injection are commonly restricted to
vendor-signed or whitelisted apps. If `system.getSerialNo()` works and these
report `MODULE_UNAVAILABLE`, the bridge is fine and the app is not authorised —
get your signing certificate whitelisted by Topwise.

## Reference

- [`pinpad(index)`](./modules/pinpad.md)
- [`keyManager`](./modules/keyManager.md)
- [`keyLoadDown`](./modules/keyLoadDown.md)

## helpers methods

Hand-written, so no generated page.

| Method | |
| --- | --- |
| `pinParamToBundle(param: Input<PinParam>)` | `PinParam.getParam()` — the Bundle `getPin` expects. |
| `macParamToBundle(param: Input<MacParam>)` | `MacParam.getParam()` — the Bundle `getMac` expects. |
| `convertBitmapToStandardFormat(bitmap, width, height)` | `SmallScreenUtil` bitmap conversion. |
