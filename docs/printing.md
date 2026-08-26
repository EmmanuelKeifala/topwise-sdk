# Printing receipts

Two routes. `printTemplate` lays out a receipt and renders it to a bitmap;
`printer` puts bytes or a bitmap on paper.

`printTemplate` is hand-written rather than generated: the Java class holds an
Android `Context`, and its six `add` overloads differ only by argument type,
which reflective dispatch cannot resolve once the arguments are JSON. Each
overload therefore has its own name.

| Java | here |
| --- | --- |
| `add(TextUnit)` | `addText` |
| `add(int, TextUnit, int, TextUnit)` | `addColumns2` |
| `add(int, TextUnit, int, TextUnit, int, TextUnit)` | `addColumns3` |
| `add(ImageUnit)` | `addImage` |
| `add(List<TextUnit>, ImageUnit)` | `addTextsThenImage` |
| `add(ImageUnit, List<TextUnit>)` | `addImageThenTexts` |
| `init(Context)` / `init(Context, Typeface)` | `init` / `initWithTypeface` |

## Always use a session

`PrintTemplate` is a process-wide singleton, so its row buffer is shared. Two
receipts built concurrently interleave into one garbled page. `session` takes
a lock and clears the buffer on the way in and out, so a failure part way
through cannot leak rows into the next receipt.

```ts
const bitmap = yield* printTemplate.session(
  Effect.gen(function* () {
    yield* printTemplate.addText({ text: "ACME", fontSize: 30, align: "CENTER", isBold: true })
    yield* printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" })
    yield* printTemplate.addColumns2(3, { text: "Total" }, 1, { text: "4.50", align: "RIGHT" })
    return yield* printTemplate.getPrintBitmap()
  }),
)

yield* printer.printBmp(0, 384, 0, bitmap).pipe(
  Stream.takeUntil((e) => e._tag === "onPrintFinish" || e._tag === "onError"),
  Stream.runDrain,
)
```

Promise client:

```ts
await topwise.printTemplate.init()

const bitmap = await topwise.printTemplate.session(async () => {
  await topwise.printTemplate.addText({ text: "ACME", fontSize: 30, align: "CENTER" })
  return topwise.printTemplate.getPrintBitmap()
})

const stop = topwise.printer.printBmp(0, 384, 0, bitmap, {
  onEvent: (e) => { if (e._tag === "onPrintFinish") stop() },
})
```

`384` is the pixel width of a 58 mm head; 576 for 80 mm. Check
`printer.getPrinterMessage()` for the actual device.

## Before printing

`printer.getPrinterState()` returns `0` when ready. Non-zero values are in
[`AidlErrorCodePrinter`](./constants.md#aidlerrorcodeprinter) — `1` is out of
paper, `2` is overheating. `printer.getPrinterMessage()` also carries mileage,
temperature and voltage.

## printTemplate methods

Hand-written, so it has no generated page. `session` is the only one not a
direct mirror of a Java method.

| Method | |
| --- | --- |
| `init()` | Bind the template to the app context. Call once before the first row. |
| `initWithTypeface(typeface: TypefaceSpec)` | As `init`, with a default font. |
| `setTypeface(typeface: TypefaceSpec)` | Change the font for later rows. |
| `getStrokeWidth(): number` / `setStrokeWidth(width: number)` | Line thickness. |
| `setIncludePad(includePad: boolean)` | Include the font's ascent/descent when measuring rows. |
| `addText(text: Input<TextUnit>)` | One full-width row. |
| `addColumns2(w1, text1, w2, text2)` | Two columns by relative weight — the "label … amount" row. |
| `addColumns3(w1, t1, w2, t2, w3, t3)` | Three columns by relative weight. |
| `addImage(image: Input<ImageUnit>)` | One image row. |
| `addTextsThenImage(texts, image)` | A block of text rows beside an image. |
| `addImageThenTexts(image, texts)` | An image beside a block of text rows. |
| `getPrintBitmap(): Bitmap` | Render every row added so far. |
| `clear()` | Drop every row. |
| `session(build)` | Run `build` with exclusive use of the buffer, clearing either side. |

## Reference

- [`printer`](./modules/printer.md)
- [`TextUnit`](./types.md#textunit), [`ImageUnit`](./types.md#imageunit), [`PrintItemObj`](./types.md#printitemobj)
