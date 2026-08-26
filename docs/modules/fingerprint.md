# fingerprint

`com.topwise.cloudpos.aidl.fingerprint.AidlFingerprint`

5 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`start`](#start) · [`stop`](#stop) · [`verify`](#verify)

---

### `open`

Open fingerprint module

```ts
fingerprint.open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.fingerprint.open(): boolean
```

---

### `close`

Close fingerprint module

```ts
fingerprint.close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.fingerprint.close(): boolean
```

---

### `start`

Start getting fingerprints.

```ts
fingerprint.start(param: Input<FingerprintParam>)
  : Stream<FingerprintListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.fingerprint.start(param: Input<FingerprintParam>, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `param` | `Input<FingerprintParam>` | Fingerprint Param |

**Events** — [`FingerprintListenerEvent`](../events.md#fingerprintlistenerevent).

---

### `stop`

Stop getting fingerprints.

```ts
fingerprint.stop(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.fingerprint.stop(): void
```

---

### `verify`

Fingerprint feature comparison

```ts
fingerprint.verify(securityLevel: number, featureData1: Uint8Array, featureData2: Uint8Array): Effect<FingerprintVerifyResult, TopwiseError, TopwiseBridge>

// promise client
await topwise.fingerprint.verify(securityLevel: number, featureData1: Uint8Array, featureData2: Uint8Array): FingerprintVerifyResult
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `securityLevel` | `number` | security level,FingerprintConstant.SecurityLevel |
| `featureData1` | `Uint8Array` | feature data 1 |
| `featureData2` | `Uint8Array` | feature data 2 |

**Returns** — FingerprintVerifyResult

