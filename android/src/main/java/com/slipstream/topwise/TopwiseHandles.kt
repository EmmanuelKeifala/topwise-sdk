package com.slipstream.topwise

import android.os.IBinder
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

/**
 * Registry for AIDL interfaces that are handed back as a raw `IBinder` rather
 * than as data (`AidlPedestal.getSerialManager`, and the `AidlSerialport` it
 * in turn hands out).
 *
 * The binder stays in this process; JS gets an opaque id and passes it back as
 * the call target. Binders are keyed by identity, so asking for the same one
 * twice yields the same handle and the table does not grow with call volume.
 */
internal object TopwiseHandles {

    private val ids = ConcurrentHashMap<IBinder, String>()
    private val binders = ConcurrentHashMap<String, IBinder>()
    /** Cached `Stub.asInterface(binder)` results, keyed by handle id. */
    private val interfaces = ConcurrentHashMap<String, Any>()
    private val seq = AtomicLong()

    /** Handle ids are "@"-prefixed so they can never collide with a module name. */
    fun idFor(binder: IBinder): String = ids.getOrPut(binder) {
        val id = "@h${seq.incrementAndGet()}"
        binders[id] = binder
        id
    }

    fun descriptorOf(binder: IBinder): String =
        runCatching { binder.interfaceDescriptor }.getOrNull() ?: ""

    fun isHandle(target: String): Boolean = target.startsWith("@")

    fun binderFor(id: String): IBinder? = binders[id]

    /**
     * Resolve a handle to something reflection can invoke, via the AIDL
     * interface descriptor the binder reports at runtime:
     * `com.foo.AidlX` -> `com.foo.AidlX$Stub.asInterface(binder)`.
     */
    fun resolve(id: String): Any? {
        interfaces[id]?.let { return it }
        val binder = binders[id] ?: return null
        val descriptor = descriptorOf(binder)
        if (descriptor.isEmpty()) return null
        val iface = runCatching {
            Class.forName("$descriptor\$Stub")
                .getMethod("asInterface", IBinder::class.java)
                .invoke(null, binder)
        }.getOrNull() ?: return null
        interfaces[id] = iface
        return iface
    }

    fun release(id: String) {
        binders.remove(id)?.let { ids.remove(it) }
        interfaces.remove(id)
    }
}
