# triggerStatus

`com.topwise.cloudpos.aidl.trigger.AidlTriggerStatus`

3 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getTriggerStatus`](#gettriggerstatus) · [`cleanTriggerStatus`](#cleantriggerstatus) · [`getTamperEnableState`](#gettamperenablestate)

---

### `getTriggerStatus`

Get trigger register value

```ts
triggerStatus.getTriggerStatus(): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.triggerStatus.getTriggerStatus(): Uint8Array
```

**Returns** — trigger register value

---

### `cleanTriggerStatus`

clean trigger status

```ts
triggerStatus.cleanTriggerStatus(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.triggerStatus.cleanTriggerStatus(): boolean
```

**Returns** — true:success,false:failed

---

### `getTamperEnableState`

get tamper enable state

```ts
triggerStatus.getTamperEnableState(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.triggerStatus.getTamperEnableState(): number
```

**Returns** — tamper state

