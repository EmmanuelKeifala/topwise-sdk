package com.slipstream.topwise

import android.content.ComponentName
import android.content.ContentValues
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Rect
import android.graphics.Typeface
import android.os.Bundle
import android.os.IBinder
import android.os.ParcelFileDescriptor
import android.util.ArrayMap
import android.util.Base64
import android.util.SparseArray
import android.util.SparseBooleanArray
import android.util.SparseIntArray
import android.view.KeyEvent
import java.io.Closeable
import java.io.File
import java.math.BigDecimal
import java.math.BigInteger
import java.security.cert.X509Certificate
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.lang.reflect.Field
import java.lang.reflect.Modifier
import java.lang.reflect.ParameterizedType
import java.lang.reflect.Type

/**
 * Converts between the JSON the TS layer speaks and the Java values the AIDL
 * interfaces expect.
 *
 * Arguments are coerced against the *declared* parameter type, which is what
 * makes the wire format able to stay plain JSON: a `String` and a base64
 * `byte[]` look alike on the wire but never at the same position. Only values
 * JSON has no representation for are tagged, and they are tagged the same way
 * in both directions:
 *
 *   byte[]  <->  { "__b64": "..." }
 *   Bitmap  <->  { "__bmp": "<base64 PNG>" }
 *   listener ->  { "__cb": "<callback id>" }
 */
internal object TopwiseCodec {

    // ------------------------------------------------------------------ encode

    /** Java value -> JSON-safe value (primitives, String, JSONObject, JSONArray). */
    fun encode(value: Any?): Any {
        if (value == null) return JSONObject.NULL
        return when (value) {
            is Boolean, is Int, is Long, is Short, is Byte, is Double, is Float, is String ->
                if (value is Short || value is Byte) (value as Number).toInt() else value
            is Char -> value.toString()
            is ByteArray -> JSONObject().put("__b64", Base64.encodeToString(value, Base64.NO_WRAP))
            is Bitmap -> JSONObject().put("__bmp", encodeBitmap(value))
            is Enum<*> -> value.name
            is IntArray -> JSONArray().also { a -> value.forEach { a.put(it) } }
            is LongArray -> JSONArray().also { a -> value.forEach { a.put(it) } }
            is ShortArray -> JSONArray().also { a -> value.forEach { a.put(it.toInt()) } }
            is BooleanArray -> JSONArray().also { a -> value.forEach { a.put(it) } }
            is DoubleArray -> JSONArray().also { a -> value.forEach { a.put(it) } }
            is FloatArray -> JSONArray().also { a -> value.forEach { a.put(it.toDouble()) } }
            is Array<*> -> JSONArray().also { a -> value.forEach { a.put(encode(it)) } }
            is Collection<*> -> JSONArray().also { a -> value.forEach { a.put(encode(it)) } }
            is Map<*, *> -> JSONObject().also { o ->
                value.forEach { (k, v) -> o.put(k.toString(), encode(v)) }
            }
            is Bundle -> JSONObject().also { o ->
                @Suppress("DEPRECATION")
                value.keySet().forEach { k -> o.put(k, encode(value.get(k))) }
            }
            // An interface handed back as a binder stays here; JS gets a token.
            is IBinder -> JSONObject()
                .put("__handle", TopwiseHandles.idFor(value))
                .put("iface", TopwiseHandles.descriptorOf(value))
            // Exact by contract: certificate serials and money outrun a double.
            is BigDecimal, is BigInteger -> value.toString()
            is X509Certificate -> encodeCertificate(value)
            is SparseIntArray -> JSONObject().also { o ->
                for (i in 0 until value.size()) o.put(value.keyAt(i).toString(), value.valueAt(i))
            }
            is SparseBooleanArray -> JSONObject().also { o ->
                for (i in 0 until value.size()) o.put(value.keyAt(i).toString(), value.valueAt(i))
            }
            is SparseArray<*> -> JSONObject().also { o ->
                for (i in 0 until value.size()) o.put(value.keyAt(i).toString(), encode(value.valueAt(i)))
            }
            is ContentValues -> JSONObject().also { o ->
                for (key in value.keySet()) o.put(key, encode(value.get(key)))
            }
            is ComponentName -> JSONObject()
                .put("packageName", value.packageName)
                .put("className", value.className)
            is Rect -> JSONObject()
                .put("left", value.left).put("top", value.top)
                .put("right", value.right).put("bottom", value.bottom)
            is KeyEvent -> JSONObject()
                .put("action", value.action).put("keyCode", value.keyCode)
                .put("scanCode", value.scanCode).put("metaState", value.metaState)
                .put("repeatCount", value.repeatCount).put("flags", value.flags)
                .put("deviceId", value.deviceId).put("source", value.source)
                .put("downTime", value.downTime).put("eventTime", value.eventTime)
            // A Typeface is a loaded font with no serialisable identity. It is
            // input-only in this SDK; encoding its native pointer would be junk.
            is Typeface -> JSONObject.NULL
            else -> encodeUsageStats(value) ?: encodeObject(value)
        }
    }

    private val ISO = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US)
        .also { it.timeZone = TimeZone.getTimeZone("UTC") }

    private fun encodeCertificate(cert: X509Certificate): JSONObject = JSONObject()
        .put("der", encode(cert.encoded))
        .put("subject", cert.subjectDN?.name ?: "")
        .put("issuer", cert.issuerDN?.name ?: "")
        .put("serialNumber", cert.serialNumber?.toString() ?: "")
        .put("notBefore", synchronized(ISO) { ISO.format(cert.notBefore) })
        .put("notAfter", synchronized(ISO) { ISO.format(cert.notAfter) })

    /**
     * `android.app.usage.UsageStats` is not on the compile classpath of every
     * consumer and has no public constructor, so it is read reflectively by
     * accessor rather than by field.
     */
    private fun encodeUsageStats(value: Any): JSONObject? {
        if (value.javaClass.name != "android.app.usage.UsageStats") return null
        fun call(name: String): Any? = runCatching {
            value.javaClass.getMethod(name).invoke(value)
        }.getOrNull()
        return JSONObject()
            .put("packageName", call("getPackageName") ?: "")
            .put("firstTimeStamp", call("getFirstTimeStamp") ?: 0L)
            .put("lastTimeStamp", call("getLastTimeStamp") ?: 0L)
            .put("lastTimeUsed", call("getLastTimeUsed") ?: 0L)
            .put("totalTimeInForeground", call("getTotalTimeInForeground") ?: 0L)
    }

    private fun encodeBitmap(bitmap: Bitmap): String {
        val out = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
        return Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP)
    }

    /**
     * Data carriers cross as their instance fields, which is exactly the shape
     * the generated TS interfaces declare (they are generated from the same
     * fields), so encode and decode stay symmetric without a schema.
     */
    private fun encodeObject(value: Any): JSONObject {
        val json = JSONObject()
        for (field in instanceFields(value.javaClass)) {
            json.put(field.name, encode(runCatching { field.get(value) }.getOrNull()))
        }
        return json
    }

    private fun instanceFields(cls: Class<*>): List<Field> {
        val out = ArrayList<Field>()
        var c: Class<*>? = cls
        while (c != null && c != Any::class.java) {
            for (f in c.declaredFields) {
                if (Modifier.isStatic(f.modifiers) || f.isSynthetic) continue
                if (f.name == "CREATOR" || f.name.startsWith("$")) continue
                f.isAccessible = true
                out.add(f)
            }
            c = c.superclass
        }
        return out
    }

    // ------------------------------------------------------------------ decode

    /**
     * Per-call decode state: how to mint binder stubs for listener slots, and
     * the descriptors opened for this call that must be closed after it.
     */
    internal class DecodeContext(val listeners: ListenerFactory) {
        val cleanup = ArrayList<Closeable>()
        /**
         * Arguments the Java side fills in rather than reads - the key manager
         * and key-injection APIs return their payload through one of these
         * rather than as a return value. Recorded on the way in so the call can
         * hand the mutated object back to JS afterwards.
         */
        val outArgs = LinkedHashMap<Int, Any>()
        fun close() = cleanup.forEach { runCatching { it.close() } }
    }

    /** Types the vendor uses purely as output holders. */
    private val OUT_HOLDERS = setOf(
        "com.topwise.cloudpos.aidl.keymanager.BytesTypeValue",
        "com.topwise.cloudpos.aidl.keymanager.IntArrayTypeValue",
        "com.topwise.cloudpos.aidl.keymanager.AsyKeyPairType",
    )

    fun isOutHolder(cls: Class<*>): Boolean = cls.name in OUT_HOLDERS

    /** JSON value -> an instance of [target], honouring [generic] for collections. */
    fun decode(value: Any?, target: Class<*>, generic: Type?, ctx: DecodeContext): Any? {
        val v = if (value === JSONObject.NULL) null else value

        // Listener slot: `{ "__cb": id }` becomes a live binder stub. Callbacks
        // the caller blocks on carry their timeout and fallback alongside.
        if (v is JSONObject && v.has("__cb")) {
            return ctx.listeners.create(
                target,
                v.getString("__cb"),
                v.optLong("replyTimeoutMs", 30_000L),
                v.optLong("replyFallback", 0L),
            ) ?: throw IllegalArgumentException("no listener stub generated for ${target.name}")
        }

        // A handle JS got back from an earlier call, passed in again.
        if (v is JSONObject && v.has("__handle")) {
            val id = v.getString("__handle")
            return if (target == IBinder::class.java) TopwiseHandles.binderFor(id)
            else TopwiseHandles.resolve(id)
                ?: throw IllegalArgumentException("handle $id is no longer live")
        }

        if (v == null) {
            return when {
                target == Boolean::class.javaPrimitiveType -> false
                target.isPrimitive -> 0.toPrimitive(target)
                else -> null
            }
        }

        return when {
            target == String::class.java -> v.toString()
            target == Boolean::class.javaPrimitiveType || target == java.lang.Boolean::class.java ->
                v as? Boolean ?: v.toString().toBoolean()
            target == Char::class.javaPrimitiveType || target == java.lang.Character::class.java ->
                v.toString().first()
            target.isPrimitive || Number::class.java.isAssignableFrom(target) ->
                (v as? Number ?: v.toString().toDouble()).toPrimitive(target)
            target == BigDecimal::class.java -> BigDecimal(v.toString())
            target == BigInteger::class.java -> BigInteger(v.toString())
            target == ByteArray::class.java -> decodeBytes(v)
            target == Bitmap::class.java -> decodeBytes(v).let { BitmapFactory.decodeByteArray(it, 0, it.size) }
            target.isEnum -> decodeEnum(v, target)
            target == Bundle::class.java -> decodeBundle(v as JSONObject, ctx)
            target == ContentValues::class.java -> decodeContentValues(v as JSONObject)
            target == ComponentName::class.java -> (v as JSONObject).let {
                ComponentName(it.getString("packageName"), it.getString("className"))
            }
            target == Rect::class.java -> (v as JSONObject).let {
                Rect(it.optInt("left"), it.optInt("top"), it.optInt("right"), it.optInt("bottom"))
            }
            target == Typeface::class.java -> decodeTypeface(v as JSONObject)
            target == KeyEvent::class.java -> decodeKeyEvent(v as JSONObject)
            target == ParcelFileDescriptor::class.java -> decodeFileRef(v as JSONObject, ctx)
            target == SparseIntArray::class.java -> (v as JSONObject).let { o ->
                SparseIntArray().also { a -> for (k in o.keys()) a.put(k.toInt(), o.getInt(k)) }
            }
            target == SparseBooleanArray::class.java -> (v as JSONObject).let { o ->
                SparseBooleanArray().also { a -> for (k in o.keys()) a.put(k.toInt(), o.getBoolean(k)) }
            }
            target == SparseArray::class.java -> (v as JSONObject).let { o ->
                SparseArray<Any?>().also { a ->
                    for (k in o.keys()) a.put(k.toInt(), decode(o.get(k), Any::class.java, null, ctx))
                }
            }
            target.isArray -> decodeArray(v as JSONArray, target, ctx)
            MutableList::class.java.isAssignableFrom(target) || target == List::class.java ->
                decodeList(v as JSONArray, generic, ctx)
            ArrayMap::class.java.isAssignableFrom(target) -> ArrayMap<String, Any?>().also { m ->
                m.putAll(decodeMap(v as JSONObject, generic, ctx))
            }
            Map::class.java.isAssignableFrom(target) -> decodeMap(v as JSONObject, generic, ctx)
            target == Any::class.java -> v
            else -> decodeObject(v as JSONObject, target, ctx)
        }
    }

    private fun decodeBytes(v: Any): ByteArray = when {
        v is JSONObject && v.has("__b64") -> Base64.decode(v.getString("__b64"), Base64.DEFAULT)
        v is JSONObject && v.has("__bmp") -> Base64.decode(v.getString("__bmp"), Base64.DEFAULT)
        v is JSONObject && v.has("der") -> decodeBytes(v.get("der"))
        v is JSONArray -> ByteArray(v.length()) { v.getInt(it).toByte() }
        else -> Base64.decode(v.toString(), Base64.DEFAULT)
    }

    @Suppress("UNCHECKED_CAST")
    private fun decodeEnum(v: Any, target: Class<*>): Any {
        val name = v.toString()
        val constants = target.enumConstants as Array<out Enum<*>>
        return constants.firstOrNull { it.name == name }
            ?: throw IllegalArgumentException("$name is not a ${target.simpleName}; expected one of ${constants.joinToString { it.name }}")
    }

    private fun decodeContentValues(o: JSONObject): ContentValues {
        val cv = ContentValues()
        for (key in o.keys()) {
            when (val v = o.get(key)) {
                JSONObject.NULL -> cv.putNull(key)
                is Boolean -> cv.put(key, v)
                is Int -> cv.put(key, v)
                is Long -> cv.put(key, v)
                is Double -> cv.put(key, v)
                is JSONObject -> if (v.has("__b64")) cv.put(key, decodeBytes(v)) else cv.put(key, v.toString())
                else -> cv.put(key, v.toString())
            }
        }
        return cv
    }

    /** A Typeface crosses as a request to load one, not as the font itself. */
    private fun decodeTypeface(o: JSONObject): Typeface {
        val style = o.optInt("style", Typeface.NORMAL)
        o.optString("path").takeIf { it.isNotEmpty() }?.let {
            return Typeface.create(Typeface.createFromFile(it), style)
        }
        val family = o.optString("family").takeIf { it.isNotEmpty() }
        return Typeface.create(family, style)
    }

    private fun decodeKeyEvent(o: JSONObject): KeyEvent = KeyEvent(
        o.optLong("downTime"),
        o.optLong("eventTime"),
        o.optInt("action"),
        o.optInt("keyCode"),
        o.optInt("repeatCount"),
        o.optInt("metaState"),
        o.optInt("deviceId"),
        o.optInt("scanCode"),
        o.optInt("flags"),
        o.optInt("source"),
    )

    /**
     * A file descriptor cannot cross into JS, so a path does. The descriptor
     * this opens is closed by [DecodeContext.close] once the call returns.
     */
    private fun decodeFileRef(o: JSONObject, ctx: DecodeContext): ParcelFileDescriptor {
        val path = o.optString("path")
        require(path.isNotEmpty()) { "FileRef needs a path" }
        val mode = when (o.optString("mode", "r")) {
            "w" -> ParcelFileDescriptor.MODE_WRITE_ONLY or ParcelFileDescriptor.MODE_CREATE
            "rw" -> ParcelFileDescriptor.MODE_READ_WRITE or ParcelFileDescriptor.MODE_CREATE
            else -> ParcelFileDescriptor.MODE_READ_ONLY
        }
        return ParcelFileDescriptor.open(File(path), mode).also { ctx.cleanup.add(it) }
    }

    private fun decodeBundle(o: JSONObject, ctx: DecodeContext): Bundle {
        val bundle = Bundle()
        for (key in o.keys()) {
            when (val v = o.get(key)) {
                is String -> bundle.putString(key, v)
                is Int -> bundle.putInt(key, v)
                is Long -> bundle.putLong(key, v)
                is Double -> bundle.putDouble(key, v)
                is Boolean -> bundle.putBoolean(key, v)
                is JSONObject -> if (v.has("__b64")) bundle.putByteArray(key, decodeBytes(v))
                                 else bundle.putBundle(key, decodeBundle(v, ctx))
                is JSONArray -> bundle.putStringArray(key, Array(v.length()) { v.get(it).toString() })
                else -> {}
            }
        }
        return bundle
    }

    private fun decodeArray(a: JSONArray, target: Class<*>, ctx: DecodeContext): Any {
        val comp = target.componentType!!
        val out = java.lang.reflect.Array.newInstance(comp, a.length())
        for (i in 0 until a.length()) {
            java.lang.reflect.Array.set(out, i, decode(a.get(i), comp, null, ctx))
        }
        return out
    }

    private fun decodeList(a: JSONArray, generic: Type?, ctx: DecodeContext): MutableList<Any?> {
        val elem = (generic as? ParameterizedType)?.actualTypeArguments?.firstOrNull() as? Class<*>
            ?: Any::class.java
        return MutableList(a.length()) { decode(a.get(it), elem, null, ctx) }
    }

    private fun decodeMap(o: JSONObject, generic: Type?, ctx: DecodeContext): MutableMap<String, Any?> {
        val valueType = (generic as? ParameterizedType)?.actualTypeArguments?.getOrNull(1) as? Class<*>
            ?: Any::class.java
        val out = HashMap<String, Any?>()
        for (key in o.keys()) out[key] = decode(o.get(key), valueType, null, ctx)
        return out
    }

    /** Instantiate a data carrier and populate its instance fields. */
    private fun decodeObject(o: JSONObject, target: Class<*>, ctx: DecodeContext): Any {
        val instance = instantiate(target)
        val fields = instanceFields(target).associateBy { it.name }
        for (key in o.keys()) {
            val field = fields[key] ?: continue
            val decoded = decode(o.get(key), field.type, field.genericType, ctx)
            runCatching { field.set(instance, decoded) }
        }
        return instance
    }

    /**
     * Prefer the no-arg constructor; several carriers (PinParam, MacParam) only
     * expose a populated one, so fall back to the shortest constructor filled
     * with zero values - every field is overwritten from JSON immediately after.
     */
    private fun instantiate(target: Class<*>): Any {
        target.declaredConstructors
            .firstOrNull { it.parameterTypes.isEmpty() }
            ?.let { it.isAccessible = true; return it.newInstance() }
        val ctor = target.declaredConstructors.minByOrNull { it.parameterTypes.size }
            ?: throw IllegalArgumentException("${target.name} has no usable constructor")
        ctor.isAccessible = true
        return ctor.newInstance(*ctor.parameterTypes.map { zeroValue(it) }.toTypedArray())
    }

    private fun zeroValue(cls: Class<*>): Any? = when {
        cls == Boolean::class.javaPrimitiveType -> false
        cls == Char::class.javaPrimitiveType -> ' '
        cls.isPrimitive -> 0.toPrimitive(cls)
        else -> null
    }

    private fun Number.toPrimitive(target: Class<*>): Any = when (target) {
        Int::class.javaPrimitiveType, Integer::class.java -> toInt()
        Long::class.javaPrimitiveType, java.lang.Long::class.java -> toLong()
        Short::class.javaPrimitiveType, java.lang.Short::class.java -> toShort()
        Byte::class.javaPrimitiveType, java.lang.Byte::class.java -> toByte()
        Double::class.javaPrimitiveType, java.lang.Double::class.java -> toDouble()
        Float::class.javaPrimitiveType, java.lang.Float::class.java -> toFloat()
        else -> toInt()
    }

    /** Supplies binder stubs for listener parameters. */
    internal fun interface ListenerFactory {
        fun create(iface: Class<*>, callbackId: String, replyTimeoutMs: Long, replyFallback: Long): Any?
    }
}
