/**
 * Hermes does not implement TextEncoder/TextDecoder, which Effect's internals
 * require. This must be imported before anything that pulls in Effect - which
 * includes the SDK - or the bundle throws at module-load time.
 */
import "text-encoding-polyfill";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
