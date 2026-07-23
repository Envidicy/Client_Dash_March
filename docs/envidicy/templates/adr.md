# ADR-XXXX: `<Decision title>`

```text
Status: PROPOSED | ACCEPTED | REJECTED | DEPRECATED | SUPERSEDED
Date:
Decision owner:
Domain owner(s):
Reviewers:
Supersedes:
Superseded by:
Related PRD/contracts:
```

## 1. Context

Какое решение требуется, какие текущие ограничения и почему его нельзя оставить локальной деталью реализации.

## 2. Architecture Principles alignment

| Principle | Implements/supports | Violates/creates exception | Explanation and scope |
|---|---|---|---|
| AP-XXX | | | |

Если ADR нарушает Principle:

- почему стандартное решение неприменимо;
- минимальный scope исключения;
- risk owner;
- срок/trigger пересмотра;
- условия удаления исключения.

## 3. Decision drivers

- business/product goal;
- domain ownership;
- security/compliance;
- financial integrity;
- reliability/scale;
- migration/compatibility;
- team/operational constraints.

## 4. Options considered

### Option A — `<name>`

- Description:
- Advantages:
- Disadvantages/risks:
- Migration/operational impact:

### Option B — `<name>`

- Description:
- Advantages:
- Disadvantages/risks:
- Migration/operational impact:

## 5. Decision

Что именно принято. Указать границы, invariants и намеренно не решаемые вопросы.

## 6. Consequences

### Positive

-

### Negative/trade-offs

-

### New obligations

- contracts/tests/monitoring/runbook;
- owner and review trigger.

## 7. Security, data and compliance impact

- Tenant boundary:
- Permissions/audit:
- Data classification/retention:
- Secrets/financial implications:
- Required reviewers:

## 8. Compatibility, migration and recovery

```text
expand → backfill → shadow/compare → cutover → observe → contract
```

- Backward compatibility:
- Rollout:
- Feature rollback:
- Application rollback:
- Read/cutover rollback:
- Data compensation:
- Disaster recovery relevance:
- Irreversible steps:

## 9. Affected contracts and modules

| Module/contract | Change | Owner | Required action |
|---|---|---|---|
| | | | |

## 10. Validation

Какие измерения/тесты покажут, что решение сработало, и при каком trigger ADR нужно пересмотреть.
