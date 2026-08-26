import type { Effect } from "effect";
import { call, type TopwiseBridge } from "./bridge.js";
import type { Bitmap, Input } from "./codec.js";
import type { TopwiseError } from "./errors.js";
import type { MacParam, PinParam } from "./generated/types.js";

/**
 * Behaviour on vendor value classes that the generated field mirrors cannot
 * carry, because the work happens inside Java.
 *
 * `pinpad(n).getPin` and `getMac` take an `android.os.Bundle` whose keys are
 * defined only inside `PinParam.getParam()` / `MacParam.getParam()`. Rather
 * than hard-code key names scraped out of a method body, the parameters cross
 * as data, Java rebuilds them, and its Bundle comes back:
 *
 * ```ts
 * const bundle = yield* helpers.pinParamToBundle({
 *   keyIndex: 1, pinType: 0, keyType: 1, panBlock, timeOut: 60,
 *   keyMinLength: 4, keyMaxLength: 12,
 * })
 * yield* pinpad(0).getPin(bundle).pipe(
 *   Stream.takeUntil((e) => e._tag !== "onInput"),
 *   Stream.runHead,
 * )
 * ```
 */
const M = "helpers";

/** `PinParam.getParam()` - the Bundle `pinpad(n).getPin` expects. */
export const pinParamToBundle = (
  param: Input<PinParam>,
): Effect.Effect<Readonly<Record<string, unknown>>, TopwiseError, TopwiseBridge> =>
  call(M, -1, "pinParamToBundle", [param]);

/** `MacParam.getParam()` - the Bundle `pinpad(n).getMac` expects. */
export const macParamToBundle = (
  param: Input<MacParam>,
): Effect.Effect<Readonly<Record<string, unknown>>, TopwiseError, TopwiseBridge> =>
  call(M, -1, "macParamToBundle", [param]);

/** `SmallScreenUtil.convertBitmapToStandardFormat` - needs Android bitmap ops. */
export const convertBitmapToStandardFormat = (
  bitmap: Bitmap,
  width: number,
  height: number,
): Effect.Effect<Bitmap, TopwiseError, TopwiseBridge> =>
  call(M, -1, "convertBitmapToStandardFormat", [bitmap, width, height]);

export const helpers = {
  pinParamToBundle,
  macParamToBundle,
  convertBitmapToStandardFormat,
} as const;
