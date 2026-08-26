# tms

`com.topwise.cloudpos.aidl.tm.AidlTM`

9 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`getTMSAppList`](#gettmsapplist) · [`getTMSParameter`](#gettmsparameter) · [`getTMSFileList`](#gettmsfilelist) · [`uploadMessageData`](#uploadmessagedata) · [`uploadFileList`](#uploadfilelist) · [`getTMSParameterByType`](#gettmsparameterbytype) · [`registerMerchant`](#registermerchant) · [`sendMerchantStatus`](#sendmerchantstatus) · [`sendParamResult`](#sendparamresult)

---

### `getTMSAppList`

get Terminal Management System App List

```ts
tms.getTMSAppList(timeOut: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.getTMSAppList(timeOut: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeOut` | `number` | an int that specifies the timeout value to be used in milliseconds |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `getTMSParameter`

get Terminal Management System Terminal Parameter

```ts
tms.getTMSParameter(timeOut: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.getTMSParameter(timeOut: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `timeOut` | `number` | an int that specifies the timeout value to be used in milliseconds |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `getTMSFileList`

get Terminal Management System File List

```ts
tms.getTMSFileList(): Effect<ReadonlyArray<string>, TopwiseError, TopwiseBridge>

// promise client
await topwise.tms.getTMSFileList(): ReadonlyArray<string>
```

**Returns** — File List

---

### `uploadMessageData`

Upload Message Data to mms

```ts
tms.uploadMessageData(messageData: string, type: MessageType)
  : Stream<TMListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.tms.uploadMessageData(messageData: string, type: MessageType, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `messageData` | `string` | message Data |
| `type` | `MessageType` |  |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `uploadFileList`

Upload File list to tms

```ts
tms.uploadFileList(fileList: ReadonlyArray<string>)
  : Stream<TMListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.tms.uploadFileList(fileList: ReadonlyArray<string>, { onEvent }): Unsubscribe
```

| Parameter | Type |
| --- | --- |
| `fileList` | `ReadonlyArray<string>` |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `getTMSParameterByType`

```ts
tms.getTMSParameterByType(parameterType: ParameterType, arg2: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.getTMSParameterByType(parameterType: ParameterType, arg2: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type |
| --- | --- |
| `parameterType` | `ParameterType` |
| `arg2` | `number` |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `registerMerchant`

```ts
tms.registerMerchant(arg1: string, arg2: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.registerMerchant(arg1: string, arg2: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type |
| --- | --- |
| `arg1` | `string` |
| `arg2` | `number` |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `sendMerchantStatus`

```ts
tms.sendMerchantStatus(arg1: string, arg2: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.sendMerchantStatus(arg1: string, arg2: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type |
| --- | --- |
| `arg1` | `string` |
| `arg2` | `number` |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

---

### `sendParamResult`

```ts
tms.sendParamResult(arg1: string, arg2: string, arg3: string, arg4: number)
  : Effect<{ result: boolean; events: Stream<TMListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.tms.sendParamResult(arg1: string, arg2: string, arg3: string, arg4: number)
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

| Parameter | Type |
| --- | --- |
| `arg1` | `string` |
| `arg2` | `string` |
| `arg3` | `string` |
| `arg4` | `number` |

**Events** — [`TMListenerEvent`](../events.md#tmlistenerevent).

