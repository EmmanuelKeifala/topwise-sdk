package com.slipstream.topwise

import android.graphics.Bitmap
import android.os.Bundle
import com.topwise.cloudpos.aidl.pinpad.MacParam
import com.topwise.cloudpos.aidl.pinpad.PinParam
import com.topwise.cloudpos.aidl.smallscreen.SmallScreenUtil

/**
 * Behaviour on vendor value classes that a field-by-field mirror cannot carry
 * across, because the work happens in Java.
 *
 * `AidlPinpad.getPin` and `getMac` take a `Bundle`, and the only documented way
 * to build one with the right keys is `PinParam.getParam()` /
 * `MacParam.getParam()` - the key names live in those method bodies. So the
 * parameters cross as data, are rebuilt here, and their `getParam()` result
 * goes back to JS as the Bundle those calls expect.
 */
internal object TopwiseHelpers {

    /** `PinParam.getParam()` - the Bundle `AidlPinpad.getPin` expects. */
    fun pinParamToBundle(param: PinParam): Bundle = param.param

    /** `MacParam.getParam()` - the Bundle `AidlPinpad.getMac` expects. */
    fun macParamToBundle(param: MacParam): Bundle = param.param

    /** `SmallScreenUtil.convertBitmapToStandardFormat` - needs Android bitmap ops. */
    fun convertBitmapToStandardFormat(bitmap: Bitmap, width: Int, height: Int): Bitmap =
        SmallScreenUtil.convertBitmapToStandardFormat(bitmap, width, height)
}
