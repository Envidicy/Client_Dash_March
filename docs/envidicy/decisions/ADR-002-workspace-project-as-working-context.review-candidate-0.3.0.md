---
document_id: ADR-002-REVIEW-CANDIDATE-MANIFEST
manifest_version: 0.3.0
manifest_status: CURRENT
created_at: 2026-07-23
preserved_at: 2026-07-23
target:
  path: ./ADR-002-workspace-project-as-working-context.review-candidate-0.3.0.snapshot.md
  document_id: ADR-002
  document_version: 0.3.0
  document_status: REVIEW_CANDIDATE
  decision_status: PROPOSED
  bytes: 154827
  lines: 1595
  hash_algorithm: SHA-256
  sha256: ab9c74752fb62118c2964c22749a76f28eef48de722559b9d2f3eb0f258da38d
promotion:
  source_draft_sha256: 90891dd157eeaa6d505b2f518eb1444d4ccef4e76030ffb509dc78449799e7c2
  source_draft_bytes: 154419
  source_draft_decision_block_sha256: f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c
  target_decision_block_sha256: f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c
  reverse_validation_sha256: 90891dd157eeaa6d505b2f518eb1444d4ccef4e76030ffb509dc78449799e7c2
  semantic_decision_changes: false
  change_scope: LIFECYCLE_AND_STATUS_METADATA_ONLY
revision_from:
  document_version: 0.2.0
  review_candidate_manifest: ./ADR-002-workspace-project-as-working-context.review-candidate-0.2.0.md
  review_candidate_manifest_sha256: 539bedaa838dbb0f4f341271babac89166adf7477d8f711f2049033e461a2ecb
  review_candidate_snapshot: ./ADR-002-workspace-project-as-working-context.review-candidate-0.2.0.snapshot.md
  review_candidate_sha256: f4d1ebb436aa4be5a7a421ed49ee458b47910cf6c033e35b061b076d058d4d38
  review_verdict: RETURN_WITH_REQUIRED_CHANGES
  formal_review_opened: false
  human_approvals_recorded: false
  semantic_decision_changes: true
  change_scope: REGISTERED_FINDING_REMEDIATION
finding_resolution:
  - id: ADR-002-RC-0.2.0-P1-01
    severity: P1
    status: CLOSED
    scope: STRUCTURAL_OPERATIONAL_FACET_AND_PER_ACTION_AUTHORITY_SEPARATION
    resolved_by_decision_ids: [ADR-002-D04, ADR-002-D05, ADR-002-D06, ADR-002-D07, ADR-002-D08, ADR-002-D09, ADR-002-D10]
approvals_carried_forward: false
constitution_snapshot:
  document_id: ENVIDICY-ARCH-PRINCIPLES
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
baseline_validation:
  frozen_artifacts: 13
  matching_artifacts: 13
  mismatches: 0
traceability:
  decision_ids: 10
  decision_anchors: 10
  manifest_parts: 3
  principle_decision_links: 152
  unique_principle_rule_ids: 53
  duplicate_principle_decision_pairs: 0
  architecture_principle_exceptions: 0
preparation_assurance:
  target_draft_sha256: 90891dd157eeaa6d505b2f518eb1444d4ccef4e76030ffb509dc78449799e7c2
  target_draft_bytes: 154419
  assurance_scope: CONTENT_PREPARATION_ONLY
  independent_reviews: 3
  domain_review: GREEN
  security_conformance_review: GREEN
  mechanical_review: GREEN
  p0_findings: 0
  p1_findings: 0
  p2_findings: 0
  editorial_findings: 0
  human_reviewer_decision: false
review:
  required_role_decisions: 11
  recorded_role_decisions: 0
  pending_role_decisions: 11
  formal_review_opened: false
  human_approvals_recorded: false
blueprint_accepted: false
h0_1_completed: false
development_authorization: false
---

# ADR-002 Review Candidate Manifest 0.3.0

Этот manifest фиксирует точное содержимое ADR-002 после устранения blocking finding возвращённого Review Candidate 0.2.0. Он является content-address evidence, но сам не открывает formal human review и не принимает архитектурное решение.

## История revision

Review Candidate 0.2.0 с полным SHA-256 `f4d1ebb436aa4be5a7a421ed49ee458b47910cf6c033e35b061b076d058d4d38` получил verdict `RETURN_WITH_REQUIRED_CHANGES`. Formal review для него не открывался, human approvals не записывались. Его snapshot и manifest, как и артефакты 0.1.0, сохранены побайтно неизменными как historical evidence.

Версия 0.3.0 закрывает `ADR-002-RC-0.2.0-P1-01`:

- каждый `TENANT` resource имеет ровно один canonical primary structural facet со stable, non-reused `facet_id`, stable `facet_type`, structural `facet_organization_id`, exact anchor, отдельной scope version и versioned mobility policy;
- для `MULTI_PARTY` structural facet Organization обязана входить в participant set, но не выдаёт и не выбирает authority;
- `authorization_context` с `authority_tenant_id`, action и authority-matrix version разрешается сервером отдельно для каждого действия и не является facet/resource state;
- secondary associations не становятся peer primary facets и не выбирают authority;
- rescope указывает exact facet и versions, выполняется только внутри structural Organization по отдельному material workflow, а смена facet Organization передана transfer/recreate/migration;
- participant removal, restore, Project reparent, material dependencies и async association execution получили fail-closed version/approval/revalidation obligations;
- structural scope и action-specific authority сохраняются раздельно в admission, audit, async и historical evidence.

Human approvals из прежнего candidate не переносятся; их не существовало.

## Проверенный состав

- 10 уникальных Decision IDs и 10 разрешимых anchors;
- 152 уникальные нормализованные связи `Principle Rule ID → ADR Decision ID` в трёх частях `58 + 42 + 52`;
- 53 существующих Principle Rule IDs;
- duplicate links, отсутствующие Principle references, битые Decision anchors и local artifact paths: 0;
- Architecture Principle exceptions: 0;
- 11 reviewer roles имеют named human assignees и непустые Decision-ID scopes;
- reviewer decisions, review dates и evidence refs остаются незаполненными;
- Constitution 1.0.0, ADR-001 1.0.0 и Acceptance Record 1.0.1 совпадают с указанными hashes;
- все 13 артефактов H0.0 baseline совпадают с frozen manifest;
- tracked application-code и schema changes отсутствуют.

Draft content по SHA-256 `90891dd157eeaa6d505b2f518eb1444d4ccef4e76030ffb509dc78449799e7c2` прошло независимые domain, security/conformance и mechanical проверки с результатом `P0=0 / P1=0 / P2=0 / editorial=0`. Это preparation evidence качества, а не человеческий reviewer decision и не `APPROVE`.

Promotion из проверенного Draft в Review Candidate изменил только lifecycle/status metadata и status-boundary text. Нормативное содержание D01–D10, их anchors и machine-readable Principle links при promotion не изменялось; decision block до и после promotion имеет SHA-256 `f0b3fbb7f7b45fd8712ff2cf3a8edf5473732805c843a320b1605487c685c38c`.

Любое изменение target-файла меняет SHA-256, делает этот manifest неприменимым и требует новой document version, нового snapshot/manifest и повторного review.

Статус `REVIEW_CANDIDATE / PROPOSED` не означает formal `REVIEW` или `ACCEPTED`, не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, database schema или production data.
