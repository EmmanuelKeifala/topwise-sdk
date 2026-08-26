# Contributing

## Getting the vendor SDK

This repository does not contain the Topwise SDK — it is Topwise's proprietary
property. Get the vendor drop from them and place it as:

```
T1&T3&T6 SDK20250215/
  SDK Jar/T1_V2_<date>.jar          # the AIDL client jar
  SDK Manual/TopUsdkService-Doc-*.zip   # javadoc, optional but worth having
android/libs/T1_V2_<date>.jar       # same jar, shipped inside the AAR
```

Only the jar is required. The javadoc is optional: without it the generated
bindings lose their doc comments and real parameter names, and fall back to
`arg0`-style names.

## Layout

| Path | |
| --- | --- |
| `scripts/extract-api.mjs` | jar + javadoc → `api.json` (needs a JDK for `javap`) |
| `scripts/generate.mjs` | `api.json` → TS bindings + Kotlin dispatch |
| `src/*.ts` | hand-written runtime: bridge, codec, bytes/TLV, print template |
| `src/generated/` | generated — do not edit |
| `android/…/Topwise*.kt` | the native bridge; `TopwiseGenerated.kt` is generated |
| `example/` | bring-up app that exercises every module |

`api.json` and everything under `src/generated/` are committed on purpose:
they let the package build, typecheck and test without the vendor jar present.

## Working on it

```sh
npm install
npm run typecheck
npm test
```

After dropping in a new vendor jar:

```sh
npm run codegen          # rewrites api.json, src/generated/*, TopwiseGenerated.kt
npm run typecheck && npm test
git diff api.json        # shows exactly what the vendor changed
```

## Changing the generator, not the output

Generated files are regenerated wholesale. Fix `scripts/generate.mjs` and
re-run `npm run codegen`; a hand edit under `src/generated/` will be lost.

## Testing on a terminal

`example/README.md` covers building and installing the bring-up app. Test
changes to the Kotlin bridge there — the TypeScript test suite runs against a
fake native bridge and cannot catch a Kotlin compile error or a binder issue.
