# smallScreen

`com.topwise.cloudpos.aidl.smallscreen.AidlSmallScreen`

9 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`wakeSmallScreen`](#wakesmallscreen) · [`sleepSmallScreen`](#sleepsmallscreen) · [`setSmallScreenBrightness`](#setsmallscreenbrightness) · [`getSmallScreenBrightness`](#getsmallscreenbrightness) · [`getSmallScreenSize`](#getsmallscreensize) · [`stopAppControl`](#stopappcontrol) · [`displayText`](#displaytext) · [`displayBitmapData`](#displaybitmapdata) · [`displayBitmap`](#displaybitmap)

---

### `wakeSmallScreen`

Wake up the small screen

```ts
smallScreen.wakeSmallScreen(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.wakeSmallScreen(): number
```

**Returns** — 0:sucess;other:fail

---

### `sleepSmallScreen`

Sleep the small screen

```ts
smallScreen.sleepSmallScreen(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.sleepSmallScreen(): number
```

**Returns** — 0:sucess;other:fail

---

### `setSmallScreenBrightness`

Set the brightness of the small screen

```ts
smallScreen.setSmallScreenBrightness(brightPercentage: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.setSmallScreenBrightness(brightPercentage: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `brightPercentage` | `number` | Screen brightness percentage (0-100) |

**Returns** — 0:sucess;other:fail

---

### `getSmallScreenBrightness`

Get the brightness of the small screen

```ts
smallScreen.getSmallScreenBrightness(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.getSmallScreenBrightness(): number
```

**Returns** — 0:sucess;other:fail

---

### `getSmallScreenSize`

Get the Screen Size of the small screen

```ts
smallScreen.getSmallScreenSize(): Effect<ReadonlyArray<number>, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.getSmallScreenSize(): ReadonlyArray<number>
```

**Returns** — Screen Size width:size[0],height:size[1]

---

### `stopAppControl`

Stop App Control of the small screen

```ts
smallScreen.stopAppControl(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.stopAppControl(): number
```

**Returns** — 0:sucess;other:fail

---

### `displayText`

Display Text of the small screen

```ts
smallScreen.displayText(text: string, textSize: SmallScreenTextSize, displayMode: SmallScreenDisplayMode): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.displayText(text: string, textSize: SmallScreenTextSize, displayMode: SmallScreenDisplayMode): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `text` | `string` | display text |
| `textSize` | `SmallScreenTextSize` | text size |
| `displayMode` | `SmallScreenDisplayMode` | display mode; SmallScreenDisplayMode.TEXT_DISPLAY_MODE_UP_NORMAL, SmallScreenDisplayMode.TEXT_DISPLAY_MODE_UP_OPPOSITE, SmallScreenDisplayMode.TEXT_DISPLAY_MODE_UP_CENTER |

**Returns** — 0:sucess;other:fail

---

### `displayBitmapData`

Display Bitmap Data of the small screen

```ts
smallScreen.displayBitmapData(data: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.displayBitmapData(data: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `data` | `Uint8Array` | Bitmap Data; SmallScreenUtil.getBitmapData( SmallScreenUtil.getRotateBitmap( SmallScreenUtil.convertBitmapToStandardFormat(bitmap, screenWidth, screenHeight))) |

**Returns** — 0:sucess;other:fail

---

### `displayBitmap`

Display Bitmap of the small screen

```ts
smallScreen.displayBitmap(bitmap: Bitmap, bitmapAlign: BitmapAlign): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.smallScreen.displayBitmap(bitmap: Bitmap, bitmapAlign: BitmapAlign): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bitmap` | `Bitmap` | Bitmap |
| `bitmapAlign` | `BitmapAlign` | Bitmap Align; BitmapAlign.BITMAP_ALIGN_LEFT, BitmapAlign.BITMAP_ALIGN_CENTER, BitmapAlign.BITMAP_ALIGN_RIGHT |

**Returns** — 0:sucess;other:fail

