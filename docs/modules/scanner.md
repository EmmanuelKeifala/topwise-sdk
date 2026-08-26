# scanner

`com.topwise.cloudpos.aidl.scanner.AidlScannerManager`

3 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`init`](#init) · [`decode`](#decode) · [`exit`](#exit)

---

### `init`

```ts
scanner.init(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.scanner.init(): number
```

---

### `decode`

```ts
scanner.decode(arg0: Uint8Array, arg1: number, arg2: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.scanner.decode(arg0: Uint8Array, arg1: number, arg2: number): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |
| `arg1` | `number` |
| `arg2` | `number` |

---

### `exit`

```ts
scanner.exit(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.scanner.exit(): void
```

