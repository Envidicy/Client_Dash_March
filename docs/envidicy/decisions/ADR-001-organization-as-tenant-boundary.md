---
document_id: ADR-001
title: Organization as Tenant Boundary
document_version: 1.0.0
document_status: ACCEPTED
decision_status: ACCEPTED
decision_class: ARCHITECTURE
h0_stage: H0.1
created_at: 2026-07-23
review_candidate_at: 2026-07-23
review_candidate_manifest: ./ADR-001-organization-as-tenant-boundary.review-candidate-0.2.0.md
review_opened_at: 2026-07-23
review_closed_at: 2026-07-23
review_target_snapshot: ./ADR-001-organization-as-tenant-boundary.review-target-0.2.1.md
review_target_sha256: e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f
formal_review_pack: ./ADR-001-organization-as-tenant-boundary.review-pack.md
acceptance_record: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md
decision_date: 2026-07-23
accepted_at: 2026-07-23
effective_from: 2026-07-23
decision_owner:
  role: Architecture Owner
  name: "Колядов Денис Викторович"
  human_identity_ref: person:envidicy:0002
domain_owner:
  role: Core Domain Owner
  name: "Колядов Денис Викторович"
  human_identity_ref: person:envidicy:0002
authoritative_contexts:
  - Core.Identity
  - Core.Tenancy
  - Core.Authorization
reviewers:
  - role: Product/Business Sponsor
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-roman-2026-07-23
  - role: Architecture Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
  - role: Core Domain Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
  - role: Platform Domain Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D02, ADR-001-D08, ADR-001-D09]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
  - role: Security Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
  - role: Engineering Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
  - role: Operations/SRE Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-001-D01, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-roman-2026-07-23
  - role: Finance Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-001-D07, ADR-001-D08, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-roman-2026-07-23
  - role: Data/Analytics Domain Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-001-D02, ADR-001-D08, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md#approval-attestation-denis-2026-07-23
constitution_snapshot:
  document_id: ENVIDICY-ARCH-PRINCIPLES
  document_version: 1.0.0
  constitution_version: 1.0.0
  sha256: 28a21326cc200d2e73c1f01982a96745780284d86194ffb4583c70b0d5990c81
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
addresses_findings:
  - id: BF-001
    scope: full
  - id: BF-007
    scope: AccessDelegation
    remainder: ADR-005
related_artifacts:
  - ../03-core-blueprint.md
  - ../05-cross-product-contracts.md
  - ../06-security-and-permissions.md
supersedes: null
superseded_by: null
exceptions: []
---

# ADR-001 — Organization as Tenant Boundary

Текущий статус — `ACCEPTED`. Formal human review точного snapshot завершён; все 9 обязательных role decisions имеют `APPROVE`, а promotion evidence зафиксировано отдельным Acceptance Record.

## 0. Краткое решение

Принято: `Organization` является единственной корневой tenant boundary Envidicy.

`User/Principal`, `Workspace`, `Project`, продукт, provider account и юридическое лицо не являются tenant boundary. Прямой доступ человека начинается с `OrganizationMembership`; tenant-to-tenant доступ существует только через отдельную ограниченную `AccessDelegation`. Деловая `OrganizationRelation` сама по себе никаких прав не выдаёт. Доступ Platform Operator является отдельным control-plane path и не подменяет membership/delegation или customer intent.

Решение является логическим и технологически нейтральным. Оно не выбирает database-per-tenant, row-level security, отдельные schema, microservices или иной способ физического размещения.

## 1. Контекст

### 1.1. Какой вопрос необходимо закрыть

[H0.0 finding BF-001](../governance/h0/H0-00-review-findings.md) зафиксировал:

> Organization считается tenant boundary; точная membership/binding модель ещё не принята.

Access-часть `BF-007` дополнительно требует развести:

- `AccessDelegation` — полномочие действовать между организациями;
- `ApproverSubstitution` — временную замену согласующего внутри Approval capability.

Без ADR-001 невозможно однозначно определить:

- кто владеет клиентскими данными, рекламными кабинетами, подключениями и будущими cross-product ресурсами;
- чем пользователь отличается от tenant;
- где начинается прямое membership;
- почему агентство не получает права на клиента только из факта деловой связи;
- как сервер определяет effective tenant;
- как tenant context сохраняется в jobs, events, analytics, exports и operator actions;
- какие решения должны остаться ADR-002–ADR-007.

### 1.2. Неоднозначность Review Candidate Blueprint

[Core Blueprint](../03-core-blueprint.md) одновременно:

- считает `Organization` tenant boundary;
- показывает `Membership` на уровне `Workspace`;
- вводит отдельный `ProjectMembership`;
- описывает агентство и клиента как разные Organizations;
- утверждает, что `OrganizationRelation` не выдаёт доступ.

ADR-001 должен закрыть только корневую tenant/access-семантику. Точная модель Workspace/Project остаётся ADR-002.

### 1.3. Read-only legacy evidence

Текущая схема является Advertising OS с embedded proto-Core:

| Legacy fact | Наблюдаемая неоднозначность |
|---|---|
| `users` одновременно представляет identity и клиента | User фактически используется как business owner/tenant |
| `agencies` существует отдельно от обычного клиента | tenant-модель различается по типу пользователя |
| `agency_members` связывает людей с агентством | прямое membership есть только для agency-контура |
| `agency_clients` связывает agency с `client_user_id` | деловая сторона представлена User, relation смешана с operational access |
| endpoint допускает только одно активное агентство клиента | legacy cardinality ошибочно может стать target-инвариантом |
| `ad_accounts` имеет `user_id`, `owner_type`, `agency_id` | owner, manager и beneficiary не разведены |
| `meta_connections` привязан к `user_id` | credential ownership смешан с human identity |
| analytics использует `client_id → users.id` | tenant isolation наследует legacy user-centric модель |

Источник read-only evidence: [db/schema.sql](../../../db/schema.sql). Полный inventory и mapping остаются H0.3; legacy-схема не является source of truth целевой архитектуры.

## 2. Scope

### 2.1. В scope ADR-001

- canonical tenant identity;
- tenancy classification защищённых ресурсов;
- authoritative owners Organization/Membership/Relation/Delegation;
- корневой direct membership;
- семантика межорганизационной связи и delegation;
- server-derived effective tenant и authority context;
- platform-scoped control plane;
- различие tenant owner, manager, beneficiary и external control holder;
- минимальные revoke, async и audit invariants;
- constraints для последующих ADR и migration.

### 2.2. Вне scope

| Вопрос | Где решается |
|---|---|
| Точная структура Workspace/Project, default scopes, bindings и `project_id` nullability | ADR-002 |
| BillingAccount, payer/beneficiary, Ledger, reservations, commissions и reconciliation | ADR-003 |
| IntegrationConnection bindings, credential ownership, OAuth refresh, health и lease | ADR-004 |
| Остальная Core/Shared/Product ownership matrix и `ApproverSubstitution` | ADR-005 |
| Exact command/event/audit wire envelope, outbox, versioning и actor taxonomy | ADR-006 |
| Database/schema/service topology и физическая tenant isolation | ADR-007 |
| Полный Legacy → Target inventory | H0.3 |
| Migration waves, backup/restore и recovery execution | H0.4–H0.7 |

## 3. Architecture Principles alignment

Architecture Decision Matrix создаётся после ADR-001–ADR-007. Эта таблица является candidate traceability и не заменяет Matrix.

| Principle Rule | Relationship | Decision ID | Conformance |
|---|---|---|---|
| AP-001-R01 | `I` | ADR-001-D01, ADR-001-D03 | Core owners tenant identity, membership и authority facts однозначны |
| AP-001-R02 | `C` | ADR-001-D03, ADR-001-D08 | projection/context не становится authority |
| AP-002-R01 | `S` | ADR-001-D03 | tenant-модель остаётся provider/product-neutral Core capability |
| AP-003-R01 | `I` | ADR-001-D01, ADR-001-D02, ADR-001-D09 | tenant/platform/multi-party classification обязательна |
| AP-003-R02 | `I` | ADR-001-D08 | effective tenant и resource chain выводятся сервером |
| AP-003-R03 | `I` | ADR-001-D06, ADR-001-D07, ADR-001-D08 | cross-tenant authority ограничена и доказуема |
| AP-003-R04 | `C` | ADR-001-D02, ADR-001-D05 | Project не заменяет tenant ownership |
| AP-003-X01 | `I` | ADR-001-D06, ADR-001-D07, ADR-001-D09 | relation/impersonation/operator context не создаёт bypass |
| AP-005-R01 | `C` | ADR-001-D03, ADR-001-D08 | mutation адресуется одному authoritative owner |
| AP-005-R02 | `C` | ADR-001-D03, ADR-001-D08 | чужой storage/context не используется как authority |
| AP-005-R03 | `C` | ADR-001-D08 | tenant/authority contract должен быть versioned |
| AP-008-R01 | `I` | ADR-001-D04, ADR-001-D07, ADR-001-D08, ADR-001-D09 | default deny и server-side enforcement |
| AP-008-R02 | `C` | ADR-001-D04, ADR-001-D08, ADR-001-D09 | non-human membership не заменяет workload identity и accountable owner grant |
| AP-008-R05 | `C` | ADR-001-D04, ADR-001-D07, ADR-001-D08 | membership, permission, entitlement, flag и approval остаются разными gates |
| AP-008-X01 | `C` | ADR-001-D08, ADR-001-D09 | operator, token и frontend context не обходят policy |
| AP-009-R01 | `C` | ADR-001-D07, ADR-001-D08, ADR-001-D10 | access/cross-tenant/transfer actions классифицируются и audit-ятся |
| AP-009-R02 | `C` | ADR-001-D07, ADR-001-D08, ADR-001-D10 | evidence сохраняет actor, tenant, beneficiary и authority |
| AP-010-R01 | `C` | ADR-001-D08, ADR-001-D09 | automation не расширяет tenant authority |
| AP-012-R01 | `S` | ADR-001-D04, ADR-001-D07, ADR-001-D08 | будущие critical access flows получают Golden Flow |
| AP-013-R01 | `C` | ADR-001-D01, ADR-001-D02, ADR-001-D04, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D10 | переход из user/agency legacy выполняется совместимо |
| AP-013-R02 | `C` | ADR-001-D01, ADR-001-D02, ADR-001-D04, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D10 | migration обязана различать recovery mechanisms |
| AP-013-R04 | `C` | ADR-001-D01, ADR-001-D02, ADR-001-D04, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D10 | legacy ownership не становится target architecture |
| AP-014-R01 | `C` | ADR-001-D03, ADR-001-D09 | логическая boundary не зависит от deployment |
| AP-014-R04 | `C` | ADR-001-D03, ADR-001-D08 | общий process/database не отменяет owner-controlled interface |
| APG-CLS-R01 | `S` | ADR-001-D02, ADR-001-D08, ADR-001-D10 | tenancy и material actions входят в общий Classification Registry на H0.2 |
| APG-CLS-R02 | `C` | ADR-001-D04, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10 | tenant/permission/cross-tenant/transfer actions default-high до reviewed classification |
| APG-CLS-R04 | `C` | ADR-001-D07, ADR-001-D08, ADR-001-D10 | beneficiary обязателен либо явно `N/A` |

ADR не создаёт исключений из Architecture Principles.

Machine-readable candidate traceability содержит одну связь `Principle Rule ID → ADR Decision ID` на запись, как требует `APG-MTX-R04`. Официальная Architecture Decision Matrix здесь не создаётся.

```yaml
candidate_matrix_links:
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-001-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d01}
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-002-R01, relationship: S, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-001-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d01}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-003-R03, relationship: I, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: AP-003-R03, relationship: I, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-003-R03, relationship: I, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-003-R04, relationship: C, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: AP-003-R04, relationship: C, adr_decision_id: ADR-001-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d05}
  - {principle_rule_id: AP-003-X01, relationship: I, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: AP-003-X01, relationship: I, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-003-X01, relationship: I, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-005-R01, relationship: C, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-005-R01, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-005-R02, relationship: C, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-005-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-005-R03, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-008-R01, relationship: I, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-008-R01, relationship: I, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-008-R01, relationship: I, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-008-R01, relationship: I, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-008-X01, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-008-X01, relationship: C, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-009-R01, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-009-R01, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-009-R01, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: AP-010-R01, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-010-R01, relationship: C, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-012-R01, relationship: S, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-012-R01, relationship: S, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-012-R01, relationship: S, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d01}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d01}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d01}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: AP-014-R01, relationship: C, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-014-R01, relationship: C, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-001-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d03}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: APG-CLS-R01, relationship: S, adr_decision_id: ADR-001-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d02}
  - {principle_rule_id: APG-CLS-R01, relationship: S, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: APG-CLS-R01, relationship: S, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d04}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d06}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d09}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-001-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d07}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-001-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d08}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-001-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-001-organization-as-tenant-boundary.md, adr_anchor: adr-001-d10}
```

## 4. Decision drivers

1. Клиентские данные и ресурсы должны принадлежать business party, а не login identity.
2. Один человек может работать в нескольких организациях и ролях.
3. Агентство и клиент должны оставаться независимыми tenant даже при глубокой операционной интеграции.
4. Клиент может сменить агентство без смены владельца данных и истории.
5. Cross-product Core должен одинаково обслуживать Advertising, Creative, Marketing, CRM и будущие продукты.
6. Tenant isolation должна сохраняться в API, jobs, events, analytics, exports, AI и operator tooling.
7. Relationship, permission, entitlement, approval и credential access нельзя смешивать.
8. Legacy migration должна быть возможна без big-bang.
9. Решение не должно заранее выбирать физическую topology.

## 5. Термины

| Термин | Канонический смысл |
|---|---|
| `Organization` | стабильная операционная сторона и canonical tenant Envidicy |
| `tenant owner` | единственная Organization, определяющая isolation/ownership `SINGLE_OWNER` resource |
| `effective tenant` | текущая Organization, относительно которой проверяется authority; для `SINGLE_OWNER` всегда tenant owner |
| `authority tenant` | участвующая Organization, чья per-action authority применяется к `MULTI_PARTY` resource |
| `authoritative domain owner` | модуль, имеющий право изменять семантический факт |
| `Organization Owner` | human/security role внутри Organization; не domain owner и не owner каждого ресурса |
| `Principal` | глобальный human/service/AI/system security subject |
| `OrganizationMembership` | прямое участие Principal в одной Organization |
| `OrganizationRelation` | направленная деловая связь двух Organizations без access authority |
| `AccessDelegation` | ограниченный отзывной cross-organization authorization grant |
| `ControlPlaneCaseGrant` | ограниченный отзывной grant `Core.Authorization`, разрешающий конкретное support/control-plane действие |
| `acting organization` | Organization, от имени которой действует Principal |
| `beneficiary` | сторона, чьи деньги, ресурс, legal/data interest или outcome затронуты действием |
| `manager` | Organization, выполняющая операционную работу, но не обязательно tenant owner |
| `external control holder` | сторона, контролирующая объект у внешнего provider; не Envidicy tenant owner автоматически |
| `platform scope` | явно классифицированный control-plane scope Envidicy, не выраженный специальным tenant |

`Organization` не обязана совпадать с юридическим лицом. Legal/billing profiles являются отдельными фактами соответствующих доменов.

## 6. Options considered

| Option | Плюсы | Почему не выбрана |
|---|---|---|
| **A. Organization as tenant boundary** | стабильное business ownership, multi-product, agency delegation, user multi-membership | выбрано |
| B. User as tenant | просто повторяет часть legacy | смешивает identity и business owner; не поддерживает команды и общие ресурсы |
| C. Workspace as tenant | удобный collaboration container | ломает org-level billing/connections и несколько workspace одной компании |
| D. Project as tenant | близко к продуктовой работе | project необязателен для org-level resources и не должен владеть identity/billing |
| E. Agency как parent tenant клиентов | удобно текущему agency UX | лишает клиента независимости, мешает нескольким агентствам и создаёт access inheritance |
| F. Product-specific tenant models | локальная скорость продукта | создаёт несовместимые identity/access/data boundaries |
| G. `NULL`/internal Organization как platform scope | мало новых сущностей | создаёт скрытый supertenant и ambiguous authorization |
| H. Database-per-tenant как определение tenancy | сильная физическая изоляция | не решает semantic authority, agency delegation, operators и multi-party flows |

## 7. Decision

Decision ID является постоянным и не зависит от номера раздела.

<a id="adr-001-d01"></a>
### ADR-001-D01 — Organization является canonical tenant boundary

`Organization.id` является стабильным, непереиспользуемым canonical tenant ID. `Core.Tenancy` является authoritative owner идентичности и lifecycle Organization.

Organization:

- не является User, Workspace, Project, продуктом или provider account;
- может представлять business, agency, partner или внутреннюю операционную сторону;
- не получает permission из своего descriptive type;
- не хранит продуктовые настройки и не подменяет legal/billing profile;
- сохраняет ownership и историю при любом lifecycle state;
- участвует в каждом authorization decision как отдельный lifecycle gate: suspended/closed state не разрешает новые обычные protected reads, mutations и side effects без явной audited allowlist для recovery, compliance или offboarding.

Изменение lifecycle инвалидирует связанные cached membership/delegation decisions. Точные states и переходы определяются Core Tenancy contract, но отсутствие такого контракта не означает `ALLOW`.

<a id="adr-001-d02"></a>
### ADR-001-D02 — Каждый protected resource имеет явную tenancy classification

Каждый protected resource type до Blueprint Conformance Review классифицируется как:

1. `TENANT / SINGLE_OWNER` — ровно один `tenant owner Organization`;
2. `TENANT / MULTI_PARTY` — перечислены participating Organizations, authoritative domain owner и per-action mutation, visibility, delegation и approval authority каждой стороны;
3. `PLATFORM` — явно platform-scoped и доступен только через control-plane policy.

`NULL`, User ID, Workspace ID, Project ID, provider external ID или специальный UUID не означают platform scope.

Default для product resource — `TENANT / SINGLE_OWNER`. Multi-party используется только когда общий ресурс является реальным domain fact, а не способом обойти delegation.

Для `SINGLE_OWNER`:

```text
effective_tenant_id = resource.tenant_owner_organization_id
```

При direct access `acting_organization_id = effective_tenant_id`; различие допускается только для delegated path D07 или control-plane support path D09.

Для `MULTI_PARTY` не создаётся скрытый synthetic co-owner. Действие указывает `authority_tenant_id` из participant set и проверяется по per-action authority matrix. Для `PLATFORM` effective tenant отсутствует (`N/A`) и применяется control-plane policy.

Участие Organization в `MULTI_PARTY` resource не означает автоматическую видимость всех его полей. Visibility определяется отдельной per-view/per-field policy и data classification; internal reason, security evidence и reviewer metadata одной стороны могут быть закрыты от другой.

`OrganizationMembership` является `TENANT / SINGLE_OWNER` фактом Organization. `OrganizationRelation` и `AccessDelegation` являются `TENANT / MULTI_PARTY` фактами участвующих Organizations. Обычный Advertising `AdAccount` по умолчанию остаётся `TENANT / SINGLE_OWNER`; pooled/multi-party модель требует отдельной product-specific partition/assignment модели и review.

<a id="adr-001-d03"></a>
### ADR-001-D03 — Domain ownership разделён

| Семантический факт | Authoritative owner |
|---|---|
| Principal, User, Identity, Session | `Core.Identity` |
| Organization identity/lifecycle | `Core.Tenancy` |
| OrganizationMembership | `Core.Tenancy` |
| OrganizationRelation | `Core.Tenancy` |
| RoleBinding, Grant, AccessDelegation, authorization decision | `Core.Authorization` |
| ControlPlaneCaseGrant / support authorization decision | `Core.Authorization` |
| Workspace identity | Core context, уточняемый ADR-002 |
| Project identity | `Core.Projects`, уточняемый ADR-002 |
| Product resource/profile/manager/beneficiary semantics | соответствующий Product domain |

Совместное размещение в одной базе или process не создаёт shared ownership. Другие модули используют owner-controlled commands/queries/events и не обновляют эти факты напрямую.

Support ticket/case workflow MAY принадлежать другому capability, а approval MAY позднее принадлежать Shared Approval по ADR-005. Финальный `ControlPlaneCaseGrant`, разрешающий действие, остаётся authoritative security fact `Core.Authorization`; его lifecycle, scope, expiry и revoke не выводятся только из статуса внешнего ticket/case.

<a id="adr-001-d04"></a>
### ADR-001-D04 — Прямой membership коренится в Organization

`Principal` является глобальным и может иметь несколько `OrganizationMembership`.

Для прямого tenant-доступа обязательна активная `OrganizationMembership(Principal, Organization)`. Workspace/Project/Module/Resource binding может только сузить или конкретизировать доступ; он не создаёт tenant authority без OrganizationMembership.

Для пары `(organization_id, principal_id)` существует один current membership aggregate; история изменений сохраняется versioned evidence. `Organization Owner` является RoleBinding/permission role, а не специальным membership-state.

Active Organization имеет минимум одного active human `Organization Owner`. Suspend/revoke последнего human Owner запрещён без атомарной передачи роли либо отдельного audited recovery workflow. Non-human membership не заменяет workload identity, accountable owner grant, limits и credential lifecycle по `AP-008-R02`.

Создание active Organization, первого active human Owner membership и соответствующего Owner RoleBinding является одной атомарной либо recoverably coordinated операцией. Organization не переходит в active state, пока этот инвариант не выполнен.

Tenant-to-tenant actor действует не через скрытое membership в target tenant, а через ADR-001-D07. Отдельный исчерпывающий путь для Platform Operator задаёт ADR-001-D09; он не является tenant membership или delegation.

Invitation не является active membership. Suspend/revoke membership блокирует новые действия и новые significant side effects, но не удаляет historical actor/authority evidence.

Tenant-owned service/AI Principal MAY иметь явную OrganizationMembership. Shared platform worker, исполняющий ранее принятый intent, не становится скрытым member каждой затронутой Organization. Его workload identity и grant проверяются вместе с сохранённым original authority path по D08; workload grant не является четвёртым authority path. Точный actor envelope остаётся ADR-006.

<a id="adr-001-d05"></a>
### ADR-001-D05 — Lower scopes не являются tenant и не пересекают Organization

Любой Workspace или Project, принятый ADR-002:

- разрешается ровно в одну Organization;
- не может одновременно принадлежать нескольким Organizations;
- не меняет tenant owner ресурса простым binding;
- не отменяет tenant ownership при отсутствии `project_id`.

Точная containment model, default Workspace/Project, reparenting, membership UX и допустимая nullability остаются ADR-002.

<a id="adr-001-d06"></a>
### ADR-001-D06 — OrganizationRelation не выдаёт доступ

`OrganizationRelation` является `TENANT / MULTI_PARTY`, versioned направленным binary business fact с:

- двумя Organization parties и явными ролями;
- relationship type;
- lifecycle;
- activation/termination authority и evidence;
- effective period.

Security-relevant change parties, roles, type или lifecycle создаёт новую неизменяемую authorization generation/version, а не только исправляет descriptive metadata.

Relationship может описывать agency-client, reseller, group/branch или иной business relation, но сам по себе:

- не выдаёт permission;
- не создаёт membership;
- не передаёт entitlement или credential access;
- не меняет resource ownership;
- не разрешает impersonation.

Завершённая или приостановленная relation делает связанные delegations неэффективными для новых действий, не стирая историю.

<a id="adr-001-d07"></a>
### ADR-001-D07 — Cross-organization authority выдаётся AccessDelegation

`AccessDelegation` является отдельным `TENANT / MULTI_PARTY`, versioned grant `Core.Authorization` от grantor Organization к grantee/acting Organization и ссылается на active compatible OrganizationRelation.

Обязательные semantics:

- grantor и grantee Organization;
- relation reference/security generation; grantor и grantee точно совпадают с parties relation, а type/roles relation разрешают направление delegation;
- actions/capabilities либо immutable version/digest role template с resolved action set;
- workspace/project/module/resource scope where applicable;
- financial/budget limits where applicable;
- valid from/until;
- author, approver, reason и evidence;
- revocation state/version;
- redelegation: в v1 только `false`; разрешение transitive redelegation требует superseding ADR.

Grantor обязан быть текущим tenant owner scoped `SINGLE_OWNER` ресурса либо участником `MULTI_PARTY` с явной delegation authority для соответствующего действия. Наличие relation, ownership другого ресурса или provider credential не создаёт такую authority.

```text
delegated authority =
  active OrganizationMembership actor внутри acting Organization
  ∩ actor scoped permission/grant внутри acting Organization
  ∩ active compatible OrganizationRelation
  ∩ active AccessDelegation
  ∩ lifecycle policy grantor, acting и affected Organizations
  ∩ applicable entitlement decision where required
  ∩ target resource/tenant policy
  ∩ requested action/resource scope
  ∩ auth-strength and approval gates
```

`AccessDelegation` не является `ApproverSubstitution`. Revocation delegation немедленно запрещает новые действия и новые significant side effects, но не переписывает уже сохранённый historical authority evidence.

Entitlement остаётся отдельным gate своего authoritative domain: ADR-001 не назначает его автоматически клиенту, агентству, payer или target Organization, и entitlement никогда само не создаёт access authority.

<a id="adr-001-d08"></a>
### ADR-001-D08 — Effective tenant и authority выводятся сервером

Client, route, body, query, job или event MAY передать tenant-context claim для маршрутизации, но этот claim не является доказательством доступа.

Текущий effective tenant определяется по D02:

- `SINGLE_OWNER` — authoritative current `resource.tenant_owner_organization_id`;
- direct path — acting Organization совпадает с effective tenant;
- delegated path — acting Organization может отличаться только по D07;
- `MULTI_PARTY` — `authority_tenant_id` входит в participant set и разрешён per-action authority matrix;
- `PLATFORM` — effective tenant имеет явное значение `N/A`, применяется D09.

Authoritative domain owner/handler перед чтением protected data, mutation и новым significant side effect разрешает и проверяет:

- original actor Principal;
- acting Organization;
- resource tenant owner Organization для `SINGLE_OWNER` либо participant set + authority tenant для `MULTI_PARTY`;
- active membership либо relation/delegation path;
- effective subject where applicable;
- beneficiary либо явное `N/A` по `APG-CLS-R04`;
- action/capability и resource scope;
- applicable entitlement where required, permission, policy, auth strength и approval как независимые gates;
- lifecycle policy всех Organizations, чьи resources/authority участвуют;
- current revoke/suspension/ownership state.

Admission decision и execution decision являются разными evidence points. Async operation сохраняет authority snapshot принятого intent и повторно проверяет актуальные revoke/ownership constraints перед новым significant side effect.

Составная операция получает независимый authorization decision для каждого protected resource/dependency и его tenant owner:

```text
operation ALLOW =
  AND(ALLOW decision for every affected protected resource and dependency)
```

Grant над одним ресурсом не переносится транзитивно на другой. Например, funding source, target AdAccount и IntegrationConnection binding проверяются независимо; их финансовая и credential-модель остаётся ADR-003/ADR-004.

Requested/current tenant claim отличается от исторического `tenant_at_occurrence`. После принятия authoritative факта tenant-at-occurrence/admission-owner и authority evidence неизменяемы: ownership transfer не переписывает event/audit history и не перенаправляет retry. Job хранит ожидаемые owner ID/version; несовпадение с current owner приводит к quarantine/manual resolution, а не к автоматическому переключению tenant.

Cross-tenant batch разделяется на tenant-isolated operations до исполнения. Missing, stale, conflicting или неразрешимый tenant/authority context приводит к deny, quarantine либо manual resolution — не к tenant inference.

Exact wire fields, event/audit envelope, outbox и actor taxonomy принимает ADR-006.

<a id="adr-001-d09"></a>
### ADR-001-D09 — Platform scope отделён от customer tenant

Platform-scoped resource/action имеет явную `PLATFORM` classification и отдельную control-plane policy. Platform scope не выражается:

- `organization_id = NULL`;
- специальной «глобальной» Organization;
- Envidicy internal Organization;
- shared admin token.

Envidicy internal Organization является обычным tenant для собственных business resources.

Каждый `PLATFORM` resource type имеет authoritative domain owner, control-plane action catalog, data classification и tenant-exposure policy. Platform wrapper, projection или index не снимает tenant classification с вложенных/derived tenant data; `PLATFORM` не означает глобальную читаемость tenant data.

Platform Operator использует отдельный Principal и для доступа к tenant resource получает ограниченный audited `ControlPlaneCaseGrant` из `Core.Authorization`: target Organization, resource/operation, action, reason/ticket, scope, expiry, auth strength и applicable approval. Operator не становится tenant owner и не действует скрыто «как клиент».

Case/ticket record является evidence/reference, но не authorization сам по себе. Доступ появляется только через active `ControlPlaneCaseGrant`, связанный с case/ticket и обязательными approvals; его current lifecycle, scope, expiry и revoke проверяет `Core.Authorization`.

`ControlPlaneCaseGrant` не создаёт customer intent/consent, financial authority или permission владельца ресурса. Для действия, которому нужен tenant-authorized intent/approval, operator может только исполнить, наблюдать, reconcile либо компенсировать уже отдельно авторизованную операцию в пределах case capability.

<a id="adr-001-d10"></a>
### ADR-001-D10 — Ownership, management и beneficiary являются разными осями

Не смешиваются:

- tenant owner Organization;
- authoritative domain owner;
- human role `Organization Owner`;
- managing Organization;
- beneficiary Organization/party;
- external provider control holder.

Для `TENANT / SINGLE_OWNER` только tenant owner определяет внутреннюю isolation boundary ресурса. Manager, beneficiary, provider container, connection binding или project binding сами по себе не дают доступа и не меняют tenant owner.

Для `TENANT / MULTI_PARTY` isolation и authority определяются participant set и per-action matrix D02; наличие нескольких участников не создаёт неявное co-ownership либо право одной стороны действовать за другую.

Ownership transfer является отдельным authorizable, audited и recoverable workflow с impact validation. Он не выполняется прямой заменой FK. Конфликт двух подтверждённых Envidicy tenant ownership claims блокирует новые material actions до manual resolution; auto-merge запрещён.

Product-specific представление manager, beneficiary и external holder принадлежит Product domain. Например, Advertising OS может иметь client-owned account под управлением agency, даже если provider container технически контролирует agency. Отличающийся external control holder является нормальным отдельным фактом и сам по себе не создаёт ownership conflict.

Expiry/revoke provider credential не меняет tenant owner, acting Organization, beneficiary или исходный authority path операции. Substitute connection требует отдельного подтверждённого binding/authority и не выбирается автоматически по совпавшему external account ID; OAuth/lease mechanics остаются ADR-004.

Tenant/permission change, cross-tenant действие и ownership transfer считаются `critical/material/consequential` до reviewed classification по `APG-CLS-R02`.

## 8. Authorization semantics

Допустимы ровно три верхнеуровневых authority path для выполнения protected actions: `DIRECT`, `DELEGATED`, `CONTROL_PLANE_SUPPORT`.

`DIRECT` и `DELEGATED` могут выражать tenant-authorized business intent. `CONTROL_PLANE_SUPPORT` выражает только ограниченную control-plane authority и не создаёт customer intent, consent, ownership, financial authority или tenant permission.

Ни один path не является fallback другого. `CONTROL_PLANE_SUPPORT` не заменяет `DIRECT` или `DELEGATED` там, где операция требует tenant-authorized intent.

Внутренний worker может исполнять intent только со своей workload identity/grant и сохранённым исходным authority evidence; это не четвёртый path и не новое tenant membership.

### 8.1. Direct access

```text
DIRECT ALLOW =
  authenticated Principal
  ∩ active OrganizationMembership in effective/authority tenant Organization
  ∩ scoped permission/grant
  ∩ accountable workload-owner grant where actor is non-human
  ∩ organization lifecycle permits action
  ∩ applicable entitlement decision where required
  ∩ resource policy
  ∩ sufficient auth strength
  ∩ required approval
  ∩ no explicit deny
```

### 8.2. Delegated access

```text
DELEGATED ALLOW =
  authenticated Principal
  ∩ active OrganizationMembership in acting Organization
  ∩ actor scoped permission/grant in acting Organization
  ∩ accountable workload-owner grant where actor is non-human
  ∩ active compatible OrganizationRelation between grantor and grantee
  ∩ active AccessDelegation
  ∩ delegated action/resource scope
  ∩ lifecycle policy grantor, acting and affected Organizations
  ∩ applicable entitlement decision where required
  ∩ target resource/tenant policy
  ∩ sufficient auth strength
  ∩ required approval
  ∩ no explicit deny
```

### 8.3. Control-plane support

```text
CONTROL_PLANE_SUPPORT ALLOW =
  individual authenticated platform Principal
  ∩ platform-scoped permission
  ∩ active Core.Authorization ControlPlaneCaseGrant bound to tenant/resource/operation/action
  ∩ existing tenant-authorized intent/approval where required
  ∩ current owner/beneficiary/resource match
  ∩ organization lifecycle and control-plane policy
  ∩ sufficient auth strength and applicable approval
  ∩ no explicit deny
```

Этот path не выдаёт общий tenant-доступ и не заменяет direct/delegated authority исходной business-операции.

### 8.4. Composite operations

Если команда затрагивает несколько protected resources, итоговый `ALLOW` требует `ALLOW` для каждого ресурса и соответствующего authority path. Право на AdAccount не является правом на BillingAccount/Funding Source или IntegrationConnection, и наоборот.

### 8.5. Обязательная deny matrix

| Сценарий | Результат |
|---|---|
| Actor передал чужой `organization_id` | `DENY`; ID не является authority |
| Relation active, delegation отсутствует | `DENY` |
| Parties/roles/security generation relation не совпадают с delegation | `DENY` |
| Delegation read-only, запрошен funding/write | `DENY` |
| Employee удалён из acting Organization | `DENY` новых действий |
| Delegation отозвана после enqueue | остановка до нового side effect; уже отправленный unknown result идёт в reconciliation |
| Grant разрешает AdAccount, но не funding source/connection | `DENY` составной операции |
| Acting/resource-owner/authority-tenant Organization lifecycle не разрешает действие | `DENY`, кроме явной recovery/compliance allowlist |
| Resource связан с Project другого tenant | `DENY` и integrity incident |
| Два подтверждённых Envidicy tenant ownership claim конфликтуют | quarantine/manual ownership resolution |
| External control holder отличается от tenant owner | не конфликт автоматически; product-specific validation |
| Platform Operator имеет ticket/case, но не active ControlPlaneCaseGrant | `DENY`; case record не является authorization |
| Case grant есть, но отсутствует обязательный tenant intent/approval | `DENY` создания/исполнения business intent |
| Job потерял authority context | dead-letter/quarantine, не inference |
| Expected owner/version job отличается от current owner | quarantine; retry не перенаправляется |
| Credential истёк; найден connection другой Organization | `DENY`; автоматический credential fallback запрещён |
| Batch содержит несколько tenant | split до execution |
| Requested resource принадлежит другому tenant | opaque not-found/deny без утечки существования |
| Relation завершена после необратимого provider call | blind retry запрещён; только observe/reconcile/approved compensation |

## 9. Consequences

### 9.1. Positive

- единая tenant boundary для всех продуктов;
- client/agency independence;
- user может работать в нескольких Organizations;
- relation, access, entitlement, approval и credentials разделены;
- ресурсы не меняют владельца при смене manager/agency/project;
- async, analytics и operator tooling получают единый isolation contract;
- physical topology можно менять без смены tenant semantics.

### 9.2. Negative / trade-offs

- каждый protected resource и contract обязан нести/разрешать tenant ownership;
- agency UX требует explicit acting Organization и delegation;
- authorization нельзя проверить один раз только в UI или enqueue;
- revoke/cache invalidation становятся critical security behavior;
- legacy `user_id`/`agency_id` mapping потребует quarantine неоднозначных записей;
- shared/pool resource требует честной multi-party либо product-specific assignment модели;
- ownership transfer становится workflow, а не простой административной правкой.

### 9.3. New obligations

- до Blueprint Conformance Review классифицировать все protected resource types текущего Blueprint; в H0.2 перенести результат в общий Classification Registry, обязательный по `APG-CLS-R01`;
- в H0.6 проверить полноту mapping classification → implementation controls → negative tests;
- включить OrganizationMembership/Relation/Delegation в ownership register;
- определить versioned tenant/authority contracts в ADR-006;
- включать tenant key во все tenant-owned cache/projection/index namespaces;
- проверять tenant isolation в analytics, export, AI и support tooling;
- определить SLO безопасной invalidation membership/delegation;
- создать Golden Flows onboarding/invite/revoke и agency delegation в H0.2;
- отразить legacy deviations и exit conditions в H0.3/H0.4.

## 10. Security, data and compliance impact

| Threat | Control |
|---|---|
| IDOR / подмена tenant ID | server-derived resource ownership и default deny |
| Confused deputy агентства | acting Organization + directed delegation + intersection of authority |
| Composite operation наследует лишнее право | независимый decision для каждого funding/account/connection resource |
| Relationship accidentally grants access | D06 запрещает access semantics relation |
| Stale membership/delegation cache | current check перед material side effect и bounded invalidation |
| Job/event теряет или меняет tenant | immutable tenant-at-occurrence + expected owner/version; missing/mismatch blocks execution |
| Analytics/export leak | source tenant policy сохраняется в projections и exports |
| Shared provider credential fallback | substitute connection требует отдельного binding/authority; никакого tenant inference по external ID |
| Platform superadmin | separate platform Principal + case-scoped audited grant + исходный tenant intent where required |
| Platform wrapper раскрывает tenant data | nested/derived data сохраняют tenant classification и exposure policy |
| Ownership changed during retry | execution revalidation; quarantine/manual resolution |
| Impersonation hides actor | original actor и authority path сохраняются |
| Multi-party ambiguity | explicit participants and mutation/approval authority |

Organization является security/ownership boundary, но не автоматически legal entity или data residency zone. Legal profile, retention, purpose, residency и billing party остаются явными domain facts и policy.

## 11. Compatibility, migration and recovery

Принятие ADR не меняет production code/schema/data и не требует rollback.

Будущая migration следует:

```text
expand → map/backfill → shadow/compare → cutover → observe → contract
```

Минимальные constraints:

1. Каждая legacy agency/client/business party получает однозначный target Organization либо `UNRESOLVED/QUARANTINED`.
2. Legacy `agency_clients` является candidate OrganizationRelation, но не создаёт AccessDelegation автоматически.
3. `agency_members` является candidate OrganizationMembership.
4. Legacy account access может стать scoped grant только после explicit validation.
5. `ad_accounts.user_id/agency_id/owner_type` не определяет target owner без reviewed mapping.
6. Legacy user-owned connection не переносится в другую Organization по факту agency relation.
7. Ambiguous ownership, multiple active claims и orphan data не исправляются silent default.
8. Temporary dual-read/dual-write является Migration Deviation с owner и exit condition, не новым target owner.

| Recovery mechanism | ADR-001 acceptance | Будущая migration |
|---|---|---|
| Feature rollback | `N/A` — реализации нет | compatibility resolver/flag where applicable |
| Application rollback | `N/A` | additive schema/contracts в rollback window |
| Read/cutover rollback | `N/A` | возврат к previous resolver при сохранении shadow compare |
| Data compensation | `N/A` | versioned correction tenant mapping; без удаления history |
| Disaster Recovery | `N/A` | определяется H0.4 с RPO/RTO/restore evidence |

## 12. Affected modules and contracts

Изменения frozen Blueprint/Contracts сейчас не выполняются. После принятия всех ADR они проходят Matrix и Blueprint Conformance Review.

| Artifact/module | Impact | Required follow-up |
|---|---|---|
| Core.Identity | Principal остаётся global, не tenant owner | отразить OrganizationMembership boundary |
| Core.Tenancy | owner Organization, Membership, Relation | привести diagram/ownership к D01/D03/D04/D06 |
| Core.Authorization | owner Grant/Delegation/ControlPlaneCaseGrant/decision | versioned authorization contract |
| Core.Projects | lower scope одного tenant | ADR-002 |
| Core.Billing | tenant/payer/beneficiary constraints | ADR-003 |
| Core.Integration Vault | connection/credential tenancy constraints | ADR-004 |
| Shared Jobs/Events/Audit | tenant authority propagation | ADR-006 |
| Advertising OS | org-owned AdAccount; manager/beneficiary/external holder separated | product contract/Golden Flows |
| Analytics/Exports/AI | tenant policy preserved in derived data | data contracts and negative tests |
| Security Blueprint | direct/delegated/operator decision paths | Blueprint Conformance Review |
| Cross-product Contracts | canonical tenant/authority semantics | ADR-006 + contract versioning |

## 13. Validation

### 13.1. Evidence для принятия ADR

- exact Accepted Constitution snapshot зафиксирован в metadata;
- BF-001 и access-часть BF-007 имеют явные Decision IDs;
- все Decisions трассируются к Principle Rules;
- исключения из Principles отсутствуют;
- direct/delegated/control-plane/composite semantics и deny matrix рассмотрены Security reviewer;
- effective tenant однозначен для `SINGLE_OWNER`, `MULTI_PARTY` и `PLATFORM`;
- владельцы Organization/Membership/Relation/Delegation однозначны;
- out-of-scope вопросы переданы конкретным ADR;
- read-only legacy evidence не выдано за target architecture;
- reviewers фиксируют решения, даты и evidence refs.

### 13.2. Обязательства H0.2/H0.6

Design/test plan должен покрыть:

- атомарный/recoverably coordinated bootstrap Organization + first human Owner membership/RoleBinding;
- запрет orphan Organization при revoke последнего human Owner;
- приглашение, suspend и revoke member;
- lifecycle Organization и recovery/compliance allowlist;
- membership одного Principal в нескольких Organizations;
- relation без delegation;
- несовместимые parties/roles relation и delegation;
- scoped agency delegation и revoke;
- employee removal при active agency delegation;
- независимую authority funding source, AdAccount и IntegrationConnection;
- ticket/case без ControlPlaneCaseGrant и operator grant без customer intent/approval;
- async job после revoke/ownership change и запрет retarget retry;
- credential loss без fallback на connection другой Organization;
- analytics/export tenant isolation;
- multi-party resource authority и ограниченную per-view/per-field visibility;
- opaque denial чужого resource;
- ownership transfer/conflict quarantine.

Executed evidence требуется только на соответствующем migration/release gate, не для принятия ADR.

## 14. Intentionally deferred decisions

ADR-001 считается полным без ответов на следующие вопросы:

- сколько Workspace имеет Organization и обязателен ли default Workspace;
- обязателен ли Project для конкретного resource type;
- можно ли move/reparent Project и какие bindings сохраняются;
- где физически применяется RLS/sharding/database-per-tenant;
- точный wire format tenant/actor/beneficiary/delegation fields;
- как устроены Billing payer/source/beneficiary и financial delegation;
- можно ли share IntegrationConnection и кто выполняет OAuth refresh;
- какие product-specific OrganizationRelation types и capabilities существуют;
- какой migration wave первой вводит compatibility mapping.

Эти вопросы не могут переопределить D01–D10 без superseding ADR.

## 15. Review triggers

ADR пересматривается при:

- предложении User/Workspace/Project как tenant;
- cross-organization Workspace/Project;
- co-ownership обычного product resource;
- nested Organization с inherited access;
- organization merge/split/ownership transfer;
- transitive redelegation;
- изменении platform operator/control-plane модели;
- data residency requirement, меняющем tenant boundary;
- tenant isolation или confused-deputy incident;
- новом multi-party resource class;
- невозможности безопасно разрешить tenant в async execution.

## 16. Acceptance evidence

Условия принятия выполнены:

1. Content-addressed Review Candidate и immutable formal-review target сохранены.
2. Все 9 role decisions имеют `APPROVE`, дату и evidence ref.
3. Противоречия с Constitution и незадокументированные `E` отсутствуют.
4. Candidate Matrix mapping содержит 82 нормализованные Rule–Decision связи; paths и anchors разрешимы.
5. Exact reviewed/accepted hashes и promotion conformance зафиксированы в Acceptance Record.
6. ADR-001 включается в финальный H0.1 Acceptance Manifest только вместе с остальными ADR, Matrix и Blueprint Conformance Review.

Принятие ADR-001 не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, schema или production data.
