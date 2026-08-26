package com.slipstream.topwise

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Typeface
import com.topwise.cloudpos.aidl.printer.ImageUnit
import com.topwise.cloudpos.aidl.printer.PrintTemplate
import com.topwise.cloudpos.aidl.printer.TextUnit

/**
 * Hand-written mirror of `com.topwise.cloudpos.aidl.printer.PrintTemplate`,
 * the receipt layout builder: rows go in, a bitmap comes out, and that bitmap
 * is what `printer.printBmp` puts on paper.
 *
 * It cannot be generated for two reasons. It holds an Android `Context` and a
 * `LinearLayout`, so it is a native-side object rather than data. And its six
 * `add` overloads are distinguished only by argument *type* - `add(TextUnit)`
 * and `add(ImageUnit)` are both arity one - which reflective dispatch cannot
 * tell apart from JSON. They are given distinct names here so the mapping is
 * unambiguous in both directions.
 *
 * `PrintTemplate` is a process-wide singleton, so the row buffer is shared.
 * The TypeScript side serialises whole receipts through `printTemplate.session`.
 */
internal class TopwisePrintTemplate(private val context: Context) {

    private val template: PrintTemplate get() = PrintTemplate.getInstance()

    /** `PrintTemplate.init(Context)` */
    fun init() = template.init(context)

    /** `PrintTemplate.init(Context, Typeface)` */
    fun initWithTypeface(typeface: Typeface) = template.init(context, typeface)

    /** `PrintTemplate.setTypeface(Typeface)` */
    fun setTypeface(typeface: Typeface) = template.setTypeface(typeface)

    /** `PrintTemplate.getStrokeWidth()` */
    fun getStrokeWidth(): Float = template.strokeWidth

    /** `PrintTemplate.setStrokeWidth(float)` */
    fun setStrokeWidth(width: Float) {
        template.strokeWidth = width
    }

    /** `PrintTemplate.setIncludePad(boolean)` */
    fun setIncludePad(includePad: Boolean) = template.setIncludePad(includePad)

    /** `PrintTemplate.add(TextUnit)` - one full-width row. */
    fun addText(text: TextUnit) = template.add(text)

    /** `PrintTemplate.add(int, TextUnit, int, TextUnit)` - two weighted columns. */
    fun addColumns2(weight1: Int, text1: TextUnit, weight2: Int, text2: TextUnit) =
        template.add(weight1, text1, weight2, text2)

    /** `PrintTemplate.add(int, TextUnit, int, TextUnit, int, TextUnit)` - three columns. */
    fun addColumns3(
        weight1: Int, text1: TextUnit,
        weight2: Int, text2: TextUnit,
        weight3: Int, text3: TextUnit,
    ) = template.add(weight1, text1, weight2, text2, weight3, text3)

    /** `PrintTemplate.add(ImageUnit)` */
    fun addImage(image: ImageUnit) = template.add(image)

    /** `PrintTemplate.add(List<TextUnit>, ImageUnit)` - text block beside an image. */
    fun addTextsThenImage(texts: MutableList<TextUnit>, image: ImageUnit) =
        template.add(texts, image)

    /** `PrintTemplate.add(ImageUnit, List<TextUnit>)` - image beside a text block. */
    fun addImageThenTexts(image: ImageUnit, texts: MutableList<TextUnit>) =
        template.add(image, texts)

    /** `PrintTemplate.getPrintBitmap()` - render the rows added so far. */
    fun getPrintBitmap(): Bitmap = template.printBitmap

    /** `PrintTemplate.clear()` - drop every row. */
    fun clear() = template.clear()
}
