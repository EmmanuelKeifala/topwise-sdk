# mqtt

`com.topwise.cloudpos.aidl.mqtt.AidlMQTT`

7 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`setMQTTConnectOptions`](#setmqttconnectoptions) · [`connect`](#connect) · [`disconnect`](#disconnect) · [`setAidlMQTTActionListener`](#setaidlmqttactionlistener) · [`publish`](#publish) · [`subscribe`](#subscribe) · [`unsubscribe`](#unsubscribe)

---

### `setMQTTConnectOptions`

Set MQTT Connect Options

```ts
mqtt.setMQTTConnectOptions(options: Input<MQTTOptions>): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.mqtt.setMQTTConnectOptions(options: Input<MQTTOptions>): void
```

| Parameter | Type |
| --- | --- |
| `options` | `Input<MQTTOptions>` |

---

### `connect`

MQTT connect

```ts
mqtt.connect()
  : Effect<{ result: number; events: Stream<MQTTListenerEvent> }, TopwiseError, TopwiseBridge | Scope>

// promise client
await topwise.mqtt.connect()
  // -> { result, events }  - pass events to topwise.subscribe(...)
```

**Returns** — 0:success,other:fail,error code reference resources MQTTErrorCode

**Events** — [`MQTTListenerEvent`](../events.md#mqttlistenerevent).

---

### `disconnect`

MQTT disconnect

```ts
mqtt.disconnect(): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.mqtt.disconnect(): boolean
```

**Returns** — true:sucess;false:fail

---

### `setAidlMQTTActionListener`

Set Aidl MQTT Action Listener

```ts
mqtt.setAidlMQTTActionListener()
  : Stream<MQTTActionListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.mqtt.setAidlMQTTActionListener({ onEvent }): Unsubscribe
```

**Events** — [`MQTTActionListenerEvent`](../events.md#mqttactionlistenerevent).

---

### `publish`

MQTT publish message

```ts
mqtt.publish(topic: string, message: Input<MQTTMessage>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mqtt.publish(topic: string, message: Input<MQTTMessage>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `topic` | `string` | topic |
| `message` | `Input<MQTTMessage>` |  |

**Returns** — 0:success,other:fail,error code reference resources MQTTErrorCode

---

### `subscribe`

MQTT subscribe topic

```ts
mqtt.subscribe(topic: ReadonlyArray<string>, qos: ReadonlyArray<number>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mqtt.subscribe(topic: ReadonlyArray<string>, qos: ReadonlyArray<number>): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `topic` | `ReadonlyArray<string>` |  |
| `qos` | `ReadonlyArray<number>` | qos |

**Returns** — 0:success,other:fail,error code reference resources MQTTErrorCode

---

### `unsubscribe`

MQTT unsubscribe topic

```ts
mqtt.unsubscribe(topic: ReadonlyArray<string>): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.mqtt.unsubscribe(topic: ReadonlyArray<string>): number
```

| Parameter | Type |
| --- | --- |
| `topic` | `ReadonlyArray<string>` |

**Returns** — 0:success,other:fail,error code reference resources MQTTErrorCode

