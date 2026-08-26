package com.slipstream.topwise

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.Arguments
import com.topwise.cloudpos.service.DeviceServiceManager
import org.json.JSONArray
import org.json.JSONObject
import java.lang.reflect.InvocationTargetException
import java.lang.reflect.Method
import java.util.concurrent.ArrayBlockingQueue
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicLong

/**
 * The one native module behind the whole SDK.
 *
 * Rather than hand-writing a React Native method per AIDL method (~750 of
 * them), this dispatches reflectively: the module name resolves to an AIDL
 * interface through generated code, and arguments are coerced against the
 * declared parameter types. Only the pieces reflection genuinely cannot do -
 * resolving `DeviceServiceManager` getters and subclassing the abstract binder
 * `Stub` classes for listeners - are generated into [TopwiseGenerated].
 *
 * Consumers must keep `com.topwise.cloudpos.**` unobfuscated; see
 * `proguard-rules.pro`, which ships with this module.
 */
class TopwiseBridgeModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = NAME

    @Volatile private var initialized = false

    /**
     * Live binder stubs, keyed by the callback id JS handed us. Holding a
     * strong reference here is load-bearing: a `Stub` that is only referenced
     * across the binder can be collected, after which callbacks silently stop.
     */
    private val listeners = ConcurrentHashMap<String, Any>()

    /**
     * One worker per module. The device services are not documented as
     * thread-safe, and a blocking call (PIN entry, printing) must not stall
     * unrelated peripherals.
     *
     * ponytail: per-module serialization. If two callers ever need to drive the
     * same peripheral concurrently, this is the thing to revisit - not a global
     * lock, and not a shared pool.
     */
    private val workers = ConcurrentHashMap<String, ExecutorService>()

    /**
     * In-flight callbacks whose value the Java caller is blocked on - the EMV
     * kernels ask the app questions mid-transaction and wait on the binder
     * thread for the answer.
     */
    private val pendingReplies = ConcurrentHashMap<String, ArrayBlockingQueue<Long>>()
    private val replySeq = AtomicLong()

    /**
     * The receipt layout builder. Hand-written rather than generated: it holds
     * a Context, and its `add` overloads are ambiguous by arity.
     */
    private val printTemplate by lazy { TopwisePrintTemplate(reactContext.applicationContext) }

    private fun worker(module: String): ExecutorService =
        workers.getOrPut(module) { Executors.newSingleThreadExecutor { r -> Thread(r, "topwise-$module") } }

    private fun ensureInitialized() {
        if (initialized) return
        synchronized(this) {
            if (initialized) return
            DeviceServiceManager.getInstance().init(reactContext.applicationContext)
            initialized = true
        }
    }

    // ------------------------------------------------------------------ API

    /**
     * Bind to the device service and wait until it is usable. Binding is
     * asynchronous and the SDK exposes no completion callback, so this polls.
     */
    @ReactMethod
    fun ready(timeoutMs: Double, promise: Promise) {
        worker("__init").execute {
            ensureInitialized()
            val deadline = System.currentTimeMillis() + timeoutMs.toLong()
            while (System.currentTimeMillis() < deadline) {
                if (DeviceServiceManager.getInstance().systemManager != null) {
                    promise.resolve(ok(JSONObject.NULL))
                    return@execute
                }
                Thread.sleep(POLL_INTERVAL_MS)
            }
            promise.resolve(err("NOT_BOUND", "", "ready", "device service did not bind within ${timeoutMs.toLong()}ms"))
        }
    }

    /**
     * Invoke [method] on the AIDL interface behind [module].
     *
     * Always resolves - failures come back as `{ ok: false, code, message }` so
     * that error codes survive the React Native promise boundary intact.
     */
    @ReactMethod
    fun invoke(module: String, index: Double, method: String, argsJson: String, promise: Promise) {
        worker(module).execute {
            promise.resolve(runCatching { dispatch(module, index.toInt(), method, argsJson) }
                .getOrElse { err("INVOKE", module, method, it.describe()) })
        }
    }

    /**
     * Answer a callback the Java side is blocked on. Late answers are dropped:
     * by then the kernel has already taken the fallback and moved on.
     */
    @ReactMethod
    fun respond(replyId: String, value: Double, promise: Promise) {
        pendingReplies[replyId]?.offer(value.toLong())
        promise.resolve(null)
    }

    /**
     * Drop a handle returned by a previous [invoke]. Handles are keyed by
     * binder identity, so this is only needed if you are churning through
     * short-lived interfaces.
     */
    @ReactMethod
    fun releaseHandle(handle: String, promise: Promise) {
        TopwiseHandles.release(handle)
        promise.resolve(null)
    }

    /** Drop a listener registered by a previous [invoke]. */
    @ReactMethod
    fun release(callbackId: String, promise: Promise) {
        listeners.remove(callbackId)
        promise.resolve(null)
    }

    // Required by NativeEventEmitter; the emitter itself needs no bookkeeping here.
    @ReactMethod fun addListener(eventName: String) = Unit
    @ReactMethod fun removeListeners(count: Double) = Unit

    // ------------------------------------------------------------- dispatch

    private fun dispatch(module: String, index: Int, method: String, argsJson: String): String {
        ensureInitialized()

        // A "@"-prefixed target is a live binder JS got back from an earlier
        // call, not a DeviceServiceManager module.
        val target = if (module == PRINT_TEMPLATE) {
            printTemplate
        } else if (module == HELPERS) {
            TopwiseHelpers
        } else if (TopwiseHandles.isHandle(module)) {
            TopwiseHandles.resolve(module)
                ?: return err("NO_SUCH_MODULE", module, method, "handle $module is no longer live")
        } else try {
            TopwiseGenerated.resolveModule(module, index)
        } catch (t: Throwable) {
            return err("NOT_BOUND", module, method, t.describe())
        } ?: return when {
            !isKnown(module) -> err("NO_SUCH_MODULE", module, method, "unknown module '$module'")
            // Distinguish "nothing is bound" from "this one accessor gave null".
            // Conflating them sends people chasing a binding problem that isn't
            // there when the real answer is absent hardware or authorisation.
            DeviceServiceManager.getInstance().systemManager == null ->
                err("NOT_BOUND", module, method, "device service is not bound")
            else -> err(
                "MODULE_UNAVAILABLE", module, method,
                "device service is bound but getX() for '$module' returned null - " +
                    "this terminal has no such peripheral, or this app is not authorised for it",
            )
        }

        val args = JSONArray(argsJson)
        val candidates = target.javaClass.methods.filter { it.name == method && it.parameterTypes.size == args.length() }
        if (candidates.isEmpty()) {
            return err("NO_SUCH_METHOD", module, method,
                "no ${method}/${args.length()} on ${target.javaClass.interfaces.firstOrNull()?.name ?: target.javaClass.name}")
        }

        // Overloads are rare here; try each until one both coerces and invokes.
        var lastArgFailure: Throwable? = null
        for (candidate in candidates.sortedBy { it.parameterTypes.count { p -> p == Any::class.java } }) {
            // Arguments may open descriptors; they are closed once the call
            // returns, whether it succeeded or threw.
            val ctx = TopwiseCodec.DecodeContext(listenerFactory)
            val coerced = try {
                coerce(candidate, args, ctx)
            } catch (t: Throwable) {
                ctx.close(); lastArgFailure = t; continue
            }
            return try {
                candidate.isAccessible = true
                val result = candidate.invoke(target, *coerced)
                ok(TopwiseCodec.encode(result), outArgs(candidate, coerced))
            } catch (t: InvocationTargetException) {
                val cause = t.targetException ?: t
                val code = if (cause is android.os.RemoteException) "REMOTE" else "INVOKE"
                err(code, module, method, cause.describe())
            } finally {
                ctx.close()
            }
        }
        return err("BAD_ARGUMENT", module, method, lastArgFailure.describe())
    }

    /**
     * Re-encode the arguments the Java side writes into. Several key-management
     * calls return `int` for status and deliver their payload by mutating a
     * holder passed in by the caller; without this that payload is lost.
     */
    private fun outArgs(method: Method, coerced: Array<Any?>): JSONObject? {
        var out: JSONObject? = null
        method.parameterTypes.forEachIndexed { i, type ->
            val value = coerced[i]
            if (value != null && TopwiseCodec.isOutHolder(type)) {
                (out ?: JSONObject().also { out = it }).put(i.toString(), TopwiseCodec.encode(value))
            }
        }
        return out
    }

    private fun coerce(method: Method, args: JSONArray, ctx: TopwiseCodec.DecodeContext): Array<Any?> {
        val types = method.parameterTypes
        val generics = method.genericParameterTypes
        return Array(types.size) { i ->
            TopwiseCodec.decode(args.get(i), types[i], generics.getOrNull(i), ctx)
        }
    }

    private val listenerFactory =
        TopwiseCodec.ListenerFactory { iface, callbackId, timeoutMs, fallback ->
            listeners.getOrPut(callbackId) {
                TopwiseGenerated.createListener(iface.name, sink(callbackId, timeoutMs, fallback))
                    ?: throw IllegalArgumentException("no listener stub generated for ${iface.name}")
            }
        }

    /**
     * Bridges a generated binder stub to JS. `notify` is fire-and-forget;
     * `request` blocks this (binder) thread until JS answers or the timeout
     * expires. JS runs on its own thread, so this never deadlocks against the
     * per-module workers.
     */
    private fun sink(callbackId: String, replyTimeoutMs: Long, replyFallback: Long) =
        object : TopwiseCallbackSink {
            override fun notify(method: String, args: JSONArray) = emit(callbackId, method, args, null)

            override fun request(method: String, args: JSONArray): Long {
                val replyId = "$callbackId#${replySeq.incrementAndGet()}"
                val queue = ArrayBlockingQueue<Long>(1)
                pendingReplies[replyId] = queue
                return try {
                    emit(callbackId, method, args, replyId)
                    queue.poll(replyTimeoutMs, TimeUnit.MILLISECONDS) ?: replyFallback
                } catch (_: InterruptedException) {
                    Thread.currentThread().interrupt()
                    replyFallback
                } finally {
                    pendingReplies.remove(replyId)
                }
            }
        }

    private fun emit(callbackId: String, method: String, args: JSONArray, replyId: String?) {
        // Dropped deliberately if JS already released the listener: a binder
        // stub can outlive its registration by one in-flight callback.
        if (!listeners.containsKey(callbackId)) return
        val payload = Arguments.createMap().apply {
            putString("callbackId", callbackId)
            putString("method", method)
            putString("argsJson", args.toString())
            if (replyId != null) putString("replyId", replyId)
        }
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(EVENT, payload)
    }

    // ------------------------------------------------------------ envelopes

    private fun ok(value: Any?, out: JSONObject? = null): String =
        JSONObject().put("ok", true).put("value", value ?: JSONObject.NULL)
            .also { if (out != null) it.put("out", out) }.toString()

    private fun err(code: String, module: String, method: String, message: String): String =
        JSONObject().put("ok", false).put("code", code)
            .put("module", module).put("method", method).put("message", message).toString()

    private fun Throwable?.describe(): String =
        this?.let { "${it.javaClass.simpleName}: ${it.message ?: "(no message)"}" } ?: "unknown failure"

    private fun isKnown(module: String) =
        module == PRINT_TEMPLATE || module == HELPERS || TopwiseGenerated.isKnownModule(module)

    companion object {
        const val NAME = "TopwiseBridge"
        private const val PRINT_TEMPLATE = "printTemplate"
        private const val HELPERS = "helpers"
        const val EVENT = "TopwiseCallback"
        private const val POLL_INTERVAL_MS = 50L
    }
}
