import { Context, Effect, Layer, Queue, Stream } from "effect";
import { CALLBACK_SLOT, decode, encode } from "./codec.js";
import type { RemoteHandle } from "./android.js";
import { TopwiseError, type TopwiseErrorCode } from "./errors.js";

// ---------------------------------------------------------------- native side

/** The contract implemented by the Kotlin `TopwiseBridge` native module. */
export interface NativeBridge {
  /**
   * Invoke `method` on the AIDL interface behind `module`. `index` selects the
   * slot for the modules that take one (`pinpad`, `psam`, `serialport`,
   * `mdbSerialport`); it is ignored otherwise.
   *
   * Resolves with a JSON envelope rather than rejecting, so that error codes
   * survive the RN bridge intact.
   */
  invoke(module: string, index: number, method: string, argsJson: string): Promise<string>;
  /** Bind to the device service and wait until it answers. */
  ready(timeoutMs: number): Promise<string>;
  /** Answer a callback the kernel is blocked on. */
  respond(replyId: string, value: number): Promise<void>;
  /** Drop a registered listener so its binder stub can be collected. */
  release(callbackId: string): Promise<void>;
  /** Drop a handle returned by an earlier call. */
  releaseHandle(handle: string): Promise<void>;
}

/** One callback method invocation forwarded from a Java binder stub. */
export interface CallbackEvent {
  readonly callbackId: string;
  readonly method: string;
  /** Positional arguments, still in wire form. */
  readonly args: ReadonlyArray<unknown>;
  /** Present when the Java caller is blocked waiting for a reply. */
  readonly replyId?: string | undefined;
}

/** Tuning for callbacks whose reply the Java side blocks on. */
export interface CallbackOptions {
  /**
   * How long the kernel waits for a handler before giving up.
   * @default 30000
   */
  readonly timeoutMs?: number;
  /**
   * Value returned to the kernel if the handler does not answer in time or
   * dies. There is no universally safe choice - pick the one your kernel
   * treats as "decline".
   * @default 0
   */
  readonly fallback?: number;
}

/** Delivery of {@link CallbackEvent}s, e.g. RN's `NativeEventEmitter`. */
export interface NativeEvents {
  subscribe(handler: (event: CallbackEvent) => void): () => void;
}

interface Envelope {
  readonly ok: boolean;
  readonly value?: unknown;
  /** Mutated out-parameters, keyed by argument index. */
  readonly out?: Readonly<Record<string, unknown>>;
  readonly code?: TopwiseErrorCode;
  readonly message?: string;
}

// ------------------------------------------------------------------- service

/** Positional-to-named mapping for a listener interface's methods. */
export type EventShape = Readonly<Record<string, ReadonlyArray<string>>>;

/** A decoded listener callback, tagged by the Java method that fired it. */
export type TaggedEvent<Tag extends string = string> = { readonly _tag: Tag } & Record<string, unknown>;

export interface TopwiseBridgeService {
  /**
   * Bind to the device service and wait until it is usable.
   *
   * `DeviceServiceManager` binds asynchronously and the vendor SDK exposes no
   * completion callback, so every module accessor returns `null` for a short
   * window after app start. Await this once before the first device call.
   */
  readonly ready: (timeoutMs?: number) => Effect.Effect<void, TopwiseError>;

  /** Drop a handle returned by an earlier call. */
  readonly releaseHandle: (handle: RemoteHandle) => Effect.Effect<void>;

  /**
   * Call a method that delivers part of its answer by mutating an argument.
   * Several key-management calls return `int` for status and write their
   * payload into a holder passed in by the caller.
   */
  readonly invokeOut: (
    module: string,
    index: number,
    method: string,
    args: ReadonlyArray<unknown>,
  ) => Effect.Effect<{ readonly result: unknown; readonly out: Readonly<Record<string, unknown>> }, TopwiseError>;

  /** Call a method that takes no listener. */
  readonly invoke: (
    module: string,
    index: number,
    method: string,
    args: ReadonlyArray<unknown>,
  ) => Effect.Effect<unknown, TopwiseError>;

  /**
   * Call a method that takes a listener, exposing the callbacks as a stream.
   * The listener stays registered until the surrounding scope closes.
   */
  readonly stream: (
    module: string,
    index: number,
    method: string,
    args: ReadonlyArray<unknown>,
    shape: EventShape,
  ) => Stream.Stream<TaggedEvent, TopwiseError>;

  /**
   * As {@link stream}, but also surfaces the method's synchronous return value
   * for the calls that both take a listener and return a status.
   */
  readonly invokeWithEvents: (
    module: string,
    index: number,
    method: string,
    args: ReadonlyArray<unknown>,
    shape: EventShape,
  ) => Effect.Effect<
    { readonly result: unknown; readonly events: Stream.Stream<TaggedEvent, TopwiseError> },
    TopwiseError,
    Scope
  >;

  /**
   * Call a method that takes a request/response callback: the Java side blocks
   * on the binder thread until each handler produces a value.
   */
  readonly invokeWithHandlers: (
    module: string,
    index: number,
    method: string,
    args: ReadonlyArray<unknown>,
    shape: EventShape,
    handlers: Readonly<Record<string, (args: Record<string, unknown>) => Effect.Effect<number | void>>>,
    replies: ReadonlyArray<string>,
    options?: CallbackOptions,
  ) => Effect.Effect<unknown, TopwiseError, Scope>;
}

// `Scope` is re-exported from effect under `Scope.Scope`; alias it for brevity.
type Scope = import("effect/Scope").Scope;

export class TopwiseBridge extends Context.Tag("topwise/TopwiseBridge")<
  TopwiseBridge,
  TopwiseBridgeService
>() {}

// -------------------------------------------------------------- construction

let callbackSeq = 0;

const toEvent = (method: string, args: ReadonlyArray<unknown>, shape: EventShape): TaggedEvent => {
  const names = shape[method];
  const out: Record<string, unknown> = { _tag: method };
  if (names === undefined) {
    // Listener method not in the generated shape table (jar newer than the
    // bindings). Surface it positionally rather than dropping it.
    out["args"] = args.map(decode);
  } else {
    for (let i = 0; i < names.length; i++) out[names[i]!] = decode(args[i]);
  }
  return out as TaggedEvent;
};

/**
 * Build a bridge layer over any transport implementing {@link NativeBridge}.
 * Use `TopwiseBridgeLive` from `@slipstream/topwise-sdk/react-native` for the
 * standard React Native wiring; this entry point exists for tests and for
 * hosts that are not React Native.
 */
export const layer = (native: NativeBridge, events: NativeEvents): Layer.Layer<TopwiseBridge> =>
  Layer.scoped(
    TopwiseBridge,
    Effect.gen(function* () {
      const queues = new Map<string, Queue.Queue<TaggedEvent>>();
      const shapes = new Map<string, EventShape>();
      const handlerSets = new Map<
        string,
        {
          readonly handlers: Readonly<Record<string, (args: Record<string, unknown>) => Effect.Effect<number | void>>>;
          readonly fallback: number;
        }
      >();

      yield* Effect.acquireRelease(
        Effect.sync(() =>
          events.subscribe((event) => {
            const decoded = toEvent(event.method, event.args, shapes.get(event.callbackId) ?? {});

            const set = handlerSets.get(event.callbackId);
            if (set !== undefined) {
              const handler = set.handlers[event.method];
              const { _tag, ...args } = decoded;
              const answer =
                handler === undefined
                  ? Promise.resolve(set.fallback)
                  : Effect.runPromise(handler(args)).then(
                      (v) => (typeof v === "number" ? v : set.fallback),
                      () => set.fallback,
                    );
              if (event.replyId !== undefined) {
                const replyId = event.replyId;
                void answer.then(
                  (value) => native.respond(replyId, value),
                  () => native.respond(replyId, set.fallback),
                );
              }
              return;
            }

            const queue = queues.get(event.callbackId);
            if (queue === undefined) return; // listener already released
            Queue.unsafeOffer(queue, decoded);
          }),
        ),
        (unsubscribe) => Effect.sync(unsubscribe),
      );

      const rawInvoke = (
        module: string,
        index: number,
        method: string,
        args: ReadonlyArray<unknown>,
        callbackId?: string,
        callbackExtra?: Readonly<Record<string, unknown>>,
      ) =>
        Effect.tryPromise({
          try: () => native.invoke(module, index, method, JSON.stringify(encode(args, callbackId, callbackExtra))),
          catch: (cause) =>
            new TopwiseError({ code: "NO_BRIDGE", module, method, message: String(cause), cause }),
        }).pipe(
          Effect.flatMap((json) => {
            let envelope: Envelope;
            try {
              envelope = JSON.parse(json) as Envelope;
            } catch (cause) {
              return Effect.fail(
                new TopwiseError({ code: "INVOKE", module, method, message: `malformed bridge response: ${json}`, cause }),
              );
            }
            return envelope.ok
              ? Effect.succeed(envelope)
              : Effect.fail(
                  new TopwiseError({
                    code: envelope.code ?? "INVOKE",
                    module,
                    method,
                    message: envelope.message ?? "unknown bridge failure",
                  }),
                );
          }),
        );

      const invokeValue = (
        module: string,
        index: number,
        method: string,
        args: ReadonlyArray<unknown>,
        callbackId?: string,
        callbackExtra?: Readonly<Record<string, unknown>>,
      ) =>
        Effect.map(rawInvoke(module, index, method, args, callbackId, callbackExtra), (e) =>
          decode((e as Envelope).value),
        );

      /** Register a listener slot; released when the scope closes. */
      const acquireCallback = (shape: EventShape) =>
        Effect.acquireRelease(
          Effect.gen(function* () {
            const id = `cb${++callbackSeq}`;
            const queue = yield* Queue.unbounded<TaggedEvent>();
            queues.set(id, queue);
            shapes.set(id, shape);
            return { id, queue };
          }),
          ({ id, queue }) =>
            Effect.zipRight(
              Effect.promise(() => native.release(id)).pipe(Effect.ignore),
              Effect.sync(() => {
                queues.delete(id);
                shapes.delete(id);
              }),
            ).pipe(Effect.zipRight(Queue.shutdown(queue))),
        );

      const invokeWithHandlers: TopwiseBridgeService["invokeWithHandlers"] = (
        module,
        index,
        method,
        args,
        shape,
        handlers,
        replies,
        options,
      ) =>
        Effect.gen(function* () {
          const timeoutMs = options?.timeoutMs ?? 30_000;
          const fallback = options?.fallback ?? 0;
          const { id } = yield* acquireCallback(shape);
          handlerSets.set(id, { handlers, fallback });
          yield* Effect.addFinalizer(() => Effect.sync(() => handlerSets.delete(id)));
          return yield* invokeValue(module, index, method, args, id, {
            replyTimeoutMs: timeoutMs,
            replyFallback: fallback,
            replyMethods: replies,
          });
        });

      const invokeWithEvents: TopwiseBridgeService["invokeWithEvents"] = (
        module,
        index,
        method,
        args,
        shape,
      ) =>
        Effect.gen(function* () {
          const { id, queue } = yield* acquireCallback(shape);
          const result = yield* invokeValue(module, index, method, args, id);
          return { result, events: Stream.fromQueue(queue) };
        });

      const ready: TopwiseBridgeService["ready"] = (timeoutMs = 5000) =>
        Effect.tryPromise({
          try: () => native.ready(timeoutMs),
          catch: (cause) =>
            new TopwiseError({ code: "NO_BRIDGE", module: "", method: "ready", message: String(cause), cause }),
        }).pipe(
          Effect.flatMap((json) => {
            const envelope = JSON.parse(json) as Envelope;
            return envelope.ok
              ? Effect.void
              : Effect.fail(
                  new TopwiseError({
                    code: envelope.code ?? "NOT_BOUND",
                    module: "",
                    method: "ready",
                    message: envelope.message ?? "device service did not bind",
                  }),
                );
          }),
        );

      return TopwiseBridge.of({
        ready,
        releaseHandle: (handle) =>
          Effect.promise(() => native.releaseHandle(handle.__handle)).pipe(Effect.ignore),
        invokeWithHandlers,
        invoke: (module, index, method, args) => invokeValue(module, index, method, args),
        invokeOut: (module, index, method, args) =>
          Effect.map(rawInvoke(module, index, method, args), (e) => {
            const envelope = e as Envelope;
            const out: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(envelope.out ?? {})) out[k] = decode(v);
            return { result: decode(envelope.value), out };
          }),
        invokeWithEvents,
        stream: (module, index, method, args, shape) =>
          Stream.unwrapScoped(
            invokeWithEvents(module, index, method, args, shape).pipe(Effect.map((r) => r.events)),
          ),
      });
    }),
  );

// ------------------------------------------------- helpers for generated code

/** @internal Used by generated module bindings. */
export const call = <A>(
  module: string,
  index: number,
  method: string,
  args: ReadonlyArray<unknown>,
): Effect.Effect<A, TopwiseError, TopwiseBridge> =>
  Effect.flatMap(TopwiseBridge, (b) => b.invoke(module, index, method, args) as Effect.Effect<A, TopwiseError>);

/**
 * @internal Used by generated module bindings for methods that write into an
 * argument. `outNames` maps argument index to the name the result is keyed by.
 */
export const callOut = <R, O>(
  module: string,
  index: number,
  method: string,
  args: ReadonlyArray<unknown>,
  outNames: Readonly<Record<string, string>>,
): Effect.Effect<{ readonly result: R; readonly out: O }, TopwiseError, TopwiseBridge> =>
  Effect.flatMap(TopwiseBridge, (b) =>
    Effect.map(b.invokeOut(module, index, method, args), ({ result, out }) => {
      const named: Record<string, unknown> = {};
      for (const [i, name] of Object.entries(outNames)) named[name] = out[i];
      return { result: result as R, out: named as O };
    }),
  );

/** @internal Used by generated module bindings. */
export const callStream = <A extends TaggedEvent>(
  module: string,
  index: number,
  method: string,
  args: ReadonlyArray<unknown>,
  shape: EventShape,
): Stream.Stream<A, TopwiseError, TopwiseBridge> =>
  Stream.unwrap(
    Effect.map(TopwiseBridge, (b) => b.stream(module, index, method, args, shape) as Stream.Stream<A, TopwiseError>),
  );

/** @internal Used by generated module bindings. */
export const callWithEvents = <R, A extends TaggedEvent>(
  module: string,
  index: number,
  method: string,
  args: ReadonlyArray<unknown>,
  shape: EventShape,
): Effect.Effect<
  { readonly result: R; readonly events: Stream.Stream<A, TopwiseError> },
  TopwiseError,
  TopwiseBridge | Scope
> =>
  Effect.flatMap(TopwiseBridge, (b) =>
    b.invokeWithEvents(module, index, method, args, shape) as Effect.Effect<
      { readonly result: R; readonly events: Stream.Stream<A, TopwiseError> },
      TopwiseError,
      Scope
    >,
  );

/** @internal Used by generated module bindings. */
export const callWithHandlers = <A>(
  module: string,
  index: number,
  method: string,
  args: ReadonlyArray<unknown>,
  shape: EventShape,
  handlers: Readonly<Record<string, (args: Record<string, unknown>) => Effect.Effect<number | void>>>,
  replies: ReadonlyArray<string>,
  options?: CallbackOptions,
): Effect.Effect<A, TopwiseError, TopwiseBridge | Scope> =>
  Effect.flatMap(TopwiseBridge, (b) =>
    b.invokeWithHandlers(module, index, method, args, shape, handlers, replies, options) as Effect.Effect<
      A,
      TopwiseError,
      Scope
    >,
  );

/**
 * Release a handle returned by an earlier call. Handles are keyed by binder
 * identity natively, so this is only needed if you churn through short-lived
 * interfaces rather than holding one for the app's lifetime.
 */
export const releaseHandle = (
  handle: RemoteHandle,
): Effect.Effect<void, never, TopwiseBridge> =>
  Effect.flatMap(TopwiseBridge, (b) => b.releaseHandle(handle));

/**
 * Bind to the device service and wait until it is usable. Run this once at
 * startup, before any device call.
 */
export const ready = (timeoutMs?: number): Effect.Effect<void, TopwiseError, TopwiseBridge> =>
  Effect.flatMap(TopwiseBridge, (b) => b.ready(timeoutMs));

export { CALLBACK_SLOT };
