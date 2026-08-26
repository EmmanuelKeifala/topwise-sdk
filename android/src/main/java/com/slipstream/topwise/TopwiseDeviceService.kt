package com.slipstream.topwise

import com.topwise.cloudpos.aidl.AidlDeviceService
import com.topwise.cloudpos.service.DeviceServiceManager

/**
 * Reaches the root `AidlDeviceService` that `DeviceServiceManager` holds but
 * does not expose.
 *
 * A handful of interfaces - the tamper/trigger status and the barcode scanner
 * - have no `DeviceServiceManager` getter and are only obtainable from the
 * root service. The manager keeps it in a private field, so it is read
 * reflectively once and cached.
 */
internal object TopwiseDeviceService {

    private val field by lazy {
        runCatching {
            DeviceServiceManager::class.java.getDeclaredField("mDeviceService")
                .apply { isAccessible = true }
        }.getOrNull()
    }

    fun get(): AidlDeviceService? =
        runCatching { field?.get(DeviceServiceManager.getInstance()) as? AidlDeviceService }.getOrNull()
}
