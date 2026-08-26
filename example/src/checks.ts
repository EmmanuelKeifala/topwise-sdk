/**
 * One catalogue of checks per device module, written the way any consumer
 * would: nothing here reaches past the package's public entry points.
 *
 * Levels decide what "Run all" is allowed to touch:
 *   read   - queries only; safe to run unattended, and what "Run all" runs
 *   device - does something physical or waits for a person (beep, print, tap a
 *            card). Run these one at a time and watch the terminal.
 *   danger - destructive. Never run automatically; the UI asks first.
 */
import { Effect, Stream } from "effect";
import {
  amex, buzzer, camera, checkCard, cpuCard, decoder, dpas, emvL2, entry, fingerprint,
  helpers, icCard, jcb, keyLoadDown, keyManager, led, magCard, manager, mdbSerialport,
  mir, mqtt, packageManager, palmPrint, paypass, paywave, pedestal,
  pedestalSerialManagerAt, pinpad, printer, printTemplate, psam, pure, qpboc, rfCard,
  rupay, scanner, serialport, serialportAt, shellMonitor, smallScreen, system, tms, triggerStatus,
  TlvList, bytes2HexString, hexString2Bytes,
  type TopwiseBridge,
} from "@slipstream/topwise-sdk";

export type Level = "read" | "device" | "danger";

export interface Check {
  readonly id: string;
  readonly module: string;
  readonly label: string;
  readonly level: Level;
  /** What the user should see or do, when it is not obvious. */
  readonly hint?: string;
  readonly run: Effect.Effect<unknown, unknown, TopwiseBridge>;
}

/** Take at most `n` callbacks from a listener stream, then let the scope close. */
const firstEvents = <A, E>(stream: Stream.Stream<A, E, TopwiseBridge>, n: number) =>
  stream.pipe(Stream.take(n), Stream.runCollect, Effect.map(Array.from));

const check = (
  module: string,
  label: string,
  level: Level,
  run: Effect.Effect<unknown, unknown, TopwiseBridge>,
  hint?: string,
): Check => ({ id: `${module}.${label}`, module, label, level, run, ...(hint ? { hint } : {}) });

// --------------------------------------------------------------------- system

const systemChecks: ReadonlyArray<Check> = [
  check("system", "identity", "read",
    Effect.all({
      serialNo: system.getSerialNo(),
      ksn: system.getKsn(),
      sdkVersion: system.getCurSdkVersion(),
      driverVersion: system.getDriverVersion(),
      storagePath: system.getStoragePath(),
    })),
  check("manager", "expandFunction({})", "read", manager.expandFunction({}),
    "Vendor escape hatch; an error here just means this model has no extension."),
  check("shellMonitor", "hardware serial + recovery flag", "read",
    Effect.all({
      hardwareSN: shellMonitor.getHardwareSNPlaintext(),
      canRecovery: shellMonitor.canRecovery(),
    })),
  check("packageManager", "signing keys + IP whitelist", "read",
    Effect.all({
      ipWhitelist: packageManager.getIpWhitelist(),
      customerKey: packageManager.getCustomerKey(),
    })),
  check("triggerStatus", "tamper state", "read",
    Effect.all({
      triggerStatus: triggerStatus.getTriggerStatus(),
      tamperEnabled: triggerStatus.getTamperEnableState(),
    }),
    "Tamper detection. A non-zero trigger means the case was opened."),
  check("tms", "file list", "read", tms.getTMSFileList()),
];

// ---------------------------------------------------------------- peripherals

const receiptRows = Effect.gen(function* () {
  yield* printTemplate.addText({ text: "TOPWISE SDK", fontSize: 30, align: "CENTER", isBold: true });
  yield* printTemplate.addText({ text: "bring-up check", fontSize: 20, align: "CENTER" });
  yield* printTemplate.addText({ text: " " });
  yield* printTemplate.addColumns2(3, { text: "Item" }, 1, { text: "Amount", align: "RIGHT" });
  yield* printTemplate.addColumns2(3, { text: "Coffee" }, 1, { text: "4.50", align: "RIGHT" });
  yield* printTemplate.addColumns2(3, { text: "Total" }, 1, { text: "4.50", align: "RIGHT" });
  yield* printTemplate.addText({ text: " " });
  return yield* printTemplate.getPrintBitmap();
});

const peripheralChecks: ReadonlyArray<Check> = [
  check("printer", "status", "read",
    Effect.all({
      state: printer.getPrinterState(),
      gray: printer.getPrinterGray(),
      paperState: printer.getPosPrintPaperState(),
      coverOpen: printer.isPosPrinterCoverOpen(),
      message: printer.getPrinterMessage(),
    })),
  check("printTemplate", "render receipt to bitmap", "read",
    Effect.gen(function* () {
      yield* printTemplate.init();
      const bitmap = yield* printTemplate.session(receiptRows);
      return { renderedBase64Bytes: bitmap.base64.length };
    }),
    "Builds the receipt image without using paper."),
  check("printer", "print receipt", "device",
    Effect.gen(function* () {
      yield* printTemplate.init();
      const bitmap = yield* printTemplate.session(receiptRows);
      return yield* firstEvents(printer.printBmp(0, 384, 0, bitmap), 1);
    }),
    "Uses paper. Expect onPrintFinish."),
  check("printer", "print text lines", "device",
    firstEvents(
      printer.printText([
        { text: "printText() line 1", fontSize: 24, align: "CENTER" },
        { text: "printText() line 2", fontSize: 20, align: "LEFT" },
        { text: " " },
      ]),
      1,
    ),
    "Uses paper."),
  check("buzzer", "beep 200ms", "device", buzzer.beep(0, 200), "You should hear it."),
  check("led", "marquee pixel count", "read", led.getMarqueeMaxPixels()),
  check("led", "blink LED 1", "device",
    Effect.gen(function* () {
      yield* led.setLed(1, true);
      yield* Effect.sleep("600 millis");
      return yield* led.setLed(1, false);
    }),
    "Watch the status LEDs."),
  check("smallScreen", "size + brightness", "read",
    Effect.all({
      size: smallScreen.getSmallScreenSize(),
      brightness: smallScreen.getSmallScreenBrightness(),
    }),
    "Only meaningful on a two-screen model."),
  check("smallScreen", "display text", "device",
    smallScreen.displayText("TOPWISE SDK", "TEXT_SIZE_NORMAL", "TEXT_DISPLAY_MODE_UP_CENTER"),
    "Look at the customer-facing screen."),
  check("pedestal", "coupled + serial ports", "read",
    Effect.gen(function* () {
      const coupled = yield* pedestal.isCoupled();
      if (!coupled) return { coupled, note: "no pedestal attached" };
      const mgr = yield* pedestal.getSerialManager();
      const ports = yield* pedestalSerialManagerAt(mgr).enumSerialports();
      return {
        coupled,
        handle: mgr.__handle,
        count: yield* pedestalSerialManagerAt(mgr).getCount(),
        ports,
        firstPortOpened: ports.length > 0
          ? yield* Effect.gen(function* () {
              const port = yield* pedestalSerialManagerAt(mgr).getSerialport(ports[0]!);
              const opened = yield* serialportAt(port).open();
              yield* serialportAt(port).close();
              return opened;
            })
          : null,
      };
    }),
    "Exercises the IBinder handle chain."),
];

// -------------------------------------------------------------- card readers

const cardChecks: ReadonlyArray<Check> = [
  check("checkCard", "wait for any card (30s)", "device",
    firstEvents(checkCard.checkCard(true, true, true, 30), 1),
    "Swipe, insert or tap a card."),
  check("magCard", "open / close", "read",
    Effect.gen(function* () {
      const opened = yield* magCard.open();
      return { opened, closed: yield* magCard.close() };
    })),
  check("magCard", "swipe a card (20s)", "device",
    firstEvents(magCard.searchCard(20), 1), "Swipe a magstripe card."),
  check("icCard", "open / present / close", "read",
    Effect.gen(function* () {
      const opened = yield* icCard.open();
      const present = yield* icCard.isExist();
      return { opened, present, closed: yield* icCard.close() };
    })),
  check("icCard", "reset inserted card (ATR)", "device",
    Effect.gen(function* () {
      yield* icCard.open();
      const atr = yield* icCard.reset(0);
      yield* icCard.close();
      return { atr: bytes2HexString(atr) };
    }),
    "Insert a chip card first."),
  check("rfCard", "open / present / type", "read",
    Effect.gen(function* () {
      const opened = yield* rfCard.open();
      const present = yield* rfCard.isExist();
      const cardType = present ? yield* rfCard.getCardType() : -1;
      return { opened, present, cardType, closed: yield* rfCard.close() };
    })),
  check("psam", "slot 0 open / reset / close", "read",
    Effect.gen(function* () {
      const slot = psam(0);
      const opened = yield* slot.open();
      if (!opened) return { opened, note: "no PSAM in slot 0" };
      const atr = yield* slot.reset(0);
      return { opened, atr: bytes2HexString(atr), closed: yield* slot.close() };
    })),
  check("cpuCard", "open slot 0", "device",
    Effect.gen(function* () {
      const status = yield* cpuCard.open(0);
      yield* cpuCard.close();
      return { status };
    }),
    "Needs a memory card in the slot."),
];

// -------------------------------------------------------------- EMV kernels

/** Every L2 kernel exposes the same shape; keep the checks uniform. */
const kernelInit = (
  name: string,
  initialize: Effect.Effect<unknown, unknown, TopwiseBridge>,
): Check => check(name, "initialize", "read", initialize, "Kernel present and responding.");

const emvChecks: ReadonlyArray<Check> = [
  check("emvL2", "kernel type + terminal info", "read",
    Effect.all({
      kernelType: emvL2.EMV_GetKernelType(),
      terminalInfo: emvL2.EMV_GetTerminalInfo(),
    })),
  check("emvL2", "kernel config", "read", emvL2.EMV_GetKernelConfig()),
  kernelInit("amex", amex.initialize()),
  kernelInit("dpas", dpas.initialize()),
  kernelInit("jcb", jcb.initialize()),
  kernelInit("mir", mir.initialize()),
  kernelInit("paywave", paywave.initialize()),
  kernelInit("pure", pure.initialize()),
  kernelInit("rupay", rupay.initialize()),
  check("entry", "initialize + error code", "read",
    Effect.all({ initialize: entry.initialize(), errorCode: entry.getErrorCode() })),
  check("paypass", "readData", "device", paypass.readData(),
    "Expects a contactless card in field; a non-zero status without one is normal."),
  check("qpboc", "readData", "device", qpboc.readData(),
    "Expects a contactless card in field; a non-zero status without one is normal."),
];

// ------------------------------------------------------------------- security

const securityChecks: ReadonlyArray<Check> = [
  check("pinpad", "slot 0 random + keypad layout", "read",
    Effect.all({
      random: pinpad(0).getRandom().pipe(Effect.map(bytes2HexString)),
      buttonNum: pinpad(0).getButtonNum().pipe(Effect.map(bytes2HexString)),
    })),
  check("helpers", "build a getPin bundle from PinParam", "read",
    helpers.pinParamToBundle({
      keyIndex: 1, pinType: 0, keyType: 1, panBlock: "0000000000000000",
      timeOut: 60, keyMinLength: 4, keyMaxLength: 12,
    }),
    "Proves PinParam.getParam() crosses; does not open the PIN pad."),
  check("keyManager", "TMK slot 1 status", "read", keyManager.getKeyStatus("KEY_TYPE_TMK", 1)),
  check("keyManager", "random via out-parameter", "read",
    keyManager.getRandom(8, {}).pipe(
      Effect.map(({ result, out }) => ({
        status: result,
        random: bytes2HexString(out.resultBytesTypeValue.data ?? new Uint8Array()),
      })),
    ),
    "The payload arrives through a mutated argument, not the return value."),
  check("keyLoadDown", "self test", "read", keyLoadDown.testRandom()),
];

// ---------------------------------------------------------------- scan & bio

const scanChecks: ReadonlyArray<Check> = [
  check("scanner", "init / exit", "read",
    Effect.gen(function* () {
      const status = yield* scanner.init();
      yield* scanner.exit();
      return { status };
    })),
  check("decoder", "init / exit", "read",
    Effect.gen(function* () {
      const status = yield* decoder.init();
      yield* decoder.exit();
      return { status };
    })),
  check("camera", "decode library version", "read", camera.getDecodeLibVersion()),
  check("camera", "scan a barcode (30s)", "device",
    firstEvents(camera.scanCode({ timeout: 30 }), 1), "Point the camera at a barcode."),
  check("fingerprint", "open / close", "read",
    Effect.gen(function* () {
      const opened = yield* fingerprint.open();
      return { opened, closed: yield* fingerprint.close() };
    })),
  check("palmPrint", "device state + enrolled ids", "read",
    Effect.all({
      opened: palmPrint.isDeviceOpened(),
      ids: palmPrint.getIdList(),
    })),
];

// ------------------------------------------------------------------ comms

const commsChecks: ReadonlyArray<Check> = [
  check("serialport", "slot 0 open / close", "read",
    Effect.gen(function* () {
      const port = serialport(0);
      const opened = yield* port.open();
      return { opened, closed: yield* port.close() };
    })),
  check("mdbSerialport", "slot 0 status", "read", mdbSerialport(0).getMdbStatus()),
  check("mqtt", "disconnect (idempotent)", "read", mqtt.disconnect()),
];

// -------------------------------------------------------- pure, no hardware

const pureChecks: ReadonlyArray<Check> = [
  check("bytes", "hex + BER-TLV round trip", "read",
    Effect.sync(() => {
      const hex = "5A08411111111111111182021C009F360200FF";
      const tags = TlvList.fromHex(hex);
      return {
        parsed: tags.list().map((t) => `${t.tag}(${t.length})`),
        pan: bytes2HexString(tags.getValue("5A") ?? new Uint8Array()),
        roundTrips: tags.toHex() === hex,
        hexRoundTrips: bytes2HexString(hexString2Bytes("9F2608")) === "9F2608",
      };
    }),
    "Runs in JS - no bridge, no device."),
];

export const CHECKS: ReadonlyArray<Check> = [
  ...systemChecks,
  ...peripheralChecks,
  ...cardChecks,
  ...emvChecks,
  ...securityChecks,
  ...scanChecks,
  ...commsChecks,
  ...pureChecks,
];

/** Distinct module names covered, for the header count. */
export const MODULES: ReadonlyArray<string> = [...new Set(CHECKS.map((c) => c.module))].sort();
