---
document_id: ADR-001-REVIEW-CANDIDATE-MANIFEST
manifest_version: 0.2.0
manifest_status: CURRENT
created_at: 2026-07-23
preserved_at: 2026-07-23
target:
  path: ./ADR-001-organization-as-tenant-boundary.review-candidate-0.2.0.snapshot.md
  document_id: ADR-001
  document_version: 0.2.0
  document_status: REVIEW_CANDIDATE
  decision_status: PROPOSED
  hash_algorithm: SHA-256
  sha256: 89763c8f5156eb02ed8bb5db025446af5d33e453fa98cf391f557da949928575
constitution_snapshot:
  document_id: ENVIDICY-ARCH-PRINCIPLES
  constitution_version: 1.0.0
  sha256: 28a21326cc200d2e73c1f01982a96745780284d86194ffb4583c70b0d5990c81
parent_baseline: ENVIDICY-ARCH-RC-2026-07-23-01
human_approvals_recorded: false
---

# ADR-001 Review Candidate Manifest

Этот manifest фиксирует точное содержимое ADR-001, подготовленное к formal human review. Он является content-address evidence, но сам не открывает formal review и не принимает архитектурное решение.

## Проверенный состав

- 10 уникальных Decision IDs и 10 разрешимых anchors;
- 82 нормализованные связи `Principle Rule ID → ADR Decision ID`;
- отсутствующие или битые Principle/Decision references: 0;
- Architecture Principle exceptions: 0;
- reviewer roles и named human assignees указаны;
- reviewer decisions остаются незаполненными.

Любое изменение target-файла меняет SHA-256, делает этот manifest устаревшим и требует новой document version и нового Review Candidate manifest.

Статус `REVIEW_CANDIDATE` не означает `ACCEPTED`, не принимает Blueprint, не завершает H0.1 и не разрешает изменение application-code, database schema или production data.
