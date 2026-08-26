# buzzer

`com.topwise.cloudpos.aidl.buzzer.AidlBuzzer`

2 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`beep`](#beep) · [`stopBeep`](#stopbeep)

---

### `beep`

beep

```ts
buzzer.beep(mode: number, ms: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.buzzer.beep(mode: number, ms: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `mode` | `number` | refer to BuzzerCode |
| `ms` | `number` | beep time ms |

**Returns** — true success , false fail

---

### `stopBeep`

stop beeping

```ts
buzzer.stopBeep(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.buzzer.stopBeep(): boolean
```

**Returns** — true success , false fail

