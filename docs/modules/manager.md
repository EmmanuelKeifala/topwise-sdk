# manager

`com.topwise.cloudpos.service.DeviceServiceManager`

1 method.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`expandFunction`](#expandfunction)

---

### `expandFunction`

```ts
manager.expandFunction(param: Readonly<Record<string, unknown>>): Effect<Readonly<Record<string, unknown>>, TopwiseError, TopwiseBridge>

// promise client
await topwise.manager.expandFunction(param: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>>
```

| Parameter | Type |
| --- | --- |
| `param` | `Readonly<Record<string, unknown>>` |

