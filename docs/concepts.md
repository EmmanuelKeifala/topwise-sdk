# Concepts

How the awkward corners of the AIDL surface are represented.

## Interfaces handed back as binders

A few methods return another AIDL interface rather than data. The object stays
native and JS gets a handle:

```ts
const mgr  = yield* pedestal.getSerialManager()          // PedestalSerialManagerRef
const ports = yield* pedestalSerialManagerAt(mgr).enumSerialports()
const port = yield* pedestalSerialManagerAt(mgr).getSerialport(ports[0])
yield* serialportAt(port).open()                          // SerialportRef
```

Handles are keyed by binder identity natively, so asking twice returns the
same one. Call `releaseHandle(ref)` only if you churn through them.

`scanner` and `triggerStatus` (tamper detection) have no `DeviceServiceManager`
getter at all — they exist only on the root `AidlDeviceService`, which the
manager keeps private. They are reached reflectively and exposed as ordinary
modules.

## Android types

Platform types that appear in the AIDL surface have hand-written mappings in
[`src/android.ts`](../src/android.ts), each with a matching rule in
`TopwiseCodec.kt`:

| Java | TypeScript |
| --- | --- |
| `ContentValues` | `Record<string, string \| number \| boolean \| Uint8Array \| null>` |
| `ComponentName`, `Rect` | plain objects |
| `KeyEvent`, `UsageStats` | flattened to their accessors |
| `X509Certificate` | `{ der, subject, issuer, serialNumber, notBefore, notAfter }` |
| `BigDecimal`, `BigInteger` | `string` (exact — serials and money outrun a double) |
| `SparseIntArray`, `SparseArray`, `ArrayMap` | `Record<string, T>` |
| `Typeface` | `TypefaceSpec` — a request to load a font |
| `ParcelFileDescriptor` | `FileRef` — a path; the fd is opened and closed natively |
| `IBinder` | `RemoteHandle` |

## Bytes and TLV

`BytesUtil`, `Tlv` and `TlvList` are mirrored as **pure TypeScript** in
[`src/bytes.ts`](../src/bytes.ts) — they are functions over bytes, so crossing
the bridge to hex-encode a string or parse the TLV an EMV kernel just returned
would be pointless. Being pure also makes them the part of this SDK with real
test coverage.

```ts
import { TlvList, hexString2Bytes } from "@slipstream/topwise-sdk"

const tags = TlvList.fromBytes(kernelResponse)
const pan  = tags.getValue("5A")
const aid  = tags.getValue("9F06")

const request = new TlvList().addTlv("9F02", "000000001000").addTlv("5F2A", "0840").getBytes()
```

`int2Bytes`/`bytes2Int` take a named `bigEndian` argument. The Java originals
take an unnamed boolean whose meaning is not recoverable from the jar, and
guessing at byte order in a payments SDK is worse than being explicit.
