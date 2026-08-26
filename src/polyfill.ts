/**
 * Hermes ships no `TextEncoder`/`TextDecoder`, and Effect's internals
 * construct one at module-load time — so without this the SDK throws
 * `ReferenceError: Property 'TextDecoder' doesn't exist` before any of your
 * code runs.
 *
 * The SDK imports this itself, ahead of anything that pulls in Effect, so
 * consumers do not have to know about it. The polyfill installs only when the
 * globals are absent, making it a no-op on Node, browsers, and any runtime
 * that already provides them.
 */
import "text-encoding-polyfill";
