/**
 * Effect bindings for the Topwise T1/T3/T6 Android POS SDK.
 *
 * Everything under `generated/` is produced by `npm run codegen` from the
 * vendor jar plus its javadoc; see CODEGEN_REPORT.md for what did not survive
 * the trip across the bridge.
 */

export { TopwiseError, type TopwiseErrorCode } from "./errors.js";
export {
  Bitmap,
  CALLBACK_SLOT,
  fromBase64,
  toBase64,
  type Input,
} from "./codec.js";
export type {
  ComponentName,
  ContentValues,
  FileRef,
  KeyEventData,
  Rect,
  RemoteHandle,
  TypefaceSpec,
  UsageStatsData,
  X509CertificateData,
} from "./android.js";
export {
  makeTopwiseClient,
  type StreamHandlers,
  type TopwiseClient,
  type Unsubscribe,
} from "./promise.js";
export {
  TopwiseBridge,
  layer,
  ready,
  releaseHandle,
  type CallbackEvent,
  type EventShape,
  type NativeBridge,
  type NativeEvents,
  type TaggedEvent,
  type TopwiseBridgeService,
} from "./bridge.js";

/** Pure-TS mirrors of `BytesUtil`, `Tlv` and `TlvList` - no bridge round-trip. */
export * from "./bytes.js";
/** Java-side behaviour the field mirrors cannot carry (`PinParam.getParam()`). */
export { helpers } from "./helpers.js";
/** The receipt layout builder - hand-written mirror of `PrintTemplate`. */
export { printTemplate } from "./print-template.js";
/** Device modules: `printer`, `pinpad(0)`, `emvL2`, `checkCard`, ... */
export * from "./generated/modules.js";
/** Data carriers (`TrackData`, `EmvCapk`, `PrintItemObj`, ...). */
export type * from "./generated/types.js";

// Namespaced re-exports are written as import-then-export rather than
// `export * as NS from`: that syntax needs
// @babel/plugin-transform-export-namespace-from, which React Native's Babel
// preset does not apply to node_modules, and Metro fails the bundle on it.
import * as Events from "./generated/listeners.js";
import * as Enums from "./generated/enums.js";
import * as Constants from "./generated/constants.js";

export {
  /** Callback event unions, one per AIDL listener interface. */
  Events,
  /** Java enums, as string-literal unions. */
  Enums,
  /** Vendor constant tables, including the `AidlErrorCode*` families. */
  Constants,
};
