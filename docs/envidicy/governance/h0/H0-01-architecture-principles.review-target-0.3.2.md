---
document_id: ENVIDICY-ARCH-PRINCIPLES
document_version: 0.3.2
constitution_version: 1.0.0-rc.1
status: REVIEW
h0_stage: H0.1
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
owner_role: Architecture Owner
owner_name: "Колядов Денис Викторович"
owner_human_identity_ref: person:envidicy:0002
reviewers:
  - role: Product/Business Sponsor
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [ALL]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Architecture Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [ALL]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Security Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [AP-003, AP-008, AP-009, AP-010, APG-CLS, APG-EXC]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Finance Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [AP-006, AP-007, AP-009, AP-013]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Engineering Owner
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [ALL]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Operations/SRE Reviewer
    name: "Сухоруков Роман Николаевич"
    human_identity_ref: person:envidicy:0001
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [AP-007, AP-012, AP-013, AP-014]
    decision: null
    reviewed_at: null
    evidence_ref: null
  - role: Data/Analytics Domain Reviewer
    name: "Колядов Денис Викторович"
    human_identity_ref: person:envidicy:0002
    required_for_status: [REVIEW, ACCEPTED]
    required_for_scope_ids: [AP-011]
    decision: null
    reviewed_at: null
    evidence_ref: null
created_at: 2026-07-23
review_opened_at: 2026-07-23
accepted_at: null
effective_from: null
next_review_at: null
principles_acceptance_record: null
h0_1_acceptance_manifest: null
supersedes: null
superseded_by: null
---

# Architecture Principles — Конституция Envidicy

Этот документ определяет правила, обязательные для архитектуры Envidicy независимо от продукта, команды, языка программирования, фреймворка и способа deployment.

Текущий статус — `REVIEW`: named human assignees назначены, formal review открыт, но решения reviewers ещё не зафиксированы. Документ не является принятым. Blueprint остаётся `Review Candidate`.

> До `GREEN H0.6` разрешены только документация, architecture review и read-only аудит. Изменение application-кода, схем данных и production-окружения запрещено.

## 1. Назначение и сила документа

После статуса `ACCEPTED` Architecture Principles:

- стоят выше ADR, Blueprint, PRD, контрактов и реализации;
- ограничивают все Core, Shared Platform и Product-модули;
- применяются к новой разработке, миграциям и изменению существующих контуров;
- не выбирают конкретную schema, transport, framework или provider;
- не заменяют ADR: Principle определяет обязательство, ADR — конкретный способ его исполнения.

Accepted [Architecture Governance Framework](../../00-architecture-governance-framework.md) является владельцем процесса принятия и изменения архитектуры. Этот документ является владельцем смысла Principle/Rule, exception eligibility и их machine-readable traceability. Он не создаёт второй независимый governance process.

Обязательные правовые требования и утверждённые договорные ограничения стоят выше Architecture Principles. Конфликт не разрешается скрытым исключением в реализации: он останавливает решение и открывает governance review.

Номер Principle не задаёт его приоритет. Если два Principle невозможно выполнить одновременно, требуется явное governance-решение; ADR не может молча выбрать один из них.

### 1.1. Governance level решения

`decision_class` определяет обязательный путь решения, но не заменяет иерархию источников истины. Утверждённая business strategy может ограничивать Architecture Decision; если изменение относится к нескольким классам, выполняются требования каждого применимого класса.

| `decision_class` | Что меняется | Обязательный артефакт | Нужен ADR |
|---|---|---|---|
| `GOVERNANCE` | Principles, правила review, gates, exception/change policy | Governance Decision Record + impact review | только если одновременно меняется архитектура |
| `ARCHITECTURE` | bounded context, owner, tenancy, ledger, cross-boundary contract, consistency или topology | ADR + affected-artifact review | да |
| `BUSINESS` | продуктовый scope, коммерческое правило, portfolio/horizon или пользовательский outcome | Business/Portfolio Decision либо PRD | только при архитектурном последствии |
| `IMPLEMENTATION` | локальная реализация внутри принятых границ и контрактов | Story/Task, при необходимости Technical Design | нет |

<a id="apg-dec-r01"></a>
- **APG-DEC-R01 — MUST:** proposal получает `decision_class` до начала delivery. Если применимы несколько классов, создаются все обязательные артефакты; локальная задача не может понизить Governance/Architecture change до Implementation.

<a id="apg-dec-r02"></a>
- **APG-DEC-R02 — MUST:** `ARCHITECTURE` требует ADR; `GOVERNANCE` не принимается одним ADR без Governance Decision Record; `BUSINESS` требует ADR только при изменении архитектурного инварианта или границы.

Связь с Accepted Governance Framework: `GOVERNANCE/ARCHITECTURE` относятся к Level 1, `BUSINESS` — к Level 2, если не затрагивает Level 1, `IMPLEMENTATION` — к Level 3.

## 2. Нормативный язык

| Термин | Значение |
|---|---|
| `MUST` | обязательное проверяемое требование |
| `MUST NOT` | обязательный проверяемый запрет |
| `SHOULD` | ожидаемое правило; отклонение требует письменного rationale |
| `SHOULD NOT` | ожидаемый запрет; отклонение требует письменного rationale |
| `MAY` | допустимый, но необязательный вариант |

Rationale объясняет правило, но не создаёт скрытых обязательств. Обязательную силу имеют только требования с постоянным `AP-*` или `APG-*` Rule ID.

<a id="apg-evd-r01"></a>
- **APG-EVD-R01 — MUST:** каждый `AP-*-EV*` является нормативной evidence obligation. При Principles acceptance достаточно определить verification method, applicability и будущий gate; отсутствующее, неразрешимое или неактуальное evidence означает `NONCONFORMING/STOP` только с момента его `required_at`.

<a id="apg-evd-r02"></a>
- **APG-EVD-R02 — MUST:** machine-readable Principle Registry перечисляет, какие Rule ID проверяет каждое evidence obligation, `required_at`, `applicable_when`, status и reviewer roles; evidence не может существовать только как общий текст без проверяемого claim.

<a id="apg-evd-r03"></a>
- **APG-EVD-R03 — MUST:** evidence status использует `DEFINED | NOT_YET_APPLICABLE | PASS | FAIL | REVIEWED_N/A`. `NOT_YET_APPLICABLE` не является waiver и автоматически прекращается на указанном gate; `REVIEWED_N/A` требует owner/reviewer rationale. Статус `YELLOW` запрещён.

<a id="apg-evd-r04"></a>
- **APG-EVD-R04 — MUST:** documentation/readiness gates до и включая H0.6 требуют reviewed design/specification, contracts, test obligations и readiness plan, но не executed evidence новой реализации, поскольку development ещё запрещён. H0.7 migration/development и последующие release gates требуют выполненное evidence из `verification_method_by_gate`; ранний design result не подменяет поздний execution result.

## 3. Постоянные идентификаторы

### 3.1. Principle и Rule ID

- Principle получает ID вида `AP-001`.
- Проверяемое правило получает ID вида `AP-001-R01`.
- Запрещённый shortcut получает ID вида `AP-001-X01`.
- Evidence obligation получает ID вида `AP-001-EV01`.
- ID не перенумеровывается, не переиспользуется и не зависит от заголовка или номера раздела.
- Существенное изменение смысла Accepted Principle либо любого его Rule создаёт новый Principle ID; предыдущий Principle целиком получает `SUPERSEDED`, а все его Rule ID сохраняются в истории.
- Канонической целью ссылки является стабильный anchor, а не текст заголовка.

Пример ссылки:

```markdown
[AP-006-R01](./H0-01-architecture-principles.md#ap-006-r01)
```

### 3.2. Decision ID в ADR

Каждое нормативное решение внутри ADR получает постоянный ID вида `ADR-003-D04`. Architecture Decision Matrix ссылается на Decision ID, а не только на номер раздела:

```text
I → ADR-003-D04
```

Видимый номер раздела может измениться; Decision ID и anchor остаются постоянными.

## 4. Свод принципов

| ID | Принцип | Защищаемый инвариант |
|---|---|---|
| AP-001 | Один authoritative owner семантического факта | отсутствие split-brain ownership |
| AP-002 | Направленные зависимости и нейтральный Core | Core не превращается в продуктовый монолит |
| AP-003 | Явный tenant и контекст полномочий | доказуемая tenant isolation |
| AP-004 | Независимые продукты и явная композиция | продуктовые вертикали не сцепляются скрыто |
| AP-005 | Версионированные контракты вместо чужого state | границы сохраняются при любом deployment |
| AP-006 | Ledger является источником финансовой истины | точность и неизменяемость денег |
| AP-007 | Внешние side effects идемпотентны и сверяемы | безопасная работа при timeout, retry и uncertain result |
| AP-008 | Security, privacy и secrets by default | отсутствие привилегированных обходов |
| AP-009 | Значимые действия доказуемы и объяснимы | audit сохраняет причинность и evidence |
| AP-010 | Автоматизация не расширяет полномочия | AI, workers и services ограничены policy |
| AP-011 | Наблюдение, факт и интерпретация разделены | provenance и temporal correctness данных |
| AP-012 | Критический процесс является Golden Flow Contract | проверяемость платформы на уровне outcome |
| AP-013 | Эволюция совместима и восстановима | отсутствие big-bang и фиктивного rollback |
| AP-014 | Логическая модульность предшествует распределению | distribution допускается только по доказательствам |

### 4.1. Machine-readable Principle Registry

Registry является частью этого документа и задаёт status, revision, exception eligibility и связь Rule → Evidence. Поля `related_adrs` заполняются только после появления принятых ADR и не заменяют Architecture Decision Matrix.

```yaml
principles:
  - {id: AP-001, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-001-R01, AP-001-R02, AP-001-R03, AP-001-X01], time_bound_rule_ids: [], evidence: {id: AP-001-EV01, verifies_rule_ids: [AP-001-R01, AP-001-R02, AP-001-R03, AP-001-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-002, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-002-R01, AP-002-R02, AP-002-R03, AP-002-R04, AP-002-X01], time_bound_rule_ids: [], evidence: {id: AP-002-EV01, verifies_rule_ids: [AP-002-R01, AP-002-R02, AP-002-R03, AP-002-R04, AP-002-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-003, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-003-R01, AP-003-R02, AP-003-R03, AP-003-R04, AP-003-X01], time_bound_rule_ids: [], evidence: {id: AP-003-EV01, verifies_rule_ids: [AP-003-R01, AP-003-R02, AP-003-R03, AP-003-R04, AP-003-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-004, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-004-R02, AP-004-R03, AP-004-X01], time_bound_rule_ids: [AP-004-R01], evidence: {id: AP-004-EV01, verifies_rule_ids: [AP-004-R01, AP-004-R02, AP-004-R03, AP-004-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-005, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-005-R03, AP-005-R04, AP-005-R05, AP-005-X01], time_bound_rule_ids: [AP-005-R01, AP-005-R02], evidence: {id: AP-005-EV01, verifies_rule_ids: [AP-005-R01, AP-005-R02, AP-005-R03, AP-005-R04, AP-005-R05, AP-005-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-006, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-006-R01, AP-006-R02, AP-006-R03, AP-006-R04, AP-006-X01], time_bound_rule_ids: [], evidence: {id: AP-006-EV01, verifies_rule_ids: [AP-006-R01, AP-006-R02, AP-006-R03, AP-006-R04, AP-006-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-007, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-007-R01, AP-007-R02, AP-007-R03, AP-007-R04, AP-007-R05, AP-007-X01], time_bound_rule_ids: [], evidence: {id: AP-007-EV01, verifies_rule_ids: [AP-007-R01, AP-007-R02, AP-007-R03, AP-007-R04, AP-007-R05, AP-007-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-008, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-008-R01, AP-008-R02, AP-008-R03, AP-008-R04, AP-008-R05, AP-008-X01], time_bound_rule_ids: [], evidence: {id: AP-008-EV01, verifies_rule_ids: [AP-008-R01, AP-008-R02, AP-008-R03, AP-008-R04, AP-008-R05, AP-008-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-009, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-009-R01, AP-009-R02, AP-009-R03, AP-009-R04, AP-009-X01], time_bound_rule_ids: [], evidence: {id: AP-009-EV01, verifies_rule_ids: [AP-009-R01, AP-009-R02, AP-009-R03, AP-009-R04, AP-009-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-010, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-010-R01, AP-010-R02, AP-010-R03, AP-010-R04, AP-010-X01], time_bound_rule_ids: [], evidence: {id: AP-010-EV01, verifies_rule_ids: [AP-010-R01, AP-010-R02, AP-010-R03, AP-010-R04, AP-010-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-011, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-011-R01, AP-011-R03, AP-011-R04, AP-011-X01], time_bound_rule_ids: [AP-011-R02], evidence: {id: AP-011-EV01, verifies_rule_ids: [AP-011-R01, AP-011-R02, AP-011-R03, AP-011-R04, AP-011-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-012, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-012-R01, AP-012-R02, AP-012-R03, AP-012-X01], time_bound_rule_ids: [], evidence: {id: AP-012-EV01, verifies_rule_ids: [AP-012-R01, AP-012-R02, AP-012-R03, AP-012-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-013, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-013-R01, AP-013-R02, AP-013-R03, AP-013-R04, AP-013-X01], time_bound_rule_ids: [], evidence: {id: AP-013-EV01, verifies_rule_ids: [AP-013-R01, AP-013-R02, AP-013-R03, AP-013-R04, AP-013-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
  - {id: AP-014, revision: 1, status: REVIEW, owner_role: Architecture Owner, forbidden_rule_ids: [AP-014-R01, AP-014-R02, AP-014-R03, AP-014-R04, AP-014-X01], time_bound_rule_ids: [], evidence: {id: AP-014-EV01, verifies_rule_ids: [AP-014-R01, AP-014-R02, AP-014-R03, AP-014-R04, AP-014-X01]}, related_adrs: [], supersedes: null, superseded_by: null}
evidence_schedule:
  - {id: AP-001-EV01, required_at: [BLUEPRINT_CONFORMANCE], applicable_when: domain_or_contract_ownership_is_reviewed, status: DEFINED, verification_method_by_gate: {BLUEPRINT_CONFORMANCE: reviewed_ownership_register_and_conformance_claim}, gate_status: {BLUEPRINT_CONFORMANCE: NOT_YET_APPLICABLE}, reviewer_roles: [Architecture Owner]}
  - {id: AP-002-EV01, required_at: [BLUEPRINT_CONFORMANCE], applicable_when: core_shared_product_boundary_is_reviewed, status: DEFINED, verification_method_by_gate: {BLUEPRINT_CONFORMANCE: reviewed_dependency_map_and_boundary_claim}, gate_status: {BLUEPRINT_CONFORMANCE: NOT_YET_APPLICABLE}, reviewer_roles: [Architecture Owner, Engineering Owner]}
  - {id: AP-003-EV01, required_at: [BLUEPRINT_CONFORMANCE, H0.6, RELEASE], applicable_when: protected_resource_or_operation_exists, status: DEFINED, verification_method_by_gate: {BLUEPRINT_CONFORMANCE: reviewed_tenant_model_and_test_obligations, H0.6: approved_isolation_and_permission_test_plan, RELEASE: executed_current_regression_result}, gate_status: {BLUEPRINT_CONFORMANCE: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Security Reviewer, Engineering Owner]}
  - {id: AP-004-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: product_or_composition_product_is_in_scope, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_standalone_golden_flow_contract, H0.6: approved_standalone_golden_flow_test_plan, RELEASE: executed_standalone_golden_flow_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Product/Business Sponsor, Architecture Owner]}
  - {id: AP-005-EV01, required_at: [ADR_ACCEPTANCE, BLUEPRINT_CONFORMANCE, H0.6, RELEASE], applicable_when: cross_boundary_contract_exists, status: DEFINED, verification_method_by_gate: {ADR_ACCEPTANCE: reviewed_contract_and_test_obligations, BLUEPRINT_CONFORMANCE: reviewed_dependency_and_compatibility_claim, H0.6: approved_contract_test_plan, RELEASE: executed_current_contract_regression_result}, gate_status: {ADR_ACCEPTANCE: NOT_YET_APPLICABLE, BLUEPRINT_CONFORMANCE: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Architecture Owner, Engineering Owner]}
  - {id: AP-006-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: authoritative_money_state_is_affected, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_financial_golden_flow_and_test_obligations, H0.6: approved_ledger_invariant_and_reconciliation_test_plan, RELEASE: executed_current_financial_regression_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Finance Reviewer, Engineering Owner]}
  - {id: AP-007-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: significant_external_side_effect_exists, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_adversarial_test_and_reconciliation_obligations, H0.6: approved_duplicate_timeout_concurrency_test_and_runbook_plan, RELEASE: executed_current_external_effect_regression_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Engineering Owner, Operations/SRE Reviewer]}
  - {id: AP-008-EV01, required_at: [BLUEPRINT_CONFORMANCE, H0.6, RELEASE], applicable_when: protected_data_or_action_exists, status: DEFINED, verification_method_by_gate: {BLUEPRINT_CONFORMANCE: reviewed_threat_model_and_security_test_obligations, H0.6: approved_negative_security_and_secret_scan_plan, RELEASE: executed_current_security_regression_result}, gate_status: {BLUEPRINT_CONFORMANCE: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Security Reviewer, Engineering Owner]}
  - {id: AP-009-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: material_action_exists, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_material_action_catalog_and_audit_expectations, H0.6: approved_audit_completeness_test_plan, RELEASE: executed_current_audit_sample_and_integrity_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Security Reviewer, Engineering Owner]}
  - {id: AP-010-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: automation_can_affect_authoritative_or_external_state, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_automation_policy_eval_and_test_obligations, H0.6: approved_authorization_eval_limit_and_kill_switch_exercise_plan, RELEASE: executed_current_automation_control_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Security Reviewer, Product/Business Sponsor]}
  - {id: AP-011-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: analytical_or_ai_data_is_used, status: DEFINED, verification_method_by_gate: {H0.2: reviewed_data_contract_lineage_and_quality_obligations, H0.6: approved_lineage_quality_and_freshness_test_plan, RELEASE: executed_current_data_quality_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Data/Analytics Domain Reviewer, Product/Business Sponsor]}
  - {id: AP-012-EV01, required_at: [H0.2, H0.6, RELEASE], applicable_when: critical_flow_is_classified, status: DEFINED, verification_method_by_gate: {H0.2: accepted_golden_flow_contract_and_test_mapping, H0.6: approved_golden_flow_suite_and_release_gate_plan, RELEASE: executed_current_release_gate_result}, gate_status: {H0.2: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Architecture Owner, Operations/SRE Reviewer]}
  - {id: AP-013-EV01, required_at: [H0.4, H0.6, MIGRATION_RELEASE], applicable_when: level_1_2_or_production_state_change_exists, status: DEFINED, verification_method_by_gate: {H0.4: reviewed_migration_and_recovery_specification, H0.6: approved_readiness_checklist_and_validation_plan, MIGRATION_RELEASE: executed_backup_restore_dry_run_shadow_and_reconciliation_report}, gate_status: {H0.4: NOT_YET_APPLICABLE, H0.6: NOT_YET_APPLICABLE, MIGRATION_RELEASE: NOT_YET_APPLICABLE}, reviewer_roles: [Engineering Owner, Operations/SRE Reviewer]}
  - {id: AP-014-EV01, required_at: [ADR_007_ACCEPTANCE, SERVICE_EXTRACTION], applicable_when: module_topology_or_extraction_is_decided, status: DEFINED, verification_method_by_gate: {ADR_007_ACCEPTANCE: reviewed_topology_decision_and_boundary_evidence, SERVICE_EXTRACTION: measured_driver_slo_failure_and_migration_evidence}, gate_status: {ADR_007_ACCEPTANCE: NOT_YET_APPLICABLE, SERVICE_EXTRACTION: NOT_YET_APPLICABLE}, reviewer_roles: [Architecture Owner, Operations/SRE Reviewer]}
```

<a id="apg-reg-r01"></a>
- **APG-REG-R01 — MUST:** header status и status всех активных Principle Registry entries синхронизированы. При header `ACCEPTED` значения `DRAFT/REVIEW` запрещены; `SUPERSEDED` допустим только с разрешимым `superseded_by`. Header, Registry и применимый acceptance artifact ссылаются на один document version/hash.

### 4.2. Classification Registry

Термины `material`, `critical`, `consequential`, `significant external effect`, `primary outcome` и `composition product` нельзя присваивать неформально.

<a id="apg-cls-r01"></a>
- **APG-CLS-R01 — MUST:** H0.1 принимает classification policy, schema и default-high classes из APG-CLS-R02; H0.2 создаёт и заполняет reviewed Classification Registry с object ID/type, class, rationale, accountable owner, required reviewers, decision/effective dates и evidence reference.

<a id="apg-cls-r02"></a>
- **APG-CLS-R02 — MUST:** financial movement, permission/tenant change, secret access, cross-tenant action, external write, irreversible operation, restricted-data export и automation, меняющая authoritative/external state, считаются `critical/material/consequential` до явной reviewed классификации. Любой external write дополнительно считается `significant external effect`, пока reviewed классификация не докажет обратное с обязательным сохранением требований AP-007 к retry safety, uncertain result и reconciliation.

<a id="apg-cls-r03"></a>
- **APG-CLS-R03 — MUST:** понижение criticality проходит тех же Product, Security, Finance, Data и Operations reviewers, которые обязательны для соответствующего риска, и оставляет audit evidence.

<a id="apg-cls-r04"></a>
- **APG-CLS-R04 — MUST:** `beneficiary` обязателен, если затронутые деньги, доступ, внешний ресурс или legal/data interest принадлежат стороне, отличной от actor/effective subject; иначе поле получает явный `N/A`.

<a id="ap-001"></a>
## AP-001 — Один authoritative owner семантического факта

Один owner означает не одну базу и не одну универсальную модель. Ledger movement, рекламный Funding Order, provider fulfillment и аналитическое наблюдение могут быть разными фактами с разными owners.

<a id="ap-001-r01"></a>
- **AP-001-R01 — MUST:** каждый material бизнес-факт, инвариант и переход состояния имеет ровно один authoritative domain owner; materiality определяется Classification Registry.

<a id="ap-001-r02"></a>
- **AP-001-R02 — MUST:** копия, cache или projection чужого факта остаётся прослеживаемой до owner, явно неавторитетной и не получает права исправлять authoritative state. Детальные lineage/freshness obligations определяет AP-011 согласно способу использования.

<a id="ap-001-r03"></a>
- **AP-001-R03 — MUST:** домен, продукт и cross-boundary contract до статуса `BUILD`, `HARDEN` или production имеют accountable owner role; named owners обязательны до начала delivery.

<a id="ap-001-x01"></a>
- **AP-001-X01 — MUST NOT:** shared table, общий service или saga не используются как способ скрыть нескольких transactional owners одной семантики.

<a id="ap-001-ev01"></a>
- **AP-001-EV01 — MUST:** ownership register и Blueprint Conformance Review однозначно показывают owner, writers, допустимые projections и команды изменения.

**Exception policy:** `FORBIDDEN` для AP-001-R01…R03. Временный dual-write при migration является Migration Deviation, но не меняет target owner.

**Review triggers:** смена owner, новый bounded context, новый writer, конфликт двух источников или reconciliation incident.

<a id="ap-002"></a>
## AP-002 — Направленные зависимости и нейтральный Core

Core защищает универсальные гарантии платформы. Shared Services предоставляют общую механику. Product-модули владеют предметной и provider-specific семантикой.

<a id="ap-002-r01"></a>
- **AP-002-R01 — MUST:** зависимость от бизнес-семантики направлена от Product к нейтральным Core/Shared contracts; Core не зависит от продуктовой модели, schema или lifecycle.

<a id="ap-002-r02"></a>
- **AP-002-R02 — MUST:** Shared Service MAY владеть собственными cross-cutting entities, например Job, ApprovalRequest или ApprovalDecision, но не становится authoritative owner product-specific entity, outcome, semantic metric или recommendation.

<a id="ap-002-r03"></a>
- **AP-002-R03 — MUST:** provider-specific mapping, capabilities и бизнес-значение внешней операции принадлежат соответствующему продуктовому домену. Нейтральные provider code и authorization metadata сами по себе не нарушают Principle.

<a id="ap-002-r04"></a>
- **AP-002-R04 — MUST:** внешняя capability явно объявляется и проверяется для конкретных tenant, connection, resource и action до исполнения. Missing, stale или unknown capability закрывает действие либо переводит его в заранее определённый manual/degraded mode.

<a id="ap-002-x01"></a>
- **AP-002-X01 — MUST NOT:** в Core помещаются `spend_cap`, campaign objective, creative hook, CRM stage или иная продуктовая семантика ради удобства общего workflow; наличие provider code не трактуется как поддержка всех его capabilities.

<a id="ap-002-ev01"></a>
- **AP-002-EV01 — MUST:** dependency map, ownership register, capability contract и package/contract review не содержат обратной семантической зависимости Core → Product и доказывают fail-closed behavior неизвестной capability.

**Exception policy:** `FORBIDDEN` для AP-002-R01…R04. Существующее смешение классифицируется как Legacy Deviation с target owner и exit condition.

**Review triggers:** новая продуктовая вертикаль, перенос capability в Core/Shared, connector extraction или смена owner.

<a id="ap-003"></a>
## AP-003 — Явный tenant и контекст полномочий

Tenant boundary, рабочий scope и право действовать — разные понятия. Конкретную tenant-модель принимает ADR-001, а Workspace/Project scopes — ADR-002.

<a id="ap-003-r01"></a>
- **AP-003-R01 — MUST:** каждый защищённый ресурс явно классифицирован как `tenant-scoped` или `platform-scoped`. Обычный tenant resource имеет одного tenant owner; multi-party resource перечисляет participating tenants, authoritative domain owner и mutation/approval authority каждой стороны. Platform-scoped resource не получает tenant-доступ неявно, а индивидуальный User не используется как замена tenant.

<a id="ap-003-r02"></a>
- **AP-003-R02 — MUST:** effective tenant и цепочка принадлежности ресурса выводятся и проверяются сервером; ID из client body, query, job или event не считается доказательством доступа.

<a id="ap-003-r03"></a>
- **AP-003-R03 — MUST:** cross-tenant действие сохраняет фактического actor, effective subject, применимый beneficiary и authorizing relationship/delegation. Делегирование ограничено scope, сроком, capabilities и может быть отозвано; обязательность beneficiary определяется APG-CLS-R04.

<a id="ap-003-r04"></a>
- **AP-003-R04 — MUST:** Project scope применяется только по смыслу ресурса; отсутствие `project_id` не отменяет tenant ownership и authorization.

<a id="ap-003-x01"></a>
- **AP-003-X01 — MUST NOT:** relationship автоматически выдаёт доступ, impersonation скрывает original actor или расширяет его полномочия.

<a id="ap-003-ev01"></a>
- **AP-003-EV01 — MUST:** tenant model, authorization decision contract и negative isolation tests доказывают отсутствие cross-tenant доступа без явного grant.

**Exception policy:** `FORBIDDEN` для AP-003-R01…R04.

**Review triggers:** изменение tenancy, agency/partner model, impersonation, resource scope или data residency requirement.

<a id="ap-004"></a>
## AP-004 — Независимые продукты и явная композиция

Standalone означает независимость от других Product Verticals, а не работу без Core и обязательных Shared capabilities.

<a id="ap-004-r01"></a>
- **AP-004-R01 — MUST:** продукт способен выполнять свой primary outcome без обязательной runtime-зависимости от другой продуктовой вертикали, если он не классифицирован как composition product в Classification Registry.

<a id="ap-004-r02"></a>
- **AP-004-R02 — MUST:** режимы Connected и Full Loop используют versioned contracts и определяют failure, degraded и disconnected behavior.

<a id="ap-004-r03"></a>
- **AP-004-R03 — MUST:** composition layer или общий UX сохраняет ownership исходных доменов и не создаёт дублирующий source of truth.

<a id="ap-004-x01"></a>
- **AP-004-X01 — MUST NOT:** скрытая зависимость от таблицы, внутреннего endpoint или обязательного события соседнего продукта объявляется standalone-режимом.

<a id="ap-004-ev01"></a>
- **AP-004-EV01 — MUST:** dependency manifest и standalone Golden Flow показывают минимальные Core/Shared dependencies и поведение без соседних продуктов.

**Exception policy:** `TIME_BOUND` только для AP-004-R01; AP-004-R02/R03 — `FORBIDDEN`. Временная product dependency требует scope, degraded mode и exit condition.

**Review triggers:** новый composition product, появление обязательного consumer/provider или невозможность standalone Golden Flow.

<a id="ap-005"></a>
## AP-005 — Версионированные контракты вместо чужого state

Логическая граница действует одинаково внутри одного процесса, одной базы и распределённой системы.

<a id="ap-005-r01"></a>
- **AP-005-R01 — MUST:** cross-domain изменение выполняется через команду одному owner; событие сообщает о зафиксированном факте; query/read model предоставляет чтение без права менять authoritative state.

<a id="ap-005-r02"></a>
- **AP-005-R02 — MUST:** модуль не пишет в storage другого owner; любое cross-domain чтение использует owner-defined query contract или явно owned projection. Security, financial и business-invariant решения дополнительно используют актуальные authoritative данные согласно consistency contract.

<a id="ap-005-r03"></a>
- **AP-005-R03 — MUST:** cross-boundary API, event и data contract имеют owner, immutable ID, version, consumers, compatibility policy, data classification и явно объявленные delivery/consistency guarantees.

<a id="ap-005-r04"></a>
- **AP-005-R04 — MUST:** event публикуется только после фиксации факта и проектируется для duplicate, retry и допустимого порядка доставки согласно контракту.

<a id="ap-005-r05"></a>
- **AP-005-R05 — MUST:** каждый retryable state-changing cross-boundary command имеет idempotency и concurrency strategy, связывающую повторные доставки с одним logical intent.

<a id="ap-005-x01"></a>
- **AP-005-X01 — MUST NOT:** событие используется как замаскированная команда, а общий database transaction — как разрешение на неограниченную cross-domain запись.

<a id="ap-005-ev01"></a>
- **AP-005-EV01 — MUST:** contract registry, producer/consumer review и contract tests доказывают совместимость, retry safety и отсутствие скрытых readers/writers.

**Exception policy:** `TIME_BOUND` только для AP-005-R01/R02 в migration/legacy adapter; AP-005-R03…R05 — `FORBIDDEN`.

**Review triggers:** новый API/event/data contract, breaking change, новый consumer, dual-write или изменение consistency model.

<a id="ap-006"></a>
## AP-006 — Ledger является источником финансовой истины

Principle относится к authoritative внутренним денежным обязательствам и позициям. Provider-reported spend и balance могут быть внешними наблюдениями и не становятся ledger-фактом автоматически.

<a id="ap-006-r01"></a>
- **AP-006-R01 — MUST:** любое authoritative изменение внутреннего денежного обязательства, денежного счёта или признанной accounting position отражается через immutable Ledger operation единственного owner, выбранного ADR-003. Derived P&L, ROAS и иные аналитические показатели не становятся ledger-фактом автоматически.

<a id="ap-006-r02"></a>
- **AP-006-R02 — MUST:** Money имеет точное amount representation и currency; binary floating-point не используется для финансового учёта, а balance является проекцией, не mutable source.

<a id="ap-006-r03"></a>
- **AP-006-R03 — MUST:** posted financial history исправляется reversal/compensation, а не `UPDATE` или удалением; fee, tax и FX сохраняются как historical snapshots.

<a id="ap-006-r04"></a>
- **AP-006-R04 — MUST:** product intent, применимые по принятой финансовой state machine reservation/capture/release, provider fulfillment и financial/provider reconciliation остаются различимыми состояниями с явными references.

<a id="ap-006-x01"></a>
- **AP-006-X01 — MUST NOT:** продукт, BFF, оператор или integration adapter напрямую устанавливает balance либо создаёт проводку в обход contract единственного Ledger owner.

<a id="ap-006-ev01"></a>
- **AP-006-EV01 — MUST:** ledger invariants, journal balance tests, idempotency tests, reconciliation evidence и financial Golden Flows доказывают каждое изменение денег.

**Exception policy:** `FORBIDDEN` для AP-006-R01…R04. Legacy balance deviations закрываются migration plan и не признаются target exception.

**Review triggers:** новая валюта, fee/tax/FX model, credit, refund, rebate, subscription charge или финансовый incident.

<a id="ap-007"></a>
## AP-007 — Внешние side effects идемпотентны и сверяемы

Внешний provider не участвует в атомарной локальной транзакции. Timeout, потеря ответа и повторная доставка являются нормальными состояниями распределённого процесса.

<a id="ap-007-r01"></a>
- **AP-007-R01 — MUST:** каждый significant external side effect по Classification Registry имеет durable operation identity, idempotency strategy, attempt history и сохранённый безопасный evidence reference.

<a id="ap-007-r02"></a>
- **AP-007-R02 — MUST:** workflow поддерживает `uncertain/unknown result` и reconciliation; timeout или transport error не считается доказанным business failure.

<a id="ap-007-r03"></a>
- **AP-007-R03 — MUST:** retry выполняется только при доказанной безопасности повторения либо после проверки внешнего state; необратимое действие имеет compensation или формализованный manual recovery path.

<a id="ap-007-r04"></a>
- **AP-007-R04 — MUST:** ручное исполнение фиксирует actor, время, evidence и последующую reconciliation obligation.

<a id="ap-007-r05"></a>
- **AP-007-R05 — MUST:** concurrent, duplicate и retried executions одного logical intent разрешаются в одну durable operation identity и не создают более одного effective external side effect. Если это нельзя доказать, операция остаётся blocked/uncertain до reconciliation или manual resolution.

<a id="ap-007-x01"></a>
- **AP-007-X01 — MUST NOT:** неизвестный результат автоматически переводится в `failed`, освобождает финансовый резерв или запускает слепой повтор внешнего действия.

<a id="ap-007-ev01"></a>
- **AP-007-EV01 — MUST:** adversarial tests покрывают duplicate, concurrent attempt, timeout-after-success, out-of-order response, partial completion и manual confirmation.

**Exception policy:** `FORBIDDEN` для AP-007-R01…R05. Provider limitation MAY требовать manual fulfillment, но это считается compliant только при attempt history, uncertain state и reconciliation.

**Review triggers:** новый provider write, payment/funding/publish operation, повторное исполнение, discrepancy или provider incident.

<a id="ap-008"></a>
## AP-008 — Security, privacy и secrets by default

Безопасность является свойством каждого контракта и потока, а не отдельным слоем, который добавляется после реализации.

<a id="ap-008-r01"></a>
- **AP-008-R01 — MUST:** authorization выполняется server-side по `default deny` и `least privilege` для human, service, AI и system actors.

<a id="ap-008-r02"></a>
- **AP-008-R02 — MUST:** каждый non-human actor имеет отдельную workload identity, accountable owner grant, scope, limits, managed credential lifecycle с rotation/revocation и audit; статический expiry применяется where supported, а общий неограниченный admin credential запрещён.

<a id="ap-008-r03"></a>
- **AP-008-R03 — MUST:** данные классифицируются, минимизируются, защищаются и хранятся только в пределах применимой retention/purpose policy.

<a id="ap-008-r04"></a>
- **AP-008-R04 — MUST:** credential material остаётся внутри управляемой secret boundary; consumers получают reference или ограниченный lease. Secret не попадает в domain state, events, jobs, logs, analytics или AI context.

<a id="ap-008-r05"></a>
- **AP-008-R05 — MUST:** authentication, tenant scope, permission, entitlement, rollout feature flag и action approval являются разными gates; ни один из них не выдаёт и не заменяет другой.

<a id="ap-008-x01"></a>
- **AP-008-X01 — MUST NOT:** hardcoded email/role, frontend check, impersonation, service token или feature flag обходят authorization policy.

<a id="ap-008-ev01"></a>
- **AP-008-EV01 — MUST:** threat model, tenant/permission/gate negative tests, secret scanning/redaction checks, access review и retention evidence подтверждают enforcement.

**Exception policy:** `FORBIDDEN` для AP-008-R01…R05. Право стоит выше Principles; конфликт требует Legal/Security governance, минимально необходимого scope, evidence и review.

**Review triggers:** новый data class, privileged action, credential type, external processor, privacy requirement или security incident.

<a id="ap-009"></a>
## AP-009 — Значимые действия доказуемы и объяснимы

Воспроизводимость означает возможность восстановить, что, кем, на каком основании и с каким результатом произошло. Она не означает повторный вызов внешнего provider.

<a id="ap-009-r01"></a>
- **AP-009-R01 — MUST:** каждый домен регистрирует material actions в Classification Registry; для них обязательны audit и evidence.

<a id="ap-009-r02"></a>
- **AP-009-R02 — MUST:** evidence сохраняет original/effective actor, tenant, beneficiary, authority/policy/approval reference, action/input digest, version, result, correlation/causation и compensation/recovery outcome.

<a id="ap-009-r03"></a>
- **AP-009-R03 — MUST:** critical state change и обязательное audit/outbox evidence фиксируются атомарно в локальной boundary либо передаются через durable replayable handoff с явными loss model, retry, reconciliation и SLO. Конкретный механизм принимает ADR-006.

<a id="ap-009-r04"></a>
- **AP-009-R04 — MUST:** audit append-only, защищён от tenant edits и не содержит passwords, tokens или избыточные personal data.

<a id="ap-009-x01"></a>
- **AP-009-X01 — MUST NOT:** application logs, domain events или mutable entity history объявляются полной заменой Audit.

<a id="ap-009-ev01"></a>
- **AP-009-EV01 — MUST:** audited-action catalog, completeness tests и выборка evidence доказывают причинность для financial, access, provider, export, impersonation и AI actions.

**Exception policy:** `FORBIDDEN` для AP-009-R01…R04. Изменение классификации требует APG-CLS review.

**Review triggers:** новый privileged/material action, incident без достаточного evidence, изменение retention или audit storage.

<a id="ap-010"></a>
## AP-010 — Автоматизация не расширяет полномочия

AI, scheduler, worker и service account исполняют делегированную capability, а не получают отдельный короткий путь к данным или внешним системам.

<a id="ap-010-r01"></a>
- **AP-010-R01 — MUST:** effective authority автоматизации не превышает пересечение tenant scope, инициатора либо accountable owner grant для scheduled automation, permission, entitlement, limits и active policy.

<a id="ap-010-r02"></a>
- **AP-010-R02 — MUST:** model output и generated tool call считаются недоверенным proposed input и проходят обычные validation, authorization, idempotency и audit gates.

<a id="ap-010-r03"></a>
- **AP-010-R03 — MUST:** automation, классифицированная как consequential, имеет risk class, разрешённые commands, financial/budget limits, data freshness, completeness, quality и minimum-evidence requirements, approval либо заранее одобренную bounded policy, kill switch и recovery path. Невыполнение data gate запрещает действие либо требует отдельного approval с явно показанным degraded status.

<a id="ap-010-r04"></a>
- **AP-010-R04 — MUST:** бизнес-решение и outcome принадлежат authoritative owning domain — Core либо Product; AI Gateway, workflow runtime или model provider не становятся их owner.

<a id="ap-010-x01"></a>
- **AP-010-X01 — MUST NOT:** AI/worker получает shared superadmin, прямой доступ к чужим таблицам или постоянный provider secret ради упрощения automation.

<a id="ap-010-ev01"></a>
- **AP-010-EV01 — MUST:** capability grants, negative authorization tests, AI evals/provenance, approval digest, limit tests и kill-switch exercise подтверждают границы.

**Exception policy:** `FORBIDDEN` для AP-010-R01…R04. A0/A1 analysis без side effect не является исключением.

**Review triggers:** повышение autonomy level, новый AI tool/command, увеличение лимита, смена model/provider или automation incident.

<a id="ap-011"></a>
## AP-011 — Наблюдение, факт и интерпретация разделены

В аналитическом и AI-контуре различаются raw observation, normalized domain fact, derived metric, interpretation и recommendation.

<a id="ap-011-r01"></a>
- **AP-011-R01 — MUST:** каждый слой данных имеет явный semantic owner и не выдаёт derived/interpretive результат за исходный факт.

<a id="ap-011-r02"></a>
- **AP-011-R02 — MUST:** данные сохраняют provenance, source reference, schema/formula version, `observed_at`, `effective_at`, `ingested_at`, freshness/quality, currency, timezone и classification там, где поля применимы.

<a id="ap-011-r03"></a>
- **AP-011-R03 — MUST:** projection и analytical mart являются rebuildable/read-only относительно transactional owner, показывают stale/partial state и не являются authority, способной самостоятельно разрешить или изменить critical state. Они MAY использоваться как input после validation, freshness/completeness/quality gates и policy decision продуктового owner.

<a id="ap-011-r04"></a>
- **AP-011-R04 — MUST:** исправление source, attribution или metric formula создаёт versioned correction/recalculation с lineage; recommendation остаётся предложением, а не состоявшимся действием.

<a id="ap-011-x01"></a>
- **AP-011-X01 — MUST NOT:** суммы разных валют агрегируются без явного FX source/time, provider metrics объявляются неизменяемой финансовой истиной или AI confidence скрывается.

<a id="ap-011-ev01"></a>
- **AP-011-EV01 — MUST:** data contracts, lineage, quality tests, semantic metric versions и freshness indicators доказывают происхождение и корректность результата.

**Exception policy:** `TIME_BOUND` только для AP-011-R02 при ограничениях внешнего источника; AP-011-R01/R03/R04 — `FORBIDDEN`. Missing provenance/freshness видимы как degraded/unknown.

**Review triggers:** новый data source, изменение формулы/атрибуции, restatement, cross-product mart или использование данных в critical decision.

<a id="ap-012"></a>
## AP-012 — Критический процесс является Golden Flow Contract

Golden Flow — versioned business-process contract и release gate, а не описание happy path.

<a id="ap-012-r01"></a>
- **AP-012-R01 — MUST:** каждый процесс, классифицированный как `critical`, имеет Golden Flow с owner, preconditions, commands, state machine, invariants, expected events, audit, failure paths, recovery, tests и observability. Каждое обязательное поле заполнено значением либо reviewed `N/A`; ledger и notifications указываются where applicable.

<a id="ap-012-r02"></a>
- **AP-012-R02 — MUST:** обязательные Golden Flow tests трассируются до contract version; failure блокирует release затронутого поведения.

<a id="ap-012-r03"></a>
- **AP-012-R03 — MUST:** Golden Flow определяет degraded/manual path, SLO/alerts и runbook там, где процесс зависит от внешней системы или человека.

<a id="ap-012-x01"></a>
- **AP-012-X01 — MUST NOT:** успешный UI happy path, unit test или ручная демонстрация считаются достаточным доказательством критического end-to-end процесса.

<a id="ap-012-ev01"></a>
- **AP-012-EV01 — MUST:** Golden Flow Registry связывает contract version с integration/E2E/resilience tests, release result, owner, SLO и runbook.

**Exception policy:** `FORBIDDEN` для AP-012-R01…R03 после classification `critical`. `N/A` поля не является exception и требует reviewed rationale.

**Review triggers:** новый критический flow, изменение state/invariant/ledger/event, incident, release failure или изменение dependency.

<a id="ap-013"></a>
## AP-013 — Эволюция совместима и восстановима

Recoverable не означает, что любое внешнее действие можно физически отменить. Оно означает заранее выбранный безопасный путь остановки, возврата чтения, компенсации или disaster recovery.

<a id="ap-013-r01"></a>
- **AP-013-R01 — MUST:** production contract, schema и ownership меняются через совместимый staged path. Паттерн `expand → backfill → shadow/compare → cutover → observe → contract` SHOULD применяться where applicable; пропуск этапа получает reviewed rationale и evidence.

<a id="ap-013-r02"></a>
- **AP-013-R02 — MUST:** каждое Level 1/2 либо затрагивающее production state/contract изменение явно различает Feature Rollback, Application Rollback, Read/Cutover Rollback, Data Compensation и Disaster Recovery и выбирает применимые механизмы.

<a id="ap-013-r03"></a>
- **AP-013-R03 — MUST:** необратимый data/schema/cutover step имеет отдельное решение, risk owner, применимое backup/restore evidence, acceptance gate, observation window и post-change reconciliation. Необратимые external effects регулирует AP-007.

<a id="ap-013-r04"></a>
- **AP-013-R04 — MUST:** legacy behavior не считается target architecture по умолчанию; новая работа не углубляет известное отклонение без approved migration reason и exit condition.

<a id="ap-013-x01"></a>
- **AP-013-X01 — MUST NOT:** одновременный необратимый multi-domain/data cutover без compatibility, shadow/validation и recovery path выполняется как big-bang; полный database restore не описывается как обычный rollback production release.

<a id="ap-013-ev01"></a>
- **AP-013-EV01 — MUST:** migration/recovery design, compatibility tests, dry run, shadow comparison, restore validation и reconciliation report подтверждают безопасный переход where applicable.

**Exception policy:** `FORBIDDEN` для AP-013-R01…R04. Конкретная последовательность MAY отличаться в пределах AP-013-R01 с reviewed rationale и evidence.

**Review triggers:** schema/owner migration, irreversible step, restore failure, breaking contract или production data incident.

<a id="ap-014"></a>
## AP-014 — Логическая модульность предшествует распределению

Граница домена определяется ownership и contracts, а не количеством deployments.

<a id="ap-014-r01"></a>
- **AP-014-R01 — MUST:** logical ownership, module boundary и contracts определяются до решения о физическом deployment; отдельный service не требуется для признания границы. Текущую default topology принимает ADR-007, а не этот Principle.

<a id="ap-014-r02"></a>
- **AP-014-R02 — MUST:** service extraction принимается ADR только по измеримой причине: независимая нагрузка, failure/security boundary, release cadence, runtime/storage requirement или доказанная организационная масштабируемость.

<a id="ap-014-r03"></a>
- **AP-014-R03 — MUST:** extraction сохраняет либо явно versioned-изменяет owner, invariants, contracts, tenant policy, audit и recovery obligations.

<a id="ap-014-r04"></a>
- **AP-014-R04 — MUST:** совместное process/database размещение не отменяет module-owned state, owner-controlled application interface и boundary tests.

<a id="ap-014-x01"></a>
- **AP-014-X01 — MUST NOT:** размер каталога, слово `service`, желание другой технологии или абстрактная масштабируемость считаются достаточным основанием extraction.

<a id="ap-014-ev01"></a>
- **AP-014-EV01 — MUST:** module dependency checks и service-extraction ADR содержат baseline metric, ожидаемый эффект, новые failure modes, SLO и migration/recovery plan.

**Exception policy:** `FORBIDDEN` для AP-014-R01…R04. Extraction с требуемыми доказательствами соответствует Principle и не является exception.

**Review triggers:** service extraction proposal, новый deployment/storage, рост команды, SLO breach или изменение failure domain.

## 5. Исключения из Principles

Исключение не является комментарием в коде или свободным абзацем в ADR. Оно является ограниченным объектом, который может быть одобрен только Accepted ADR Decision.

### 5.1. Exception object и lifecycle

ID имеет вид `APX-YYYY-NNN`, является постоянным и никогда не переиспользуется.

```yaml
exception_id: APX-2026-001
status: PROPOSED | ACTIVE | CLOSED | EXPIRED | REJECTED | SUPERSEDED
principle_rule_ids: []
approval_adr_decision_id: null
reason: null
scope:
  modules: []
  components: []
  commands_or_endpoints: []
  environments: []
  tenants: []
  versions: []
explicitly_out_of_scope: []
risk:
  description: null
  severity: null
  blast_radius: null
risk_owner:
  role: null
  name: null
compensating_controls: []
monitoring_and_alerts: []
created_at: null
valid_from: null
review_date: null
exit_condition: null
removal_plan:
  owner: null
  work_items: []
  milestones: []
  exit_criteria: []
approved_by: []
evidence_refs: []
renewal_of: null
renewal_count: 0
supersedes: null
superseded_by: null
closed_at: null
closure_evidence: []
```

<a id="apg-exc-r01"></a>
- **APG-EXC-R01 — MUST:** exception ссылается только на Rule ID, указанный в `time_bound_rule_ids` Machine-readable Principle Registry. Rule из `forbidden_rule_ids` не может получить `E`.

<a id="apg-exc-r02"></a>
- **APG-EXC-R02 — MUST:** заполняется минимум одно из `review_date` или `exit_condition`; `permanent`, `TBD`, «когда-нибудь» и эквиваленты запрещены. `review_date`, если задана, позже `valid_from`. Exit condition объективна, связана с named version/gate/legacy-path removal и проверяется до `GREEN` соответствующего gate.

<a id="apg-exc-r03"></a>
- **APG-EXC-R03 — MUST:** переход `PROPOSED → ACTIVE` возможен только при Accepted ADR Decision ID, named risk owner, approved scope, compensating controls, `valid_from`, evidence и применимом approval.

<a id="apg-exc-r04"></a>
- **APG-EXC-R04 — MUST:** достижение `review_date` или `exit_condition` без closure либо нового принятого решения переводит exception в `EXPIRED`; expired exception даёт `STOP` для затронутого release/gate.

<a id="apg-exc-r05"></a>
- **APG-EXC-R05 — MUST:** scope expansion или продление создаёт новый APX; `renewal_of` указывает непосредственного predecessor, `renewal_count = predecessor.renewal_count + 1`, predecessor получает `superseded_by`, а циклы запрещены. После одного последовательного renewal следующий требует полного Principle governance review. Feature flag, TODO или backlog item не продлевает exception.

<a id="apg-exc-r06"></a>
- **APG-EXC-R06 — MUST:** `ACTIVE → CLOSED` требует closure evidence; `SUPERSEDED` требует `superseded_by`; расширение scope без нового APX запрещено.

<a id="apg-exc-r07"></a>
- **APG-EXC-R07 — MUST:** `E` в Architecture Decision Matrix содержит Principle Rule ID, `ACTIVE` Exception ID и Accepted approval ADR Decision ID.

<a id="apg-exc-r08"></a>
- **APG-EXC-R08 — MUST:** exception не ослабляет правовое требование. Конфликт права и Principle проходит Legal/Security governance с минимальным scope, evidence и review.

### 5.2. Legacy/Migration Deviation не равно E

<a id="apg-leg-r01"></a>
- **APG-LEG-R01 — MUST:** несоответствие текущего legacy-кода target Principle не становится принятым архитектурным исключением автоматически.

<a id="apg-leg-r02"></a>
- **APG-LEG-R02 — MUST:** Legacy Deviation регистрируется в H0.3 с current/target owner и получает migration/recovery strategy и exit condition в H0.4/H0.5.

<a id="apg-leg-r03"></a>
- **APG-LEG-R03 — MUST NOT:** новая разработка расширяет или углубляет Legacy Deviation без отдельного approved migration reason и bounded scope.

<a id="apg-leg-r04"></a>
- **APG-LEG-R04 — MUST:** Legacy Deviation не изменяет статус target Principle/Blueprint и не отображается в Matrix как `E` без отдельного active exception.

## 6. Architecture Decision Matrix

Architecture Decision Matrix является **нормативным по обязательности артефактом Governance и производным по содержанию документом**. Источниками истины являются только Accepted Architecture Principles и Accepted ADR.

Обязательные metadata Matrix:

```yaml
document_status: DRAFT | REVIEW | ACCEPTED | SUPERSEDED
authority: DERIVED
freshness: CURRENT | STALE
matrix_version: null
principles_document_id: ENVIDICY-ARCH-PRINCIPLES
principles_version: null
principles_hash: null
adr_decision_snapshots:
  - decision_id: null
    document_id: null
    document_version: null
    document_hash: null
    status: ACCEPTED
reviewed_by: []
reviewed_at: null
```

<a id="apg-mtx-r01"></a>
- **APG-MTX-R01 — MUST:** Matrix обязательна для Blueprint Conformance Review, но не создаёт новых решений и не заменяет Principles/ADR.

<a id="apg-mtx-r02"></a>
- **APG-MTX-R02 — MUST:** Matrix имеет точный source snapshot. Изменение Principles либо связанного ADR автоматически переводит `freshness` в `STALE`; `STALE` блокирует Blueprint acceptance.

<a id="apg-mtx-r03"></a>
- **APG-MTX-R03 — MUST:** `ACCEPTED` Matrix означает только проверенную полноту и согласованность указанного snapshot, а не самостоятельное архитектурное решение.

<a id="apg-mtx-r04"></a>
- **APG-MTX-R04 — MUST:** каждая связь содержит relationship code, Principle Rule ID, ADR Decision ID, `conformance_result`, `evidence_refs` и разрешимый ADR artifact path/anchor. Для `E` дополнительно обязательны Exception ID, approval ADR Decision ID и отдельный exception artifact path/anchor; `adr_decision_id` и `approval_adr_decision_id` MAY совпадать, но оба поля присутствуют.

<a id="apg-mtx-r05"></a>
- **APG-MTX-R05 — MUST:** `conformance_result` принимает только `CONFORMS | ACTIVE_EXCEPTION | NONCONFORMING | REVIEWED_N/A`; `REVIEWED_N/A` содержит owner/reviewer rationale, а `NONCONFORMING` даёт `STOP`.

Семантика ячейки:

| Код | Значение |
|---|---|
| `I` | ADR реализует Principle напрямую |
| `S` | ADR опирается на Principle или усиливает его |
| `C` | Principle ограничивает решение ADR |
| `E` | ADR содержит принятое ограниченное исключение |
| `—` | Principle к ADR неприменим |

Machine-readable примеры:

```yaml
- {principle_rule_id: AP-006-R01, relationship: I, adr_decision_id: ADR-003-D04, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-003-core-billing-ledger.md, adr_anchor: adr-003-d04}
- {principle_rule_id: AP-008-R04, relationship: C, adr_decision_id: ADR-004-D03, conformance_result: CONFORMS, evidence_refs: [], adr_artifact_path: docs/envidicy/decisions/ADR-004-integration-vault-runtime.md, adr_anchor: adr-004-d03}
- {principle_rule_id: AP-004-R01, relationship: E, adr_decision_id: ADR-005-D07, conformance_result: ACTIVE_EXCEPTION, evidence_refs: [], exception_id: APX-2026-001, approval_adr_decision_id: ADR-005-D07, adr_artifact_path: docs/envidicy/decisions/ADR-005-platform-ownership.md, adr_anchor: adr-005-d07, exception_artifact_path: docs/envidicy/governance/h0/H0-01-principle-exceptions.md, exception_anchor: apx-2026-001}
```

Blueprint не получает `Accepted`, если выполняется хотя бы одно условие:

<a id="apg-mtx-g01"></a>
1. **APG-MTX-G01 — STOP:** существует Principle без связанного ADR/conformance evidence.

<a id="apg-mtx-g02"></a>
2. **APG-MTX-G02 — STOP:** существует ADR без связи с Principle.

<a id="apg-mtx-g03"></a>
3. **APG-MTX-G03 — STOP:** существует `E` без `ACTIVE` Exception ID, Accepted approval ADR Decision ID и обоснования.

<a id="apg-mtx-g04"></a>
4. **APG-MTX-G04 — STOP:** ссылка на Principle Rule, ADR Decision, Exception или artifact anchor не разрешается.

<a id="apg-mtx-g05"></a>
5. **APG-MTX-G05 — STOP:** версии/hashes Principles, ADR snapshot и Matrix не синхронизированы либо Matrix имеет `STALE`.

<a id="apg-mtx-g06"></a>
6. **APG-MTX-G06 — STOP:** изменение Principle не открыло review связанных ADR.

<a id="apg-mtx-g07"></a>
7. **APG-MTX-G07 — STOP:** изменение ADR не открыло Matrix Review и Blueprint Conformance Review.

## 7. Change policy

`document_version` отслеживает редакцию файла и меняется при любом зафиксированном amendment. `constitution_version` отслеживает смысловую редакцию Конституции, на которую ссылаются Blueprint, ADR и Matrix.

<a id="apg-ver-r01"></a>
- **APG-VER-R01 — MUST:** Review Candidate MAY использовать prerelease version вида `1.0.0-rc.1`; нормативной для Blueprint становится только stable `constitution_version` со статусом `ACCEPTED` и зафиксированным hash.

<a id="apg-ver-r02"></a>
- **APG-VER-R02 — MUST:** Blueprint, ADR snapshot и Matrix указывают exact `constitution_version` и hash; переход на новую редакцию открывает impact/conformance review.

Правила изменения `constitution_version`:

| Изменение версии | Значение |
|---|---|
| `PATCH` | editorial/link correction без изменения нормативного смысла; ID сохраняется |
| `MINOR` | новый Principle либо evidence obligation, не переписывающая существующий нормативный смысл, после formal governance acceptance |
| `MAJOR` | изменение модели Constitution/Governance либо normative supersession/removal хотя бы одного Accepted Principle; coordinated change нескольких Principles также является `MAJOR` |

<a id="apg-chg-r01"></a>
- **APG-CHG-R01 — MUST NOT:** Accepted Principle/Rule переписывается молча.

<a id="apg-chg-r02"></a>
- **APG-CHG-R02 — MUST:** editorial change сохраняет ID, но создаёт новую document version/hash и проходит применимый amendment/BCR.

<a id="apg-chg-r03"></a>
- **APG-CHG-R03 — MUST:** изменение нормативного смысла Accepted Principle или Rule создаёт новый Principle ID с `supersedes`; предыдущий Principle целиком получает `SUPERSEDED`, запускаются impact review связанных ADR и новая Matrix version.

<a id="apg-chg-r04"></a>
- **APG-CHG-R04 — MUST:** Accepted Principle удаляется только отдельным governance removal decision либо получает `SUPERSEDED`; `ARCHIVED` без такого решения не отменяет его действие, а ID никогда не освобождается.

<a id="apg-chg-r05"></a>
- **APG-CHG-R05 — MUST:** новое архитектурное решение создаёт новый ADR с `supersedes`; прежний Accepted ADR не редактируется под новый смысл.

<a id="apg-chg-r06"></a>
- **APG-CHG-R06 — MUST:** этот файл является additive H0.1 artifact и не изменяет исторический baseline `ENVIDICY-ARCH-RC-2026-07-23-01`. Изменение frozen H0.0 file требует `BCR-YYYY-NNN`, новой версии/hash и amendment либо нового baseline ID.

<a id="apg-chg-r07"></a>
- **APG-CHG-R07 — MUST:** финальный H0.1 Acceptance Manifest отдельно фиксирует versions/hashes Principles, ADR, Matrix, Blueprint Conformance Review, обновлённого Blueprint baseline, reviewers и acceptance evidence.

<a id="apg-chg-r08"></a>
- **APG-CHG-R08 — MUST:** изменение tenant model, owner, ledger, secrets, compatibility, AI autonomy, service topology, правовых требований или существенный incident открывает review, но само по себе не меняет правило.

## 8. H0.1 acceptance conditions для Principles

<a id="apg-acc-r01"></a>
- **APG-ACC-R01 — MUST:** `REVIEW_CANDIDATE` означает готовность содержания, но не открывает formal review. Переход `DRAFT/REVIEW_CANDIDATE → REVIEW` запрещён, пока Architecture Owner и обязательные reviewer roles не имеют named human assignees в metadata.

<a id="apg-acc-r02"></a>
- **APG-ACC-R02 — MUST:** статус `ACCEPTED` требует зафиксированного `APPROVE` от Product/Business Sponsor, Architecture Owner, Security Reviewer, Finance Reviewer и Engineering Owner. Operations/SRE дополнительно подтверждает AP-007/AP-012/AP-013/AP-014, Data/Analytics Domain Reviewer — AP-011. AI не является owner, reviewer или approver.

<a id="apg-acc-r03"></a>
- **APG-ACC-R03 — MUST:** каждый Principle/Rule имеет уникальный anchor, каждое `MUST/MUST NOT` проверяемо, каждое EV перечисляет проверяемые Rule ID, applicability, `required_at`, `verification_method_by_gate` и отдельный gate status, а unresolved conflict отсутствует. Будущее evidence может иметь `DEFINED/NOT_YET_APPLICABLE` до своего gate.

<a id="apg-acc-r04"></a>
- **APG-ACC-R04 — MUST:** exception eligibility проверена на уровне Rule ID, бессрочное exception невозможно по APG-EXC, а принятые classification policy и default-high rules закрывают самоэвакуацию из critical/material/consequential scope. Заполнение process/Golden Flow entries остаётся gate H0.2.

<a id="apg-acc-r05"></a>
- **APG-ACC-R05 — MUST:** Principles Acceptance Record фиксирует exact document version/hash, reviewers, decisions, dates и evidence; без него этот документ остаётся не выше `REVIEW`. Финальный H0.1 Acceptance Manifest создаётся позднее для полного пакета Principles + ADR + Matrix + Conformance Review.

<a id="apg-acc-r06"></a>
- **APG-ACC-R06 — MUST:** принятие Principles не принимает Blueprint и не завершает H0.1. Далее последовательно создаются ADR-001–ADR-007, Architecture Decision Matrix и Blueprint Conformance Review.

<a id="apg-acc-r07"></a>
- **APG-ACC-R07 — MUST:** application-код, schema и production data остаются неизменными; разрешение development появляется только после `GREEN H0.6`.

<a id="apg-acc-r08"></a>
- **APG-ACC-R08 — MUST:** `owner_name/owner_human_identity_ref` совпадают с reviewer entry роли Architecture Owner; `required_for_status` и `required_for_scope_ids` проверяются машинно, а несовпадение либо отсутствующий scoped approval даёт `STOP`.
