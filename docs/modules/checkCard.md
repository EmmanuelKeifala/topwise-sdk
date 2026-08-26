# checkCard

`com.topwise.cloudpos.aidl.card.AidlCheckCard`

2 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`checkCard`](#checkcard) · [`cancelCheckCard`](#cancelcheckcard)

---

### `checkCard`

Check card

```ts
checkCard.checkCard(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number)
  : Stream<CardAidlCheckCardListenerEvent, TopwiseError, TopwiseBridge>

// promise client
topwise.checkCard.checkCard(supportMag: boolean, supportIC: boolean, supportRF: boolean, timeout: number, { onEvent }): Unsubscribe
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `supportMag` | `boolean` | Whether to support magnetic stripe card. |
| `supportIC` | `boolean` | Whether to support IC card. |
| `supportRF` | `boolean` | Whether RF card is supported. |
| `timeout` | `number` | time out. |

**Events** — [`CardAidlCheckCardListenerEvent`](../events.md#cardaidlcheckcardlistenerevent).

---

### `cancelCheckCard`

Cancel Check Card

```ts
checkCard.cancelCheckCard(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.checkCard.cancelCheckCard(): void
```

