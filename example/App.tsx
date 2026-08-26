/**
 * Topwise SDK bring-up app.
 *
 * Consumes @slipstream/topwise-sdk exactly as any other app would - only its
 * public entry points, nothing reaching into the package internals.
 */
import React from "react";
import {
  ActivityIndicator, Alert, SafeAreaView, ScrollView, SectionList, StatusBar,
  StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { Cause, Effect, ManagedRuntime, Option } from "effect";
import { TopwiseBridgeLive } from "@slipstream/topwise-sdk/react-native";
import { ready } from "@slipstream/topwise-sdk";

import { CHECKS, MODULES, type Check, type Level } from "./src/checks";
import { formatError, formatValue } from "./src/format";

/** One runtime for the whole app; the bridge binds once and stays bound. */
const runtime = ManagedRuntime.make(TopwiseBridgeLive);

type Status = "idle" | "running" | "ok" | "failed";
interface Result {
  readonly status: Status;
  readonly text?: string;
  readonly ms?: number;
}

const LEVEL_COLOR: Record<Level, string> = {
  read: "#3f7f4f",
  device: "#8a6d1f",
  danger: "#a4342b",
};

export default function App(): React.JSX.Element {
  const [bind, setBind] = React.useState<Status>("idle");
  const [bindText, setBindText] = React.useState("not bound");
  const [results, setResults] = React.useState<Record<string, Result>>({});
  const [busy, setBusy] = React.useState(false);

  const bindService = React.useCallback(async () => {
    setBind("running");
    setBindText("binding…");
    const exit = await runtime.runPromiseExit(ready(8000));
    if (exit._tag === "Success") {
      setBind("ok");
      setBindText("device service bound");
    } else {
      setBind("failed");
      setBindText(
        Option.match(Cause.failureOption(exit.cause), {
          onSome: formatError,
          onNone: () => Cause.pretty(exit.cause),
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    void bindService();
  }, [bindService]);

  const runCheck = React.useCallback(async (item: Check) => {
    setResults((r) => ({ ...r, [item.id]: { status: "running" } }));
    const started = Date.now();
    // Every check is scoped: listener streams and kernel handlers unregister
    // as soon as the check finishes.
    const exit = await runtime.runPromiseExit(Effect.scoped(item.run));
    const ms = Date.now() - started;
    // Exit carries a Cause, not the error: unwrap the expected failure so the
    // message is the TopwiseError, and fall back to a pretty-printed Cause for
    // defects and interruptions.
    const text =
      exit._tag === "Success"
        ? formatValue(exit.value)
        : Option.match(Cause.failureOption(exit.cause), {
            onSome: formatError,
            onNone: () => Cause.pretty(exit.cause),
          });
    // Mirror every result to logcat so a run can be read over adb:
    //   adb logcat -s ReactNativeJS:V | grep TOPWISE
    console.log(
      `TOPWISE ${exit._tag === "Success" ? "PASS" : "FAIL"} ${item.id} (${ms}ms) :: ` +
        text.replace(/\n/g, " | "),
    );
    setResults((r) => ({
      ...r,
      [item.id]:
        exit._tag === "Success" ? { status: "ok", text, ms } : { status: "failed", text, ms },
    }));
  }, []);

  const confirmAndRun = React.useCallback(
    (item: Check) => {
      if (item.level !== "danger") {
        void runCheck(item);
        return;
      }
      Alert.alert("Destructive check", `${item.module}.${item.label} changes the terminal. Continue?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Run", style: "destructive", onPress: () => void runCheck(item) },
      ]);
    },
    [runCheck],
  );

  const runAllRead = React.useCallback(async () => {
    setBusy(true);
    // Serially: two peripherals driven at once tells you nothing about which
    // one misbehaved.
    for (const item of CHECKS.filter((c) => c.level === "read")) {
      await runCheck(item);
    }
    setBusy(false);
  }, [runCheck]);

  const sections = React.useMemo(
    () =>
      MODULES.map((module) => ({
        title: module,
        data: CHECKS.filter((c) => c.module === module),
      })),
    [],
  );

  const tally = React.useMemo(() => {
    const values = Object.values(results);
    return {
      ok: values.filter((r) => r.status === "ok").length,
      failed: values.filter((r) => r.status === "failed").length,
    };
  }, [results]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#11161c" />
      <View style={styles.header}>
        <Text style={styles.title}>Topwise SDK</Text>
        <Text style={styles.subtitle}>
          {MODULES.length} modules · {CHECKS.length} checks
        </Text>
        <TouchableOpacity onPress={bindService} style={[styles.bind, styles[`bind_${bind}`]]}>
          <Text style={styles.bindText}>{bindText}</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={runAllRead}
            disabled={busy}
            style={[styles.button, busy && styles.buttonDisabled]}
          >
            {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Run all read-only</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setResults({})} style={[styles.button, styles.buttonGhost]}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tally}>
          {tally.ok} passed · {tally.failed} failed
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => {
          const result = results[item.id];
          return (
            <TouchableOpacity style={styles.row} onPress={() => confirmAndRun(item)}>
              <View style={styles.rowHead}>
                <View style={[styles.dot, { backgroundColor: dotColor(result?.status) }]} />
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={[styles.level, { color: LEVEL_COLOR[item.level] }]}>{item.level}</Text>
                {result?.ms !== undefined && <Text style={styles.ms}>{result.ms}ms</Text>}
              </View>
              {item.hint !== undefined && <Text style={styles.hint}>{item.hint}</Text>}
              {result?.status === "running" && <Text style={styles.running}>running…</Text>}
              {result?.text !== undefined && (
                <ScrollView horizontal style={styles.resultBox}>
                  <Text style={[styles.result, result.status === "failed" && styles.resultFailed]}>
                    {result.text}
                  </Text>
                </ScrollView>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

function dotColor(status: Status | undefined): string {
  switch (status) {
    case "ok": return "#3f9f5f";
    case "failed": return "#c4453a";
    case "running": return "#c8a020";
    default: return "#39424d";
  }
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0e1318" },
  header: { padding: 16, backgroundColor: "#11161c", borderBottomWidth: 1, borderBottomColor: "#1e262f" },
  title: { color: "#e8edf2", fontSize: 22, fontWeight: "700" },
  subtitle: { color: "#7c8794", fontSize: 13, marginTop: 2 },
  bind: { marginTop: 12, padding: 10, borderRadius: 6, backgroundColor: "#1b2430" },
  bind_idle: { backgroundColor: "#1b2430" },
  bind_running: { backgroundColor: "#3a3416" },
  bind_ok: { backgroundColor: "#16301f" },
  bind_failed: { backgroundColor: "#361a17" },
  bindText: { color: "#d6dee6", fontSize: 13 },
  actions: { flexDirection: "row", gap: 8, marginTop: 12 },
  button: { flex: 1, backgroundColor: "#2b6cb0", paddingVertical: 11, borderRadius: 6, alignItems: "center" },
  buttonGhost: { flex: 0, paddingHorizontal: 18, backgroundColor: "#2a323c" },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "600" },
  tally: { color: "#7c8794", fontSize: 12, marginTop: 10 },
  sectionHeader: {
    color: "#9fb0c0", backgroundColor: "#161c24", paddingHorizontal: 16, paddingVertical: 6,
    fontSize: 12, fontWeight: "700", letterSpacing: 0.6, textTransform: "uppercase",
  },
  row: { paddingHorizontal: 16, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: "#161c24" },
  rowHead: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  rowLabel: { color: "#dfe6ed", fontSize: 15, flex: 1 },
  level: { fontSize: 11, fontWeight: "700" },
  ms: { color: "#5e6a77", fontSize: 11 },
  hint: { color: "#6f7d8b", fontSize: 12, marginTop: 3, marginLeft: 17 },
  running: { color: "#c8a020", fontSize: 12, marginTop: 6, marginLeft: 17 },
  resultBox: { marginTop: 8, marginLeft: 17, backgroundColor: "#121820", borderRadius: 5, padding: 9 },
  result: { color: "#b7c4d0", fontSize: 12, fontFamily: "monospace" },
  resultFailed: { color: "#e08b82" },
});
