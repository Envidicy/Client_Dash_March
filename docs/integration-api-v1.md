# Envidicy Integration API v1

Read-only API for exporting client financial and advertising data from Envidicy.

Interactive documentation: `https://envidicy-dash-client.onrender.com/integration/docs`

Developer portal: `https://app.envidicy.kz/developers/integration-api`

Postman Collection: `https://app.envidicy.kz/envidicy-integration-api-v1.postman_collection.json`

Base URL:

```text
https://envidicy-dash-client.onrender.com/api/v1/integration
```

## What the API provides

- client advertising accounts and their current commission settings;
- client wallet topup requests and invoice references;
- immutable client wallet transactions;
- advertising account topups with fees, VAT and applied exchange rates;
- actual account funding events and reversals;
- current wallet and account finance summary;
- daily advertising spend, impressions and clicks;
- current informational exchange rates.

The API is read-only. An integration key cannot create topups, move funds, change accounts or modify client settings.

## Create an API key

Only the workspace owner can manage API keys.

1. Sign in to the Envidicy client portal.
2. Open **Settings → Developer API**.
3. Enter a descriptive key name.
4. Select permissions and expiration.
5. Click **Create API key**.
6. Copy the full key immediately.

The full key is shown once. Envidicy stores only its SHA-256 hash and cannot recover the original secret. If the key is lost, revoke it and create a new one.

Keys use the following prefix:

```text
env_live_
```

## Authentication

Recommended header:

```http
X-API-Key: env_live_your_secret_key
```

Bearer authentication is also accepted:

```http
Authorization: Bearer env_live_your_secret_key
```

Example:

```bash
curl --request GET \
  --url "https://envidicy-dash-client.onrender.com/api/v1/integration/accounts" \
  --header "Accept: application/json" \
  --header "X-API-Key: env_live_your_secret_key"
```

Never put API keys in query parameters, browser code, source control or logs.

## Permissions

| Scope | Access |
|---|---|
| `accounts:read` | Advertising accounts, identifiers, status and current commission configuration |
| `finance:read` | Wallet topups, wallet transactions, account topups, funding events, balances and exchange rates |
| `performance:read` | Daily spend, impressions and clicks |

Missing permissions return `403 Forbidden`.

## Pagination

List endpoints use cursor pagination:

| Parameter | Description |
|---|---|
| `after_id` | Return records with an ID greater than this value. Default: `0` |
| `limit` | Page size from `1` to `500`. Default: `100` |

Response:

```json
{
  "items": [],
  "pagination": {
    "limit": 100,
    "has_more": true,
    "next_cursor": 1842
  }
}
```

When `has_more` is `true`, pass `next_cursor` as the next request's `after_id`. IDs are returned in ascending order.

## Endpoints

### Integration identity

```http
GET /me
```

Returns the client, active key and granted scopes.

### Advertising accounts

```http
GET /accounts
```

Required scope: `accounts:read`

Each account includes:

- internal account ID;
- platform;
- name;
- platform external ID;
- account code;
- currency and status;
- current Envidicy fee;
- agency rebate, when applicable;
- total current fee.

Example:

```json
{
  "id": 42,
  "platform": "meta",
  "name": "Main Meta Account",
  "external_id": "act_123456",
  "account_code": "META-KZ-01",
  "currency": "USD",
  "status": "active",
  "commission": {
    "platform_fee_percent": 5.0,
    "agency_rebate_percent": 0.0,
    "total_fee_percent": 5.0,
    "source": "client_platform_default"
  }
}
```

Current commission settings describe the fee that would be applied now. For accounting, use the commission snapshot stored on each account topup.

### Wallet topup requests

```http
GET /wallet-topups
```

Required scope: `finance:read`

Optional filters:

- `status`;
- `date_from=YYYY-MM-DD`;
- `date_to=YYYY-MM-DD`.

This endpoint returns requests and invoice metadata. A request is not proof that funds were credited. Use `/wallet-transactions` for actual wallet movements.

Common statuses:

| Status | Meaning |
|---|---|
| `requested` | Client created a request |
| `invoice_pending` | Invoice preparation is in progress |
| `invoice_ready` | Invoice is available |
| `completed` | Funds were credited |

### Wallet transactions

```http
GET /wallet-transactions
```

Required scope: `finance:read`

Optional filters:

- `transaction_type`;
- `account_id`.

Positive amounts credit the client wallet. Negative amounts debit it.

Important transaction types:

| Type | Meaning |
|---|---|
| `wallet_topup` | Funds credited to the client wallet |
| `topup_hold` | Funds reserved for an advertising account topup |
| `topup` | Funds debited for a completed advertising account topup |
| `topup_hold_release` | Reservation or completed debit reversed |
| `agency_transfer` | Funds transferred from an agency wallet |
| `admin_adjustment` | Administrative correction |

`source_type` and `source_id` link new ledger records to their source request or topup. Older records can have these fields set to `null`.

### Advertising account topups

```http
GET /account-topups
```

Required scope: `finance:read`

Optional filters:

- `status`;
- `account_id`;
- `date_from=YYYY-MM-DD`;
- `date_to=YYYY-MM-DD`.

Example financial breakdown:

```json
{
  "id": 901,
  "status": "completed",
  "account": {
    "id": 42,
    "platform": "meta",
    "name": "Main Meta Account",
    "external_id": "act_123456",
    "account_code": "META-KZ-01",
    "currency": "USD"
  },
  "amounts": {
    "funding_base": 500000.0,
    "account_credit": 952.38,
    "platform_fee": 25000.0,
    "agency_rebate": 0.0,
    "total_fee": 25000.0,
    "vat": 0.0,
    "wallet_debit": 525000.0
  },
  "currencies": {
    "wallet": "KZT",
    "account": "USD"
  },
  "commission": {
    "platform_fee_percent": 5.0,
    "agency_rebate_percent": 0.0,
    "total_fee_percent": 5.0,
    "vat_percent": 0.0
  },
  "exchange_rate": {
    "rate": 525.0,
    "base_currency": "USD",
    "quote_currency": "KZT"
  },
  "created_at": "2026-07-16T09:15:00Z"
}
```

Financial field definitions:

| Field | Definition |
|---|---|
| `funding_base` | Base amount used to calculate fees, in wallet currency |
| `account_credit` | Amount credited to the advertising account, in account currency |
| `platform_fee` | Envidicy fee amount |
| `agency_rebate` | Agency rebate amount included in the total fee |
| `total_fee` | Platform fee plus agency rebate |
| `vat` | VAT amount |
| `wallet_debit` | Total wallet debit: base amount + total fee + VAT |

The exchange rate stored on a topup is the authoritative applied transaction rate.

### Account funding events

```http
GET /funding-events
```

Required scope: `finance:read`

Optional filter: `account_id`.

Funding events represent actual account credits. They are an append-only ledger:

- positive amount — funding;
- negative amount — reversal;
- `source_type=topup` — generated from a completed client topup;
- `source_type=admin_manual` — recorded manually by Envidicy;
- `reversal_for_event_id` — identifies the original event being reversed;
- `voided_at` — original event was voided.

### Finance summary

```http
GET /finance/summary
```

Required scope: `finance:read`

Returns the current client wallet and account-level funded, spent and remaining amounts. Platform balances can be `null` when the advertising platform does not expose them.

### Daily performance

```http
GET /performance/daily?date_from=2026-07-01&date_to=2026-07-31
```

Required scope: `performance:read`

The date range is required and cannot exceed 366 days. Optional filter: `account_id`.

Each row contains:

- account;
- date;
- currency;
- spend;
- impressions;
- clicks;
- last update time.

Data availability depends on platform synchronization status.

### Current exchange rates

```http
GET /exchange-rates/current
```

Required scope: `finance:read`

Current rates are informational. Never use the current rate to recalculate a historical transaction. Use `exchange_rate.rate` from `/account-topups`.

## Error format

Errors use an HTTP status code and a JSON body:

```json
{
  "detail": "API key does not have required scope: finance:read"
}
```

| Status | Meaning |
|---|---|
| `400` | Invalid filter, pagination or date range |
| `401` | Missing, invalid, expired or revoked API key |
| `403` | Required scope is missing |
| `404` | Resource not found |
| `429` | Rate limit exceeded |
| `500` | Unexpected server error |

Rate limit: 600 requests per minute per API key unless a different limit is configured for the environment. A `429` response includes `Retry-After`.

## Recommended synchronization pattern

1. Read `/accounts` and store Envidicy account IDs as stable internal identifiers.
2. Read immutable ledgers in ascending ID order.
3. Persist `next_cursor` after a page is processed successfully.
4. Retry the same page when processing fails.
5. Deduplicate records by endpoint and `id`.
6. Use `/wallet-transactions` for actual client wallet movements.
7. Use `/funding-events` for actual advertising account credits and reversals.
8. Use `/account-topups` for the commission, VAT and applied exchange-rate snapshot.
9. Refresh `/finance/summary` when a current balance view is needed.

Do not infer a completed payment from an invoice or request alone.

## Key security and rotation

- Use separate keys for separate external systems.
- Grant only the scopes each system needs.
- Store secrets in a server-side secret manager.
- Rotate keys before they expire.
- Create the replacement key first, deploy it, verify access, then revoke the old key.
- Revocation takes effect immediately.
- API calls are recorded in the Envidicy audit log with key, path, method, status and source IP.

## Versioning

The current stable version is `v1`. Backward-incompatible changes will be introduced under a new URL version. Fields can be added to existing responses without changing the version; consumers should ignore unknown fields.
