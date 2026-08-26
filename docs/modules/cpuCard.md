# cpuCard

`com.topwise.cloudpos.aidl.cpucard.AidlCPUCard`

17 methods.

Every method here can fail with any of the transport codes in
[errors.md](../errors.md). Method-specific meanings are noted below.

## Methods

[`open`](#open) · [`close`](#close) · [`verifyPwd`](#verifypwd) · [`changePassword`](#changepassword) · [`read`](#read) · [`write`](#write) · [`openWithATRVerification`](#openwithatrverification) · [`writeAt24c`](#writeat24c) · [`readAt24c`](#readat24c) · [`verifyAT88SCPwd`](#verifyat88scpwd) · [`getAT88SCPwdCheckNum`](#getat88scpwdchecknum) · [`initAT88SCAuth`](#initat88scauth) · [`verifyAT88SCAuth`](#verifyat88scauth) · [`readAT88SCDomainData`](#readat88scdomaindata) · [`writeAT88SCDomainData`](#writeat88scdomaindata) · [`readAT88SCFuseMark`](#readat88scfusemark) · [`writeAT88SCFuseMark`](#writeat88scfusemark)

---

### `open`

Open device

```ts
cpuCard.open(cardType: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.open(cardType: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | CardType，refer to com.topwise.cloudpos.data.CPUCard.CPUCardType |

**Returns** — 0 success ; 1 It is not supported for this cardtype ; 2 fail.

---

### `close`

Close device

```ts
cpuCard.close(): Effect<void, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.close(): void
```

---

### `verifyPwd`

Verify password (except at88sc card)

```ts
cpuCard.verifyPwd(cardType: number, psw: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.verifyPwd(cardType: number, psw: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | CardType |
| `psw` | `Uint8Array` | password |

**Returns** — true:success, false:failed

---

### `changePassword`

Modify card master password

```ts
cpuCard.changePassword(cardType: number, oldpsw: Uint8Array, newpsw: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.changePassword(cardType: number, oldpsw: Uint8Array, newpsw: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | card Type |
| `oldpsw` | `Uint8Array` | old password |
| `newpsw` | `Uint8Array` | new password |

**Returns** — true:success, false:failed

---

### `read`

Read card data

```ts
cpuCard.read(cardType: number, offset: number, length: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.read(cardType: number, offset: number, length: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | Card Type |
| `offset` | `number` | Offset address |
| `length` | `number` | length |

**Returns** — Successful return read data, failure return null

---

### `write`

Write card data

```ts
cpuCard.write(cardType: number, offset: number, data: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.write(cardType: number, offset: number, data: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | Card Type |
| `offset` | `number` | Offset address |
| `data` | `Uint8Array` | data to write |

**Returns** — true:success, false:failed

---

### `openWithATRVerification`

Open card with atr verification

```ts
cpuCard.openWithATRVerification(cardType: number, atrData: Uint8Array): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.openWithATRVerification(cardType: number, atrData: Uint8Array): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | cardType，refer to com.topwise.cloudpos.data.CPUCard.CPUCardType |
| `atrData` | `Uint8Array` | data |

**Returns** — 0 success, 1 It is not supported for this cardtype, 2 failed

---

### `writeAt24c`

Write AT24C card data

```ts
cpuCard.writeAt24c(cardType: number, offset: number, data: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.writeAt24c(cardType: number, offset: number, data: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT24C CardType, refer to com.topwise.cloudpos.data.CPUCard.AT24CCardType |
| `offset` | `number` | Offset address |
| `data` | `Uint8Array` | data to write |

**Returns** — true:success, false:failed

---

### `readAt24c`

Read AT24C card data

```ts
cpuCard.readAt24c(cardType: number, offset: number, len: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.readAt24c(cardType: number, offset: number, len: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT24C CardType, refer to com.topwise.cloudpos.data.CPUCard.AT24CCardType |
| `offset` | `number` | Offset address |
| `len` | `number` | Length of data to read |

**Returns** — Successful return read data, failure return null

---

### `verifyAT88SCPwd`

Verify the password of AT88SC card

```ts
cpuCard.verifyAT88SCPwd(cardType: number, pwdType: number, pwdGroup: number, pwd: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.verifyAT88SCPwd(cardType: number, pwdType: number, pwdGroup: number, pwd: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `pwdType` | `number` | 0：the password of reading 1：the password of writting |
| `pwdGroup` | `number` | Password group number |
| `pwd` | `Uint8Array` | Password |

**Returns** — true success，false failed

---

### `getAT88SCPwdCheckNum`

Get the calculated value of AT88SC Card type password check number error

```ts
cpuCard.getAT88SCPwdCheckNum(cardType: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.getAT88SCPwdCheckNum(cardType: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |

---

### `initAT88SCAuth`

Initialize AT88SC card type card auth

```ts
cpuCard.initAT88SCAuth(cardType: number, authData: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.initAT88SCAuth(cardType: number, authData: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `authData` | `Uint8Array` | Auth data |

**Returns** — true success，false failed

---

### `verifyAT88SCAuth`

Verify AT88SC card auth

```ts
cpuCard.verifyAT88SCAuth(cardType: number, authData: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.verifyAT88SCAuth(cardType: number, authData: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `authData` | `Uint8Array` | Auth data |

**Returns** — true success，false failed

---

### `readAT88SCDomainData`

Read specific data area of AT88SC card

```ts
cpuCard.readAT88SCDomainData(cardType: number, zoneNum: number, offset: number, len: number): Effect<Uint8Array, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.readAT88SCDomainData(cardType: number, zoneNum: number, offset: number, len: number): Uint8Array
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `zoneNum` | `number` | zone number |
| `offset` | `number` | Offset address |
| `len` | `number` | Length of data to read |

**Returns** — Successful return read data, failure return null

---

### `writeAT88SCDomainData`

Write specific data area of AT88SC card

```ts
cpuCard.writeAT88SCDomainData(cardType: number, zoneNum: number, offset: number, data: Uint8Array): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.writeAT88SCDomainData(cardType: number, zoneNum: number, offset: number, data: Uint8Array): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `zoneNum` | `number` | zone number |
| `offset` | `number` | Offset address |
| `data` | `Uint8Array` | Data to write |

**Returns** — true success，false failed

---

### `readAT88SCFuseMark`

Read the fuse mark of AT88SC card

```ts
cpuCard.readAT88SCFuseMark(cardType: number): Effect<number, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.readAT88SCFuseMark(cardType: number): number
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |

---

### `writeAT88SCFuseMark`

Write the fuse mark of AT88SC card

```ts
cpuCard.writeAT88SCFuseMark(cardType: number, fuseMark: number): Effect<boolean, TopwiseError, TopwiseBridge>

// promise client
await topwise.cpuCard.writeAT88SCFuseMark(cardType: number, fuseMark: number): boolean
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `cardType` | `number` | AT88SC CardType, refer to com.topwise.cloudpos.data.CPUCard.AT88SCCardType |
| `fuseMark` | `number` | the fuse mark |

**Returns** — true success，false failed

