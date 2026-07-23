# PRD: `<Product / Module>`

```text
Status: Draft | Review | Accepted | Superseded
PRD version:
Module ID:
Product owner:
Engineering owner:
Design/Data/Security reviewers:
Created:
Last reviewed:
Target gate:
Related Module Card / ADR / contracts:
```

## 1. Executive summary

Коротко: пользователь, проблема, предлагаемое изменение и измеримый результат.

## 2. Problem and evidence

- Target segments/personas:
- Jobs to be done:
- Current workflow and alternatives:
- Pain, frequency and business impact:
- Research/usage/payment evidence:
- Baseline metrics:

## 3. Goals and metrics

### Primary outcome

- Metric:
- Baseline:
- Target and evaluation window:

### Guardrails

- quality:
- cost:
- reliability:
- security/compliance:

### Kill/stop criteria

-

## 4. Scope

### In scope

-

### Non-goals

-

### Assumptions and open questions

-

## 5. User journeys

Для каждого journey:

```text
actor
preconditions
trigger
happy path
validation/errors
empty/degraded/manual states
permissions and approvals
success signal
```

## 6. Functional requirements

| ID | Requirement | Priority | Acceptance evidence |
|---|---|---|---|
| FR-001 | | Must/Should/Could | |

## 7. Domain model and ownership

| Entity | Definition | Owner | Lifecycle | Invariants |
|---|---|---|---|---|
| | | | | |

- Tenant scope:
- Source of truth:
- Cross-product bindings:
- Glossary additions/changes:

## 8. State machines and business rules

- States/transitions:
- Idempotency rules:
- Concurrency rules:
- Financial/FX/tax rules:
- Manual override and reversal:
- Unknown/uncertain outcome handling:

## 9. Permissions and audit

| Action | Permission | Scope | Step-up/approval | Audit evidence |
|---|---|---|---|---|
| | | | | |

## 10. APIs, events and integrations

### Commands/queries provided

-

### Events emitted/consumed

-

### External integrations

| Provider | Capability | Credentials | Failure mode | Retry/rate limit | Owner |
|---|---|---|---|---|---|
| | | | | | |

- Compatibility/deprecation:
- Raw/normalized mapping:

## 11. Data, analytics and AI

- Product events and funnel:
- Source/lineage/freshness:
- Metric definitions and attribution window:
- Data classification/retention/deletion:
- AI use case and autonomy level:
- Model/prompt/schema versioning:
- Evaluation, confidence and human correction:
- Cost/quota guardrails:

## 12. Non-functional requirements

| Area | Requirement / SLO |
|---|---|
| Availability | |
| Latency | |
| Throughput/scale | |
| Durability | |
| Consistency | |
| Security/privacy | |
| Observability | |
| Accessibility/localization | |
| Recovery | |

## 13. Migration and rollout

- Current-state mapping:
- Expand/backfill/shadow/cutover/contract plan:
- Feature flag/entitlement:
- Pilot cohort:
- Data validation/reconciliation:
- Rollback and kill switch:
- Support/runbook:
- Deprecation window:

## 14. Test and acceptance plan

- Unit/domain invariants:
- Contract tests:
- Integration/provider fixtures:
- Tenant/permission tests:
- E2E golden flows:
- Failure/retry/idempotency tests:
- Load/recovery tests:
- Product outcome evaluation:

## 15. Risks and decisions

| Risk/open decision | Impact | Mitigation/option | Owner | Due |
|---|---|---|---|---|
| | | | | |

## 16. Definition of Done additions

Перечислить специфические критерии сверх общего DoD Envidicy.

