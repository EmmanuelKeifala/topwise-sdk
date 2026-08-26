# mdbSerialport

`com.topwise.cloudpos.aidl.mdb.AidlMdbSerialport`

6 methods.

Takes a slot index: `mdbSerialport(0)`. Slots are 0-based and model-specific;
an absent slot fails with `MODULE_UNAVAILABLE`.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`setTransRequestCallback`](#settransrequestcallback) · [`sendTransResult`](#sendtransresult) · [`setLevel`](#setlevel) · [`getMdbStatus`](#getmdbstatus)

---

### `open`

```ts
mdbSerialport(index).open(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.mdbSerialport(index).open(): boolean
```

---

### `close`

```ts
mdbSerialport(index).close(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.mdbSerialport(index).close(): boolean
```

---

### `setTransRequestCallback`

```ts
mdbSerialport(index).setTransRequestCallback()
  : Stream<TransRequestCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.mdbSerialport(index).setTransRequestCallback({ onEvent }): Unsubscribe
```

**Events** — [`TransRequestCallbackEvent`](../events.md#transrequestcallbackevent).

---

### `sendTransResult`

```ts
mdbSerialport(index).sendTransResult(arg0: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.mdbSerialport(index).sendTransResult(arg0: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `setLevel`

```ts
mdbSerialport(index).setLevel(arg0: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.mdbSerialport(index).setLevel(arg0: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `getMdbStatus`

```ts
mdbSerialport(index).getMdbStatus(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mdbSerialport(index).getMdbStatus(): number
```

