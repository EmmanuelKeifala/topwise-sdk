# The bridge dispatches to the Topwise AIDL surface reflectively (by method
# name) and reads data carriers field-by-field, so nothing under this package
# may be renamed or stripped.
-keep class com.topwise.cloudpos.** { *; }
-keep interface com.topwise.cloudpos.** { *; }
-keepclassmembers class com.topwise.cloudpos.** { *; }

# Generated binder stubs are only instantiated from a `when` over class names.
-keep class com.slipstream.topwise.TopwiseGenerated { *; }
