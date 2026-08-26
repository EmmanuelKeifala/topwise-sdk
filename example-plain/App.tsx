/**
 * Topwise SDK — plain React Native.
 *
 * No Effect anywhere in this file. `createTopwise()` returns a client where
 * every call is a promise and every device callback is a subscription, so this
 * is ordinary async/await React.
 */
import React from "react";
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import {
  createTopwise,
  type TopwiseClient,
  type Unsubscribe,
} from "@slipstream/topwise-sdk/react-native";
import { bytes2HexString, TlvList, type TopwiseError } from "@slipstream/topwise-sdk";

// One client for the app's lifetime: it owns the bridge runtime and the
// registry of live listeners.
const topwise: TopwiseClient = createTopwise();

/** Errors arrive as thrown TopwiseErrors, so this is a plain try/catch shape. */
function describe(error: unknown): string {
  const e = error as Partial<TopwiseError>;
  if (e && typeof e === "object" && "code" in e) {
    return `${e.code} — ${e.message}\n  at ${e.module}.${e.method}`;
  }
  return String(error);
}

export default function App(): React.JSX.Element {
  const [log, setLog] = React.useState<ReadonlyArray<string>>([]);
  const [bound, setBound] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const stopRef = React.useRef<Unsubscribe | null>(null);

  const say = React.useCallback((line: string) => {
    setLog((l) => [`${new Date().toLocaleTimeString()}  ${line}`, ...l].slice(0, 60));
  }, []);

  /** Run an action, reporting whatever it returns or throws. */
  const act = React.useCallback(
    (label: string, fn: () => Promise<unknown>) => async () => {
      setBusy(true);
      say(`▶ ${label}`);
      try {
        const value = await fn();
        say(`✓ ${label}: ${value === undefined ? "ok" : JSON.stringify(value)}`);
      } catch (error) {
        say(`✗ ${label}: ${describe(error)}`);
      } finally {
        setBusy(false);
      }
    },
    [say],
  );

  // Bind once at startup. Every module accessor returns null until this
  // resolves, because the device service binds asynchronously.
  React.useEffect(() => {
    (async () => {
      try {
        await topwise.ready();
        setBound(true);
        say("✓ device service bound");
      } catch (error) {
        say(`✗ bind failed: ${describe(error)}`);
      }
    })();
    return () => {
      stopRef.current?.();
    };
  }, [say]);

  const printReceipt = React.useCallback(async () => {
    await topwise.printTemplate.init();
    // session() takes the shared template buffer, clears it either side, and
    // stops two receipts interleaving into one page.
    const bitmap = await topwise.printTemplate.session(async () => {
      await topwise.printTemplate.addText({
        text: "SLIPSTREAM", fontSize: 30, align: "CENTER", isBold: true,
      });
      await topwise.printTemplate.addText({ text: "plain react native", fontSize: 20, align: "CENTER" });
      await topwise.printTemplate.addText({ text: " " });
      await topwise.printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" });
      await topwise.printTemplate.addColumns2(3, { text: "Total" }, 1, { text: "4.50", align: "RIGHT" });
      await topwise.printTemplate.addText({ text: " " });
      return topwise.printTemplate.getPrintBitmap();
    });

    // A listener call takes a handlers object and hands back an unsubscribe.
    await new Promise<void>((resolve, reject) => {
      const stop = topwise.printer.printBmp(0, 384, 0, bitmap, {
        onEvent: (event) => {
          say(`   printer: ${event._tag}`);
          if (event._tag === "onPrintFinish" || event._tag === "onError") {
            stop();
            event._tag === "onPrintFinish" ? resolve() : reject(new Error("print failed"));
          }
        },
        onError: reject,
      });
    });
    return "printed";
  }, [say]);

  const waitForCard = React.useCallback(() => {
    stopRef.current?.();
    say("▶ waiting for a card (60s) — swipe, insert or tap");
    stopRef.current = topwise.checkCard.checkCard(true, true, true, 60, {
      onEvent: (event) => {
        say(`   card: ${event._tag}`);
        if (event._tag === "onFindMagCard") {
          say(`   PAN: ${event.data?.cardno ?? "(encrypted)"}`);
        }
        if (event._tag !== "onFindMagCard") {
          stopRef.current?.();
          stopRef.current = null;
        }
      },
      onError: (error) => say(`✗ card: ${describe(error)}`),
    });
  }, [say]);

  const actions: ReadonlyArray<readonly [string, () => void]> = [
    ["System info", act("system", async () => {
      const [serialNo, sdkVersion] = await Promise.all([
        topwise.system.getSerialNo(),
        topwise.system.getCurSdkVersion(),
      ]);
      return { serialNo, sdkVersion };
    })],
    ["Printer status", act("printer status", () => topwise.printer.getPrinterState())],
    ["Print receipt", act("print receipt", printReceipt)],
    ["Beep", act("beep", () => topwise.buzzer.beep(0, 200))],
    ["Read a card", waitForCard],
    ["Stop card read", () => { stopRef.current?.(); stopRef.current = null; say("stopped"); }],
    ["Parse TLV (no device)", act("tlv", async () => {
      const tags = TlvList.fromHex("5A08411111111111111182021C00");
      return { pan: bytes2HexString(tags.getValue("5A") ?? new Uint8Array()) };
    })],
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#11161c" />
      <View style={styles.header}>
        <Text style={styles.title}>Topwise · plain RN</Text>
        <Text style={[styles.badge, bound ? styles.badgeOk : styles.badgeBad]}>
          {bound ? "device service bound" : "not bound"}
        </Text>
        <View style={styles.grid}>
          {actions.map(([label, onPress]) => (
            <TouchableOpacity
              key={label}
              onPress={onPress}
              disabled={busy}
              style={[styles.button, busy && styles.buttonBusy]}
            >
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.logBox}>
        {log.map((line, i) => (
          <Text key={`${i}-${line}`} style={styles.logLine}>{line}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0e1318" },
  header: { padding: 16, backgroundColor: "#11161c", borderBottomWidth: 1, borderBottomColor: "#1e262f" },
  title: { color: "#e8edf2", fontSize: 20, fontWeight: "700" },
  badge: { marginTop: 8, padding: 8, borderRadius: 5, fontSize: 13, overflow: "hidden" },
  badgeOk: { backgroundColor: "#16301f", color: "#9ad6ae" },
  badgeBad: { backgroundColor: "#361a17", color: "#e08b82" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  button: { backgroundColor: "#2b6cb0", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 6 },
  buttonBusy: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  logBox: { flex: 1, padding: 12 },
  logLine: { color: "#b7c4d0", fontSize: 12, fontFamily: "monospace", marginBottom: 3 },
});
