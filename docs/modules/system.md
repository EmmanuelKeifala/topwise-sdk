# system

`com.topwise.cloudpos.aidl.system.AidlSystem`

188 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getSerialNo`](#getserialno) · [`installApp`](#installapp) · [`uninstallApp`](#uninstallapp) · [`getKsn`](#getksn) · [`getDriverVersion`](#getdriverversion) · [`getCurSdkVersion`](#getcursdkversion) · [`getPinServiceVersion`](#getpinserviceversion) · [`updateSysTime`](#updatesystime) · [`getStoragePath`](#getstoragepath) · [`update`](#update) · [`getIMSI`](#getimsi) · [`getIMEI`](#getimei) · [`getHardWireVersion`](#gethardwireversion) · [`getSecurityDriverVersion`](#getsecuritydriverversion) · [`getManufacture`](#getmanufacture) · [`getModel`](#getmodel) · [`getAndroidOsVersion`](#getandroidosversion) · [`getRomVersion`](#getromversion) · [`getAndroidKernelVersion`](#getandroidkernelversion) · [`reboot`](#reboot) · [`getICCID`](#geticcid) · [`getLKLOSSpecsVersion`](#getlklosspecsversion) · [`updateFirmware`](#updatefirmware) · [`getUpdateFirmwareState`](#getupdatefirmwarestate) · [`setAPN`](#setapn) · [`getAPNList`](#getapnlist) · [`selectAPN`](#selectapn) · [`deleteAPN`](#deleteapn) · [`enableHomeButton`](#enablehomebutton) · [`enablePowerButton`](#enablepowerbutton) · [`enableDropDownMenu`](#enabledropdownmenu) · [`enableRecentAppButton`](#enablerecentappbutton) · [`setDefaultSimCardForCellularData`](#setdefaultsimcardforcellulardata) · [`setAPNExt`](#setapnext) · [`getAPNListExt`](#getapnlistext) · [`enableBackButton`](#enablebackbutton) · [`getIMSIExt`](#getimsiext) · [`getIMEIExt`](#getimeiext) · [`apnRestore`](#apnrestore) · [`screenBrightnessSet`](#screenbrightnessset) · [`locationEnable`](#locationenable) · [`screenTimeOutSet`](#screentimeoutset) · [`bootAnimationSet`](#bootanimationset) · [`doubleTapButtonActionSet`](#doubletapbuttonactionset) · [`longTapButtonActionSet`](#longtapbuttonactionset) · [`fileManagerEnable`](#filemanagerenable) · [`systemConfigurationMenuVisibilitySet`](#systemconfigurationmenuvisibilityset) · [`clearUserData`](#clearuserdata) · [`passwordSet`](#passwordset) · [`daydreamEnable`](#daydreamenable) · [`daydreamActiveSet`](#daydreamactiveset) · [`daydreamModeSet`](#daydreammodeset) · [`preferredTTSEngineSet`](#preferredttsengineset) · [`setDeviceSerialNumber`](#setdeviceserialnumber) · [`adbEnable`](#adbenable) · [`factoryTestAppEnable`](#factorytestappenable) · [`systemReset`](#systemreset) · [`checkStatus`](#checkstatus) · [`ussdMessagesEnabled`](#ussdmessagesenabled) · [`appErrorDialogEnabled`](#apperrordialogenabled) · [`batteryPercentEnabled`](#batterypercentenabled) · [`apnSet`](#apnset) · [`getICCIDExt`](#geticcidext) · [`isShowNvBar`](#isshownvbar) · [`setAirplaneMode`](#setairplanemode) · [`getDisplayDensityDpi`](#getdisplaydensitydpi) · [`setDisplayDensityDpi`](#setdisplaydensitydpi) · [`isMobileDataEnabled`](#ismobiledataenabled) · [`setMobileDataEnabled`](#setmobiledataenabled) · [`shutDownDevice`](#shutdowndevice) · [`set24HourRebootTime`](#set24hourreboottime) · [`get24HourRebootTime`](#get24hourreboottime) · [`setCameraDisabled`](#setcameradisabled) · [`getCameraDisabled`](#getcameradisabled) · [`setTamperScreen`](#settamperscreen) · [`enableWifi`](#enablewifi) · [`enableWifiPassWord`](#enablewifipassword) · [`setScreenLock`](#setscreenlock) · [`enabledRescueParty`](#enabledrescueparty) · [`setTethering`](#settethering) · [`enabledAppPowerSave`](#enabledapppowersave) · [`autoCheckCard`](#autocheckcard) · [`getBatteryLevel`](#getbatterylevel) · [`enabledCameraDoubleTapPower`](#enabledcameradoubletappower) · [`setLockScreenCameraVisibility`](#setlockscreencameravisibility) · [`forgetAllWiFi`](#forgetallwifi) · [`enabledApp`](#enabledapp) · [`setBootLogo`](#setbootlogo) · [`setPosKeyListener`](#setposkeylistener) · [`setPrivateAdbKey`](#setprivateadbkey) · [`adbLogEnabled`](#adblogenabled) · [`apnUpdate`](#apnupdate) · [`rebootModem`](#rebootmodem) · [`updateFirmwareSP`](#updatefirmwaresp) · [`showAppIconInLauncher3`](#showappiconinlauncher3) · [`caNotificationEnable`](#canotificationenable) · [`installCACertificate`](#installcacertificate) · [`uninstallCustomerCACertificate`](#uninstallcustomercacertificate) · [`getCustomerSN`](#getcustomersn) · [`setCustomerSN`](#setcustomersn) · [`talkbackEnable`](#talkbackenable) · [`enablePhysicalKeyboardBacklight`](#enablephysicalkeyboardbacklight) · [`configLongpressPhysicalKeyAction`](#configlongpressphysicalkeyaction) · [`enablePressPhysicalKeySound`](#enablepressphysicalkeysound) · [`getLastPressPhysicalKey`](#getlastpressphysicalkey) · [`getProcStat`](#getprocstat) · [`setCleanKeyBehavior`](#setcleankeybehavior) · [`clearLastPressPhysicalKey`](#clearlastpressphysicalkey) · [`setPhysicalKeySoundFrequency`](#setphysicalkeysoundfrequency) · [`setPhysicalKeySoundDuration`](#setphysicalkeysoundduration) · [`setAdbMode`](#setadbmode) · [`SystemPropertiesSet`](#systempropertiesset) · [`SystemPropertiesGet`](#systempropertiesget) · [`appPermissionEnabled`](#apppermissionenabled) · [`enabledDonotDisturbMode`](#enableddonotdisturbmode) · [`showClockInStatusbarRight`](#showclockinstatusbarright) · [`getBatteryUsage`](#getbatteryusage) · [`autoTimeZoneEnable`](#autotimezoneenable) · [`setProvidedTime`](#setprovidedtime) · [`setTimeZone`](#settimezone) · [`removeAllWIFIInfo`](#removeallwifiinfo) · [`clearSdcard`](#clearsdcard) · [`apnGetConnectedId`](#apngetconnectedid) · [`simCardEnabled`](#simcardenabled) · [`enableMobileDataAlwaysOn`](#enablemobiledataalwayson) · [`enableBluetooth`](#enablebluetooth) · [`writeCustomLog`](#writecustomlog) · [`enableUninstallApp`](#enableuninstallapp) · [`setDrawOverlay`](#setdrawoverlay) · [`setClipboardOverlayEnable`](#setclipboardoverlayenable) · [`getDeviceEfusePublicKey`](#getdeviceefusepublickey) · [`getProcessID`](#getprocessid) · [`getCPUUsage`](#getcpuusage) · [`setbootTime`](#setboottime) · [`setShutdownTime`](#setshutdowntime) · [`configureGlobalProxy`](#configureglobalproxy) · [`setWakeScreenForDoubleTap`](#setwakescreenfordoubletap) · [`setWakeScreenForGesture`](#setwakescreenforgesture) · [`getPCIVersion`](#getpciversion) · [`getIFMVersion`](#getifmversion) · [`getPCDVersion`](#getpcdversion) · [`getEmvLibVersion`](#getemvlibversion) · [`showToast`](#showtoast) · [`getTransitionAnimationScale`](#gettransitionanimationscale) · [`setTransitionAnimationScale`](#settransitionanimationscale) · [`screenBrightnessPercentSet`](#screenbrightnesspercentset) · [`checkBindTopUsdkService`](#checkbindtopusdkservice) · [`setDeviceOwner`](#setdeviceowner) · [`darkThemeEnabled`](#darkthemeenabled) · [`getRandomizedWifiMacAddress`](#getrandomizedwifimacaddress) · [`getPressPhysicalKeySound`](#getpressphysicalkeysound) · [`roamingEnabled`](#roamingenabled) · [`getCoinBatteryVoltage`](#getcoinbatteryvoltage) · [`setSystemWakeupSrc`](#setsystemwakeupsrc) · [`setOTGMode`](#setotgmode) · [`removeDeviceOwner`](#removedeviceowner) · [`setPreferredNetworkType`](#setpreferrednetworktype) · [`setTamperScreenEx`](#settamperscreenex) · [`isAppForeground`](#isappforeground) · [`useOfSDCards`](#useofsdcards) · [`blockHomeButtonEffect`](#blockhomebuttoneffect) · [`setVisibleClock`](#setvisibleclock) · [`hideLauncher3`](#hidelauncher3) · [`setDefaultLanguage`](#setdefaultlanguage) · [`queryAppUsageStats`](#queryappusagestats) · [`getUndeletableAppList`](#getundeletableapplist) · [`getBatteryUsageOfEachApp`](#getbatteryusageofeachapp) · [`switchDeviceEnable`](#switchdeviceenable) · [`enableStorageFullNotification`](#enablestoragefullnotification) · [`radioPowerEnabled`](#radiopowerenabled) · [`orderIconsOfStatusBar`](#ordericonsofstatusbar) · [`isMenuKeyEnabled`](#ismenukeyenabled) · [`isBackKeyEnabled`](#isbackkeyenabled) · [`isHomeKeyEnabled`](#ishomekeyenabled) · [`autoCheckMSR`](#autocheckmsr) · [`writeUsageStats`](#writeusagestats) · [`setWifiMacAddress`](#setwifimacaddress) · [`checkWifiMacAddress`](#checkwifimacaddress) · [`enableBluetoothDevices`](#enablebluetoothdevices) · [`settingsPutString`](#settingsputstring) · [`enableKioskMode`](#enablekioskmode) · [`enableKioskPassword`](#enablekioskpassword) · [`enableOtgExtvbus`](#enableotgextvbus) · [`checkOTGPulledDown`](#checkotgpulleddown) · [`checkPrinterExists`](#checkprinterexists) · [`startKioskLockTaskMode`](#startkiosklocktaskmode) · [`stopSystemLockTaskMode`](#stopsystemlocktaskmode) · [`enablePowerButtonTimeOut`](#enablepowerbuttontimeout)

---

### `getSerialNo`

get serial number

```ts
system.getSerialNo(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getSerialNo(): string
```

**Returns** — serial number

---

### `installApp`

> **Deprecated** by the vendor.

```ts
system.installApp(filePath: string)
  : Stream<InstallAppObserverEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.system.installApp(filePath: string, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `filePath` | `string` |

**Events** — [`InstallAppObserverEvent`](../events.md#installappobserverevent).

---

### `uninstallApp`

> **Deprecated** by the vendor.

```ts
system.uninstallApp(packageName: string)
  : Stream<UninstallAppObserverEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.system.uninstallApp(packageName: string, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `packageName` | `string` |

**Events** — [`UninstallAppObserverEvent`](../events.md#uninstallappobserverevent).

---

### `getKsn`

get KSN

```ts
system.getKsn(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getKsn(): string
```

**Returns** — KSN

---

### `getDriverVersion`

get driver version

```ts
system.getDriverVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getDriverVersion(): string
```

**Returns** — driver version

---

### `getCurSdkVersion`

get current sdk version

```ts
system.getCurSdkVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getCurSdkVersion(): string
```

**Returns** — current sdk version

---

### `getPinServiceVersion`

get pinpad service version

```ts
system.getPinServiceVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getPinServiceVersion(): string
```

**Returns** — pinpad service version

---

### `updateSysTime`

update system time

```ts
system.updateSysTime(dateStr: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.updateSysTime(dateStr: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `dateStr` | `string` | datetime |

**Returns** — true:success,false:failed

---

### `getStoragePath`

> **Deprecated** by the vendor.

```ts
system.getStoragePath(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getStoragePath(): string
```

---

### `update`

> **Deprecated** by the vendor.

```ts
system.update(updateType: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.update(updateType: number): void
```

| Parameter | Type |
| --- | --- |
| `updateType` | `number` |

---

### `getIMSI`

get the unique subscriber ID

```ts
system.getIMSI(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getIMSI(): string
```

**Returns** — Returns the unique subscriber ID, for example, the IMSI for a GSM phone. Return null if it is unavailable.

---

### `getIMEI`

get the unique device ID

```ts
system.getIMEI(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getIMEI(): string
```

**Returns** — Returns the unique device ID, for example, the IMEI for GSM and the MEID or ESN for CDMA phones. Return null if device ID is not available.

---

### `getHardWireVersion`

get system hardWire version

```ts
system.getHardWireVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getHardWireVersion(): string
```

**Returns** — hardWire version

---

### `getSecurityDriverVersion`

get driver version

```ts
system.getSecurityDriverVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getSecurityDriverVersion(): string
```

**Returns** — driver version

---

### `getManufacture`

get the manufacturer of the product/hardware

```ts
system.getManufacture(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getManufacture(): string
```

**Returns** — manufacturer of the product/hardware

---

### `getModel`

get name for the end product.

```ts
system.getModel(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getModel(): string
```

**Returns** — name for the end product

---

### `getAndroidOsVersion`

get Android Os Version

```ts
system.getAndroidOsVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getAndroidOsVersion(): string
```

**Returns** — Android Os Version

---

### `getRomVersion`

get rom version

```ts
system.getRomVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getRomVersion(): string
```

**Returns** — rom version

---

### `getAndroidKernelVersion`

get version string. E.g., "1.0" or "3.4b5"

```ts
system.getAndroidKernelVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getAndroidKernelVersion(): string
```

**Returns** — version string

---

### `reboot`

reboot the device

```ts
system.reboot(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.reboot(): void
```

---

### `getICCID`

get the serial number of the SIM

```ts
system.getICCID(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getICCID(): string
```

**Returns** — Returns the serial number of the SIM, if applicable. Return null if it is unavailable

---

### `getLKLOSSpecsVersion`

> **Deprecated** by the vendor.

```ts
system.getLKLOSSpecsVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getLKLOSSpecsVersion(): string
```

---

### `updateFirmware`

> **Deprecated** by the vendor.

```ts
system.updateFirmware(updateType: number, packageName: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.updateFirmware(updateType: number, packageName: string): string
```

| Parameter | Type |
| --- | --- |
| `updateType` | `number` |
| `packageName` | `string` |

---

### `getUpdateFirmwareState`

> **Deprecated** by the vendor.

```ts
system.getUpdateFirmwareState(updateId: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getUpdateFirmwareState(updateId: string): number
```

| Parameter | Type |
| --- | --- |
| `updateId` | `string` |

---

### `setAPN`

set APN

```ts
system.setAPN(name: string, apn: string, userName: string, password: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setAPN(name: string, apn: string, userName: string, password: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `name` | `string` | apn name |
| `apn` | `string` | apn |
| `userName` | `string` | apn user name |
| `password` | `string` | apn user pass word |

**Returns** — true success;false failed.

---

### `getAPNList`

get apn list

```ts
system.getAPNList(): Effect<ReadonlyArray<ApnInfo>, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getAPNList(): ReadonlyArray<ApnInfo>
```

**Returns** — apn list

---

### `selectAPN`

select apn

```ts
system.selectAPN(key: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.selectAPN(key: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `key` | `string` | select apn key |

**Returns** — true success;false failed.

---

### `deleteAPN`

delete apn

```ts
system.deleteAPN(key: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.deleteAPN(key: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `key` | `string` | delete apn key |

**Returns** — true success;false failed.

---

### `enableHomeButton`

disable home button

```ts
system.enableHomeButton(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableHomeButton(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true : disable false : enable |

**Returns** — true:success false : fail

---

### `enablePowerButton`

disable power button

```ts
system.enablePowerButton(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enablePowerButton(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true : disable false : enable |

**Returns** — true:success false:fail

---

### `enableDropDownMenu`

disable dropdown menu

```ts
system.enableDropDownMenu(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableDropDownMenu(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true : disable false enable |

**Returns** — true:success false fail

---

### `enableRecentAppButton`

disable recent app button

```ts
system.enableRecentAppButton(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableRecentAppButton(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true : disable false enable |

**Returns** — true:success false fail

---

### `setDefaultSimCardForCellularData`

set default sim card for cellular data

```ts
system.setDefaultSimCardForCellularData(slotId: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDefaultSimCardForCellularData(slotId: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `slotId` | `number` | slotId=0 is sim1, slotId=1 is sim2 |

---

### `setAPNExt`

set APN Ext

```ts
system.setAPNExt(apnInfo: Input<ApnInfoExt>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setAPNExt(apnInfo: Input<ApnInfoExt>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `apnInfo` | `Input<ApnInfoExt>` | apnInfo |

**Returns** — apn key

---

### `getAPNListExt`

get APN List

```ts
system.getAPNListExt(): Effect<ReadonlyArray<ApnInfoExt>, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getAPNListExt(): ReadonlyArray<ApnInfoExt>
```

**Returns** — list for ApnInfoExt

---

### `enableBackButton`

disable back app button

```ts
system.enableBackButton(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableBackButton(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true : disable false enable |

**Returns** — true:success false fail

---

### `getIMSIExt`

get IMSI

```ts
system.getIMSIExt(subId: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getIMSIExt(subId: number): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `subId` | `number` | simId(0,1) |

**Returns** — IMSI

---

### `getIMEIExt`

get IMEI

```ts
system.getIMEIExt(slotId: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getIMEIExt(slotId: number): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `slotId` | `number` | 0,1 |

**Returns** — IMEI

---

### `apnRestore`

Set apn and select. Use Telephony.Carriers fields for setting values in input argument ContentValues values. Example: ContentValues values = new ContentValues(); values.put(Telephony.Carriers.NAME, "nameFieldValue"); values.put(Telephony.Carriers.APN, "APNFieldValue"); ... There are a few values which are mandatory for an APN to be registered, all of which will generate an RemoteException regarding format and/or necessity. Also, the device MUST HAVE A CHIP INSERTED for the API to respond correctly.

```ts
system.apnRestore(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.apnRestore(): void
```

---

### `screenBrightnessSet`

Set screen brightness.

```ts
system.screenBrightnessSet(brightness: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.screenBrightnessSet(brightness: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `brightness` | `number` | Screen brightness value. Must be greater than 10 and less than 255. |

---

### `locationEnable`

Enable and disable location (GPS).

```ts
system.locationEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.locationEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `screenTimeOutSet`

Set screen timeout.

```ts
system.screenTimeOutSet(timeoutValue: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.screenTimeOutSet(timeoutValue: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeoutValue` | `number` | Screen time out value. The value must be one of 15000,30000,60000,120000,300000,600000,1800000,Integer.MAX_VALUE. |

---

### `bootAnimationSet`

Set the boot animation. The zip file must follow the Android boot animation format.

```ts
system.bootAnimationSet(animationPath: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.bootAnimationSet(animationPath: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `animationPath` | `string` | Path to the zip file containing the animation (e.g.: "/sdcard/bootanimation.zip") |

---

### `doubleTapButtonActionSet`

Double tap button behavior.

```ts
system.doubleTapButtonActionSet(button: number, action: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.doubleTapButtonActionSet(button: number, action: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `button` | `number` | Navigation button. Back, home or menu button. |
| `action` | `number` | Button behavior (such as launch camera). |

---

### `longTapButtonActionSet`

Long tap button behavior.

```ts
system.longTapButtonActionSet(button: number, action: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.longTapButtonActionSet(button: number, action: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `button` | `number` | Navigation button. Back, home or menu button. |
| `action` | `number` | Button behavior (such as launch camera). |

---

### `fileManagerEnable`

Enable or disable File Manager.

```ts
system.fileManagerEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.fileManagerEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `systemConfigurationMenuVisibilitySet`

Show or hide the android system configuration menu.

```ts
system.systemConfigurationMenuVisibilitySet(config: number, visible: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.systemConfigurationMenuVisibilitySet(config: number, visible: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `config` | `number` | Android system configuration menu. WIFI or BT. |
| `visible` | `boolean` | True to show, false to hide. |

---

### `clearUserData`

Clear applications data.

```ts
system.clearUserData(forceClearAppList: ReadonlyArray<string>): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.clearUserData(forceClearAppList: ReadonlyArray<string>): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `forceClearAppList` | `ReadonlyArray<string>` | List of packages to be forced cleared |

---

### `passwordSet`

Change the password on Settings.

```ts
system.passwordSet(password: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.passwordSet(password: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `password` | `string` | The number of password must be equals a 6. |

---

### `daydreamEnable`

Enable or disable Daydream.

```ts
system.daydreamEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.daydreamEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `daydreamActiveSet`

Set Daydream Active.

```ts
system.daydreamActiveSet(packageName: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.daydreamActiveSet(packageName: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | Daydream package name. |

---

### `daydreamModeSet`

Set Daydream mode.

```ts
system.daydreamModeSet(dayDreamMode: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.daydreamModeSet(dayDreamMode: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `dayDreamMode` | `number` | Daydream configuration menu. DOCK, SLEEP, EITHER, ALWAYS. |

---

### `preferredTTSEngineSet`

Set the default TTS application .

```ts
system.preferredTTSEngineSet(engine: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.preferredTTSEngineSet(engine: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `engine` | `string` | Speech application name |

---

### `setDeviceSerialNumber`

Set Device SN. The SetDeviceSerialNumber method is used to set the device's Serial Number. It is used in the factory to register the device in the Gertec system.

```ts
system.setDeviceSerialNumber(sSerialNumber: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDeviceSerialNumber(sSerialNumber: string): void
```

| Parameter | Type |
| --- | --- |
| `sSerialNumber` | `string` |

---

### `adbEnable`

Enable or disable adb.

```ts
system.adbEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.adbEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `factoryTestAppEnable`

Enable or disable the factory test application (CIT).

```ts
system.factoryTestAppEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.factoryTestAppEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `systemReset`

System reset to factory defaults;

```ts
system.systemReset(packageName: string, appsToPreserve: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.systemReset(packageName: string, appsToPreserve: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | Package Name |
| `appsToPreserve` | `number` | Preserve apps according to signature: 0x01: SYSTEM. 0x02: CUSTOMER. 0x04: ENHANCED. 0x08: FACTORY. |

---

### `checkStatus`

Check Device Status

```ts
system.checkStatus(totalNumApps: ReadonlyArray<number>, numAppsUninstalled: ReadonlyArray<number>): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.checkStatus(totalNumApps: ReadonlyArray<number>, numAppsUninstalled: ReadonlyArray<number>): boolean
```

| Parameter | Type |
| --- | --- |
| `totalNumApps` | `ReadonlyArray<number>` |
| `numAppsUninstalled` | `ReadonlyArray<number>` |

---

### `ussdMessagesEnabled`

Enable or disable Ussd Messages.

```ts
system.ussdMessagesEnabled(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.ussdMessagesEnabled(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `appErrorDialogEnabled`

Enable or disable App Error Dialog. The phone and messages app can't be enabled, but the USSD messages must be present because we're not dealing with a regular SMS.

```ts
system.appErrorDialogEnabled(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.appErrorDialogEnabled(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `batteryPercentEnabled`

Show or hide Battery Percent.

```ts
system.batteryPercentEnabled(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.batteryPercentEnabled(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to show, false to hide. |

---

### `apnSet`

Set apn and select. Use Telephony.Carriers fields for setting values in input argument ContentValues values. Example: ContentValues values = new ContentValues(); values.put(Telephony.Carriers.NAME, "nameFieldValue"); values.put(Telephony.Carriers.APN, "APNFieldValue"); ... There are a few values which are mandatory for an APN to be registered, all of which will generate an RemoteException regarding format and/or necessity. Also, the device MUST HAVE A CHIP INSERTED for the API to respond correctly.

```ts
system.apnSet(values: ContentValues): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.apnSet(values: ContentValues): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `values` | `ContentValues` | Apn param. |

---

### `getICCIDExt`

get ICCID

```ts
system.getICCIDExt(slotId: number): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getICCIDExt(slotId: number): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `slotId` | `number` | slot Id |

**Returns** — ICCID

---

### `isShowNvBar`

Show System Navigation Bar

```ts
system.isShowNvBar(isShow: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isShowNvBar(isShow: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `isShow` | `boolean` | true: show nv bar,false hide nv bar. |

---

### `setAirplaneMode`

set System Airplane Mode

```ts
system.setAirplaneMode(enabled: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setAirplaneMode(enabled: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enabled` | `boolean` | true: on,false off. |

---

### `getDisplayDensityDpi`

get System Display Density Dpi

```ts
system.getDisplayDensityDpi(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getDisplayDensityDpi(): number
```

**Returns** — Display Density Dpi

---

### `setDisplayDensityDpi`

Set System Display Density Dpi

```ts
system.setDisplayDensityDpi(densityDpi: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDisplayDensityDpi(densityDpi: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `densityDpi` | `number` | densityDpi |

---

### `isMobileDataEnabled`

get System MobileData state

```ts
system.isMobileDataEnabled(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isMobileDataEnabled(): boolean
```

---

### `setMobileDataEnabled`

set System MobileData state

```ts
system.setMobileDataEnabled(enabled: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setMobileDataEnabled(enabled: boolean): void
```

| Parameter | Type |
| --- | --- |
| `enabled` | `boolean` |

---

### `shutDownDevice`

shut Down Device

```ts
system.shutDownDevice(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.shutDownDevice(): void
```

---

### `set24HourRebootTime`

set System 24 Hour Reboot Time

```ts
system.set24HourRebootTime(hour: number, minute: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.set24HourRebootTime(hour: number, minute: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `hour` | `number` | hour 0-23 |
| `minute` | `number` | minute 0-59 |

---

### `get24HourRebootTime`

get System 24 Hour Reboot Time

```ts
system.get24HourRebootTime(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.get24HourRebootTime(): string
```

---

### `setCameraDisabled`

set Camera Disabled state

```ts
system.setCameraDisabled(disabled: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setCameraDisabled(disabled: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `disabled` | `boolean` | true disable,false enable |

---

### `getCameraDisabled`

get Camera Disabled state

```ts
system.getCameraDisabled(admin: ComponentName): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getCameraDisabled(admin: ComponentName): boolean
```

| Parameter | Type |
| --- | --- |
| `admin` | `ComponentName` |

---

### `setTamperScreen`

set Trigger interface background

```ts
system.setTamperScreen(filePath: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setTamperScreen(filePath: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `filePath` | `string` | Picture Path(png,jpg) |

**Returns** — true: success,false fail

---

### `enableWifi`

enable/disable Wifi

```ts
system.enableWifi(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableWifi(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true:enable,false:disable |

---

### `enableWifiPassWord`

enable/disable Wifi pwd

```ts
system.enableWifiPassWord(flag: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableWifiPassWord(flag: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `flag` | `boolean` | true:enable,false:disable |

---

### `setScreenLock`

set Screen Lock Type

```ts
system.setScreenLock(type: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setScreenLock(type: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `type` | `number` | NONE,SWIPE,PATTERN,PIN,PASSWORD |

---

### `enabledRescueParty`

Set RescueParty enabled/disable

```ts
system.enabledRescueParty(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enabledRescueParty(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | if enabled is true, RescueParty enabled, if false, RescueParty disable,false is default value. |

---

### `setTethering`

Tethering control visible

```ts
system.setTethering(tetheringOption: number, enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setTethering(tetheringOption: number, enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `tetheringOption` | `number` | Tethering Option to enable: TETHER - hotspot and tethering USB - usb tethering WIFI - WiFi hotspot SETWIFI - set up WiFi hotspot BLUETOOTH - Bluetooth tethering |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `enabledAppPowerSave`

Enable or disable Power Save.

```ts
system.enabledAppPowerSave(packageName: string, enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enabledAppPowerSave(packageName: string, enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | App's Package name. |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `autoCheckCard`

enable Auto Check Card (ICC)

```ts
system.autoCheckCard(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.autoCheckCard(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `getBatteryLevel`

Return the level the coin battery

```ts
system.getBatteryLevel(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getBatteryLevel(): number
```

**Returns** — Float value of coin battery

---

### `enabledCameraDoubleTapPower`

Set Camera Double Tap Power enabled/disable

```ts
system.enabledCameraDoubleTapPower(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enabledCameraDoubleTapPower(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `setLockScreenCameraVisibility`

Set Camera icon Visibility on lock screen

```ts
system.setLockScreenCameraVisibility(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setLockScreenCameraVisibility(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to visible, false to hide. |

---

### `forgetAllWiFi`

Forget all saved WiFi

```ts
system.forgetAllWiFi(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.forgetAllWiFi(): void
```

---

### `enabledApp`

Set app Enable/Disable

```ts
system.enabledApp(packageName: string, enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enabledApp(packageName: string, enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` |  |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `setBootLogo`

Set boot Logo.(apply to 3909/z516)

```ts
system.setBootLogo(filePath: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setBootLogo(filePath: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `filePath` | `string` | images save at /{path}/xxx.raw |

---

### `setPosKeyListener`

set Pos Key Listener

```ts
system.setPosKeyListener()
  : Stream<PosKeyListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.system.setPosKeyListener({ onEvent }): Unsubscribe
```

**Events** — [`PosKeyListenerEvent`](../events.md#poskeylistenerevent).

---

### `setPrivateAdbKey`

Set private adb key.

```ts
system.setPrivateAdbKey(keyPath: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setPrivateAdbKey(keyPath: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyPath` | `string` | is adb key path |

**Returns** — 0 is success, -1 is fail

---

### `adbLogEnabled`

Set adbLog enabled/disable.

```ts
system.adbLogEnabled(enable: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.adbLogEnabled(enable: boolean): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | true is enabled, false is disable |

**Returns** — 0 is success, -1 is fail

---

### `apnUpdate`

Update apn and select.

```ts
system.apnUpdate(id: string, values: ContentValues): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.apnUpdate(id: string, values: ContentValues): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `id` | `string` | is apn id |
| `values` | `ContentValues` | is apn param |

**Returns** — true is success, -1 is fail

---

### `rebootModem`

Silently reboots modem.

```ts
system.rebootModem(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.rebootModem(): void
```

---

### `updateFirmwareSP`

Update firmware from file.

```ts
system.updateFirmwareSP(pathFile: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.updateFirmwareSP(pathFile: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `pathFile` | `string` | is firmware file path |

**Returns** — 0 is success, -1 is fail

---

### `showAppIconInLauncher3`

Add or remove app icon in Launcher3.

```ts
system.showAppIconInLauncher3(packageName: string, isShow: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.showAppIconInLauncher3(packageName: string, isShow: boolean): void
```

| Parameter | Type |
| --- | --- |
| `packageName` | `string` |
| `isShow` | `boolean` |

---

### `caNotificationEnable`

Enable CA Notification

```ts
system.caNotificationEnable(enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.caNotificationEnable(enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | : true is enable CA Notification, false is disable |

---

### `installCACertificate`

Install CA Certificate

```ts
system.installCACertificate(caType: number, sCerPath: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.installCACertificate(caType: number, sCerPath: string): string
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `caType` | `number` | : system, user |
| `sCerPath` | `string` | : ca certificate path |

---

### `uninstallCustomerCACertificate`

Uninstall CA Certificate

```ts
system.uninstallCustomerCACertificate(caType: number, certAlias: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.uninstallCustomerCACertificate(caType: number, certAlias: string): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `caType` | `number` | : system, user |
| `certAlias` | `string` | : ca certificate alias |

---

### `getCustomerSN`

Retrieves control numbers, e.g. serial or chassis numbers, from the device.

```ts
system.getCustomerSN(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getCustomerSN(): string
```

**Returns** — Control number value.

---

### `setCustomerSN`

Sets control numbers, e.g. serial or chassis numbers, in the device.

```ts
system.setCustomerSN(sn: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setCustomerSN(sn: string): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `sn` | `string` | Control number value. Which control number to be retrieved. |

**Returns** — int result; 0:Success | Others:Not success

---

### `talkbackEnable`

Enable or disable Talkback.

```ts
system.talkbackEnable(enable: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.talkbackEnable(enable: boolean): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

**Returns** — int result; 0:Success | Others:Not success

---

### `enablePhysicalKeyboardBacklight`

Enable or disable physical keyboard lighting

```ts
system.enablePhysicalKeyboardBacklight(enable: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enablePhysicalKeyboardBacklight(enable: boolean): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

**Returns** — int result; 0:Success | Others:Not success

---

### `configLongpressPhysicalKeyAction`

Configures a longpress feature for a physical keyboard key

```ts
system.configLongpressPhysicalKeyAction(keyCode: number, action: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.configLongpressPhysicalKeyAction(keyCode: number, action: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `keyCode` | `number` | is the keycode of the physical key |
| `action` | `number` | is 0: SHUTDOWN Shuts down the device 1: REBOOT reboots the device 2: NOTHING no action |

**Returns** — int result; 0:Success | Others:Not success

---

### `enablePressPhysicalKeySound`

Enables and disables the sound emitted when pressing a key

```ts
system.enablePressPhysicalKeySound(enable: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enablePressPhysicalKeySound(enable: boolean): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | True to enable, false to disable. |

**Returns** — int result; 0:Success | Others:Not success

---

### `getLastPressPhysicalKey`

Returns the last key pressed

```ts
system.getLastPressPhysicalKey(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getLastPressPhysicalKey(): number
```

**Returns** — the keycode Last physical keyboard pressed key

---

### `getProcStat`

Get the contents of the file /proc/stat

```ts
system.getProcStat(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getProcStat(): string
```

**Returns** — the contents of the file /proc/stat

---

### `setCleanKeyBehavior`

Set Clean Key Behavior

```ts
system.setCleanKeyBehavior(clearACharacter: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setCleanKeyBehavior(clearACharacter: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `clearACharacter` | `boolean` | : If clearACharacter is true, the clear key must clear one character at a time. If clearACharacter is false, the clear key must clear all characters in the field at once. |

---

### `clearLastPressPhysicalKey`

clear the last key pressed

```ts
system.clearLastPressPhysicalKey(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.clearLastPressPhysicalKey(): void
```

---

### `setPhysicalKeySoundFrequency`

Set the physical key sound frequency

```ts
system.setPhysicalKeySoundFrequency(frequency: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setPhysicalKeySoundFrequency(frequency: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `frequency` | `number` | the physical key sound frequency, unit is HZ |

---

### `setPhysicalKeySoundDuration`

Set the physical key sound duration

```ts
system.setPhysicalKeySoundDuration(duration: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setPhysicalKeySoundDuration(duration: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `duration` | `number` | the physical key sound duration, unit is millisecond |

---

### `setAdbMode`

Change the type of ADB.

```ts
system.setAdbMode(eMode: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setAdbMode(eMode: number): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `eMode` | `number` | Selected ADB type (TEST_MODE=0 or USER_MODE=1) |

---

### `SystemPropertiesSet`

```ts
system.SystemPropertiesSet(arg0: string, arg1: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.SystemPropertiesSet(arg0: string, arg1: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `SystemPropertiesGet`

```ts
system.SystemPropertiesGet(arg0: string, arg1: string): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.SystemPropertiesGet(arg0: string, arg1: string): string
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `appPermissionEnabled`

```ts
system.appPermissionEnabled(arg0: string, arg1: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.appPermissionEnabled(arg0: string, arg1: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |

---

### `enabledDonotDisturbMode`

```ts
system.enabledDonotDisturbMode(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enabledDonotDisturbMode(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `showClockInStatusbarRight`

```ts
system.showClockInStatusbarRight(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.showClockInStatusbarRight(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `getBatteryUsage`

```ts
system.getBatteryUsage(arg0: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getBatteryUsage(arg0: string): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `autoTimeZoneEnable`

```ts
system.autoTimeZoneEnable(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.autoTimeZoneEnable(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `setProvidedTime`

```ts
system.setProvidedTime(arg0: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setProvidedTime(arg0: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `setTimeZone`

```ts
system.setTimeZone(arg0: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setTimeZone(arg0: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `removeAllWIFIInfo`

```ts
system.removeAllWIFIInfo(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.removeAllWIFIInfo(): void
```

---

### `clearSdcard`

```ts
system.clearSdcard(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.clearSdcard(): void
```

---

### `apnGetConnectedId`

```ts
system.apnGetConnectedId(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.apnGetConnectedId(): string
```

---

### `simCardEnabled`

```ts
system.simCardEnabled(arg0: number, arg1: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.simCardEnabled(arg0: number, arg1: boolean): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `boolean` |

---

### `enableMobileDataAlwaysOn`

```ts
system.enableMobileDataAlwaysOn(arg0: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableMobileDataAlwaysOn(arg0: boolean): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `enableBluetooth`

Set Bluetooth switch status

```ts
system.enableBluetooth(enable: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableBluetooth(enable: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enable` | `boolean` | true:enable \| false:disable |

**Returns** — true:Success | false:Not success

---

### `writeCustomLog`

```ts
system.writeCustomLog(customName: string, tag: string, msg: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.writeCustomLog(customName: string, tag: string, msg: string): void
```

| Parameter | Type |
| --- | --- |
| `customName` | `string` |
| `tag` | `string` |
| `msg` | `string` |

---

### `enableUninstallApp`

Set the app can uninstall by UI opt or not Customer privilege.

```ts
system.enableUninstallApp(packageName: string, enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableUninstallApp(packageName: string, enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | package Name of the Application |
| `enable` | `boolean` | if enabled is true, the app can uninstall by UI opt, if false, the app can not uninstall by UI opt,true is default value. |

---

### `setDrawOverlay`

Set application Draw Overlay. If enabled, bring the app from background to foreground when requested the background app package Customer privilege.

```ts
system.setDrawOverlay(packageName: string, enable: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDrawOverlay(packageName: string, enable: boolean): void
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `packageName` | `string` | Name of package app that will overlay. |
| `enable` | `boolean` | True to enable, false to disable. |

---

### `setClipboardOverlayEnable`

```ts
system.setClipboardOverlayEnable(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setClipboardOverlayEnable(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `getDeviceEfusePublicKey`

```ts
system.getDeviceEfusePublicKey(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getDeviceEfusePublicKey(): string
```

---

### `getProcessID`

```ts
system.getProcessID(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getProcessID(): string
```

---

### `getCPUUsage`

```ts
system.getCPUUsage(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getCPUUsage(): string
```

---

### `setbootTime`

```ts
system.setbootTime(arg0: number, arg1: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setbootTime(arg0: number, arg1: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `setShutdownTime`

```ts
system.setShutdownTime(arg0: number, arg1: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setShutdownTime(arg0: number, arg1: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `configureGlobalProxy`

```ts
system.configureGlobalProxy(arg0: string, arg1: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.configureGlobalProxy(arg0: string, arg1: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `number` |

---

### `setWakeScreenForDoubleTap`

```ts
system.setWakeScreenForDoubleTap(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setWakeScreenForDoubleTap(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `setWakeScreenForGesture`

```ts
system.setWakeScreenForGesture(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setWakeScreenForGesture(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `getPCIVersion`

```ts
system.getPCIVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getPCIVersion(): string
```

---

### `getIFMVersion`

```ts
system.getIFMVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getIFMVersion(): string
```

---

### `getPCDVersion`

```ts
system.getPCDVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getPCDVersion(): string
```

---

### `getEmvLibVersion`

```ts
system.getEmvLibVersion(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getEmvLibVersion(): string
```

---

### `showToast`

```ts
system.showToast(arg0: string, arg1: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.showToast(arg0: string, arg1: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |

---

### `getTransitionAnimationScale`

```ts
system.getTransitionAnimationScale(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getTransitionAnimationScale(): number
```

---

### `setTransitionAnimationScale`

```ts
system.setTransitionAnimationScale(arg0: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setTransitionAnimationScale(arg0: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `screenBrightnessPercentSet`

```ts
system.screenBrightnessPercentSet(arg0: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.screenBrightnessPercentSet(arg0: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `checkBindTopUsdkService`

```ts
system.checkBindTopUsdkService(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.checkBindTopUsdkService(): void
```

---

### `setDeviceOwner`

```ts
system.setDeviceOwner(arg0: string, arg1: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDeviceOwner(arg0: string, arg1: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |

---

### `darkThemeEnabled`

```ts
system.darkThemeEnabled(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.darkThemeEnabled(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `getRandomizedWifiMacAddress`

```ts
system.getRandomizedWifiMacAddress(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getRandomizedWifiMacAddress(): string
```

---

### `getPressPhysicalKeySound`

```ts
system.getPressPhysicalKeySound(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getPressPhysicalKeySound(): boolean
```

---

### `roamingEnabled`

```ts
system.roamingEnabled(arg0: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.roamingEnabled(arg0: boolean): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `getCoinBatteryVoltage`

```ts
system.getCoinBatteryVoltage(): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getCoinBatteryVoltage(): number
```

---

### `setSystemWakeupSrc`

```ts
system.setSystemWakeupSrc(arg0: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setSystemWakeupSrc(arg0: number): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `setOTGMode`

```ts
system.setOTGMode(arg0: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setOTGMode(arg0: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `removeDeviceOwner`

```ts
system.removeDeviceOwner(arg0: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.removeDeviceOwner(arg0: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `setPreferredNetworkType`

```ts
system.setPreferredNetworkType(arg0: number, arg1: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setPreferredNetworkType(arg0: number, arg1: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |

---

### `setTamperScreenEx`

```ts
system.setTamperScreenEx(bitmap: Bitmap, arg1: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setTamperScreenEx(bitmap: Bitmap, arg1: string): boolean
```

| Parameter | Type |
| --- | --- |
| `bitmap` | `Bitmap` |
| `arg1` | `string` |

---

### `isAppForeground`

```ts
system.isAppForeground(arg0: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isAppForeground(arg0: string): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `useOfSDCards`

```ts
system.useOfSDCards(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.useOfSDCards(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `blockHomeButtonEffect`

```ts
system.blockHomeButtonEffect(arg0: string, arg1: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.blockHomeButtonEffect(arg0: string, arg1: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `boolean` |

---

### `setVisibleClock`

```ts
system.setVisibleClock(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setVisibleClock(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `hideLauncher3`

```ts
system.hideLauncher3(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.hideLauncher3(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `setDefaultLanguage`

```ts
system.setDefaultLanguage(arg0: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setDefaultLanguage(arg0: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `queryAppUsageStats`

```ts
system.queryAppUsageStats(arg0: number, arg1: number, arg2: number): Effect<ReadonlyArray<UsageStatsData>, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.queryAppUsageStats(arg0: number, arg1: number, arg2: number): ReadonlyArray<UsageStatsData>
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `number` |
| `arg2` | `number` |

---

### `getUndeletableAppList`

```ts
system.getUndeletableAppList(): Effect<ReadonlyArray<string>, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getUndeletableAppList(): ReadonlyArray<string>
```

---

### `getBatteryUsageOfEachApp`

```ts
system.getBatteryUsageOfEachApp(): Effect<ReadonlyArray<AppUsageBattery>, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.getBatteryUsageOfEachApp(): ReadonlyArray<AppUsageBattery>
```

---

### `switchDeviceEnable`

```ts
system.switchDeviceEnable(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.switchDeviceEnable(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `enableStorageFullNotification`

```ts
system.enableStorageFullNotification(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableStorageFullNotification(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `radioPowerEnabled`

```ts
system.radioPowerEnabled(arg0: number, arg1: boolean): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.radioPowerEnabled(arg0: number, arg1: boolean): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |
| `arg1` | `boolean` |

---

### `orderIconsOfStatusBar`

```ts
system.orderIconsOfStatusBar(arg0: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.orderIconsOfStatusBar(arg0: ReadonlyArray<number>): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `ReadonlyArray<number>` |

---

### `isMenuKeyEnabled`

```ts
system.isMenuKeyEnabled(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isMenuKeyEnabled(): boolean
```

---

### `isBackKeyEnabled`

```ts
system.isBackKeyEnabled(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isBackKeyEnabled(): boolean
```

---

### `isHomeKeyEnabled`

```ts
system.isHomeKeyEnabled(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.isHomeKeyEnabled(): boolean
```

---

### `autoCheckMSR`

```ts
system.autoCheckMSR(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.autoCheckMSR(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `writeUsageStats`

```ts
system.writeUsageStats(customUsageStats: Input<CustomUsageStats>): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.writeUsageStats(customUsageStats: Input<CustomUsageStats>): boolean
```

| Parameter | Type |
| --- | --- |
| `customUsageStats` | `Input<CustomUsageStats>` |

---

### `setWifiMacAddress`

```ts
system.setWifiMacAddress(arg0: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.setWifiMacAddress(arg0: Uint8Array): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `Uint8Array` |

---

### `checkWifiMacAddress`

```ts
system.checkWifiMacAddress(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.checkWifiMacAddress(): boolean
```

---

### `enableBluetoothDevices`

```ts
system.enableBluetoothDevices(arg0: string): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableBluetoothDevices(arg0: string): number
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |

---

### `settingsPutString`

```ts
system.settingsPutString(arg0: string, arg1: string, arg2: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.settingsPutString(arg0: string, arg1: string, arg2: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `string` |
| `arg1` | `string` |
| `arg2` | `string` |

---

### `enableKioskMode`

```ts
system.enableKioskMode(arg0: boolean, arg1: string, arg2: string): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableKioskMode(arg0: boolean, arg1: string, arg2: string): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |
| `arg1` | `string` |
| `arg2` | `string` |

---

### `enableKioskPassword`

```ts
system.enableKioskPassword(pOWER_TYPE: POWER_TYPE, arg1: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableKioskPassword(pOWER_TYPE: POWER_TYPE, arg1: number): void
```

| Parameter | Type |
| --- | --- |
| `pOWER_TYPE` | `POWER_TYPE` |
| `arg1` | `number` |

---

### `enableOtgExtvbus`

```ts
system.enableOtgExtvbus(arg0: boolean): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enableOtgExtvbus(arg0: boolean): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |

---

### `checkOTGPulledDown`

```ts
system.checkOTGPulledDown(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.checkOTGPulledDown(): boolean
```

---

### `checkPrinterExists`

```ts
system.checkPrinterExists(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.checkPrinterExists(): boolean
```

---

### `startKioskLockTaskMode`

```ts
system.startKioskLockTaskMode(arg0: number): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.startKioskLockTaskMode(arg0: number): void
```

| Parameter | Type |
| --- | --- |
| `arg0` | `number` |

---

### `stopSystemLockTaskMode`

```ts
system.stopSystemLockTaskMode(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.stopSystemLockTaskMode(): void
```

---

### `enablePowerButtonTimeOut`

```ts
system.enablePowerButtonTimeOut(arg0: boolean, arg1: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.system.enablePowerButtonTimeOut(arg0: boolean, arg1: number): boolean
```

| Parameter | Type |
| --- | --- |
| `arg0` | `boolean` |
| `arg1` | `number` |

