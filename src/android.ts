/**
 * Hand-written mappings for Android and JDK types that appear in the Topwise
 * AIDL surface.
 *
 * These are stable platform shapes, not vendor types, so they are written once
 * here rather than generated. Each has a matching rule in `TopwiseCodec.kt`.
 */

/** `android.content.ContentValues` - a flat, typed key/value bag. */
export type ContentValues = Readonly<Record<string, string | number | boolean | Uint8Array | null>>;

/** `android.content.ComponentName`. */
export interface ComponentName {
  readonly packageName: string;
  readonly className: string;
}

/** `android.graphics.Rect`. */
export interface Rect {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

/**
 * `android.graphics.Typeface`. A Typeface is a loaded font, so it crosses as a
 * request to load one: a built-in family, a file on disk, or an app asset.
 */
export interface TypefaceSpec {
  /** e.g. `"monospace"`, `"sans-serif"`. Ignored when `path`/`asset` is set. */
  readonly family?: string;
  /** Absolute path to a font file. */
  readonly path?: string;
  /** Path within the app's `assets/`. */
  readonly asset?: string;
  /** `android.graphics.Typeface` style: 0 normal, 1 bold, 2 italic, 3 both. */
  readonly style?: number;
}

/** `android.view.KeyEvent`, flattened to its accessors. */
export interface KeyEventData {
  readonly action: number;
  readonly keyCode: number;
  readonly scanCode: number;
  readonly metaState: number;
  readonly repeatCount: number;
  readonly flags: number;
  readonly deviceId: number;
  readonly source: number;
  /** Milliseconds since boot. */
  readonly downTime: number;
  /** Milliseconds since boot. */
  readonly eventTime: number;
}

/** `android.app.usage.UsageStats`, flattened to its accessors. */
export interface UsageStatsData {
  readonly packageName: string;
  readonly firstTimeStamp: number;
  readonly lastTimeStamp: number;
  readonly lastTimeUsed: number;
  readonly totalTimeInForeground: number;
}

/** `java.security.cert.X509Certificate`. */
export interface X509CertificateData {
  /** The certificate's DER encoding - the authoritative form. */
  readonly der: Uint8Array;
  readonly subject: string;
  readonly issuer: string;
  /** Decimal string; serials routinely exceed `Number.MAX_SAFE_INTEGER`. */
  readonly serialNumber: string;
  /** ISO-8601. */
  readonly notBefore: string;
  /** ISO-8601. */
  readonly notAfter: string;
}

/**
 * `android.os.ParcelFileDescriptor`. A file descriptor cannot cross into JS,
 * so the path crosses instead and the descriptor is opened - and closed -
 * on the native side around the call.
 */
export interface FileRef {
  /** Absolute path, readable by the app. */
  readonly path: string;
  /** @default "r" */
  readonly mode?: "r" | "w" | "rw";
}

/**
 * A live `android.os.IBinder` held on the native side.
 *
 * Some AIDL methods hand back another interface rather than data. The object
 * stays in the native process and JS gets this token; pass it to the matching
 * `…At(ref)` bindings to call through it. Release with `releaseHandle` when
 * done - repeated calls that return the same binder reuse one handle, so this
 * is only needed if you are churning through them.
 */
export interface RemoteHandle {
  readonly __handle: string;
  /** The AIDL interface descriptor, e.g. `com.topwise.….AidlSerialport`. */
  readonly iface: string;
}
