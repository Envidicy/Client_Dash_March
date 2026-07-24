---
document_id: ADR-002-FORMAL-REVIEW-PACK
document_version: 0.1.0
document_status: REVIEW
h0_stage: H0.1
review_target_document_id: ADR-002
review_target_document_version: 0.3.1
review_target_document_status: REVIEW
review_target_decision_status: PROPOSED
review_target_sha256: f7792b415a8d7aa98bd7b16811eb77801a31e99baf153446945ea1ed205e3cf1
review_target_bytes: 155535
review_target_lines: 1597
review_target_snapshot: ./ADR-002-workspace-project-as-working-context.review-target-0.3.1.md
review_target_decision_block_sha256: f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c
review_target_traceability_tuple_sha256: 4a513657fabbff5ccfa5927f980068d030d2f9001c67dd47e1e4b3511505d0af
main_at_review_open: ./ADR-002-workspace-project-as-working-context.md
main_at_review_open_sha256: f7792b415a8d7aa98bd7b16811eb77801a31e99baf153446945ea1ed205e3cf1
source_draft_sha256: 90891dd157eeaa6d505b2f518eb1444d4ccef4e76030ffb509dc78449799e7c2
source_review_candidate_version: 0.3.0
source_review_candidate_sha256: ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d
source_review_candidate_snapshot: ./ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.snapshot.md
source_review_candidate_manifest: ./ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.md
source_review_candidate_manifest_sha256: 80fccf6e5f795916f5b06bb9c0c619d53e0f9581a1b57b085c0ee4bbf7e29ecb
source_review_candidate_decision_block_sha256: f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c
reverse_validation_sha256: ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d
semantic_decision_changes: false
change_scope: LIFECYCLE_AND_STATUS_METADATA_ONLY
content_review_verdict: ACCEPT_FOR_REVIEW_CANDIDATE
content_review_target_sha256: ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d
content_review_received_at: 2026-07-24
content_review_p0_findings: 0
content_review_p1_findings: 0
content_review_p2_findings: 0
content_review_editorial_findings: 0
content_review_human_decision: false
constitution_version: 1.0.0
constitution_sha256: 28a21326cc200d2e73c1f01982a96745780284d86194ffb4583c70b0d5990c81
adr_001_version: 1.0.0
adr_001_sha256: f130eee543cf7037ba138ae0924b643974221c6a4d9b865478edaf85eba80ebf
adr_001_acceptance_record_version: 1.0.1
adr_001_acceptance_record_sha256: 200b0f4ccdf204707b689092cfab93d1a532aef7cfeca3a75a1c27177cb5997c
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
owner_role: Architecture Owner
owner_name: "Колядов Денис Викторович"
owner_human_identity_ref: person:envidicy:0002
review_opened_at: 2026-07-24
review_closed_at: null
required_role_decisions: 11
recorded_role_decisions: 0
pending_role_decisions: 11
human_approvals_recorded: false
acceptance_record: null
blueprint_accepted: false
h0_1_completed: false
development_authorization: false
---

# ADR-002 — Formal Review Pack

## 1. Назначение

Formal human review открыт только для точного [review target snapshot](./ADR-002-workspace-project-as-working-context.review-target-0.3.1.md):

```yaml
document_id: ADR-002
document_version: 0.3.1
document_status: REVIEW
decision_status: PROPOSED
sha256: f7792b415a8d7aa98bd7b16811eb77801a31e99baf153446945ea1ed205e3cf1
```

Target создан lifecycle-only promotion из content-addressed `REVIEW_CANDIDATE 0.3.0`. D01–D10, их anchors, normative validation и 152 machine-readable Principle links не изменены:

```yaml
source_review_candidate_sha256: ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d
review_target_decision_block_sha256: f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c
review_target_traceability_tuple_sha256: 4a513657fabbff5ccfa5927f980068d030d2f9001c67dd47e1e4b3511505d0af
```

Любое изменение хотя бы одного byte review target закрывает текущий review как `STALE` и требует новой document version, нового immutable target/hash и повторного review затронутых scopes. Approvals из stale review не переносятся.

## 2. Реестр людей

| Human identity ref | ФИО | Статус |
|---|---|---|
| `person:envidicy:0001` | Сухоруков Роман Николаевич | named human |
| `person:envidicy:0002` | Колядов Денис Викторович | named human |

AI не является owner, reviewer или approver. Содержательный architecture verdict может открыть formal review как preparation evidence, но не записывается как human decision.

## 3. Назначения и scope

| Governance role | Назначенный человек | Required Decision IDs |
|---|---|---|
| Product/Business Sponsor | Сухоруков Роман Николаевич | D01–D10 |
| Architecture Owner | Колядов Денис Викторович | D01–D10 |
| Core Domain Owner | Колядов Денис Викторович | D01–D10 |
| Platform Domain Owner | Колядов Денис Викторович | D04–D10 |
| Security Reviewer | Колядов Денис Викторович | D01–D10 |
| Engineering Owner | Колядов Денис Викторович | D01–D10 |
| Operations/SRE Reviewer | Сухоруков Роман Николаевич | D02, D04–D10 |
| Finance Reviewer | Сухоруков Роман Николаевич | D03–D05, D07–D10 |
| Data/Analytics Domain Reviewer | Колядов Денис Викторович | D03–D10 |
| Advertising Product Domain Reviewer | Колядов Денис Викторович | D03–D05, D07–D10 |
| Creative Intelligence Product Domain Reviewer | Колядов Денис Викторович | D03–D05, D07–D10 |

Один человек может занимать несколько ролей, но решение фиксируется отдельно для каждой роли и только по её назначенному scope.

## 4. Что подтверждает reviewer

Reviewer подтверждает в назначенном scope:

1. `Workspace` и `Project` являются work scopes одной Organization, а не tenant boundary, membership root или отдельным authority path.
2. `Core.Tenancy` единолично владеет Workspace/default selection, а `Core.Projects` — Project identity, lifecycle и containment.
3. Каждый tenant resource имеет ровно один stable primary structural facet; structural Organization не смешивается с per-action `authority_tenant_id`.
4. Membership, scoped Grant, secondary association, permission, entitlement, feature flag и approval являются независимыми facts/gates.
5. `MULTI_PARTY` authority определяется сервером по exact action/path/participant/matrix context; ambiguity и stale versions fail closed.
6. Primary-facet move, participant mutation, lifecycle restore и Project reparent используют versioned material workflows, independent authorization, access delta, approvals и recovery obligations.
7. Async execution повторно проверяет structural scope, authority, revoke, association и material dependencies без retarget или смены authorizer.
8. Audit/events/analytics раздельно и неизменяемо сохраняют structural scope и authority-at-occurrence.
9. Legacy migration не создаёт universal Project, fake primary facet или inferred authority tenant.
10. ADR соответствует Constitution 1.0.0, принятому ADR-001 и не содержит скрытого Architecture Principle exception.
11. Решение не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, database schema или production data.

`APPROVE` допустим только после review полного назначенного scope. Возражение фиксируется как finding; до его закрытия соответствующая роль остаётся `PENDING` либо получает явный `RETURN/REJECT` по правилам review.

## 5. Журнал решений

| Role | Human | Scope | Decision | Reviewed at | Evidence / finding |
|---|---|---|---|---|---|
| Product/Business Sponsor | Сухоруков Роман Николаевич | D01–D10 | `PENDING` | — | — |
| Architecture Owner | Колядов Денис Викторович | D01–D10 | `PENDING` | — | — |
| Core Domain Owner | Колядов Денис Викторович | D01–D10 | `PENDING` | — | — |
| Platform Domain Owner | Колядов Денис Викторович | D04–D10 | `PENDING` | — | — |
| Security Reviewer | Колядов Денис Викторович | D01–D10 | `PENDING` | — | — |
| Engineering Owner | Колядов Денис Викторович | D01–D10 | `PENDING` | — | — |
| Operations/SRE Reviewer | Сухоруков Роман Николаевич | D02, D04–D10 | `PENDING` | — | — |
| Finance Reviewer | Сухоруков Роман Николаевич | D03–D05, D07–D10 | `PENDING` | — | — |
| Data/Analytics Domain Reviewer | Колядов Денис Викторович | D03–D10 | `PENDING` | — | — |
| Advertising Product Domain Reviewer | Колядов Денис Викторович | D03–D05, D07–D10 | `PENDING` | — | — |
| Creative Intelligence Product Domain Reviewer | Колядов Денис Викторович | D03–D05, D07–D10 | `PENDING` | — | — |

Текущее состояние: `11 required / 0 recorded / 11 pending`.

## 6. Входящий content review

Для полного SHA-256 Review Candidate `ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d` получен verdict `ACCEPT FOR REVIEW_CANDIDATE`:

- `P0=0`;
- `P1=0`;
- `P2=0`;
- `Editorial=0`;
- Constitution, ADR-001, D01–D10, 152 traceability links и immutable chain подтверждены.

Verdict является содержательным architecture/conformance evidence. Он не аутентифицирует Дениса или Романа, не заменяет ни одного `PENDING` и не является human `APPROVE`.

## 7. Контракт human attestation

Каждая direct attestation обязана содержать:

```yaml
review_target:
  document_id: ADR-002
  document_version: 0.3.1
  sha256: f7792b415a8d7aa98bd7b16811eb77801a31e99baf153446945ea1ed205e3cf1
human:
  name: "<ФИО>"
  human_identity_ref: "<person ref>"
reviewed_at: "<фактическая дата>"
decisions:
  - role: "<ровно одна назначенная governance role>"
    scope: [<точные ADR-002 Decision IDs>]
    decision: APPROVE
evidence_ref: "<разрешимая ссылка на attestation>"
```

Одна attestation MAY перечислять несколько ролей одного человека, но каждая роль остаётся отдельным decision object с собственным exact scope. Общая фраза «за всё одобряю», решение за другого человека или approval без полного target SHA недействительны.

## 8. Состояние formal review

Formal review открыт `2026-07-24` и остаётся незавершённым:

- target immutable и имеет SHA-256 `f7792b415a8d7aa98bd7b16811eb77801a31e99baf153446945ea1ed205e3cf1`;
- все 11 role decisions остаются `PENDING`;
- human approvals не записаны;
- `decision_status` остаётся `PROPOSED`;
- `Acceptance Record` отсутствует;
- Blueprint не принят;
- H0.1 не завершён;
- development authorization отсутствует.

Review закрывается только после `11/11 APPROVE`, exact role/scope/date/evidence binding и повторной проверки неизменности target hash. Закрытие review и даже последующее принятие ADR-002 сами по себе не разрешают изменение application-code, database schema или production data до соответствующего `GREEN H0.6/H0.7`.
