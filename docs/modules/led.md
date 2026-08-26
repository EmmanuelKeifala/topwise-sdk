# led

`com.topwise.cloudpos.aidl.led.AidlLed`

9 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`setLed`](#setled) · [`setAllLed`](#setallled) · [`setLongLed`](#setlongled) · [`openMarquee`](#openmarquee) · [`closeMarquee`](#closemarquee) · [`showMarquee`](#showmarquee) · [`powerMarquee`](#powermarquee) · [`getMarqueeMaxPixels`](#getmarqueemaxpixels) · [`switchMarqueeSlot`](#switchmarqueeslot)

---

### `setLed`

set Led on or off

```ts
led.setLed(light: number, isOn: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.setLed(light: number, isOn: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `light` | `number` | the code of LED light,refer to LedCode public static final int OPER_LED_ALL = 0; public static final int OPER_LED_GREEN = 1; public static final int OPER_LED_YELLOW = 2; public static final int OPER_LED_RED = 3; public static final int OPER_LED_BLUE = 4; |
| `isOn` | `boolean` | true:on, false:off |

---

### `setAllLed`

```ts
led.setAllLed(arg0: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.setAllLed(arg0: string): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `setLongLed`

```ts
led.setLongLed(arg0: number, arg1: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.setLongLed(arg0: number, arg1: boolean): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `boolean` |

---

### `openMarquee`

```ts
led.openMarquee(arg0: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.openMarquee(arg0: number): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `closeMarquee`

```ts
led.closeMarquee(arg0: number, arg1: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.closeMarquee(arg0: number, arg1: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `showMarquee`

```ts
led.showMarquee(arg0: number, arg1: ReadonlyArray<number>): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.showMarquee(arg0: number, arg1: ReadonlyArray<number>): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `ReadonlyArray<number>` |

---

### `powerMarquee`

```ts
led.powerMarquee(arg0: number, arg1: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.powerMarquee(arg0: number, arg1: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `getMarqueeMaxPixels`

```ts
led.getMarqueeMaxPixels(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.getMarqueeMaxPixels(): number
```

---

### `switchMarqueeSlot`

```ts
led.switchMarqueeSlot(arg0: number, arg1: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.led.switchMarqueeSlot(arg0: number, arg1: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

