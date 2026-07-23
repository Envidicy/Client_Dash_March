# Event Contract: `<domain.aggregate.fact.v1>`

```text
Status: Draft | Review | Accepted | Deprecated
Producer/owner:
Schema version:
Data classification:
Partition/ordering key:
First published:
Deprecation date:
Related ADR/PRD:
```

## 1. Meaning

- Какой уже произошедший факт фиксирует событие:
- Aggregate и transition:
- Когда событие не публикуется:
- Business invariants:

## 2. Consumers

| Consumer | Purpose | Criticality | Max acceptable lag | Owner |
|---|---|---|---|---|
| | | | | |

## 3. Envelope

```json
{
  "event_id": "uuid",
  "event_type": "domain.aggregate.fact.v1",
  "schema_version": 1,
  "occurred_at": "UTC timestamp",
  "producer": "domain.context",
  "tenant_context": {
    "organization_id": "uuid",
    "workspace_id": null,
    "project_id": null
  },
  "actor": {
    "actor_type": "user | service | ai | system",
    "principal_id": "uuid",
    "effective_subject_id": null
  },
  "aggregate": {
    "type": "...",
    "id": "uuid",
    "version": 1
  },
  "correlation_id": "uuid",
  "causation_id": "uuid",
  "idempotency_key": "string",
  "data_classification": "internal",
  "payload": {}
}
```

## 4. Payload schema

| Field | Type | Required | Meaning | Classification | Example |
|---|---|---|---|---|---|
| | | | | | |

Запрещены secrets, binary blobs, полный raw provider payload и избыточные PII.

## 5. Example

```json
{}
```

## 6. Delivery guarantees

- Transactional outbox:
- Delivery: at least once;
- Ordering scope:
- Deduplication key: `event_id`;
- Retry/DLQ:
- Replay support:
- Retention:

## 7. Consumer requirements

- Idempotent handler:
- Unknown optional fields/enums:
- Out-of-order handling:
- Projection rebuild:
- Tenant and permission handling:
- Failure/runbook:

## 8. Versioning and rollout

- Compatible changes allowed:
- Migration from previous version:
- Dual-publish window:
- Contract tests:
- Deprecation communication:

## 9. Observability

- Produced/delivered/failed metrics:
- Consumer lag:
- Correlation tracing:
- Alert owner and thresholds:

