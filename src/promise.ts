/**
 * Promise facade over the Effect API: `Effect` becomes `Promise`, `Stream`
 * becomes a subscription, and failures are thrown rather than typed.
 */
import { Cause, Effect, Exit, Fiber, ManagedRuntime, Stream } from "effect";
import type { Layer } from "effect";
import type { RemoteHandle } from "./android.js";
import type { TopwiseBridge } from "./bridge.js";
import { helpers as helpersModule } from "./helpers.js";
import { printTemplate as printTemplateModule } from "./print-template.js";
import { ready as readyEffect, releaseHandle as releaseHandleEffect } from "./bridge.js";
import * as Modules from "./generated/modules.js";

/** Stops a subscription and releases the underlying listener. */
export type Unsubscribe = () => void;

/** Callbacks for a listener stream. */
export interface StreamHandlers<A> {
  /** Called for each callback the device emits. */
  readonly onEvent: (event: A) => void;
  /** Called once if the stream fails. */
  readonly onError?: (error: unknown) => void;
  /** Called once when the stream ends or is unsubscribed. */
  readonly onEnd?: () => void;
}

type AnyFn = (...args: never[]) => unknown;

/**
 * `Effect` -> `Promise`, `Stream` -> subscription, anything else recursed into.
 *
 * Effect must be tested before Stream: in Effect 3 an `Effect` is assignable to
 * `Stream`, so a Stream-first conditional matches every method and turns the
 * whole API into subscriptions. The reverse is not true, which makes this the
 * order that actually discriminates.
 */
type Promisify<T> = T extends (...args: infer A) => infer R
  ? R extends Effect.Effect<infer S, unknown, unknown>
    ? (...args: A) => Promise<S>
    : R extends Stream.Stream<infer S, unknown, unknown>
      ? (...args: [...A, handlers: StreamHandlers<S>]) => Unsubscribe
      : (...args: A) => Promisify<R>
  : T extends Record<string, unknown>
    ? { readonly [K in keyof T]: Promisify<T[K]> }
    : T;

type Modules = { readonly [K in keyof typeof Modules]: Promisify<(typeof Modules)[K]> };

/** The promise-based client. */
export type TopwiseClient = Modules & {
  /** Bind to the device service and wait until it answers. */
  readonly ready: (timeoutMs?: number) => Promise<void>;
  /** Release a handle returned by an earlier call. */
  readonly releaseHandle: (handle: RemoteHandle) => Promise<void>;
  readonly helpers: Promisify<typeof helpersModule>;
  readonly printTemplate: Promisify<Omit<typeof printTemplateModule, "session">> & {
    /**
     * Build one receipt with exclusive use of the shared template buffer.
     * The buffer is cleared before and after, so a failure part way through
     * cannot leak rows into the next receipt.
     */
    readonly session: <A>(build: () => Promise<A>) => Promise<A>;
  };
  /**
   * Subscribe to a stream returned by one of the `{ result, events }` calls.
   * Most listener methods already return a subscription directly; this is for
   * the handful that hand back a stream alongside a status.
   */
  readonly subscribe: <A>(
    stream: Stream.Stream<A, unknown, TopwiseBridge>,
    handlers: StreamHandlers<A>,
  ) => Unsubscribe;
  /** Tear down the runtime and every listener still registered. */
  readonly dispose: () => Promise<void>;
};

const isStream = (value: unknown): value is Stream.Stream<unknown, unknown, unknown> =>
  typeof value === "object" && value !== null && Stream.StreamTypeId in value;

/**
 * Build a promise client over any bridge layer. React Native users should call
 * `createTopwise()` from `@slipstream/topwise-sdk/react-native` instead, which
 * supplies the layer for them.
 */
export function makeTopwiseClient(layer: Layer.Layer<TopwiseBridge>): TopwiseClient {
  const runtime = ManagedRuntime.make(layer);

  /** Run an effect, rejecting with the failure itself rather than a FiberFailure. */
  const run = async <A>(effect: Effect.Effect<A, unknown, TopwiseBridge>): Promise<A> => {
    const exit = await runtime.runPromiseExit(Effect.scoped(effect));
    if (Exit.isSuccess(exit)) return exit.value;
    throw Cause.squash(exit.cause);
  };

  const subscribe = <A>(
    stream: Stream.Stream<A, unknown, TopwiseBridge>,
    handlers: StreamHandlers<A>,
  ): Unsubscribe => {
    const fiber = runtime.runFork(
      Effect.scoped(Stream.runForEach(stream, (event) => Effect.sync(() => handlers.onEvent(event)))),
    );
    fiber.addObserver((exit) => {
      if (Exit.isFailure(exit) && !Cause.isInterruptedOnly(exit.cause)) {
        handlers.onError?.(Cause.squash(exit.cause));
      }
      handlers.onEnd?.();
    });
    return () => {
      runtime.runFork(Fiber.interrupt(fiber));
    };
  };

  /** Wrap one binding, deciding by what it actually returns at call time. */
  const wrapFn =
    (fn: AnyFn) =>
    (...args: unknown[]): unknown => {
      const last = args[args.length - 1];
      const looksLikeHandlers =
        typeof last === "object" && last !== null && "onEvent" in (last as object);

      // A stream binding is called with the handlers appended, so try without
      // them first and only treat the trailing argument as handlers if what
      // comes back is genuinely a stream.
      if (looksLikeHandlers) {
        const result = (fn as (...a: unknown[]) => unknown)(...args.slice(0, -1));
        if (isStream(result)) {
          return subscribe(result as Stream.Stream<unknown, unknown, TopwiseBridge>, last as StreamHandlers<unknown>);
        }
        // Not a stream after all: the object was a real argument.
      }

      const result = (fn as (...a: unknown[]) => unknown)(...args);
      if (isStream(result)) {
        throw new TypeError(
          "this call returns a stream of device callbacks; pass a handlers object " +
            "({ onEvent }) as the final argument",
        );
      }
      if (Effect.isEffect(result)) {
        return run(result as Effect.Effect<unknown, unknown, TopwiseBridge>);
      }
      // An indexed module such as pinpad(0): wrap the object it returned.
      return wrapObject(result as Record<string, unknown>);
    };

  const wrapObject = (source: Record<string, unknown>): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(source)) {
      out[key] =
        typeof value === "function"
          ? wrapFn(value as AnyFn)
          : // Module namespaces nest one level: `modules.printer.getPrinterState`.
            typeof value === "object" && value !== null
            ? wrapObject(value as Record<string, unknown>)
            : value;
    }
    return out;
  };

  const client: Record<string, unknown> = wrapObject(Modules as unknown as Record<string, unknown>);

  client["helpers"] = wrapObject(helpersModule as unknown as Record<string, unknown>);
  client["printTemplate"] = {
    ...wrapObject(printTemplateModule as unknown as Record<string, unknown>),
    session: <A>(build: () => Promise<A>): Promise<A> =>
      run(printTemplateModule.session(Effect.promise(build))),
  };
  client["ready"] = (timeoutMs?: number) => run(readyEffect(timeoutMs));
  client["releaseHandle"] = (handle: RemoteHandle) => run(releaseHandleEffect(handle));
  client["subscribe"] = subscribe;
  client["dispose"] = () => runtime.dispose();

  return client as unknown as TopwiseClient;
}
