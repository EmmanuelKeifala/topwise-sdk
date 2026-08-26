import { Data } from "effect";

/** Error codes raised by the Kotlin bridge. */
export type TopwiseErrorCode =
  /** `DeviceServiceManager` has not bound to the device service yet. */
  | "NOT_BOUND"
  /** The requested module name is not one this SDK exposes. */
  | "NO_SUCH_MODULE"
  /**
   * The device service is bound, but this module's accessor returned null:
   * the terminal has no such peripheral, or the app is not authorised for it.
   * Secure peripherals (pinpad, key manager, EMV kernels) are the usual case -
   * they are commonly restricted to vendor-signed or whitelisted apps.
   */
  | "MODULE_UNAVAILABLE"
  /** The AIDL interface has no such method (SDK jar older than these bindings). */
  | "NO_SUCH_METHOD"
  /** An argument could not be coerced to the declared Java parameter type. */
  | "BAD_ARGUMENT"
  /** The binder transaction failed — service died, or the app lacks permission. */
  | "REMOTE"
  /** The AIDL call itself threw. */
  | "INVOKE"
  /** The bridge native module is not linked into the app. */
  | "NO_BRIDGE";

/**
 * Any failure crossing the Topwise bridge.
 *
 * Note this is *transport* failure. Most Topwise calls report business failure
 * in-band as a non-zero `int` return; check those against the generated
 * `AidlErrorCode*` constants.
 */
export class TopwiseError extends Data.TaggedError("TopwiseError")<{
  readonly code: TopwiseErrorCode;
  readonly module: string;
  readonly method: string;
  readonly message: string;
  readonly cause?: unknown;
}> {
  override get name(): string {
    return `TopwiseError(${this.code})`;
  }
  override toString(): string {
    return `TopwiseError(${this.code}) ${this.module}.${this.method}: ${this.message}`;
  }
}
