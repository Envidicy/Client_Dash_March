# H0.0 Baseline Review Findings

Статус: `Complete`

Baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

Дата review: `2026-07-23`

## 1. Назначение

Документ фиксирует вопросы, обнаруженные при read-only cross-document review. Они не решаются скрыто в H0.0: каждый вопрос либо получил временное baseline-правило, либо передан в один из семи H0.1 ADR.

Наличие этих findings не мешает статусу `Review Candidate`, потому что они явны и не разрешают разработку. Они мешают статусу `Accepted` до соответствующего ADR и Blueprint Conformance Review.

## 2. Терминология горизонтов

`H0.x` зарезервирован исключительно за Architecture Governance Framework.

Продуктовые горизонты обозначаются:

```text
PH0 — сейчас, ориентир 0–3 месяца
PH1 — следующий фокус, ориентир 3–6 месяцев
PH2 — расширение основного цикла, 6–12 месяцев
PH3 — опциональный рост, 12–24 месяца
PH4 — стратегическая опция без календарного обязательства
```

## 3. Handoff в H0.1

| Finding | Тема | Затронутые документы | H0.1 owner | Временное baseline-правило |
|---|---|---|---|---|
| BF-001 | Organization tenant и membership root | Core, Contracts, Security | ADR-001 | Organization считается tenant boundary; точная membership/binding модель ещё не принята |
| BF-002 | Workspace/Project scope и nullability | Core, Shared, Contracts, Security | ADR-002 | `project_id` обязателен только для project-owned resource; цепочка Project→Workspace→Organization всегда проверяется сервером |
| BF-003 | Plan, Subscription, Entitlement, usage metering ownership | Core, Boundaries, Portfolio Registry | ADR-003 + ADR-005 | Entitlement/Plan относятся к Module capability; Billing владеет ledger/invoice/payment; ownership Subscription и usage aggregation остаётся open |
| BF-004 | Financial и provider reconciliation | Core, Contracts, Advertising | ADR-003 + ADR-005 | различаются `BillingReconciliationCase` и `FundingReconciliationCase`; контракт связи принимается позднее |
| BF-005 | Vault, OAuth refresh и health | Core, Shared, Security | ADR-004 | Vault — authoritative secret/auth metadata store; Runtime выполняет внешние вызовы; write protocol и health ownership остаются open |
| BF-006 | Approval ownership и namespace | Shared, Contracts, Portfolio Registry | ADR-005 | Approval рассматривается как Shared Platform capability; `core.approval.*` не является утверждённым namespace |
| BF-007 | Два значения Delegation | Core, Shared, Security | ADR-001 + ADR-005 | `AccessDelegation` и `ApproverSubstitution` считаются разными понятиями и не должны использовать одну сущность |
| BF-008 | Notification Delivery Gateway | Core, Shared, Portfolio Registry | ADR-005 | Core Notifications владеет intent/inbox/preferences; точная граница внешней доставки остаётся open |
| BF-009 | Data Platform vs product semantics | Shared, Portfolio Registry | ADR-005 | продукт владеет domain schema/metric definition; Data Platform — storage, lineage и projections |
| BF-010 | Recommendation ownership | Shared, Contracts, Portfolio Registry | ADR-005 | recommendation остаётся product-owned; shared engine может выдавать proposal/evidence без transactional ownership |
| BF-011 | Atomic critical Audit evidence | Core, Contracts, Security | ADR-006 | owning domain обязан атомарно сохранить изменение и audit/outbox evidence; центральная форма Core Audit требует ADR |
| BF-012 | Event versioning и optional envelope fields | Shared, Contracts | ADR-006 | контракт в `05-cross-product-contracts.md` является candidate; major/minor и nullability принимаются ADR |
| BF-013 | Actor taxonomy | Core, Contracts, Security | ADR-006 | provisional enum: `human | service | ai | system`; original/effective actor хранятся отдельно |
| BF-014 | ранний funding hardening зависит от Approval/Entitlements, стоящих в PH1 | Security, Portfolio Registry, Roadmap | H0.5 | Delivery Plan обязан либо поднять минимальные gates до funding hardening, либо описать временный legacy adapter и срок удаления |

## 4. Seven-ADR coverage

| ADR | Покрываемые findings |
|---|---|
| ADR-001 Organization as Tenant Boundary | BF-001, access-часть BF-007 |
| ADR-002 Workspace and Project Context | BF-002 |
| ADR-003 Core Billing and Ledger | BF-003, BF-004 |
| ADR-004 Integration Vault and Runtime | BF-005 |
| ADR-005 Core/Shared/Product Ownership | BF-003, BF-004, BF-006–BF-010 |
| ADR-006 Event and Audit Architecture | BF-011–BF-013 |
| ADR-007 Modular Monolith First | физические границы всех перечисленных contexts |

BF-014 является обязательным constraint H0.5 и проверяется H0.6.

## 5. Review conclusion

Содержательно документы достаточно зрелы для Baseline Freeze. Они **не готовы к статусу Accepted** до:

1. Architecture Principles;
2. семи ADR;
3. исправления/уточнения документов по результатам ADR;
4. Blueprint Conformance Review.
