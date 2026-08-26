import type { Effect } from "effect";
import { call, type TopwiseBridge } from "./bridge.js";
import type { Bitmap, Input } from "./codec.js";
import type { TopwiseError } from "./errors.js";
import type { MacParam, PinParam } from "./generated/types.js";

/**
 * Java-side behaviour the generated field mirrors cannot carry. The Bundle
 * keys `getPin`/`getMac` expect live inside `getParam()`, so the params cross
 * as data and Java builds the Bundle.
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
