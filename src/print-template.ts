import { Effect } from "effect";
import { call, type TopwiseBridge } from "./bridge.js";
import type { TypefaceSpec } from "./android.js";
import type { Bitmap, Input } from "./codec.js";
import type { TopwiseError } from "./errors.js";
import type { ImageUnit, TextUnit } from "./generated/types.js";

/**
 * `PrintTemplate` - the receipt layout builder. Rows in, bitmap out, and that
 * bitmap goes to `printer.printBmp`.
 *
 * Its six `add` overloads differ only by argument type, which reflective
 * dispatch cannot resolve once the arguments are JSON, so each gets a name:
 *
 * | Java | here |
 * | --- | --- |
 * | `add(TextUnit)` | {@link addText} |
 * | `add(int, TextUnit, int, TextUnit)` | {@link addColumns2} |
 * | `add(int, TextUnit, int, TextUnit, int, TextUnit)` | {@link addColumns3} |
 * | `add(ImageUnit)` | {@link addImage} |
 * | `add(List<TextUnit>, ImageUnit)` | {@link addTextsThenImage} |
 * | `add(ImageUnit, List<TextUnit>)` | {@link addImageThenTexts} |
 * | `init(Context)` / `init(Context, Typeface)` | {@link init} / {@link initWithTypeface} |
 */
const M = "printTemplate";
const c = <A>(method: string, args: ReadonlyArray<unknown> = []) =>
  call<A>(M, -1, method, args);

/** Bind the template to the app context. Call once before the first row. */
const init = (): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("init");

/** As {@link init}, with a default font for every row. */
const initWithTypeface = (
  typeface: TypefaceSpec,
): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("initWithTypeface", [typeface]);

const setTypeface = (
  typeface: TypefaceSpec,
): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("setTypeface", [typeface]);

const getStrokeWidth = (): Effect.Effect<number, TopwiseError, TopwiseBridge> =>
  c("getStrokeWidth");

const setStrokeWidth = (width: number): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("setStrokeWidth", [width]);

/** Include the font's ascent/descent padding when measuring rows. */
const setIncludePad = (includePad: boolean): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("setIncludePad", [includePad]);

/** One full-width row. */
const addText = (text: Input<TextUnit>): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("addText", [text]);

/** Two columns, sized by relative weight - the classic "label … amount" row. */
const addColumns2 = (
  weight1: number,
  text1: Input<TextUnit>,
  weight2: number,
  text2: Input<TextUnit>,
): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("addColumns2", [weight1, text1, weight2, text2]);

/** Three columns, sized by relative weight. */
const addColumns3 = (
  weight1: number,
  text1: Input<TextUnit>,
  weight2: number,
  text2: Input<TextUnit>,
  weight3: number,
  text3: Input<TextUnit>,
): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("addColumns3", [weight1, text1, weight2, text2, weight3, text3]);

const addImage = (image: Input<ImageUnit>): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  c("addImage", [image]);

/** A block of text rows beside an image. */
const addTextsThenImage = (
  texts: ReadonlyArray<Input<TextUnit>>,
  image: Input<ImageUnit>,
): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("addTextsThenImage", [texts, image]);

/** An image beside a block of text rows. */
const addImageThenTexts = (
  image: Input<ImageUnit>,
  texts: ReadonlyArray<Input<TextUnit>>,
): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("addImageThenTexts", [image, texts]);

/** Render every row added so far. Feed the result to `printer.printBmp`. */
const getPrintBitmap = (): Effect.Effect<Bitmap, TopwiseError, TopwiseBridge> =>
  c("getPrintBitmap");

/** Drop every row. */
const clear = (): Effect.Effect<void, TopwiseError, TopwiseBridge> => c("clear");

/**
 * `PrintTemplate` is a process-wide singleton, so its row buffer is shared by
 * every caller. Two receipts built concurrently would interleave into one
 * garbled page; this serialises them.
 */
const lock = Effect.runSync(Effect.makeSemaphore(1));

/**
 * Build one receipt with exclusive use of the template.
 *
 * ```ts
 * const bitmap = yield* printTemplate.session(
 *   Effect.gen(function* () {
 *     yield* printTemplate.addText({ text: "ACME STORE", fontSize: 28, align: "CENTER" })
 *     yield* printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" })
 *     return yield* printTemplate.getPrintBitmap()
 *   }),
 * )
 * yield* printer.printBmp(0, 384, 0, bitmap).pipe(
 *   Stream.takeUntil((e) => e._tag !== "onPrintFinish"),
 *   Stream.runDrain,
 * )
 * ```
 *
 * The buffer is cleared on the way in and on the way out, so a failure part
 * way through cannot leak rows into the next receipt.
 */
const session = <A, E, R>(
  build: Effect.Effect<A, E, R>,
): Effect.Effect<A, E | TopwiseError, R | TopwiseBridge> =>
  lock.withPermits(1)(
    Effect.acquireUseRelease(
      clear(),
      () => build,
      () => Effect.ignore(clear()),
    ),
  );

export const printTemplate = {
  init,
  initWithTypeface,
  setTypeface,
  getStrokeWidth,
  setStrokeWidth,
  setIncludePad,
  addText,
  addColumns2,
  addColumns3,
  addImage,
  addTextsThenImage,
  addImageThenTexts,
  getPrintBitmap,
  clear,
  session,
} as const;
