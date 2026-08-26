# packageManager

`com.topwise.cloudpos.aidl.pm.AidlPM`

20 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`silentInstallKeepUserdata`](#silentinstallkeepuserdata) · [`systemUpdate`](#systemupdate) · [`silentUninstall`](#silentuninstall) · [`setDefaultLauncher`](#setdefaultlauncher) · [`checkUseFunctionPermission`](#checkusefunctionpermission) · [`setFactoryKey`](#setfactorykey) · [`setEnhancedKey`](#setenhancedkey) · [`setCustomerKey`](#setcustomerkey) · [`getFactoryKey`](#getfactorykey) · [`getEnhancedKey`](#getenhancedkey) · [`getCustomerKey`](#getcustomerkey) · [`installCACertificate`](#installcacertificate) · [`enableUninstallApp`](#enableuninstallapp) · [`getAppSignature`](#getappsignature) · [`smartUpdateApp`](#smartupdateapp) · [`enableIpWhitelist`](#enableipwhitelist) · [`addIpToIpWhitelist`](#addiptoipwhitelist) · [`deleteIpFromIpWhitelist`](#deleteipfromipwhitelist) · [`getIpWhitelist`](#getipwhitelist) · [`setCanDrawOverlay`](#setcandrawoverlay)

---

### `silentInstallKeepUserdata`

Install apk without not notify user and keep userdata. If return true, install application success (Install application is a time-consuming operation. It cannot be executed in the UI thread.)

```ts
packageManager.silentInstallKeepUserdata(appPath: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.silentInstallKeepUserdata(appPath: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `appPath` | `string` | is apk path. appPath is not empty. |

**Returns** — bool result; 0:Success | 1:Not success

---

### `systemUpdate`

Install system updates

```ts
packageManager.systemUpdate(packagePath: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.systemUpdate(packagePath: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packagePath` | `string` | is system upgrade package path. packagePath is not empty. |

**Returns** — bool result; 0:Success | 1:Not success

---

### `silentUninstall`

Uninstall apk without not notify user. If return true, uninstall application success (Uninstall application is a time-consuming operation. It cannot be executed in the UI thread.)

```ts
packageManager.silentUninstall(packageName: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.silentUninstall(packageName: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | is application package name. packageName is not empty. |

**Returns** — bool result; 0:Success | 1:Not success

---

### `setDefaultLauncher`

Set Default Launcher

```ts
packageManager.setDefaultLauncher(packageName: string, className: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.setDefaultLauncher(packageName: string, className: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | is launcher's package name, packageName or className is not empty. If packageName and className are both null, set Launcher2 is default launcher. |
| `className` | `string` | is launcher's class name. |

**Returns** — bool result; 0:Success | 1:Not success

---

### `checkUseFunctionPermission`

check Use Function Permission

```ts
packageManager.checkUseFunctionPermission(appPackageName: string, functionName: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.checkUseFunctionPermission(appPackageName: string, functionName: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `appPackageName` | `string` | is app packageName |
| `functionName` | `string` | is function name. |

**Returns** — bool result; true:allow | false:prohibit

---

### `setFactoryKey`

set Factory Key

```ts
packageManager.setFactoryKey(useFucAppPackageName: string, keyPath: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.setFactoryKey(useFucAppPackageName: string, keyPath: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `useFucAppPackageName` | `string` | Ues Fuc App Package Name |
| `keyPath` | `string` | is key path |

**Returns** — int result; 0:success | other:fail

---

### `setEnhancedKey`

set Enhanced Key

```ts
packageManager.setEnhancedKey(useFucAppPackageName: string, keyPath: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.setEnhancedKey(useFucAppPackageName: string, keyPath: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `useFucAppPackageName` | `string` | Ues Fuc App Package Name |
| `keyPath` | `string` | is key path |

**Returns** — int result; 0:success | other:fail

---

### `setCustomerKey`

set Customer Key

```ts
packageManager.setCustomerKey(useFucAppPackageName: string, keyPath: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.setCustomerKey(useFucAppPackageName: string, keyPath: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `useFucAppPackageName` | `string` | Ues Fuc App Package Name |
| `keyPath` | `string` | is key path |

**Returns** — int result; 0:success | other:fail

---

### `getFactoryKey`

get Factory Key

```ts
packageManager.getFactoryKey(): Effect<CertificateInfo, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.getFactoryKey(): CertificateInfo
```

**Returns** — X509Certificate result;

---

### `getEnhancedKey`

get Enhanced Key

```ts
packageManager.getEnhancedKey(): Effect<CertificateInfo, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.getEnhancedKey(): CertificateInfo
```

**Returns** — X509Certificate result;

---

### `getCustomerKey`

get Customer Key

```ts
packageManager.getCustomerKey(): Effect<CertificateInfo, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.getCustomerKey(): CertificateInfo
```

**Returns** — X509Certificate result;

---

### `installCACertificate`

Install System CA certificate

```ts
packageManager.installCACertificate(cerPath: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.installCACertificate(cerPath: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cerPath` | `string` | Path to the certificate (e.g.: "/sdcard/4bb9877f.0""). |

---

### `enableUninstallApp`

Set all app can uninstall by UI opt or not

```ts
packageManager.enableUninstallApp(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.enableUninstallApp(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | if enabled is true, apps can uninstall by UI opt, if false, apps can not uninstall by UI opt,true is default value. |

---

### `getAppSignature`

get the signature of the app

```ts
packageManager.getAppSignature(packageName: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.getAppSignature(packageName: string): number
```

| Parameter | Type |
| --- | --- |
| `packageName` | `string` |

**Returns** — the signature of the app;

---

### `smartUpdateApp`

App smart update

```ts
packageManager.smartUpdateApp(packageName: string, appPatch: string, oldApkMD5: string, newApkMD5: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.smartUpdateApp(packageName: string, appPatch: string, oldApkMD5: string, newApkMD5: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | Upgraded APK package name |
| `appPatch` | `string` | Apk patch path with the suffix. patch |
| `oldApkMD5` | `string` | old APK md5 value |
| `newApkMD5` | `string` | New APK md5 value |

**Returns** — InstallFailErrorCode error code

---

### `enableIpWhitelist`

Enable or disable IP whitelist function

```ts
packageManager.enableIpWhitelist(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.enableIpWhitelist(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | if enabled is true, enable IP whitelist function; if enabled is false, disable IP whitelist function |

---

### `addIpToIpWhitelist`

Add IP to IP Whitelist

```ts
packageManager.addIpToIpWhitelist(ip: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.addIpToIpWhitelist(ip: string): void
```

| Parameter | Type |
| --- | --- |
| `ip` | `string` |

---

### `deleteIpFromIpWhitelist`

delete IP From IP Whitelist

```ts
packageManager.deleteIpFromIpWhitelist(ip: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.deleteIpFromIpWhitelist(ip: string): void
```

| Parameter | Type |
| --- | --- |
| `ip` | `string` |

---

### `getIpWhitelist`

get all IPs from the IP whitelist

```ts
packageManager.getIpWhitelist(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.getIpWhitelist(): string
```

**Returns** — all IP on the whitelist, separated by commas

---

### `setCanDrawOverlay`

```ts
packageManager.setCanDrawOverlay(packageName: string, newState: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.packageManager.setCanDrawOverlay(packageName: string, newState: boolean): void
```

| Parameter | Type |
| --- | --- |
| `packageName` | `string` |
| `newState` | `boolean` |

