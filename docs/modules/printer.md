# printer

`com.topwise.cloudpos.aidl.printer.AidlPrinter`

33 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getPrinterState`](#getprinterstate) · [`printText`](#printtext) · [`printBmp`](#printbmp) · [`printBarCode`](#printbarcode) · [`printQrCode`](#printqrcode) · [`setPrinterGray`](#setprintergray) · [`open`](#open) · [`close`](#close) · [`addText`](#addtext) · [`addBarcode`](#addbarcode) · [`addQRCode`](#addqrcode) · [`addImage`](#addimage) · [`addImageFile`](#addimagefile) · [`addLineFeed`](#addlinefeed) · [`start`](#start) · [`resetQueue`](#resetqueue) · [`addRuiText`](#addruitext) · [`addRuiImage`](#addruiimage) · [`addRuiBarCode`](#addruibarcode) · [`addRuiQRCode`](#addruiqrcode) · [`addHuifuImage`](#addhuifuimage) · [`printRuiQueue`](#printruiqueue) · [`goPaper`](#gopaper) · [`printEnhancedText`](#printenhancedtext) · [`printBuf`](#printbuf) · [`getClearPrinterMileage`](#getclearprintermileage) · [`getPrinterGray`](#getprintergray) · [`getPrinterMessage`](#getprintermessage) · [`cuttingPaper`](#cuttingpaper) · [`printRollback`](#printrollback) · [`setPrintLedState`](#setprintledstate) · [`getPosPrintPaperState`](#getposprintpaperstate) · [`isPosPrinterCoverOpen`](#isposprintercoveropen)

---

### `getPrinterState`

Get printer status.

```ts
printer.getPrinterState(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.getPrinterState(): number
```

**Returns** — 0x00: The print module is normal; 0x01: The print module is out of paper; 0x02: High temperature of print module; 0x03: Unknown error in print module; 0x04: The print module is not turned on; 0x05: Printing module communication is abnormal; 0x06: Device low battery.

---

### `printText`

```ts
printer.printText(list: ReadonlyArray<Input<PrintItemObj>>)
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printText(list: ReadonlyArray<Input<PrintItemObj>>, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `list` | `ReadonlyArray<Input<PrintItemObj>>` |

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `printBmp`

> **Deprecated** by the vendor.

```ts
printer.printBmp(leftoffset: number, width: number, height: number, picture: Bitmap)
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printBmp(leftoffset: number, width: number, height: number, picture: Bitmap, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `leftoffset` | `number` |
| `width` | `number` |
| `height` | `number` |
| `picture` | `Bitmap` |

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `printBarCode`

> **Deprecated** by the vendor.

```ts
printer.printBarCode(width: number, height: number, leftoffset: number, barcodetype: number, barcode: string)
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printBarCode(width: number, height: number, leftoffset: number, barcodetype: number, barcode: string, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `width` | `number` |
| `height` | `number` |
| `leftoffset` | `number` |
| `barcodetype` | `number` |
| `barcode` | `string` |

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `printQrCode`

> **Deprecated** by the vendor.

```ts
printer.printQrCode(width: number, height: number, leftoffset: number, content: string)
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printQrCode(width: number, height: number, leftoffset: number, content: string, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `width` | `number` |
| `height` | `number` |
| `leftoffset` | `number` |
| `content` | `string` |

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `setPrinterGray`

Set the grayscale of the print module.

```ts
printer.setPrinterGray(gray: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.setPrinterGray(gray: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `gray` | `number` | 1 Light gray; 2 Medium gray; 3 Dark grey; 4 Most gray. |

---

### `open`

Open the print module.

```ts
printer.open(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.open(): number
```

---

### `close`

Close the print module.

```ts
printer.close(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.close(): void
```

---

### `addText`

> **Deprecated** by the vendor.

```ts
printer.addText(offset: number, fontType: number, fontScale: number, content: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addText(offset: number, fontType: number, fontScale: number, content: string): void
```

| Parameter | Type |
| --- | --- |
| `offset` | `number` |
| `fontType` | `number` |
| `fontScale` | `number` |
| `content` | `string` |

---

### `addBarcode`

> **Deprecated** by the vendor.

```ts
printer.addBarcode(offset: number, height: number, content: string, barcodeType: number, hriPosition: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addBarcode(offset: number, height: number, content: string, barcodeType: number, hriPosition: number): void
```

| Parameter | Type |
| --- | --- |
| `offset` | `number` |
| `height` | `number` |
| `content` | `string` |
| `barcodeType` | `number` |
| `hriPosition` | `number` |

---

### `addQRCode`

> **Deprecated** by the vendor.

```ts
printer.addQRCode(offset: number, height: number, content: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addQRCode(offset: number, height: number, content: string): void
```

| Parameter | Type |
| --- | --- |
| `offset` | `number` |
| `height` | `number` |
| `content` | `string` |

---

### `addImage`

> **Deprecated** by the vendor.

```ts
printer.addImage(offset: number, image: Bitmap): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addImage(offset: number, image: Bitmap): void
```

| Parameter | Type |
| --- | --- |
| `offset` | `number` |
| `image` | `Bitmap` |

---

### `addImageFile`

> **Deprecated** by the vendor.

```ts
printer.addImageFile(offset: number, imagePath: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addImageFile(offset: number, imagePath: string): void
```

| Parameter | Type |
| --- | --- |
| `offset` | `number` |
| `imagePath` | `string` |

---

### `addLineFeed`

> **Deprecated** by the vendor.

```ts
printer.addLineFeed(lines: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addLineFeed(lines: number): void
```

| Parameter | Type |
| --- | --- |
| `lines` | `number` |

---

### `start`

The print module starts printing.

```ts
printer.start()
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.start({ onEvent }): Unsubscribe
```

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `resetQueue`

Reset print queue.

```ts
printer.resetQueue(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.resetQueue(): boolean
```

**Returns** — true: Reset print queue succeeded; false: Reset print queue Failed.

---

### `addRuiText`

```ts
printer.addRuiText(list: ReadonlyArray<Input<PrintItemObj>>): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addRuiText(list: ReadonlyArray<Input<PrintItemObj>>): boolean
```

| Parameter | Type |
| --- | --- |
| `list` | `ReadonlyArray<Input<PrintItemObj>>` |

---

### `addRuiImage`

Add image content.

```ts
printer.addRuiImage(bitmap: Bitmap, align: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addRuiImage(bitmap: Bitmap, align: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `bitmap` | `Bitmap` | Image content. |
| `align` | `number` | Align of image. 0: center; 1: left; 2: right; others: left. |

**Returns** — true: Add image content successful false: Add image content failed

---

### `addRuiBarCode`

> **Deprecated** by the vendor.

```ts
printer.addRuiBarCode(content: string, width: number, height: number, align: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addRuiBarCode(content: string, width: number, height: number, align: number): boolean
```

| Parameter | Type |
| --- | --- |
| `content` | `string` |
| `width` | `number` |
| `height` | `number` |
| `align` | `number` |

---

### `addRuiQRCode`

> **Deprecated** by the vendor.

```ts
printer.addRuiQRCode(content: string, size: number, align: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addRuiQRCode(content: string, size: number, align: number): boolean
```

| Parameter | Type |
| --- | --- |
| `content` | `string` |
| `size` | `number` |
| `align` | `number` |

---

### `addHuifuImage`

> **Deprecated** by the vendor.

```ts
printer.addHuifuImage(bitmap: Bitmap, width: number, height: number, offset: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.addHuifuImage(bitmap: Bitmap, width: number, height: number, offset: number): boolean
```

| Parameter | Type |
| --- | --- |
| `bitmap` | `Bitmap` |
| `width` | `number` |
| `height` | `number` |
| `offset` | `number` |

---

### `printRuiQueue`

Start print RuiQueue of data(addRuiText,addRuiImage,addRuiBarCode,addRuiQRCode).

```ts
printer.printRuiQueue()
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printRuiQueue({ onEvent }): Unsubscribe
```

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `goPaper`

Line feed(Print blank lines).

```ts
printer.goPaper(lines: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.goPaper(lines: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `lines` | `number` | Number of lines. |

---

### `printEnhancedText`

> **Deprecated** by the vendor.

```ts
printer.printEnhancedText(data: ReadonlyArray<Input<PrintItemEnhancedObj>>)
  : Stream<PrinterListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.printer.printEnhancedText(data: ReadonlyArray<Input<PrintItemEnhancedObj>>, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `data` | `ReadonlyArray<Input<PrintItemEnhancedObj>>` |

**Events** — [`PrinterListenerEvent`](../events.md#printerlistenerevent).

---

### `printBuf`

Print buf.

```ts
printer.printBuf(data: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.printBuf(data: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `data` | `Uint8Array` | buf that needs to be printed. |

**Returns** — 0: print successful; Other: print failed.

---

### `getClearPrinterMileage`

Get/Clear printer mileage

```ts
printer.getClearPrinterMileage(status: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.getClearPrinterMileage(status: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `status` | `number` | 0: reset; 1: get. |

**Returns** — Printer mileage.

---

### `getPrinterGray`

```ts
printer.getPrinterGray(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.getPrinterGray(): number
```

---

### `getPrinterMessage`

get Printer Message

```ts
printer.getPrinterMessage(): Effect<PrinterMessage, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.getPrinterMessage(): PrinterMessage
```

**Returns** — Printer Message

---

### `cuttingPaper`

Does the device automatically cut paper after printing

```ts
printer.cuttingPaper(mode: PrintCuttingMode): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.cuttingPaper(mode: PrintCuttingMode): number
```

| Parameter | Type |
| --- | --- |
| `mode` | `PrintCuttingMode` |

**Returns** — Cuttings paper result: Success 0 , Device no support -1

---

### `printRollback`

Print paper rollback

```ts
printer.printRollback(length: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.printRollback(length: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `length` | `number` | Rollback length MAX 1000 |

**Returns** — Success 0,Device no support -1

---

### `setPrintLedState`

Set the frequency at which the print light flashes

```ts
printer.setPrintLedState(isOn: boolean, flickerTime: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.setPrintLedState(isOn: boolean, flickerTime: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `isOn` | `boolean` | true on or flicker,false off |
| `flickerTime` | `number` | flicker frequency greater than 0,Set to 0 when off PrinterConstant.PrinterLed.PRINTER_LED_LIGHT : Printing light is constantly on PrinterConstant.PrinterLed.PRINTER_LED_FLICKER_SLOW : Printing light flashes at a frequency of 1000 ms PrinterConstant.PrinterLed.PRINTER_LED_FLICKER_DEFAULT : Printing light flashes at a frequency of 500 ms PrinterConstant.PrinterLed.PRINTER_LED_FLICKER_FAST : Printing light flashes at a frequency of 250 ms |

**Returns** — Success 0,Device no support -1

---

### `getPosPrintPaperState`

Is the printer paper running out soon

```ts
printer.getPosPrintPaperState(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.getPosPrintPaperState(): number
```

**Returns** — printer paper state: 0 Printer paper running out, Others default.

---

### `isPosPrinterCoverOpen`

Check if the printing cover is open

```ts
printer.isPosPrinterCoverOpen(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.printer.isPosPrinterCoverOpen(): boolean
```

**Returns** — true is open, false is close

