/**
 * Hermes has no TextEncoder/TextDecoder, which the SDK's internals require.
 * This must come before anything that imports the SDK.
 */
import "text-encoding-polyfill";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
