# shellMonitor

`com.topwise.cloudpos.aidl.shellmonitor.AidlShellMonitor`

10 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`executeCmd`](#executecmd) · [`recovery`](#recovery) · [`canRecovery`](#canrecovery) · [`getRootAuth`](#getrootauth) · [`executeRootCMD`](#executerootcmd) · [`getHardwareSNPlaintext`](#gethardwaresnplaintext) · [`getHardwareSNCiphertext`](#gethardwaresnciphertext) · [`getSM4Ncryption`](#getsm4ncryption) · [`sendIns`](#sendins) · [`recoveryEnabled`](#recoveryenabled)

---

### `executeCmd`

execute shell command

```ts
shellMonitor.executeCmd(cmd: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.executeCmd(cmd: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cmd` | `string` | command |

**Returns** — true:success,false:failed

---

### `recovery`

recovery

```ts
shellMonitor.recovery(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.recovery(): void
```

---

### `canRecovery`

cancel recovered

```ts
shellMonitor.canRecovery(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.canRecovery(): boolean
```

**Returns** — true:can,false:can not

---

### `getRootAuth`

get root auth

```ts
shellMonitor.getRootAuth(rootAuth: string): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.getRootAuth(rootAuth: string): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `rootAuth` | `string` | root auth data |

**Returns** — root auth

---

### `executeRootCMD`

execute root command

```ts
shellMonitor.executeRootCMD(rootkey: string, authToken: string, cmdParams: string): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.executeRootCMD(rootkey: string, authToken: string, cmdParams: string): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `rootkey` | `string` | root key |
| `authToken` | `string` | auth token |
| `cmdParams` | `string` | command |

**Returns** — true:success,false:failed

---

### `getHardwareSNPlaintext`

get Hardware SN Plain text

```ts
shellMonitor.getHardwareSNPlaintext(): Effect<string, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.getHardwareSNPlaintext(): string
```

**Returns** — Hardware SN Plain text

---

### `getHardwareSNCiphertext`

get Hardware SN Cipher text

```ts
shellMonitor.getHardwareSNCiphertext(b: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.getHardwareSNCiphertext(b: Uint8Array): Uint8Array
```

| Parameter | Type |
| --- | --- |
| `b` | `Uint8Array` |

**Returns** — Hardware SN Cipher text

---

### `getSM4Ncryption`

get SM4 Ncryption

```ts
shellMonitor.getSM4Ncryption(key: Uint8Array, b: Uint8Array): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.getSM4Ncryption(key: Uint8Array, b: Uint8Array): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `key` | `Uint8Array` | key |
| `b` | `Uint8Array` |  |

**Returns** — SM4 Ncryption

---

### `sendIns`

send ins data to sp

```ts
shellMonitor.sendIns(timeOutMs: number, type: number, cmd: number, len: number, insData: Uint8Array)
  : Stream<InstructionSendDataCallbackEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.shellMonitor.sendIns(timeOutMs: number, type: number, cmd: number, len: number, insData: Uint8Array, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeOutMs` | `number` | time out |
| `type` | `number` | ins type |
| `cmd` | `number` | ins cmd |
| `len` | `number` | ins data len |
| `insData` | `Uint8Array` | ins data |

**Events** — [`InstructionSendDataCallbackEvent`](../events.md#instructionsenddatacallbackevent).

---

### `recoveryEnabled`

Recovery Enabled

```ts
shellMonitor.recoveryEnabled(enabled: boolean): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.shellMonitor.recoveryEnabled(enabled: boolean): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `enabled` | `boolean` | true:enable;false:disable |

**Returns** — true:sucess;false:fail

