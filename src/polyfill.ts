/**
 * Hermes has no `TextEncoder`/`TextDecoder`, which Effect constructs at module
 * load. Must be imported before Effect. No-op where the globals exist.
 */
import "text-encoding-polyfill";
