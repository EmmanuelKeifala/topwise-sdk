// Subpath shim so `@slipstream/topwise-sdk/react-native` resolves even when the
// bundler has package `exports` support turned off - Metro only enables it by
// default from React Native 0.79.
export * from "./dist/react-native.js";
