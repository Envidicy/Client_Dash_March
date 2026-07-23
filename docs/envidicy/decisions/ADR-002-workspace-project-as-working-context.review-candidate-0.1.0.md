---
document_id: ADR-002-REVIEW-CANDIDATE-MANIFEST
manifest_version: 0.1.0
manifest_status: CURRENT
created_at: 2026-07-23
preserved_at: 2026-07-23
target:
  path: ./ADR-002-workspace-project-as-working-context.review-candidate-0.1.0.snapshot.md
  document_id: ADR-002
  document_version: 0.1.0
  document_status: REVIEW_CANDIDATE
  decision_status: PROPOSED
  hash_algorithm: SHA-256
  sha256: e4980984e8ffd3bf680066657da2f8f215d4e3ca15f96cd79d10a7689fe27a29
promotion:
  source_draft_sha256: 809a48d6d1e85d2790d57936381cd16a6c9ab1d0e6b751bacf508fe5cd93e6d9
  semantic_decision_changes: false
  change_scope: LIFECYCLE_AND_STATUS_METADATA_ONLY
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
traceability:
  decision_ids: 10
  decision_anchors: 10
  manifest_parts: 3
  principle_decision_links: 131
  unique_principle_rule_ids: 53
  duplicate_principle_decision_pairs: 0
  architecture_principle_exceptions: 0
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

# ADR-002 Review Candidate Manifest

Этот manifest фиксирует точное содержимое ADR-002, подготовленное к formal human review. Он является content-address evidence, но сам не открывает formal review и не принимает архитектурное решение.

## Проверенный состав

- 10 уникальных Decision IDs и 10 разрешимых anchors;
- 131 уникальная нормализованная связь `Principle Rule ID → ADR Decision ID` в трёх частях с детерминированным merge order;
- 53 существующих Principle Rule IDs;
- duplicate links, отсутствующие Principle references, битые Decision anchors и local artifact paths: 0;
- Architecture Principle exceptions: 0;
- 11 reviewer roles имеют named human assignees и непустые Decision-ID scopes;
- reviewer decisions, review dates и evidence refs остаются незаполненными;
- Constitution 1.0.0, ADR-001 1.0.0 и Acceptance Record 1.0.1 совпадают с указанными hashes;
- все 13 артефактов H0.0 baseline совпадают с frozen manifest.

Draft content по SHA-256 `809a48d6d1e85d2790d57936381cd16a6c9ab1d0e6b751bacf508fe5cd93e6d9` прошёл независимые domain, security/conformance и mechanical проверки с результатом `P0=0 / P1=0 / P2=0`. Это preparation evidence, а не человеческий reviewer decision и не `APPROVE`.

Promotion в Review Candidate изменил только lifecycle/status metadata и status-boundary text. D01–D10, их anchors и machine-readable Principle links не изменялись.

Любое изменение target-файла меняет SHA-256, делает этот manifest устаревшим и требует новой document version и нового Review Candidate manifest.

Статус `REVIEW_CANDIDATE / PROPOSED` не означает formal `REVIEW` или `ACCEPTED`, не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, database schema или production data.
