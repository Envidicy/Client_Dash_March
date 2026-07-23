---
document_id: ADR-002
title: Workspace and Project as Working Context
document_version: 0.3.0
document_status: REVIEW_CANDIDATE
decision_status: PROPOSED
decision_class: ARCHITECTURE
h0_stage: H0.1
created_at: 2026-07-23
review_candidate_at: 2026-07-23
review_candidate_manifest: ./ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.md
review_opened_at: null
review_closed_at: null
review_target_snapshot: null
review_target_sha256: null
formal_review_pack: null
acceptance_record: null
decision_date: null
accepted_at: null
effective_from: null
human_approvals_recorded: false
revision_from:
  document_version: 0.2.0
  review_candidate_snapshot: ./ADR-002-workspace-project-as-working-context.review-candidate-0.2.0.snapshot.md
  review_candidate_sha256: f4d1ebb436aa4be5a7a421ed49ee458b47910cf6c033e35b061b076d058d4d38
  review_candidate_manifest: ./ADR-002-workspace-project-as-working-context.review-candidate-0.2.0.md
  review_candidate_manifest_sha256: 539bedaa838dbb0f4f341271babac89166adf7477d8f711f2049033e461a2ecb
  review_verdict: RETURN_WITH_REQUIRED_CHANGES
  formal_review_opened: false
  human_approvals_recorded: false
  approvals_carried_forward: false
  blocking_findings:
    - ADR-002-RC-0.2.0-P1-01
  non_blocking_findings: []
decision_owner:
  role: Architecture Owner
  name: "Колядов Денис Викторович"
  human_identity_ref: person:envidicy:0002
domain_owner:
  role: Core Domain Owner
  name: "Колядов Денис Викторович"
  human_identity_ref: person:envidicy:0002
authoritative_contexts:
  - Core.Tenancy
  - Core.Projects
  - Core.Authorization
reviewers:
  - role: Product/Business Sponsor
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-002-D01, ADR-002-D02, ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Architecture Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D01, ADR-002-D02, ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Core Domain Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D01, ADR-002-D02, ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Platform Domain Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Security Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D01, ADR-002-D02, ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Engineering Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D01, ADR-002-D02, ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Operations/SRE Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-002-D02, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Finance Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_decision_ids: [ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Data/Analytics Domain Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Advertising Product Domain Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Creative Intelligence Product Domain Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_decision_ids: [ADR-002-D03, ADR-002-D04, ADR-002-D05, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
    decision: null
    reviewed_at: null
    evidence_ref: null
constitution_snapshot:
  document_id: ENVIDICY-ARCH-PRINCIPLES
  document_version: 1.0.0
  constitution_version: 1.0.0
  sha256: 28a21326cc200d2e73c1f01982a96745780284d86194ffb4583c70b0d5990c81
dependency_snapshots:
  - document_id: ADR-001
    document_version: 1.0.0
    decision_status: ACCEPTED
    sha256: f130eee543cf7037ba138ae0924b643974221c6a4d9b865478edaf85eba80ebf
    acceptance_record_version: 1.0.1
    acceptance_record_sha256: 200b0f4ccdf204707b689092cfab93d1a532aef7cfeca3a75a1c27177cb5997c
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
addresses_findings:
  - id: BF-002
    scope: full
related_artifacts:
  - ../02-platform-boundaries.md
  - ../03-core-blueprint.md
  - ../04-shared-services.md
  - ../05-cross-product-contracts.md
  - ../06-security-and-permissions.md
  - ../07-module-registry.md
  - ../products/advertising-os.md
  - ../products/creative-intelligence.md
supersedes: null
superseded_by: null
exceptions: []
---

# ADR-002 — Workspace and Project as Working Context

Текущий статус — `REVIEW_CANDIDATE / PROPOSED`, document version `0.3.0`. Точное содержимое зафиксировано immutable snapshot и content-addressed manifest 0.3.0 после устранения blocking finding возвращённого Review Candidate 0.2.0. Этот статус ещё не открывает formal human review, не является `ACCEPTED`, не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, database schema или production data.

## 0. Краткое решение

`Workspace` и `Project` являются вложенными рабочими scopes одной `Organization`, но не tenant boundary и не самостоятельными authority paths.

- активная Organization имеет один или несколько Workspace и ровно один active default Workspace;
- `Core.Tenancy` является единственным authoritative writer выбора default Workspace и его version;
- Project принадлежит ровно одному Workspace и через него ровно одной Organization;
- универсального default Project нет;
- единственный direct-membership aggregate — `OrganizationMembership`;
- доступ ниже Organization задаётся `RoleBinding`/`Grant`, а не отдельными Workspace/Project memberships;
- каждый tenant resource имеет ровно один primary structural facet с stable `facet_id`, operational scope `ORGANIZATION`, `WORKSPACE` или `PROJECT` и versioned mobility policy;
- для `MULTI_PARTY` structural `facet_organization_id` отделён от per-action `authority_tenant_id`; facet/association/containment никогда не выбирают authority;
- canonical primary facet неизменяем по умолчанию; разрешённая смена lower anchor внутри `facet_organization_id` проходит отдельный material workflow, а смена structural Organization является transfer/migration;
- в canonical resolved context неприменимый `workspace_id`/`project_id` имеет семантику `N/A`; отсутствие required context не означает default, platform scope или authorization bypass;
- secondary binding к Project не меняет primary facet, tenant/domain owner, authority tenant, permission или entitlement;
- Project можно переместить только между Workspace одной Organization через отдельный material workflow; cross-organization move не является reparenting;
- historical structural scope, action-specific authority и attribution после facet move/transfer, participant change, Project reparent или archive не переписываются.

Решение уточняет ADR-001-D05 и не изменяет ADR-001-D01–D10.

## 1. Контекст

### 1.1. Какой вопрос закрывает ADR

[H0.0 finding BF-002](../governance/h0/H0-00-review-findings.md) требует:

> `project_id` обязателен только для project-owned resource; цепочка Project → Workspace → Organization всегда проверяется сервером.

ADR-001 уже принял:

- Organization как единственную tenant boundary;
- `OrganizationMembership` как корень direct tenant access;
- принадлежность каждого Workspace/Project ровно одной Organization;
- запрет менять tenant owner простым project binding;
- server-derived tenant/authority context;
- immutable historical authority evidence.

ADR-002 обязан определить lower scopes, не создавая вторую tenant- или membership-модель.

### 1.2. Противоречия Review Candidate Blueprint

Review Candidate документы одновременно:

- показывают `Membership` под Workspace;
- вводят отдельный `ProjectMembership`/`ProjectMember`;
- называют Workspace границей membership, subscriptions и settings;
- называют Project основным контекстом продуктовых данных;
- допускают Organization-level BillingAccount, Connection и другие ресурсы без Project;
- приводят command/event/job examples, где все три ID выглядят обязательными;
- не различают tenant ownership, domain ownership и operational scope;
- не определяют default scopes, inheritance и reparenting.

После принятия ADR-001 отдельный Workspace/Project membership как authority aggregate уже невозможен: lower-scope binding может только конкретизировать полномочия внутри существующего Organization authority path.

### 1.3. Read-only legacy evidence

Текущая система не имеет канонических Workspace/Project:

| Legacy fact | Архитектурный вывод |
|---|---|
| `campaigns` хранит контейнер медиаплана без tenant/workspace ownership | legacy Campaign нельзя автоматически объявить Core Project |
| `plans` и `fact_rows` связаны с `campaigns.id` | существующая группировка является product context, а не доказательством Project identity |
| `users.id` используется как client/owner | tenant и human identity смешаны |
| `agencies`, `agency_members`, `agency_clients` задают отдельную access-модель | target membership/binding нельзя выводить из legacy cardinality |
| `ad_accounts` содержит `user_id`, `owner_type`, `agency_id` | tenant owner, manager и project association не разведены |
| `agency_user_account_access` выдаёт resource access отдельно от общего scope contract | требуется mapping в OrganizationMembership/Delegation/Grant |
| analytics использует `client_id → users.id` | историческая attribution не имеет Project context |

Источник read-only evidence: [db/schema.sql](../../../db/schema.sql). Полный inventory и Legacy → Target Mapping остаются H0.3.

### 1.4. Возврат Review Candidate 0.1.0

Review Candidate 0.1.0 по полному SHA-256 `e4980984e8ffd3bf680066657da2f8f215d4e3ca15f96cd79d10a7689fe27a29` получил verdict `RETURN_WITH_REQUIRED_CHANGES`; formal review для него не открывался.

Возврат зарегистрировал:

- `ADR-002-RC-0.1.0-P1-01` — отсутствовала нормативная модель смены primary operational scope существующего resource;
- `ADR-002-RC-0.1.0-P2-01` — authoritative ownership и concurrency semantics выбора default Workspace требовали явной фиксации.

Snapshot и manifest 0.1.0 остаются immutable historical evidence. Версия 0.2.0 изменяет D02, D04–D06 и D08–D09, а также согласованные consequences, security/data/finance/recovery obligations, affected modules, traceability и validation только для закрытия и fail-closed усиления этих findings; human approvals не переносятся и остаются незаполненными.

### 1.5. Возврат Review Candidate 0.2.0

Review Candidate 0.2.0 по полному SHA-256 `f4d1ebb436aa4be5a7a421ed49ee458b47910cf6c033e35b061b076d058d4d38` получил verdict `RETURN_WITH_REQUIRED_CHANGES`; formal review для него не открывался.

Возврат зарегистрировал `ADR-002-RC-0.2.0-P1-01`: structural operational-scope facet `TENANT/MULTI_PARTY` resource был смешан с per-action `authority_tenant_id`, а generic модель допускала несколько canonical facets без stable `facet_id`.

Snapshot и manifest 0.2.0 остаются immutable historical evidence. Версия 0.3.0 разделяет один canonical primary structural facet и action-specific authorization context, синхронизирует D04–D10, supporting obligations, traceability и validation только для закрытия этого finding. Human approvals не переносятся и остаются незаполненными.

## 2. Scope

### 2.1. В scope

- authoritative owners Workspace, Project и lower-scope grants;
- containment и cardinality `Organization → Workspace → Project`;
- default Workspace и отсутствие универсального default Project;
- различие membership, authorization binding, resource scope и product association;
- semantic nullability `workspace_id`/`project_id`;
- immutability и controlled mobility canonical primary operational scope;
- один primary structural facet, typed secondary associations и запрет generic multi-facet fallback;
- независимые server-derived structural chain и per-action multi-party authorization context;
- explicit propagation scoped grants;
- Workspace/Project lifecycle;
- same-Organization Project reparenting;
- archive, async и historical-context invariants;
- constraints для product profiles, analytics и migration.

### 2.2. Вне scope

| Вопрос | Где решается |
|---|---|
| BillingAccount, subscription, payer/beneficiary, ledger и financial delegation | ADR-003 |
| IntegrationConnection ownership, ConnectionBinding, OAuth refresh и credential lease | ADR-004 |
| полная Core/Shared/Product ownership matrix, Module Registry и Entitlement ownership | ADR-005 |
| exact command/event/audit wire envelope, null-vs-omission, outbox и actor taxonomy | ADR-006 |
| database schema, RLS, sharding, services и physical isolation | ADR-007 |
| Golden Flow Contracts для bootstrap/access/multi-party authority/facet move/reparent/archive | H0.2 |
| полный Legacy → Target Mapping | H0.3 |
| migration execution, backup/restore и recovery validation | H0.4–H0.7 |

ADR-002 задаёт semantic obligations для последующих ADR, но не забирает их решения.

## 3. Architecture Principles alignment

Architecture Decision Matrix создаётся после ADR-001–ADR-007. Следующие связи являются candidate traceability и не заменяют Matrix.

| Principle Rule | Relationship | Decision IDs | Conformance |
|---|---|---|---|
| AP-001-R01/R02/R03/X01 | `I/C` | D01, D02, D03, D05, D09, D10 | owners, projections и writers разведены |
| AP-002-R01/R02/X01 | `C` | D03, D05, D09 | Core остаётся product-neutral |
| AP-003-R01–R04/X01 | `I/C` | D01, D02, D03, D04, D05, D06, D08, D09 | tenant, work scope и authority не смешиваются |
| AP-004-R01/R03/X01 | `S/C` | D03, D05, D09 | общий Project не создаёт скрытую product dependency |
| AP-005-R01–R03/R05 | `C` | D02, D04, D05, D06, D08, D09 | owners меняют state через contracts; default switch, primary-scope move и reparent intent идемпотентны |
| AP-008-R01/R02/R03/R05/X01 | `C` | D03, D04, D05, D06, D08, D09, D10 | default deny, least privilege и разные gates |
| AP-009-R01–R04/X01 | `I/C` | D02, D05, D06, D07, D08, D09, D10 | default/scope changes и historical evidence доказуемы |
| AP-010-R01/R04/X01 | `C` | D03, D06, D09 | worker/AI не получает скрытый scope |
| AP-011-R01–R04 | `C` | D05, D09, D10 | current hierarchy и historical attribution разделены |
| AP-012-R01–R03 | `C` | D02, D03, D07, D08, D09 | critical flows переданы H0.2 с test obligations |
| AP-013-R01/R02/R04/X01 | `C` | D05, D08, D10 | move/transfer/migration совместимы и восстановимы; irreversible step не разрешён |
| AP-014-R01/R04/X01 | `S/C` | D01, D03, D05, D09 | logical boundary не зависит от deployment |
| APG-CLS-R01/R02/R04 | `C` | D03, D04, D05, D07, D08, D09, D10 | access/scope changes default-high до H0.2 classification |
| APG-LEG-R01–R04 | `C` | D10 | legacy mismatch не становится target exception |

### 3.1. Machine-readable candidate traceability

```yaml
traceability_manifest:
  schema_version: 1
  canonical_set_id: ADR-002-TRACE-0.3.0
  merge_order:
    - principle_decision_links_part_1
    - principle_decision_links_part_2
    - principle_decision_links_part_3
  duplicate_tuple_policy: FORBIDDEN
  tuple_key: [principle_rule_id, adr_decision_id]
principle_decision_links_part_1:
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-002-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d01}
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-001-R01, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-001-R02, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-001-R03, relationship: I, adr_decision_id: ADR-002-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d01}
  - {principle_rule_id: AP-001-R03, relationship: I, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-001-R03, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-001-X01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-001-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-002-R01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-002-R01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-002-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-002-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-002-X01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-002-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-002-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d01}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-003-R01, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-003-R02, relationship: I, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-003-R03, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-003-R03, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-003-R03, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-003-R03, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-003-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-003-R04, relationship: I, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-003-R04, relationship: I, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-003-R04, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-003-X01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-003-X01, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-003-X01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-003-X01, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-003-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-004-R01, relationship: S, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-004-R01, relationship: S, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-004-R03, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-004-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-004-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-005-R01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-005-R01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-005-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-005-R02, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-005-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-005-R03, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-005-R03, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-005-R03, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-005-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-005-R05, relationship: C, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-005-R05, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-005-R05, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
```

Parts 2–3 расположены в Appendix A. Единственный canonical set получается только конкатенацией в `traceability_manifest.merge_order`; самостоятельное толкование отдельной part запрещено.

## 4. Decision drivers

- единственная tenant boundary и отсутствие lower-scope privilege escalation;
- единый cross-product work context без превращения Core в product model;
- поддержка прямого клиента, агентства, подрядчика и внутренних команд;
- явная nullability без fake/default Project;
- разделение ownership, authorization и correlation binding;
- разделение structural facet Organization и action-specific authority tenant;
- single-writer/versioned default Workspace selection;
- безопасные primary-scope move, Project reparent и archive semantics;
- исторически корректные audit, analytics и async execution;
- совместимый переход из user-centric Advertising OS;
- возможность начать с модульного монолита без shared-state ownership.

## 5. Options considered

### Option A — Organization без Workspace, Project напрямую под Organization

Плюсы:

- меньше сущностей;
- проще первая реализация.

Минусы:

- отсутствует нейтральный scope команды, модулей и настроек;
- будущие business units придётся моделировать продуктово;
- migration к нескольким operational containers изменит contracts.

Решение: отклонено.

### Option B — Workspace или Project как tenant/membership root

Плюсы:

- локально простая ACL-модель;
- UI может считать выбранный Project достаточным context.

Минусы:

- противоречит ADR-001;
- создаёт несколько tenant boundaries;
- revoke OrganizationMembership перестаёт быть полным;
- agency/shared workflows получают confused-deputy paths.

Решение: отклонено.

### Option C — Обязательный универсальный default Project

Плюсы:

- каждый product row получает `project_id`;
- проще backfill.

Минусы:

- org-level resources получают ложную семантику;
- `NULL` и default начинают скрывать неизвестное ownership/correlation;
- migration ambiguity маскируется вместо quarantine.

Решение: отклонено.

### Option D — Cross-organization shared Project

Плюсы:

- агентство и клиент видят один контейнер;
- меньше explicit bindings.

Минусы:

- нарушает ADR-001-D05;
- смешивает owner, manager и beneficiary;
- неразрешима единая inherited policy;
- Project превращается в скрытый multi-tenant resource.

Решение: отклонено.

### Option E — Nested work scopes внутри Organization с explicit scope classification

Плюсы:

- сохраняет единую tenant boundary;
- поддерживает org-, workspace- и project-level resources;
- один Project может коррелировать несколько продуктов без передачи ownership;
- lower grants, bindings и moves получают проверяемую семантику.

Минусы:

- resource types требуют явной классификации;
- Project move нуждается в impact registry и workflow;
- migration не может свести всё к одному nullable FK.

Решение: принято как proposed target.

## 6. Decision

Decision IDs постоянны и не зависят от номера раздела.

<a id="adr-002-d01"></a>
### ADR-002-D01 — Workspace и Project имеют canonical containment и одного owner

`Workspace` является tenant-owned operational container внутри одной Organization:

- authoritative owner identity, lifecycle и Organization containment — `Core.Tenancy`;
- `workspace_id` стабилен, не переиспользуется;
- `organization_id` неизменяем;
- Workspace имеет ровно одного tenant owner — содержащую Organization;
- Workspace не является tenant, membership или product.

`Project` является tenant-owned working context:

- authoritative owner identity, lifecycle и Workspace containment — `Core.Projects`;
- `project_id` стабилен, не переиспользуется;
- Project имеет ровно один current parent Workspace;
- tenant owner Organization фиксируется при создании и совпадает с Organization parent Workspace;
- tenant owner Project-а не меняется при reparenting внутри той же Organization;
- Project не может иметь нескольких parent Workspaces или Organizations.

```text
Organization 1 ── 0..N Workspace
Workspace    1 ── 0..N Project
Project      1 ── 1 Organization through verified Workspace containment
```

Нулевая cardinality Workspace допустима только до активации Organization; для active Organization D02 усиливает её до `1..N`. Физическое совместное размещение `Core.Tenancy` и `Core.Projects` не меняет ownership. Ни Product, ни Shared Service не обновляет Workspace/Project state напрямую.

<a id="adr-002-d02"></a>
### ADR-002-D02 — Active Organization имеет default Workspace, но не default Project

Organization в provisioning/draft lifecycle MAY ещё не иметь Workspace. До перехода Organization в active state выполняются оба инварианта:

```text
active Organization
  = at least one active human Organization Owner
  AND one or more active Workspace
  AND exactly one active default Workspace
```

Создание/активация Organization, первого Owner и default Workspace выполняется атомарно либо recoverably coordinated. Частичный результат не выдаётся за active Organization.

`Core.Tenancy` является единственным authoritative owner/writer выбора default Workspace и его monotonic default-selection version. Product, BFF, Shared Service и projection могут только читать этот факт через owner-controlled contract и не обновляют его напрямую.

Default Workspace:

- является явным stable reference на active Workspace той же Organization и имеет monotonic default-selection version;
- используется onboarding/UI как предложенный parent при явном создании scoped resource; UI передаёт выбранный concrete `workspace_id`;
- bare omission `workspace_id` сервером в current default не преобразуется;
- если будущий versioned contract введёт explicit `use_default_workspace`, admission фиксирует resolved Workspace ID и scope/default version в logical intent; retry использует первоначально зафиксированный ID, а не новый default;
- не является доказательством permission, tenant ownership или resource scope;
- не подставляется вместо отсутствующего `workspace_id` в уже созданном resource/job/event;
- меняется одной owner-controlled idempotent audited operation без автоматического перемещения Projects/resources;
- не переводится в non-active state при active Organization, пока той же recoverably coordinated operation не выбран active successor.

Default-switch intent содержит target `workspace_id`, idempotency/operation identity и expected default-selection version. Сервер повторно проверяет Organization/target Workspace lifecycle и authority, сериализует concurrent intents и отклоняет stale expected version вместо last-write-wins. Retry одного logical intent возвращает тот же resolved result; два разных concurrent intent не создают два default Workspace. Exact command/wire/concurrency representation остаётся ADR-006/ADR-007.

Универсального default Project нет. Workspace может не иметь Projects. Продуктовый onboarding MAY создать обычный Project явной командой, но `NULL`, omission или «последний выбранный Project» никогда не означают этот Project.

Compatibility Project, созданный migration-процессом, обязан иметь явный ID, доказанный общий business context, mapping rationale и Legacy Deviation/exit condition. Blanket-создание одного migrated Project на Organization запрещено; ambiguity остаётся в quarantine. Compatibility Project не участвует в default inference или authorization fallback.

<a id="adr-002-d03"></a>
### ADR-002-D03 — Project является нейтральным work context, а не membership/access boundary

Core Project отвечает только за универсальные факты:

- stable identity;
- tenant owner Organization;
- current parent Workspace;
- neutral lifecycle;
- human-readable name/code;
- neutral working defaults such as timezone, locale и currency preference;
- containment/scope version.

Timezone, locale и currency являются рабочими defaults. Они не являются authoritative tax, legal, FX, billing или Ledger facts; material operation фиксирует применимый snapshot в owning domain.

Product-specific semantics принадлежат Product:

- Advertising OS — advertising settings, AdAccount/MediaPlan/Experiment associations;
- Creative Intelligence — Brand/Research profile, sources, hypotheses;
- CRM — pipeline/client-specific profile;
- другие продукты — собственные versioned profile entities.

Generic Core `ProjectProfile`, содержащий product fields, запрещён. Product profile ссылается на `project_id` и остаётся owned своей product boundary.

Единственный direct-membership aggregate остаётся `OrganizationMembership` из ADR-001:

- отдельные `WorkspaceMembership`, `ProjectMembership` или `ProjectMember` не создают authority;
- UI-списки «участники Workspace/Project» являются projection active OrganizationMembership + applicable RoleBinding/Grant;
- project-level manager MAY запросить или подготовить pending scoped grant, но не создаёт OrganizationMembership;
- invitation и activation OrganizationMembership требуют отдельной Organization-level membership-management authority; scoped grant становится effective только после этого независимого gate;
- delegated agency/partner access не создаёт membership в target Organization или Project;
- создание Project само по себе не выдаёт permission, entitlement, feature flag или product access.

Project может использоваться одним продуктом независимо от других Product Verticals. Общий `project_id` обеспечивает correlation, но не создаёт runtime dependency или общую бизнес-модель.

<a id="adr-002-d04"></a>
### ADR-002-D04 — Каждый resource type имеет явный operational scope и semantic nullability

Сначала применяется tenancy classification ADR-001 (`TENANT/SINGLE_OWNER`, `TENANT/MULTI_PARTY`, `PLATFORM`). Каждый `TENANT` resource имеет ровно один current canonical primary structural facet:

```text
operational_scope_facet =
  (facet_id,
   facet_role = PRIMARY,
   facet_type,
   facet_organization_id,
   scope_kind,
   scope_anchor_id,
   facet_scope_version,
   mobility_policy_id,
   mobility_policy_version)
```

`facet_id` стабилен и не переиспользуется. `facet_type` является owner-declared stable semantic type; generic caller не выбирает его. Несколько peer/canonical primary facets одним resource в ADR-002 запрещены. Дополнительные Workspace/Project contexts являются typed secondary associations D05: они не участвуют в containment/inheritance и не создают либо не выбирают authorization, хотя операция над самой association авторизуется независимо. Если продукту нужны несколько равноправных operational homes, он создаёт отдельно owned partition/assignment aggregate и проходит product/security review либо предлагает superseding ADR; generic Core facet fallback не возникает.

Canonical structural context primary facet:

| `scope_kind` | `facet_organization_id` | `workspace_id` | `project_id` | `scope_anchor_id` |
|---|---|---|---|---|
| `ORGANIZATION` | required | `N/A` | `N/A` | Organization ID |
| `WORKSPACE` | required | required | `N/A` | Workspace ID |
| `PROJECT` | required | required/verified from Project | required | Project ID |

Для `TENANT/SINGLE_OWNER`:

```text
facet_organization_id = tenant_owner_organization_id
```

Для `TENANT/MULTI_PARTY` authoritative owner отдельно сохраняет participant set и per-action authority matrix ADR-001. `facet_organization_id` обязан входить в current participant set, но является только structural placement: он сам по себе не выдаёт ownership, authority, membership, visibility, permission или approval.

Per-action authorization хранится и разрешается отдельно:

```text
authorization_context =
  (participant_set_version,
   authority_tenant_id,
   action/capability,
   authority_matrix_version)
```

`authority_tenant_id` не является полем resource/facet state, отсутствует в structural anchor/chain и определяется сервером заново для каждого действия по ADR-001-D02/D08. Он MAY отличаться от `facet_organization_id`. Primary facet, secondary association, Project/Workspace containment, default Workspace, caller claim или первый подходящий participant никогда не выбирают и не заменяют `authority_tenant_id`. Admission/audit сохраняют его только как authority-at-occurrence.

Изменение participant set или authority matrix не меняет facet. Удаление `facet_organization_id` из participant set блокируется до отдельного structural transfer/recreate либо retirement workflow. Удаление любого другого participant проходит association/dependency preflight D05 и не оставляет active secondary links в его Projects. Смена `facet_organization_id`, даже между Organizations одного participant set, является transfer/migration, а не обычным rescope.

`PLATFORM` не является четвёртым Project scope: это отдельная tenancy classification ADR-001, где tenant/work IDs и primary operational facet имеют явное значение `N/A`.

Таблица описывает canonical resolved structural context, а не требует дублировать каждый derived ID в transport. Для `PROJECT` scope сервер MAY получить authoritative `project_id` и вывести Workspace/Organization до независимого authorization resolution; exact wire representation остаётся ADR-006.

Правила canonical resolved structural context:

- resource type/contract объявляет allowed `scope_kind`, `facet_type` и mobility-policy catalog до delivery;
- unclassified protected resource не проходит Blueprint Conformance/Definition of Ready;
- `project_id` обязателен только для facet с `scope_kind = PROJECT`;
- `workspace_id` обязателен для `WORKSPACE` и `PROJECT`;
- `facet_organization_id` обязателен для любого `TENANT` resource; для `SINGLE_OWNER` он равен tenant owner, для `MULTI_PARTY` входит в participant set без authority inference;
- `scope_anchor_id` и все derived parents обязаны разрешаться ровно в тот же `facet_organization_id`;
- `project_id` без resolved `workspace_id` недопустим в authoritative structural context;
- переданные одновременно structural IDs должны описывать одну server-verified chain;
- отсутствующий lower ID может означать `N/A` только для scope, где этот ID неприменим;
- required lower ID MAY быть получен только из authoritative facet/parent по явно versioned contract; если вывести его нельзя, запрос отклоняется;
- `NULL`/omission не означает default, all projects, platform scope, deleted project или authorization bypass.

Primary structural facts разделены:

```text
primary_scope_anchor =
  (facet_id, facet_type, facet_organization_id, scope_kind, scope_anchor_id)

resolved_structural_chain =
  (facet_organization_id, workspace_id|N/A, project_id|N/A)
```

Для `ORGANIZATION` anchor является Organization; для `WORKSPACE` — конкретный `workspace_id`; для `PROJECT` — конкретный `project_id`. У `PROJECT` facet current `workspace_id` выводится из authoritative Project containment и не является вторым независимо изменяемым anchor. Несовпадающий stored/claimed derived Workspace является integrity failure, а не способом перенести resource.

Primary-scope anchor фиксируется при создании resource и неизменяем по умолчанию. Resolved structural chain может измениться только вследствие отдельно разрешённого изменения anchor по D05 либо reparent самого anchored Project по D08; ни один derived ID нельзя обновить независимо. Resource type публикует versioned policy catalog, а facet фиксирует применимые `mobility_policy_id/version`:

| Policy | Семантика |
|---|---|
| `IMMUTABLE` | primary-scope anchor не меняется; resolved chain MAY измениться только вследствие отдельно разрешённого authoritative parent-containment transition по D08 |
| `MOVE_WITHIN_ORGANIZATION` | `facet_id`, `facet_type`, `facet_organization_id` и `scope_kind` неизменны; lower anchor MAY меняться только по material workflow D05 |
| `RECREATE_ONLY` | создаётся новый resource/facet в target scope, старый проходит owner-controlled retirement/migration; in-place mutation запрещена |

Для допуска move отсутствующая/неизвестная policy означает `BLOCK`; поведенческий default resource остаётся `IMMUTABLE`. Generic owner-controlled mutation, ORM/FK update, смена `facet_organization_id` или изменение secondary association не являются primary-scope workflow.

`scope_kind` существующего facet in-place не меняется. Переход `ORGANIZATION ↔ WORKSPACE ↔ PROJECT`, reclassification resource type или изменение tenancy classification выполняются через новый resource/contract либо отдельную compatible migration по AP-013 и не маскируются как rescope.

Смена anchor `workspace_id` у `WORKSPACE` facet или anchor `project_id` у `PROJECT` facet допустима только внутри `facet_organization_id` и только при policy `MOVE_WITHIN_ORGANIZATION`. Изменение current derived Workspace из-за D08 reparent самого anchored Project не меняет primary `project_id` Project-scoped resource и регулируется D08; замена Project A на Project B является отдельным primary-scope move D05.

Универсальное правило «все Product resources обязаны иметь Project» не принимается. Ожидаемый scope user-facing work artifact обычно `PROJECT`, но owner обязан классифицировать тип по реальной семантике.

Следующие candidate classifications являются иллюстративными, а не нормативными решениями владельцев ADR-003/ADR-004 или Product PRD:

| Resource | Canonical scope | Причина |
|---|---|---|
| OrganizationMembership | `ORGANIZATION` | tenant authority fact |
| BillingAccount/Invoice | `ORGANIZATION` | точная финансовая модель остаётся ADR-003 |
| Workspace setting | `WORKSPACE` | operational container setting |
| Creative Intelligence SourceAccount | `PROJECT` | source исследуется в конкретном work context |
| MediaPlan | `PROJECT` | план относится к конкретному рабочему контексту |
| Advertising AdAccount | обычно `ORGANIZATION` + explicit Project associations | кабинет может обслуживать несколько Projects |
| IntegrationConnection | не решается здесь | owner/binding принимает ADR-004 |

Exact JSON `null` versus omission, database constraints и wire versioning принимает ADR-006/ADR-007. ADR-002 фиксирует только семантику.

<a id="adr-002-d05"></a>
### ADR-002-D05 — Primary scope, tenant ownership и Project association являются разными фактами

Для защищённого resource отдельно существуют:

1. authoritative domain owner;
2. authoritative tenancy fact: tenant owner Organization для `SINGLE_OWNER` либо participant set + per-action authority matrix для `MULTI_PARTY`;
3. ровно один canonical primary operational-scope facet;
4. action-specific authorization context;
5. optional product-owned secondary associations с другими Projects/resources;
6. authorization grants;
7. entitlement/feature/approval gates.

Ни один факт не заменяет другой.

Универсальной shared `project_bindings` table с несколькими writers не создаётся. Canonical primary facet принадлежит только authoritative owner самого resource. Per-action authorization context разрешается authoritative resource/authorization owners и не становится stored facet state. Secondary association принадлежит authoritative owner resource либо отдельному явно назначенному binding aggregate owner:

- `Core.Authorization` владеет RoleBinding/Grant;
- `Core.Projects` владеет Project identity и MAY держать rebuildable read-only association index;
- Product владеет association своего product resource с Project;
- Integration Vault/runtime binding остаётся ADR-004;
- File/Product semantic link принадлежит соответствующему owner contract.

#### Primary-scope move существующего resource

Authoritative owner resource владеет `facet_id`, canonical primary-scope anchor tuple, monotonic `facet_scope_version` и `resource_security_generation`; resolved structural chain строится только из facet и authoritative parents. При policy `MOVE_WITHIN_ORGANIZATION` смена primary Workspace/Project anchor выполняется только отдельной owner-controlled idempotent material command/workflow, а не generic update.

Admitted move intent минимум сохраняет:

- stable resource ID, exact `facet_id`, expected current primary-scope anchor tuple и expected resolved structural-chain/containment versions;
- target canonical `ScopeRef`;
- expected `facet_scope_version` и `resource_security_generation`;
- expected facet `mobility_policy_id/version`;
- для `MULTI_PARTY` — expected `participant_set_version`, `authority_matrix_version` и server-resolved action-specific `authority_tenant_id`;
- durable idempotency/operation identity;
- actor/authority path, reason и required approval references.

Caller MAY передать authority-context claim только для routing/admission input; authoritative handler независимо разрешает его по D06. Claim не выбирает `authority_tenant_id` и не становится facet state.

Каждый material dependency type до delivery объявляет versioned `primary_scope_dependency_policy`:

| Policy | Нормативная семантика |
|---|---|
| `FOLLOW_RESOURCE` | stable link на resource сохраняется, current resolved structural chain выводится заново; policy не переносит owner, authority, grant, credential, financial binding или иной independently governed fact |
| `REVALIDATE` | dependency owner проверяет либо переоформляет binding/policy против target chain; preflight указывает, обязано ли это завершиться до commit или dependency останется inactive после commit; failure никогда не сохраняет прежний `ALLOW` |
| `BLOCK` | primary-scope move не коммитится до отдельного owner-controlled resolution |

Отсутствующая/неизвестная dependency policy означает `BLOCK`. `FOLLOW_RESOURCE` допустим только когда owner доказал, что target chain не меняет independently governed authority/ownership/binding semantics; иначе требуется `REVALIDATE` или `BLOCK`.

До commit:

1. independently авторизуются resource, exact primary facet, source scope, target scope и каждая material dependency;
2. проверяется отдельная `resource.change_primary_scope` capability — обычный read/write resource её не создаёт;
3. source/target structural chains и lifecycle разрешаются authoritative owners независимо от authorization context;
4. `facet_id`, `facet_type`, `facet_organization_id` и `scope_kind` остаются неизменными, а source/target lower scopes разрешаются внутри одной `facet_organization_id`;
5. для `SINGLE_OWNER` `facet_organization_id` совпадает с неизменным tenant owner;
6. для `MULTI_PARTY` current `facet_organization_id` входит в participant set, но action-specific `authority_tenant_id` независимо разрешается из authority path, current participant set и exact per-action matrix row; он MAY отличаться от structural Organization и не изменяется/не выводится самим move;
7. immutable preflight фиксирует exact resource/facet/dependency versions, `participant_set_version` и `authority_matrix_version` где применимо, applied facet `mobility_policy_id/version`, dependency `primary_scope_dependency_policy_id/version` и before/after access/field-visibility delta;
8. каждый dependency owner возвращает применимую versioned policy из таблицы и required cutover outcome;
9. stale expected resource/facet/security/containment/participant/matrix/policy version, incomplete delta, ambiguous authority tenant или unresolved dependency означает `BLOCK`;
10. любое widening principals, acting Organizations, actions/capabilities, data classes либо field visibility требует для `SINGLE_OWNER` explicit tenant-owner approval, а для `MULTI_PARTY` — approvals всех затронутых participants по authority matrix; approval не заменяет permission/delegation;
11. recovery/compensation и observation plan определены до commit.

Access delta отдельно показывает structural facet/chain и action-specific authority contexts; он включает direct, delegated и control-plane paths, ancestor/overlay propagation, resource grants, entitlements, delegations, case grants, connections/credentials, financial references, files, queued jobs, exports и analytics consumers.

При успешном commit authoritative owner:

- атомарно для собственного aggregate записывает новый `scope_anchor_id`, фиксирует resolved structural source/target chains и увеличивает `facet_scope_version` и `resource_security_generation`;
- не меняет `facet_id`, `facet_type`, `facet_organization_id`, `scope_kind`, participant set, authority matrix или `authority_tenant_id`;
- инвалидирует authorization caches и публикует owner-controlled versioned facts для перестроения projections;
- прекращает applicability source-scope inherited grants;
- применяет target-scope inherited grants только после generation-aware revalidation и required widening approval;
- revalidate-ит resource-instance grants и все dependencies с policy `REVALIDATE`; failed revalidation оставляет dependency inactive;
- сохраняет immutable before/after structural evidence, отдельно authorization context, applied facet `mobility_policy_id/version`, dependency `primary_scope_dependency_policy_id/version`, actor/authority, approvals, input digest, result и recovery outcome.

Queued work и previously admitted intent сохраняют old `facet_id`, primary-scope anchor, resolved structural chain, facet/resource generations и отдельно authority-at-admission с participant/matrix versions. При mismatch они проходят полную повторную авторизацию того же logical intent либо уходят в quarantine/manual resolution; silent retarget в новый scope или переключение на другого participant/authority tenant запрещены. Structural scope-at-occurrence, historical authority, events, audit, reports и attribution не переписываются.

Смена `authority_tenant_id` между разными действиями не является scope move и не меняет facet/version. Изменение participant set или authority matrix является отдельной owner-controlled material security mutation: оно не меняет facet или `facet_scope_version`, но меняет собственные versions/security generation, увеличивает `resource_security_generation`, инвалидирует caches/grants и требует async reauthorization.

Participant removal preflight фиксирует exact participant/matrix/resource/association versions и inventory secondary associations, grants, jobs, policies и material dependencies, связанных с удаляемой Organization. Каждый association/dependency owner возвращает `participant_removal_dependency_policy_id/version` и outcome `REMOVE`, `REVALIDATE` или `BLOCK`; unknown/missing/stale policy/outcome означает `BLOCK`. После commit ни одна active association не указывает на Project Organization вне current participant set; failed revalidation оставляет association/job/policy inactive. Удаление current `facet_organization_id` этим workflow не разрешается.

Смена `facet_organization_id` запрещена как rescope. Даже между двумя Organizations current participant set она является explicit structural-facet transfer/recreate/migration workflow с новым target facet/resource либо owner-specific transfer contract, отдельными participant/beneficiary/authority gates и AP-013 controls. Для `SINGLE_OWNER` изменение tenant owner дополнительно является ownership transfer. Удаление current `facet_organization_id` из participant set блокируется до завершения такого workflow или retirement.

Secondary association никогда не изменяет primary facet/chain, `facet_scope_version`, resource security generation, mobility policy, participant set, authority matrix или `authority_tenant_id`. Promotion association в primary context выполняется только полноценным D05 move/transfer, а не переключением role flag. Exact command/event schema остаётся ADR-006, physical constraints/topology — ADR-007.

Project association:

- имеет stable association identity/type, authoritative owner, lifecycle/version и auditable create/change/remove evidence;
- не меняет tenant owner;
- не меняет domain owner;
- не выдаёт membership/permission;
- не переносит entitlement или credential access;
- не делает resource project-owned автоматически;
- не выбирает `authority_tenant_id` и не становится primary/default fallback;
- не создаёт containment inheritance, participant authority или field visibility;
- не даёт участникам Project видимость resource без отдельной resource policy;
- не разрешает Product писать Project или чужой binding state напрямую.

Resource может иметь `0..N` typed secondary Project associations при ровно одном primary operational facet. Для операции над association независимо авторизуются resource и каждый Project; чужой Project ID не используется как способ раскрыть существование resource.

Для `SINGLE_OWNER` обычная Project association допустима только с Project tenant owner Organization. Для `MULTI_PARTY` Project Organization обязана входить в current participant set, но association не создаёт authority: resource и Project независимо авторизуются по exact action/path/field policy. Association с Project другого participant требует typed multi-party contract, explicit visibility и association lifecycle/version; Organization вне participant set требует отдельного participant-change/binding workflow. Без этих условий попытка получает opaque `DENY`.

<a id="adr-002-d06"></a>
### ADR-002-D06 — Lower-scope authorization разделяет typed structural ScopeRef и per-action authority

`Core.Authorization` владеет typed `ScopeRef` для:

```text
ORGANIZATION
WORKSPACE
PROJECT
MODULE overlay
RESOURCE_COLLECTION overlay
RESOURCE_INSTANCE overlay
```

Module/resource являются overlays к structural tenant/work scope, а не альтернативными parent nodes. Каждый overlay ScopeRef содержит либо однозначно выводит canonical primary facet и его Organization/Workspace/Project chain; порядок enum не создаёт inheritance. Для `MULTI_PARTY` этот ScopeRef описывает placement, но не выбирает `authority_tenant_id`.

RoleBinding/Grant на Organization/Workspace/Project:

- эффективен только внутри той же Organization;
- для direct path требует active OrganizationMembership;
- не заменяет actor permission внутри acting Organization, AccessDelegation или ControlPlaneCaseGrant;
- не действует после revoke/suspend membership/delegation;
- не расширяет entitlement, feature flag или approval;
- не превращает `facet_organization_id` или Project participant в authority tenant;
- по умолчанию имеет propagation `SELF`;
- действует на descendants только при явной reviewed policy `SELF_AND_DESCENDANTS` или эквивалентной rule;
- не наследуется вверх, между sibling scopes или через Organization boundary.

Canonical work-scope descendant graph:

| Binding base scope | `SELF` | `SELF_AND_DESCENDANTS` |
|---|---|---|
| `ORGANIZATION` | только Organization scope | та же Organization + её current Workspaces + их current Projects |
| `WORKSPACE` | только конкретный Workspace | Workspace + его current Projects |
| `PROJECT` | только конкретный Project | то же, поскольку lower work-scope descendants отсутствуют |

Project association, analytics edge, product profile, default Workspace, participant membership и прежний parent после reparent не являются containment edge и не участвуют в inheritance.

Overlay всегда anchored к одному canonical base scope. Generic work-scope propagation не создаёт автоматически Module/Collection/Resource permission: action set и применимые overlay types обязаны быть явно разрешены policy. Наследование `MODULE → RESOURCE_COLLECTION → RESOURCE_INSTANCE` либо иной overlay graph существует только по owner-declared versioned policy; отсутствующая rule означает `SELF`. Base-scope и overlay checks применяются как `AND`, никогда не складываются как альтернативные пути. Overlay не пересекает base scope, sibling module или Organization boundary.

Каждый applicable ScopeRef/Grant разрешается против exact `facet_id`, current `facet_scope_version` и `resource_security_generation` защищённого resource, current `lifecycle_version` и `security_generation` base scope, каждого использованного ancestor-propagation edge и versioned overlay policy. Для `MULTI_PARTY` дополнительно проверяются current `participant_set_version` и `authority_matrix_version`. Несовместимая либо неизвестная generation/version делает binding неэффективным до explicit revalidation.

Новая membership generation не оживляет молча прежние scoped grants: grant обязан ссылаться на applicable membership/authority generation либо повторно пройти owner-controlled activation policy.

Для `MULTI_PARTY` server-derived authorization context разрешается отдельно для каждого action:

```text
DIRECT:
  authority_tenant_id = acting_organization_id

DELEGATED:
  authority_tenant_id = AccessDelegation.grantor_organization_id

CONTROL_PLANE_SUPPORT:
  authority_tenant_id =
    tenant authorizer из отдельного tenant intent
    либо tenant-owner-authorized recovery/compensation evidence
```

Для любого path resolved `authority_tenant_id` обязан входить в current participant set и иметь exact current authority-matrix row для action/capability, path, target resource/facet, data classes/fields, delegation и approvals. Ambiguous/missing row или несколько допустимых authority tenants без одного server-admitted выбора означают `DENY/BLOCK`; server не выбирает structural Organization, association, default или первый participant.

Structural Organization может отличаться от authority tenant. Участник B MAY выполнить разрешённое действие над resource с primary facet в Organization A только через собственный valid authority path B, participant-specific resource grant/policy и exact matrix row. Membership/grant в A, сам facet или propagation A не создают authority B; участие B само по себе также не создаёт visibility или permission.

Delegated path не сокращается до target-side grant:

```text
DELEGATED =
  active OrganizationMembership actor-а внутри acting Organization
  AND actor permission/grant внутри acting Organization
  AND active compatible OrganizationRelation
  AND active AccessDelegation с exact action и target ScopeRef/resource
  AND current lifecycle всех участвующих Organizations/scopes
  AND target tenant/resource policy
  AND independent entitlement/auth-strength/approval gates
```

RoleBinding на Project target Organization не заменяет ни один элемент этой цепочки и не превращает delegated actor в target member.

Tenant-owned service/AI Principal действует по explicit workload identity и, для direct path, по своей active OrganizationMembership. Shared platform worker не становится скрытым member: он исполняет только сохранённый original authority path вместе с current workload grant по ADR-001-D04/D08.

`CONTROL_PLANE_SUPPORT` требует current scoped `ControlPlaneCaseGrant` и operator/workload grant. Для default switch, OrganizationMembership invitation/activation, grant/revoke, restore, Project reparent, resource primary-scope move/recreate и другого действия, создающего или меняющего customer intent, consent, ownership, financial authority либо tenant permission, case grant сам не создаёт authority: дополнительно требуется отдельно tenant-authorized intent либо tenant-owner-authorized recovery/compensation decision. Для `MULTI_PARTY` case grant не создаёт `authority_tenant_id`, participant approval или authority-matrix row.

Case grant и tenant-authorized intent/recovery evidence должны exact-match либо иметь owner-reviewed versioned compatibility по target Organization/participant, `authority_tenant_id`, resource, `facet_id`, action/capability, data classes/fields и current participant/matrix versions. Case participant A нельзя скомбинировать с intent/authorizer B. Missing, stale или mismatched case-authorizer/facet/action/field context означает `DENY`.

Recovery/compensation evidence ссылается на ранее tenant-authorized intent или tenant-owned state, фиксирует exact digest/scope и не расширяет их. Approval platform/domain owner не заменяет tenant-owner authorization. Legal/compliance allowlist без tenant intent MAY разрешить только отдельно классифицированное обязательное действие и не создаёт либо не расширяет customer permission, ownership, financial authority, default selection, primary scope или reparent scope.

Для `MULTI_PARTY` recovery evidence отдельно фиксирует исходный `authority_tenant_id`, action, authority-matrix version и required participant approvals. `facet_organization_id`, participant membership или operator case не заменяют этот authorizer.

Ни один authority path не получает Workspace/Project из default.

Authoritative handler разрешает context в следующем порядке:

1. загружает authoritative resource tenancy fact, exact primary facet и resource security generation;
2. независимо разрешает structural chain `Project → Workspace → Organization` либо `Workspace → Organization`;
3. проверяет, что `facet_organization_id` равен tenant owner для `SINGLE_OWNER` либо входит в current participant set для `MULTI_PARTY`, не выводя из этого authority;
4. определяет requested action и authority path ADR-001 (`DIRECT`, `DELEGATED`, `CONTROL_PLANE_SUPPORT`);
5. для `MULTI_PARTY` server-side разрешает один action-specific `authority_tenant_id` по path и exact current authority-matrix row; для `SINGLE_OWNER` применяет owner/direct/delegated/control-plane rules ADR-001;
6. сверяет client/job/event claims с current facet/resource/participant/matrix versions, IDs и expected containment, lifecycle и security generations;
7. проверяет совместимость ScopeRef/Grant с current protected-resource, base/ancestor/overlay generations и participant-specific policy, затем permission, entitlement, feature flag, auth strength и approval как независимые gates;
8. независимо проверяет каждый affected protected resource/dependency;
9. фиксирует structural facet/chain evidence отдельно от authorization-context evidence.

Client/UI active Workspace/Project, route/body/query `authority_tenant_id`, cache, analytics projection, job/event payload, secondary association и default Workspace являются routing claims, а не authority.

```text
ALLOW =
  ADR-001 authority path
  AND authoritative tenancy classification/current owner-or-participant-set
  AND exact valid primary facet and resolved structural chain
  AND independently resolved action-specific authorization context
  AND, for MULTI_PARTY, exact authority-matrix row for path/action/facet/fields
  AND current protected-resource facet_scope_version/resource_security_generation match every applicable binding
  AND current participant/matrix versions match where applicable
  AND current lifecycle of every applicable Organization/Workspace/Project permits the action
  AND current base/ancestor/overlay generations match every applicable ScopeRef/Grant
  AND applicable scoped grant/policy
  AND independent gates
  AND ALLOW for every affected protected resource and dependency
```

Missing, stale, ambiguous, conflicting или cross-tenant structural/authority context приводит к opaque deny, quarantine либо manual resolution. Server не выполняет default inference и не переключает authority tenant.

<a id="adr-002-d07"></a>
### ADR-002-D07 — Lifecycle блокирует новые действия без скрытого cascade

Workspace и Project имеют versioned lifecycle, который минимум различает:

```text
PROVISIONING → ACTIVE ↔ SUSPENDED → ARCHIVED
ARCHIVED --explicit restore--> ACTIVE
```

Каждый Workspace/Project имеет monotonic `lifecycle_version` и `security_generation` как семантические owner facts; их exact storage принимает ADR-006/ADR-007. Любой lifecycle transition меняет `lifecycle_version`. Archive, restore и иная security-sensitive transition по Classification Registry меняет `security_generation`.

Дополнительные states MAY добавляться owner-controlled contract без ослабления следующих инвариантов:

- только `ACTIVE` допускает обычное создание новых scoped resources и новые significant side effects;
- `SUSPENDED` запрещает новые обычные mutations/side effects, сохраняя allowlisted recovery, compliance, export и offboarding operations;
- `ARCHIVED` блокирует обычную работу; restore является отдельным explicit critical/material transition, а не продолжением прежнего действия;
- grants, delegations, case grants, bindings и jobs, сохранённые с прежней `security_generation`, остаются historical и не становятся effective автоматически;
- restore заново проверяет lifecycle, authority и material dependencies; каждый security-sensitive dependency получает explicit revalidation/reactivation либо остаётся inactive;
- restore preflight фиксирует before/after access delta от ancestor grants, propagation edges и overlays; для каждого затронутого `MULTI_PARTY` resource дополнительно фиксируются exact facet/participant-set/authority-matrix versions;
- новая видимость требует для `SINGLE_OWNER` explicit tenant-owner approval, а для `MULTI_PARTY` — approvals всех затронутых participants по exact matrix; иначе scope/dependency остаётся inactive;
- unknown или incomplete restore access/dependency impact означает `BLOCK`;
- Project restore допустим только при active Organization и active parent Workspace;
- restored Workspace не становится default автоматически;
- physical deletion регулируется retention/legal hold и не переиспользует ID;
- lifecycle change инвалидирует/перепроверяет cached authorization;
- queued work не продолжает protected read, mutation или новый side effect без current lifecycle/authority check;
- archive не выполняет скрытый cascade delete product resources, audit или analytics history.

Workspace нельзя архивировать, если он:

- является default Workspace без active successor;
- содержит active Projects;
- имеет unresolved material bindings/jobs;
- не прошёл dependency cleanup/retention plan.

При active Organization её current default Workspace нельзя suspend или archive без атомарного либо recoverably coordinated выбора active successor; иначе сама Organization должна выйти из active lifecycle до завершения transition.

Project archive требует impact inventory product profiles, resources, grants, delegations, connections, files, jobs и exports. Owner каждого dependency объявляет archive policy; missing policy блокирует destructive/cutover step.

Create, suspend, archive, restore и default-switch actions проходят Classification Registry H0.2. Access-affecting lifecycle change считается `critical/material/consequential` до reviewed classification.

<a id="adr-002-d08"></a>
### ADR-002-D08 — Project reparent допустим только внутри одной Organization через material workflow

`Workspace.organization_id` неизменяем. Workspace не reparent-ится между Organizations.

Project MAY сменить parent Workspace только если:

- source и target Workspace принадлежат одной current tenant owner Organization;
- tenant owner Organization Project остаётся неизменным;
- actor имеет отдельную `project.reparent` capability; обычный доступ к Project, source Workspace и target Workspace её не создаёт;
- Project, source Workspace, target Workspace и каждая material dependency получают независимый authorization decision;
- Organization/Workspace/Project lifecycle допускают move;
- используется отдельная idempotent command/workflow с expected Project containment/scope version и `security_generation`;
- immutable preflight impact snapshot фиксирует версии Project/dependencies, applied `project_reparent_dependency_policy_id/version` каждого dependency type, а для затронутых `MULTI_PARTY` resources — exact `facet_id`, `facet_scope_version`, participant-set/authority-matrix versions и before/after access delta;
- preflight impact не имеет unresolved `BLOCK`, а Project/dependency/policy versions не устарели к моменту commit;
- required approval и audit получены;
- recovery/cutover plan определён.

Access delta минимум перечисляет principals и acting Organizations, actions/capabilities, data classes и field visibility, direct/delegated/control-plane paths, новые и утрачиваемые права, grants, delegations, case grants, connections и credential/financial bindings. Widening требует для `SINGLE_OWNER` explicit tenant-owner approval, а для каждого затронутого `MULTI_PARTY` resource — approvals всех affected participants по exact matrix; approval не заменяет permission/delegation. Unknown/incomplete delta либо stale facet/participant/matrix version означает `BLOCK`.

Каждый dependency type заранее объявляет versioned `project_reparent_dependency_policy`:

| Policy | Семантика |
|---|---|
| `FOLLOW_PROJECT` | связь по stable `project_id` сохраняется, current Workspace выводится заново; policy не переносит owner, authority, grant, credential или financial binding |
| `REVALIDATE` | owner обязан проверить/переоформить binding, grant, entitlement или policy |
| `BLOCK` | move запрещён до явного resolution |

Unknown/missing policy либо mismatch её ID/version с preflight означает `BLOCK`.

`REVALIDATE` завершается против immutable preflight snapshot до cutover либо dependency после cutover явно остаётся inactive до отдельной owner-controlled activation. Failed/stale revalidation никогда не сохраняет прежний `ALLOW`. AccessDelegation и ControlPlaneCaseGrant имеют минимум policy `REVALIDATE`, а не `FOLLOW_PROJECT`.

После same-Organization move:

- Project-scoped product resources, чей owner объявил `FOLLOW_PROJECT`, сохраняют stable Project link;
- их `facet_id`, `facet_organization_id`, participant set/authority matrix и action-specific authority semantics не меняются; меняется только resolved structural chain, который повторно проверяется при authorization;
- direct Project-scoped grants сохраняют reference, но revalidate-ятся против current membership/policy;
- applicability source Workspace grants прекращается;
- target Workspace grants применяются только по своей explicit propagation policy;
- Workspace-scoped AccessDelegation источника не расширяется на target Workspace без новой/изменённой delegation и независимого approval;
- Workspace-scoped settings, subscriptions, connections и financial references автоматически не «переезжают»;
- Project containment version и `security_generation` увеличиваются, authorization caches инвалидируются;
- current read models перестраиваются;
- immutable evidence фиксирует applied `project_reparent_dependency_policy_id/version`, facet/participant/matrix versions и required approvals каждого affected dependency, а также фактический cutover outcome;
- historical Workspace/Project-at-occurrence не переписывается.

Move не выполняется обычным update `workspace_id` и не может быть частично применён скрытым multi-domain transaction.

Cross-Organization «move» запрещён как reparent. Требуемый бизнес-процесс создаёт новый target Project и отдельные owner-specific ownership-transfer/migration workflows ресурсов. Конфликт, неоднозначный owner или необратимый dependency переводит процесс в quarantine/manual resolution.

Initial delivery MAY не экспонировать Project move вообще. Это не меняет target semantics: прямой update запрещён, а будущая capability обязана выполнить D08.

<a id="adr-002-d09"></a>
### ADR-002-D09 — Project не становится god aggregate; async, audit и analytics сохраняют контекст

Project является correlation scope, но не:

- transactional owner product resources;
- cross-product saga coordinator;
- authorization shortcut;
- универсальная таблица настроек;
- analytics source of truth;
- обязательная runtime dependency соседнего Product.

Products используют Core.Projects owner-controlled query/command contract и собственные profile/binding contracts. Shared Data Platform MAY строить projection Project graph, но не исправляет Core/Product state и не принимает authorization decisions.

Для context-changing material action evidence сохраняет:

```text
original actor Principal
effective actor/workload identity
effective subject or explicit N/A

resource tenancy:
  classification
  tenant owner Organization/version
    OR participant-set ref/version/generation

structural scope at admission/occurrence:
  resource ID
  facet_id, facet_type, facet_organization_id
  scope_kind and scope_anchor_id
  resolved Workspace/Project chain
  facet_scope_version and resource_security_generation
  containment/lifecycle/security versions
  association IDs/versions where used

authorization context at admission/occurrence:
  acting Organization and authority path
  authority_tenant_id or explicit N/A
  action/capability and authority_matrix_version/digest
  grant/delegation/case references
  data classes/field scope
  approvals
  beneficiary or explicit N/A

old/new structural anchor and resolved chains
applied facet `mobility_policy_id/version`
applied dependency `primary_scope_dependency_policy_id/version`
applied Project-reparent `project_reparent_dependency_policy_id/version`
applied participant-removal `participant_removal_dependency_policy_id/version`
action/input digest
result
recovery/compensation outcome
correlation/causation
```

Async intent:

- сохраняет primary structural facet/chain и отдельно server-resolved authority context, включая `facet_scope_version`, `resource_security_generation`, participant-set/matrix versions и admitted `authority_tenant_id`;
- если action использует secondary association, сохраняет exact association ID/type/version, linked Project ID и expected Project/containment versions;
- admission и execution являются отдельными authorization/evidence points;
- перед каждым protected read, mutation и новым significant side effect независимо re-resolve-ит current structural chain и current authority context, затем проверяет ownership/participant matrix, lifecycle, revoke и applicable gates;
- использованная association независимо revalidate-ится по exact ID/version и linked Project; silent association retarget запрещён;
- composite execution повторяет независимую проверку каждой protected dependency;
- historical admission snapshot является evidence, но не current permission;
- изменение participant set/matrix требует полной reauthorization того же logical intent; продолжение допустимо только после нового successful decision для того же admitted `authority_tenant_id` и не переключает его на `facet_organization_id` или другого participant;
- при structural/authority mismatch не retarget-ится автоматически на default/new Workspace и не выбирает новый authorizer;
- при association mismatch не выбирает другую association/Project;
- если тот же admitted authority tenant/action/path больше не разрешён либо versions не могут быть доказаны, intent уходит в quarantine/manual resolution или создаётся новый отдельно авторизованный intent; continuation по прежнему `ALLOW` запрещён.

Audit/events/analytics различают:

- `structural_scope_at_occurrence` — неизменяемый historical primary facet/chain;
- `authority_context_at_occurrence` — неизменяемый action-specific authorizer/path/matrix evidence;
- `current_structural_scope` — current rebuildable hierarchy;
- current authorization context — только новый decision, не переписывающий historical authority;
- `association_at_occurrence` и current association;
- source fact и projection.

Primary-scope move, structural-facet transfer, participant/matrix change и Project reparent не переписывают historical events, audit, reports, attribution или already-admitted jobs.

H0.2 обязан классифицировать и, где применимо, создать Golden Flow Contracts для:

- Organization bootstrap + default Workspace;
- default Workspace switch and Workspace suspend/archive/restore;
- Project creation;
- scoped access grant/revoke;
- resource primary-scope move/recreate;
- multi-party action, где `authority_tenant_id != facet_organization_id`;
- participant-set/authority-matrix change во время async execution;
- structural-facet transfer/recreate между participating Organizations;
- Project suspend/archive/restore;
- Project reparent;
- membership/delegation revoke во время async execution.

Exact event names, wire fields, outbox и delivery semantics принимает ADR-006.

<a id="adr-002-d10"></a>
### ADR-002-D10 — Legacy migration не создаёт fake authority или universal Project

Legacy user/agency/client/campaign scope является Legacy Deviation, а не target architecture.

H0.3 для каждой legacy entity/endpoint/job фиксирует:

- current owner/context;
- target domain owner;
- tenancy classification и tenant owner Organization либо separately versioned participant-set mapping;
- ровно один target primary structural facet: `facet_id/type`, `facet_organization_id`, `scope_kind`, `scope_anchor_id`, `facet_scope_version`, `mobility_policy_id/version`, Workspace/Project chain либо reviewed `N/A`;
- target secondary-association mappings отдельно от primary facet;
- для `MULTI_PARTY` — participant-set ref/version/generation и per-action authority-matrix ref/version/digest отдельно от structural facet; `authority_tenant_id` не backfill-ится как resource field;
- независимый ambiguity/conflict status для tenancy, primary facet, associations и authority mapping;
- writers/readers;
- historical attribution strategy;
- migration wave и exit condition.

Migration MAY детерминированно создать default Workspace для каждой target Organization. Она не создаёт universal default Project, чтобы скрыть неизвестный context.

Blanket «один Compatibility Project на Organization» запрещён. Такой Project допустим только для доказанного общего business context с явным mapping evidence и exit condition; он никогда не становится default inference или authorization fallback.

Legacy `campaigns` не становится Core Project автоматически: Advertising owner сначала классифицирует его как MediaPlan/provider campaign/иной product aggregate и только затем связывает с явным target Project.

Неоднозначный, cross-tenant или conflicting tenancy/facet/association/authority mapping:

- не угадывается по email, name, last-selected context или provider ID;
- не назначается default Project;
- не создаёт несколько primary facets и не выводит authority tenant из structural Organization/Project;
- получает quarantine/manual mapping evidence;
- блокирует material cutover затронутого resource.

Переход следует совместимому staged path:

```text
expand
→ deterministic Organization/default Workspace mapping
→ explicit tenancy classification
→ one primary structural-facet mapping
→ secondary-association mapping where applicable
→ separate participant-set/per-action authority mapping
→ shadow structural-chain and authority-context validation
→ read comparison, authority-separation and tenant-isolation tests
→ feature-flagged cutover
→ observation/reconciliation
→ legacy contract removal
```

Migration design отдельно различает Feature Rollback, Application Rollback, Read/Cutover Rollback, Data Compensation и Disaster Recovery. Конкретные backup/restore, cutover и execution evidence принадлежат H0.4–H0.7.

Никакая часть D10 не разрешает изменение production до `GREEN H0.6`.

## Appendix A — Machine-readable traceability parts 2–3

`CONFORMS` для AP-012-R02/R03 означает обязательство D09 создать и проверить Golden Flow evidence на последующем H0.2/H0.5+ gate; оно не утверждает, что execution evidence уже существует. AP-013-R03 не применим к current decision scope, потому что ADR-002 не разрешает irreversible step; появление такого шага автоматически делает Rule применимым и открывает review.

```yaml
principle_decision_links_part_2:
  - {principle_rule_id: AP-008-R01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-008-R01, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-008-R01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-008-R01, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-008-R01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-008-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-008-R03, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-008-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-008-R03, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-008-R05, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-008-X01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-008-X01, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-009-R01, relationship: I, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-009-R01, relationship: I, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-009-R01, relationship: I, adr_decision_id: ADR-002-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d07}
  - {principle_rule_id: AP-009-R01, relationship: I, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-009-R01, relationship: I, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d07}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-009-R02, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-009-R03, relationship: C, adr_decision_id: ADR-002-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d07}
  - {principle_rule_id: AP-009-R03, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-009-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-009-R04, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-009-R04, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-009-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-010-R01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-010-R01, relationship: C, adr_decision_id: ADR-002-D06, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d06}
  - {principle_rule_id: AP-010-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-010-R04, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-010-R04, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-010-X01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-010-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
```

```yaml
principle_decision_links_part_3:
  - {principle_rule_id: AP-011-R01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-011-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-011-R01, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-011-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-011-R02, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-011-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-011-R03, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-011-R04, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-011-R04, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-012-R01, relationship: C, adr_decision_id: ADR-002-D02, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d02}
  - {principle_rule_id: AP-012-R01, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-012-R01, relationship: C, adr_decision_id: ADR-002-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d07}
  - {principle_rule_id: AP-012-R01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-012-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-012-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-012-R03, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-013-R01, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-013-R02, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-013-R04, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-013-X01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: AP-013-X01, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: AP-014-R01, relationship: S, adr_decision_id: ADR-002-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d01}
  - {principle_rule_id: AP-014-R01, relationship: S, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-014-R01, relationship: S, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-014-R01, relationship: S, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-002-D01, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d01}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: AP-014-R04, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: AP-014-X01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: APG-CLS-R01, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: APG-CLS-R01, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: APG-CLS-R01, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: APG-CLS-R01, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d04}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D07, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d07}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: APG-CLS-R02, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-002-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d03}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-002-D05, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d05}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-002-D08, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d08}
  - {principle_rule_id: APG-CLS-R04, relationship: C, adr_decision_id: ADR-002-D09, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d09}
  - {principle_rule_id: APG-LEG-R01, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: APG-LEG-R02, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: APG-LEG-R03, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
  - {principle_rule_id: APG-LEG-R04, relationship: C, adr_decision_id: ADR-002-D10, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-002-workspace-project-as-working-context.md, adr_anchor: adr-002-d10}
```

Architecture Principle exceptions: `0`.

## 7. Consequences

### 7.1. Positive

- одна tenant boundary сохраняется для всех продуктов;
- Workspace/Project можно использовать как общие work scopes без отдельной ACL-системы;
- org-level Billing/Connection/Account resources не получают fake Project;
- Project связывает Advertising, Creative, CRM и Analytics без передачи ownership;
- agent/client access объясняется через Membership/Delegation/Grant;
- каждый tenant resource имеет один stable primary structural facet, не меняемый generic mutation или secondary association;
- multi-party structural placement не смешивается с per-action authority;
- Project move не меняет tenant owner и не переписывает историю;
- current и historical hierarchy могут сосуществовать;
- будущая физическая декомпозиция не меняет логические guarantees.

### 7.2. Trade-offs

- active Organization требует bootstrap default Workspace;
- resource types обязаны заранее выбрать facet type/scope и mobility policy;
- multi-party owners обязаны отдельно version-ить participant set, authority matrix, primary facet и secondary associations;
- UI «участники проекта» становится projection, а не простой membership table;
- same-Organization Project reparent и resource primary-scope move требуют dependency registry и preflight;
- migration не может автоматически присвоить один Project всем данным;
- contracts должны различать primary facet, secondary association и authorization context.

### 7.3. New obligations

- H0.2: Classification Registry и Golden Flow Contracts;
- H0.3: полный primary-facet/association/participant-authority/mobility inventory;
- H0.4: migration/recovery design;
- H0.5: contract, test и delivery tasks;
- ADR-004/ADR-005: owner-specific binding/entitlement semantics;
- ADR-006: versioned context envelope, events, audit/outbox;
- ADR-007: enforcement topology;
- Blueprint Conformance Review: исправить candidate Workspace/Project membership и context examples.

## 8. Security, data and compliance impact

### 8.1. Security invariants

- Organization остаётся tenant boundary;
- lower scope не создаёт fourth authority path;
- `OrganizationMembership`/AccessDelegation проверяются до scoped grants;
- Project/Workspace IDs из client/worker/event не являются permission;
- `facet_organization_id` является structural placement, а не authority tenant;
- `authority_tenant_id` для `MULTI_PARTY` разрешается отдельно для каждого action/path и не хранится в facet;
- ambiguous/missing multi-party authorizer и stale participant/matrix version означают `DENY/BLOCK`;
- default Workspace никогда не является authority fallback;
- Project association, participant membership и structural propagation не раскрывают resource автоматически;
- primary-scope move авторизует resource, source, target и каждую material dependency и блокирует unapproved widening;
- reparent авторизует source, target, Project и каждую material dependency;
- revoked authority не восстанавливается новым lower binding;
- `PLATFORM` не выражается отсутствующим lower ID.

### 8.2. Data and privacy

- primary facet/Project/Workspace не меняют `SINGLE_OWNER` tenant owner или `MULTI_PARTY` participant set/authority matrix;
- participant/matrix mutation не меняет facet; смена `facet_organization_id` требует transfer/recreate;
- product profile остаётся в Product boundary;
- historical structural scope и action-specific authority context сохраняются раздельно по retention/purpose policy;
- analytics/project graph является projection;
- cross-tenant search/list возвращает opaque deny/not-found;
- Project move не расширяет field visibility без explicit policy;
- resource primary-scope move сохраняет immutable structural-scope/authority-at-occurrence и не retarget-ит queued work или authorizer;
- archive/delete учитывает legal hold, exports и data subject obligations.

### 8.3. Financial boundary

- Project currency — preference, не Ledger truth;
- Project move не меняет payer, beneficiary, BillingAccount или ledger entries;
- resource primary-scope move не переносит payer, beneficiary, BillingAccount или ledger references без owner policy/revalidation;
- financial binding имеет owner-declared mobility policy;
- unknown financial impact блокирует move;
- точная финансовая модель остаётся ADR-003.

### 8.4. Required reviewers

До formal review обязательны одиннадцать role decisions из metadata. Один человек MAY занимать несколько ролей, но решение фиксируется отдельно для каждой роли и её scope.

## 9. Compatibility, migration and recovery

### 9.1. Compatibility

До H0.7 решение существует только как target contract. Legacy endpoints/rows продолжают работать без изменения.

Будущие compatibility adapters:

- не выдают legacy `user_id` за tenant Organization;
- резолвят ровно один explicit primary structural facet и отдельные secondary associations;
- для `MULTI_PARTY` независимо резолвят participant set/per-action authority и никогда не backfill-ят `authority_tenant_id` как resource/facet state;
- не используют default Project;
- маркируют ambiguity;
- не становятся новым authoritative owner;
- имеют exit condition.

### 9.2. Recovery mechanisms

| Mechanism | Применение ADR-002 |
|---|---|
| Feature Rollback | выключить новый scope resolution/cutover path |
| Application Rollback | вернуть совместимую версию при backward-compatible schema/contracts |
| Read/Cutover Rollback | вернуть чтение на legacy mapping, не переписывая новые evidence |
| Data Compensation | исправить mapping/binding отдельной versioned operation |
| Disaster Recovery | восстановление после реальной потери/corruption, не обычный rollback |

Project reparent, resource primary-scope move и structural-facet transfer используют собственный observation window и recovery plan. После появления material writes обратное действие не выполняется blind FK update; требуется новая authorizable move/transfer/compensation operation с impact validation. Authority-context compensation не переписывает structural facet.

### 9.3. Irreversible steps

ADR не разрешает irreversible step. Удаление legacy keys/tables, cross-domain cutover или physical deletion требует H0.4 evidence и отдельного H0.6/H0.7 gate.

## 10. Affected modules and contracts

| Module/artifact | Target impact | Owner | Follow-up |
|---|---|---|---|
| Core.Tenancy | Workspace/default selection identity, lifecycle и version | Core Domain Owner | conformance после ADR acceptance |
| Core.Projects | Project identity/lifecycle/reparent | Core Domain Owner | conformance после ADR acceptance |
| Core.Authorization | ScopeRef, per-action authority context, propagation, scoped grants и generation-aware revalidation | Core Domain Owner | ADR-005/006 contracts |
| Product/domain resource owners | tenancy fact, one primary facet, participant/matrix contract and secondary associations | respective Domain Owner | PRD/contract registry + conformance |
| Core Module Registry | Workspace/Project addressable scope | Platform/Core owner TBD by ADR-005 | не решать ownership здесь |
| Integration Vault | Project/Workspace binding constraints | owner ADR-004 | mobility policy |
| Core Files | explicit tenancy, one primary facet и associations | Core Files owner | facet classification + mobility policy |
| Shared Jobs | separate structural/authority admission evidence and quarantine | Platform Domain Owner | wire fields ADR-006 |
| Shared Data Platform | separate structural/authority historical attribution/lineage | Data Domain Owner | projection contract |
| Advertising Account Management | org-owned account + product Project associations | Advertising owner | classify/bind in PRD/H0.3 |
| Advertising Media Planning | project-scoped primary facets and secondary associations | Advertising owner | classify facet/mobility and migrate legacy campaigns |
| Creative Intelligence | project-scoped primary facets/associations | Creative owner | PRD/GF facet-mobility contract |
| Audit | scope change evidence | Core Audit owner | envelope ADR-006 |

Frozen H0.0 documents не редактируются этим ADR. Их conformance changes выполняются только после принятия ADR через BCR/amended Blueprint workflow.

## 11. Validation

### 11.1. Design validation для H0.1

- ровно 10 unique Decision IDs и anchors;
- все Principle Rule references существуют;
- все machine-readable Decision anchors разрешаются;
- exceptions отсутствуют;
- ADR-001 D01–D10 не переопределены;
- каждый tenant resource имеет exactly one primary structural facet; `authority_tenant_id` отсутствует в facet/chain schema;
- multi-party structural placement, participant set и per-action authorization context представлены отдельными versioned facts;
- BF-002 закрыт полностью;
- adjacent ADR-003–ADR-007 не предрешены;
- reviewer roles/names/scopes заполнены, decisions остаются null до formal review;
- Constitution и ADR-001 snapshots совпадают;
- H0.0 baseline неизменен.

### 11.2. Required contract/integration tests для H0.5+

- active Organization не существует без active default Workspace;
- default Workspace switch не перемещает resources;
- default Workspace selection изменяет только `Core.Tenancy`; direct Product/BFF/Shared write отклоняется;
- duplicate default-switch intent возвращает тот же result, stale expected version конфликтует, concurrent distinct intents не создают два defaults;
- suspend/archive default Workspace без active successor отклоняется либо Organization атомарно выходит из active lifecycle;
- retry explicit `use_default_workspace` после default switch использует первоначально resolved Workspace ID/version;
- каждый `TENANT` resource имеет ровно один current primary `facet_id`; zero/multiple primary facets блокируют admission;
- existing `facet_id` нельзя изменить или переиспользовать, а `facet_type` нельзя мутировать generic update/move;
- missing Project для `PROJECT` resource отклоняется;
- missing lower ID для `ORGANIZATION` resource допустим и не становится platform scope;
- Project/Workspace/Organization mismatch отклоняется;
- Project ID другого tenant не раскрывает resource;
- Project binding/secondary association не выдаёт permission, visibility, inheritance или authority tenant;
- multi-party action, где `authority_tenant_id != facet_organization_id`, разрешается только при полном participant-specific path и exact matrix row;
- structural Organization входит в participant set, но matrix запрещает action — `DENY`;
- client/lower-scope/association claim не подставляется как `authority_tenant_id`;
- при нескольких потенциальных participants intent фиксирует один server-resolved authority tenant; ambiguity не разрешается через facet/default;
- joint participant approvals сохраняются как approval set и не превращаются в несколько `authority_tenant_id`;
- DIRECT выводит multi-party authority tenant только как current acting Organization;
- DELEGATED выводит multi-party authority tenant только как current `AccessDelegation.grantor_organization_id`;
- CONTROL_PLANE_SUPPORT выводит multi-party authority tenant только из отдельного tenant-authorized intent/recovery evidence; case grant его не создаёт;
- CONTROL_PLANE_SUPPORT с case target participant A и tenant authorizer B либо mismatched facet/action/field scope получает `DENY`;
- смена action-specific `authority_tenant_id` не меняет facet или `facet_scope_version`;
- participant-set/authority-matrix change не меняет primary facet, но увеличивает `resource_security_generation`, инвалидирует caches/grants и требует async reauthorization;
- удаление current `facet_organization_id` из participant set блокируется до transfer/recreate/retirement;
- удаление другого participant блокируется при unknown/stale association dependency policy и после commit не оставляет active Project association/job/policy этого participant;
- org member без applicable lower grant не получает ограниченный resource;
- Organization/Workspace grant с propagation `SELF` не действует на lower work scopes;
- Project association и analytics edge не создают inheritance;
- overlay без owner-declared propagation rule действует только как `SELF`;
- lower grant без active OrganizationMembership не действует;
- relation без AccessDelegation не даёт Project access;
- delegated Project access не создаёт target membership;
- delegated actor с target grant, но без acting-Organization permission, получает deny;
- основной resource разрешён, но хотя бы одна material dependency запрещена — composite operation получает `DENY/BLOCK` без side effect;
- project-level inviter без Organization membership-management permission не активирует membership;
- control-plane case grant без independently authorized customer/recovery intent не выполняет primary-scope move/recreate, reparent, restore или access change;
- membership/delegation revoke блокирует queued protected read, mutation и новый side effect;
- Project association с Organization другого participant не создаёт visibility/authority без typed multi-party contract и independent grants;
- Project association с Organization вне participant set блокируется без separate participant-change/binding workflow;
- restore не реактивирует grants/delegations/case grants/jobs прежней security generation;
- restore Project под ancestor grant с `SELF_AND_DESCENDANTS` не активирует inherited access без generation-aware restore revalidation и applicable `SINGLE_OWNER` tenant-owner approval;
- restore, расширяющий visibility `MULTI_PARTY` dependency, блокируется при stale facet/participant/matrix version или без всех required participant approvals;
- Project restore при inactive Organization/parent Workspace отклоняется;
- existing resource `scope_kind` нельзя изменить generic mutation;
- claimed/stored derived Workspace для PROJECT resource, не совпадающий с authoritative parent anchored Project, отклоняется как integrity failure;
- resource primary-scope move без declared facet mobility policy блокируется;
- secondary association create/update/remove не меняет canonical primary scope;
- async intent с changed/removed association ID/version quarantined и не retarget-ится на другую association/Project;
- same-Organization primary-scope move указывает exact `facet_id` и требует отдельной capability и независимого ALLOW для resource/facet/source/target/dependencies;
- facet move сохраняет `facet_organization_id`, participant set и authority matrix неизменными;
- stale facet/participant/matrix preflight/version или incomplete dependency/access delta блокирует commit;
- stale/changed facet `mobility_policy_id/version` или dependency `primary_scope_dependency_policy` version блокирует primary-scope commit;
- primary-scope widening требует explicit tenant-owner либо всех required participant approvals по matrix;
- successful primary-scope move увеличивает `facet_scope_version`/security generation и инвалидирует authorization cache;
- resource-instance grant прежней `resource_security_generation` после primary-scope move неэффективен до explicit revalidation;
- failed dependency revalidation после primary-scope move оставляет dependency inactive;
- queued work со старым facet/participant/matrix/security context quarantined и не retarget-ится на scope или другого authorizer;
- historical `structural_scope_at_occurrence` и `authority_context_at_occurrence` после move/change остаются неизменными;
- смена `facet_organization_id`, включая между current participants, отклоняется как rescope и направляется в transfer/recreate;
- Project reparent меняет resolved chain Project-scoped resource, но не его primary Project anchor;
- Project reparent primary Project внутри одной Organization не меняет multi-party authorization context;
- Project reparent cross-Organization отклоняется;
- same-Organization Project reparent блокируется при unknown `project_reparent_dependency_policy`;
- changed `project_reparent_dependency_policy` version после preflight блокирует Project reparent;
- stale reparent preflight или containment version блокирует commit;
- access widening через target Workspace propagation требует applicable `SINGLE_OWNER` tenant-owner либо `MULTI_PARTY` participant-matrix approvals;
- authorization cache после reparent не обслуживает request по прежней containment/security version;
- move не переносит Workspace grants/settings автоматически;
- historical attribution после move неизменна;
- archived Project блокирует новые ordinary writes;
- analytics projection не используется как authorization source.

### 11.3. Deny/quarantine matrix

| Сценарий | Результат |
|---|---|
| Client передал Project чужой Organization | opaque `DENY` |
| Project и Workspace одной Organization, но chain не совпадает | `DENY` + integrity signal |
| `project_id = null` для PROJECT resource | validation failure |
| `project_id = null` для BillingAccount classified ORGANIZATION | допустимый `N/A`, tenant check сохраняется |
| Product/BFF/Shared Service пытается изменить default Workspace напрямую | `DENY`; writer только `Core.Tenancy` |
| Default switch имеет stale expected version | conflict/re-resolve; blind last-write-wins запрещён |
| Missing `workspace_id`, server подставил default | запрещено |
| Tenant resource имеет zero или несколько primary facets | `BLOCK`; generic facet selection запрещён |
| Existing `facet_id` изменён/переиспользован или `facet_type` мутирован | `DENY/BLOCK` + integrity signal |
| `MULTI_PARTY` facet Organization отсутствует в current participant set | `DENY/BLOCK` |
| Client/facet/Project/association claim пытается задать `authority_tenant_id` | opaque `DENY`; authority re-resolve server-side |
| Structural Organization является participant, но exact authority-matrix row запрещает action | `DENY` |
| Несколько authority tenants выглядят допустимыми, но intent не фиксирует одного | `BLOCK`; ambiguous authority |
| Project association существует, resource grant отсутствует | `DENY` resource |
| `SINGLE_OWNER` resource связывается с Project другой Organization без multi-party contract | opaque `DENY` |
| Agency relation active, delegation отсутствует | `DENY` |
| DIRECT multi-party request заявляет authority tenant, отличный от acting Organization | `DENY` |
| Delegated actor имеет target grant, но не имеет acting-Organization permission | `DENY` |
| DELEGATED request заявляет authority tenant, отличный от current delegation grantor | `DENY` |
| Control-plane case пытается создать customer intent для primary-scope move/recreate, reparent, restore или access change | `DENY` |
| Control-plane case пытается создать multi-party `authority_tenant_id` без tenant authorizer evidence | `DENY` |
| Case target/participant/facet/action/field scope не совместим с tenant-authorized intent | `DENY` |
| Основной resource `ALLOW`, material dependency `DENY` | composite `DENY/BLOCK`; side effect отсутствует |
| OrganizationMembership revoked, Project grant остался | grant ineffective |
| Participant set/matrix изменились после admission | полная reauthorization того же authority tenant либо quarantine; silent switch запрещён |
| Job имеет old containment version | quarantine/manual resolution |
| Restore видит dependency прежней security generation без reactivation | dependency остаётся inactive |
| Restore создаёт unknown/unapproved inherited access через ancestor/overlay propagation | `BLOCK` |
| Restore Project при inactive parent Workspace | `DENY` |
| Generic update меняет `scope_kind` или primary Workspace/Project существующего resource | `DENY` |
| PROJECT resource пытается независимо изменить derived Workspace без смены anchor/reparent Project | `DENY` + integrity signal |
| Resource type/facet не объявил mobility policy | `BLOCK` |
| Primary-scope move имеет stale facet/participant/matrix version либо incomplete access/dependency delta | `BLOCK` |
| Facet `mobility_policy_id/version` или dependency `primary_scope_dependency_policy` изменилась после preflight | `BLOCK`; нужен новый preflight |
| Primary-scope move расширяет visibility без tenant-owner/participant approval | `BLOCK` |
| Primary-scope move dependency вернул failed `REVALIDATE` | dependency остаётся inactive |
| Resource-instance grant с прежней `resource_security_generation` после primary-scope move | grant ineffective до explicit revalidation |
| Queued intent несёт old facet/participant/matrix/security generation | reauthorize same authorizer либо quarantine/new intent |
| Secondary association пытается заменить primary scope | `DENY`; association остаётся secondary |
| Async association ID/version изменился после admission | reauthorize exact association либо quarantine; silent retarget запрещён |
| Secondary association/participant пытается создать visibility или authority без exact policy | `DENY` |
| Participant-set change удаляет current `facet_organization_id` | `BLOCK` до transfer/recreate/retirement |
| Participant removal оставляет active association/job/policy удаляемой Organization | `BLOCK`; required REMOVE/REVALIDATE outcome |
| Cross-Organization facet move requested, даже между participants | `DENY`; нужен structural transfer/recreate/migration workflow |
| Project reparent затрагивает unknown connection/financial binding | `BLOCK` |
| `project_reparent_dependency_policy` изменилась после preflight | `BLOCK`; нужен новый preflight |
| Reparent preflight устарел либо access delta неполон | `BLOCK` |
| Reparent расширяет доступ без applicable tenant-owner/participant-matrix approvals | `BLOCK` |
| Cross-Organization reparent requested | `DENY`; нужен migration/transfer workflow |
| Suspend/archive default Workspace без successor при active Organization | `DENY` |
| Project-level inviter не имеет Organization membership-management authority | membership activation `DENY`; pending grant не effective |
| Current analytics projection противоречит authoritative chain | projection stale; authorization не выполняется |

Executed evidence требуется только на применимых H0.7/release gates, а не для принятия ADR.

## 12. Intentionally deferred decisions

ADR-002 считается полным без:

- exact JSON null/omit representation;
- exact command/event names and schemas;
- physical database constraints/RLS;
- detailed Role/Policy DSL;
- Subscription/Entitlement owner и propagation;
- ConnectionBinding/credential mobility mechanics;
- FileAsset concrete schema;
- product-specific Project profile fields;
- product-specific multi-home assignment/partition aggregates beyond one primary facet;
- Project merge/split semantics;
- cross-Organization structural-facet/ownership-transfer flows;
- конкретной migration wave и backup procedure.

Deferred decisions не могут переопределить D01–D10 без superseding ADR.

## 13. Review triggers

ADR пересматривается при:

- предложении Workspace/Project как tenant;
- отдельном Workspace/Project membership authority;
- Organization без default Workspace после activation;
- новым writer выбора default Workspace вне `Core.Tenancy` или отказе от expected-version/idempotency;
- universal/default Project fallback;
- cross-Organization или multi-parent Project;
- автоматическом inheritance без explicit propagation;
- binding, меняющем tenant/domain owner;
- предложении нескольких canonical primary facets или generic facet selection;
- хранении/выводе `authority_tenant_id` из facet, Project, association или structural Organization;
- participant/matrix mutation, меняющей primary facet либо не увеличивающей resource security generation;
- secondary association, создающей authority, visibility или inheritance;
- удалении `facet_organization_id` из participant set без transfer/recreate/retirement;
- generic mutation primary scope, новом mobility-policy kind или in-place изменении `scope_kind`;
- primary-scope move без access/field-visibility delta, generation bump или historical preservation;
- Project reparent, который не может безопасно revalidate dependencies;
- analytics/async incident из-за historical/current scope;
- новом operational scope kind;
- data residency rule, меняющем containment;
- security/finance incident, вызванном scope confusion.

## 14. Status boundaries

Текущий `REVIEW_CANDIDATE / PROPOSED`, version `0.3.0`:

- фиксирует новое содержимое immutable snapshot `ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.snapshot.md` и content-addressed manifest `ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.md`;
- сохраняет возвращённые snapshot/manifest 0.1.0 и 0.2.0 неизменными как historical evidence;
- не открывает formal human review;
- не записывает human APPROVE;
- не принимает Blueprint;
- не завершает H0.1;
- не обновляет frozen H0.0;
- не разрешает application-code, database schema или production data changes.

Единственным допустимым target следующего formal `REVIEW` является точный полный SHA-256 snapshot 0.3.0 из manifest. Любое изменение содержания требует новой document version, нового snapshot/manifest и повторного review; formal review открывается только отдельными immutable review target и Review Pack.
