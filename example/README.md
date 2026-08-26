# Topwise SDK bring-up app

A React Native app that exercises **all 41 device modules** through
`@slipstream/topwise-sdk` — 51 checks, tap to run, results and errors on screen.

It consumes the package the way any other app would: only the public entry
points, `@slipstream/topwise-sdk` and `@slipstream/topwise-sdk/react-native`. Nothing
here reaches into the package internals, so if this app builds and runs, a
third-party integration will too.

## What's in here

| | |
| --- | --- |
| `App.tsx` | the UI — module list, run/clear, per-check result |
| `src/checks.ts` | the catalogue: one or more checks per module |
| `src/format.ts` | result rendering (bytes as hex, bitmaps as a size) |

Checks are graded, and **Run all read-only** only ever runs the first grade:

- **read** — queries only. Safe unattended. Serial, so a failure points at one peripheral.
- **device** — physical or interactive: beeps, prints, waits for a card or a barcode. Run these one at a time and watch the terminal.
- **danger** — destructive. The UI asks first and never runs them automatically.

## Setup

Needs Node 18+, JDK 17, the Android SDK, and the terminal in developer mode
with USB debugging on.

```sh
# 1. React Native app shell (this repo holds only the app source)
npx @react-native-community/cli@latest init TopwiseBringUp --version 0.76.5

# 2. Drop this app in
cp -r example/App.tsx example/index.js example/app.json example/src TopwiseBringUp/
cd TopwiseBringUp

# 3. Install the SDK and Effect
npm run --prefix .. build && npm pack --prefix ..     # or install from your registry
npm install ../slipstream-topwise-sdk-0.1.0.tgz effect
```

`effect` is here because this example's own code imports it; `example-plain`
does not need it.

That's it — React Native autolinking finds the package's `android/` module and
registers `TopwisePackage` for you. There is no `MainApplication.kt` edit, and
the `CLOUDPOS_*` permissions merge in from the library manifest.

```sh
# 4. Build and run on the connected terminal
npx react-native run-android
```

## Reading the results

The banner at the top shows the bind state. `ready()` is called once on start;
tap the banner to retry. Everything else is greyed out until it binds, because
`DeviceServiceManager` binds asynchronously and every module accessor returns
null until it does.

A check that fails with `NOT_BOUND` means the service never bound. A check that
fails with a non-zero *status* — most Topwise calls report business failure
in-band as an `int` — succeeded at the bridge level; read the number against
the `Constants.AidlErrorCode*` tables.

Several `device` checks are expected to fail without the matching hardware:
`paypass.readData` with no card in field, `psam` with an empty slot, the
pedestal checks with nothing docked. Their hints say so.

## Reading a run over adb

Every check mirrors its result to logcat, so a full run can be read without
touching the screen:

```sh
adb logcat -c
adb shell am start -n com.topwisebringup/.MainActivity
# tap "Run all read-only", then:
adb logcat -d | grep -oE 'TOPWISE (PASS|FAIL) .*'
```

A real run on a T2N (Android 11, service 2.1.73) gives 18 pass / 21 fail, where
every failure is `MODULE_UNAVAILABLE` for a peripheral that unit does not expose
to an unauthorised app. Passing checks return real telemetry — printer mileage
2920, temperature 34, voltage 3806; a 10.8 KB receipt bitmap; tamper state.

## If it doesn't bind

1. **`NOT_BOUND` on everything** — the bind itself failed. On Android 11+ the
   usual cause is package visibility; the library manifest declares the
   `<queries>` entry for `com.android.topwise.topusdkservice`, so check it
   survived manifest merge. Confirm the service exists:
   `adb shell pm list packages | grep topusdkservice`.
2. **`MODULE_UNAVAILABLE` on the secure peripherals** — the service is bound
   and other modules work, but pinpad / key manager / EMV kernels return null.
   These are commonly restricted to vendor-signed or whitelisted apps. Get the
   signing certificate whitelisted by the vendor.
3. **`Native module "TopwiseBridge" is not linked`** — autolinking did not run,
   or Metro was reloaded instead of rebuilt. Native changes need a real build.
4. **`NO_SUCH_METHOD`** — the terminal's service predates the jar. The error
   names the method.

## While iterating on the SDK

`file:` tarball installs are pinned by integrity hash in `package-lock.json`, so
rebuilding the SDK is not enough — npm will happily reinstall the old one:

```sh
npm run build && npm pack                    # in the SDK repo
rm -rf node_modules/@slipstream package-lock.json && npm install   # in the app
```

Then restart Metro with `npx react-native start --reset-cache`.
