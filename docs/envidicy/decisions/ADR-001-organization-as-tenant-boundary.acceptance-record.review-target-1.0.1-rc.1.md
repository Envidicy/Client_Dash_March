---
document_id: ADR-001-ACCEPTANCE
document_version: 1.0.1-rc.1
document_status: REVIEW
h0_stage: H0.1
amendment_id: ADR-001-AR-A001
amendment_class: DOCUMENTATION_EDITORIAL
amendment_status: PROPOSED
amendment_prepared_at: 2026-07-23
review_opened_at: 2026-07-23
review_decision: PENDING
accountable_owner_role: Architecture Owner
accountable_owner_identity_ref: person:envidicy:0002
accountable_owner_name: "Колядов Денис Викторович"
accepted_candidate_version: 1.0.1
previous_document_version: 1.0.0
previous_sha256: 1b3b6d6c751f9cadf61e611ed032a75f423687b60cd84a94724361bc56c7dd9d
previous_snapshot: ./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.0.snapshot.md
amendment_manifest: ./ADR-001-organization-as-tenant-boundary.acceptance-record-amendment-001.md
semantic_impact: NONE
review_target_document_id: ADR-001
review_target_document_version: 0.2.1
review_target_decision_status: PROPOSED
review_target_sha256: e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f
review_target_snapshot: ./ADR-001-organization-as-tenant-boundary.review-target-0.2.1.md
review_pack: ./ADR-001-organization-as-tenant-boundary.review-pack.md
review_pack_version: 0.3.0
accepted_document_version: 1.0.0
accepted_document_status: ACCEPTED
accepted_decision_status: ACCEPTED
accepted_sha256: f130eee543cf7037ba138ae0924b643974221c6a4d9b865478edaf85eba80ebf
accepted_artifact: ./ADR-001-organization-as-tenant-boundary.md
decision_block_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
constitution_version: 1.0.0
constitution_sha256: 28a21326cc200d2e73c1f01982a96745780284d86194ffb4583c70b0d5990c81
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
accepted_at: 2026-07-23
effective_from: 2026-07-23
---

# ADR-001 Acceptance Record

> Review target редакционной поправки `ADR-001-AR-A001`. До прямого человеческого `APPROVE`, привязанного к полному SHA-256 этого файла, действующей принятой редакцией Acceptance Record остаётся `1.0.0`.

## 1. Статус

Этот Acceptance Record фиксирует завершение formal human review и принятие ADR-001 `Organization as Tenant Boundary`.

Принятие ADR-001:

- делает D01–D10 обязательными архитектурными решениями для последующей документации и новой реализации;
- не принимает Blueprint;
- не завершает H0.1;
- не разрешает изменение application-code, database schema или production data до `GREEN H0.6`.

## 2. Exact review target

```yaml
document_id: ADR-001
document_version: 0.2.1
document_status: REVIEW
decision_status: PROPOSED
sha256: e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f
snapshot: ./ADR-001-organization-as-tenant-boundary.review-target-0.2.1.md
review_pack: ./ADR-001-organization-as-tenant-boundary.review-pack.md
```

## 3. Human role decisions

```yaml
decisions:
  - role: Product/Business Sponsor
    human_identity_ref: person:envidicy:0001
    name: "Сухоруков Роман Николаевич"
    scope: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-roman-2026-07-23"
  - role: Architecture Owner
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
  - role: Core Domain Owner
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
  - role: Platform Domain Owner
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D02, ADR-001-D08, ADR-001-D09]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
  - role: Security Reviewer
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
  - role: Engineering Owner
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D01, ADR-001-D02, ADR-001-D03, ADR-001-D04, ADR-001-D05, ADR-001-D06, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
  - role: Operations/SRE Reviewer
    human_identity_ref: person:envidicy:0001
    name: "Сухоруков Роман Николаевич"
    scope: [ADR-001-D01, ADR-001-D07, ADR-001-D08, ADR-001-D09, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-roman-2026-07-23"
  - role: Finance Reviewer
    human_identity_ref: person:envidicy:0001
    name: "Сухоруков Роман Николаевич"
    scope: [ADR-001-D07, ADR-001-D08, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-roman-2026-07-23"
  - role: Data/Analytics Domain Reviewer
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-D02, ADR-001-D08, ADR-001-D10]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
```

## 4. Approval evidence

<a id="approval-attestation-denis-2026-07-23"></a>
### Денис Колядов — 2026-07-23

Колядов Денис Викторович напрямую подтвердил `APPROVE` для SHA-256 `e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f` по ролям:

- Architecture Owner — D01–D10;
- Core Domain Owner — D01–D10;
- Platform Domain Owner — D02, D08, D09;
- Security Reviewer — D01–D10;
- Engineering Owner — D01–D10;
- Data/Analytics Domain Reviewer — D02, D08, D10.

<a id="approval-attestation-roman-2026-07-23"></a>
### Роман Сухоруков — 2026-07-23

Получена explicit attestation Сухорукова Романа Николаевича для SHA-256 `e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f` по ролям:

- Product/Business Sponsor — D01–D10;
- Operations/SRE Reviewer — D01, D07, D08, D09, D10;
- Finance Reviewer — D07, D08, D10.

Attestation Романа передана в governance record через Architecture Owner. Она является human evidence, но не выдаётся за криптографическую подпись либо независимо подтверждённую platform identity.

## 5. Accepted artifact

```yaml
document_id: ADR-001
document_version: 1.0.0
document_status: ACCEPTED
decision_status: ACCEPTED
sha256: f130eee543cf7037ba138ae0924b643974221c6a4d9b865478edaf85eba80ebf
accepted_at: 2026-07-23
effective_from: 2026-07-23
artifact: ./ADR-001-organization-as-tenant-boundary.md
```

## 6. Promotion conformance

Promotion `REVIEW 0.2.1 → ACCEPTED 1.0.0` изменил только lifecycle, reviewer/evidence metadata и текст статуса/acceptance evidence.

Нормативный блок D01–D10:

```yaml
review_target_decision_block_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
accepted_artifact_decision_block_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
identical: true
```

Дополнительно проверено:

- 10 уникальных Decision IDs и anchors;
- 82 уникальные machine-readable Principle Rule → ADR Decision связи;
- missing Principle references: 0;
- broken artifact paths/anchors: 0;
- Architecture Principle exceptions: 0;
- Constitution 1.0.0 SHA-256 совпадает;
- frozen H0.0 baseline не изменён.

## 7. Следующие gates

- ADR-001 становится входом для ADR-002–ADR-007.
- Architecture Decision Matrix создаётся после принятия всех запланированных ADR.
- Blueprint получает `Accepted` только после Matrix и Blueprint Conformance Review.
- До `GREEN H0.6` сохраняется запрет на изменение application-code, database schema и production data.

## 8. Change control

Accepted D01–D10 не переписываются молча. Изменение архитектурного смысла требует нового superseding ADR, impact review связанных Principles/ADR и обновления Matrix/Blueprint Conformance evidence.

## 9. Amendment history

### ADR-001-AR-A001 — 2026-07-23

Контролируемая редакционная поправка `1.0.0 → 1.0.1` устраняет неоднозначность двух имён полей в §6:

- `review_target_sha256` → `review_target_decision_block_sha256`;
- `accepted_artifact_sha256` → `accepted_artifact_decision_block_sha256`.

Значения SHA-256 не изменены и по-прежнему относятся только к нормативному блоку решений D01–D10. Архитектурный смысл, D01–D10, human approvals, evidence refs, lifecycle ADR-001 и границы разрешения на разработку не изменены.

Исходная редакция `1.0.0` сохранена как неизменяемый снимок:

`./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.0.snapshot.md`

Полная запись изменения:

`./ADR-001-organization-as-tenant-boundary.acceptance-record-amendment-001.md`
