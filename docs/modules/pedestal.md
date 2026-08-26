# pedestal

`com.topwise.cloudpos.aidl.pedestal.AidlPedestal`

2 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`isCoupled`](#iscoupled) · [`getSerialManager`](#getserialmanager)

---

### `isCoupled`

Determine whether the base is connected to the POS machine

```ts
pedestal.isCoupled(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.pedestal.isCoupled(): boolean
```

---

### `getSerialManager`

get Serial Manager

```ts
pedestal.getSerialManager(): Effect<PedestalSerialManagerRef, TopwiseError, TopwiseBridge>

// promise client
await topwise.pedestal.getSerialManager(): PedestalSerialManagerRef
```

**Returns** — Serial Manager binder

