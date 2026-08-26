// Must precede every Effect import; see src/polyfill.ts.
import "./polyfill.js";

import type { Layer } from "effect";
import { NativeEventEmitter, NativeModules } from "react-native";
import { layer, type CallbackEvent, type NativeBridge, type NativeEvents, type TopwiseBridge } from "./bridge.js";
import { makeTopwiseClient, type TopwiseClient } from "./promise.js";

const NAME = "TopwiseBridge";
const EVENT = "TopwiseCallback";

/** Raw event shape emitted by the Kotlin module. */
interface RawEvent {
  readonly callbackId: string;
  readonly method: string;
  readonly argsJson: string;
  readonly replyId?: string;
}

const missing = (): never => {
  throw new Error(
    `Native module "${NAME}" is not linked. Add TopwisePackage() to MainApplication's ` +
      `package list and rebuild the Android app (a Metro reload is not enough).`,
  );
};

/** The bridge layer for React Native on a Topwise terminal. */
export const TopwiseBridgeLive: Layer.Layer<TopwiseBridge> = layer(
  ((): NativeBridge => {
    const native = NativeModules[NAME] as NativeBridge | undefined;
    if (native === undefined) {
      return {
        invoke: missing,
        ready: missing,
        respond: missing,
        release: missing,
        releaseHandle: missing,
      };
    }
    return native;
  })(),
  ((): NativeEvents => ({
    subscribe: (handler: (event: CallbackEvent) => void) => {
      const native = NativeModules[NAME];
      if (native === undefined) return () => {};
      const emitter = new NativeEventEmitter(native);
      const sub = emitter.addListener(EVENT, (raw: RawEvent) => {
        let args: ReadonlyArray<unknown>;
        try {
          args = JSON.parse(raw.argsJson) as ReadonlyArray<unknown>;
        } catch {
          args = [];
        }
        handler({ callbackId: raw.callbackId, method: raw.method, args, replyId: raw.replyId });
      });
      return () => sub.remove();
    },
  }))(),
);

/**
 * Promise-based client for apps that do not use Effect. Create it once: it
 * owns the runtime and the registry of live listeners.
 */
export const createTopwise = (): TopwiseClient => makeTopwiseClient(TopwiseBridgeLive);

export type { TopwiseClient, StreamHandlers, Unsubscribe } from "./promise.js";
