---
document_id: ADR-001-ACCEPTANCE-AMENDMENT-001
document_version: 1.0.0
document_status: ACCEPTED
h0_stage: H0.1
amendment_id: ADR-001-AR-A001
amendment_class: DOCUMENTATION_EDITORIAL
amendment_status: APPLIED
target_document_id: ADR-001-ACCEPTANCE
from_document_version: 1.0.0
from_sha256: 1b3b6d6c751f9cadf61e611ed032a75f423687b60cd84a94724361bc56c7dd9d
from_snapshot: ./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.0.snapshot.md
review_target_document_version: 1.0.1-rc.1
review_target_full_file_sha256: 0c716c985915ace13492f0e4bd2ad7153fb391168249eedea399b485c668a679
review_target_artifact: ./ADR-001-organization-as-tenant-boundary.acceptance-record.review-target-1.0.1-rc.1.md
accepted_candidate_document_version: 1.0.1
accepted_document_version: 1.0.1
accepted_full_file_sha256: 200b0f4ccdf204707b689092cfab93d1a532aef7cfeca3a75a1c27177cb5997c
accepted_artifact: ./ADR-001-organization-as-tenant-boundary.acceptance-record.md
accepted_snapshot: ./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.1.snapshot.md
accepted_at: 2026-07-23
accountable_owner_role: Architecture Owner
accountable_owner_identity_ref: person:envidicy:0002
accountable_owner_name: "Колядов Денис Викторович"
review_opened_at: 2026-07-23
review_decision: APPROVE
reviewed_at: 2026-07-23
approval_evidence_ref: "#approval-attestation-denis-2026-07-23"
amendment_prepared_at: 2026-07-23
semantic_impact: NONE
---

# ADR-001 Acceptance Record Amendment 001

## 1. Основание

В ходе независимой проверки принятого ADR-001 зарегистрировано неблокирующее замечание `P2-01`: имена `review_target_sha256` и `accepted_artifact_sha256` в §6 Acceptance Record 1.0.0 могли быть ошибочно интерпретированы как SHA-256 полных файлов, хотя их значения относятся только к нормативным блокам решений D01–D10.

Поправка прошла отдельный content-addressed review и применена после прямого `APPROVE` Architecture Owner для точного полного SHA-256 review target. Acceptance Record 1.0.0 не перезаписан молча: его исходное содержимое сохранено отдельным неизменяемым снимком с исходным полным SHA-256.

## 2. Точное изменение

```yaml
before:
  review_target_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
  accepted_artifact_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
after:
  review_target_decision_block_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
  accepted_artifact_decision_block_sha256: d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99
```

Изменены только имена полей. Их значения и объект хеширования не изменены.

## 3. Content-addressed chain

| Артефакт | Объект хеширования | SHA-256 |
|---|---|---|
| Acceptance Record 1.0.0 / immutable snapshot | Полный файл | `1b3b6d6c751f9cadf61e611ed032a75f423687b60cd84a94724361bc56c7dd9d` |
| Acceptance Record 1.0.1-rc.1 review target | Полный файл | `0c716c985915ace13492f0e4bd2ad7153fb391168249eedea399b485c668a679` |
| Acceptance Record 1.0.1 / immutable snapshot | Полный файл | `200b0f4ccdf204707b689092cfab93d1a532aef7cfeca3a75a1c27177cb5997c` |
| ADR-001 review target 0.2.1 | Полный файл | `e6e4ac9f0d6e4e32296389a229a5c043a1c877b93049311b86728997cf05309f` |
| ADR-001 accepted 1.0.0 | Полный файл | `f130eee543cf7037ba138ae0924b643974221c6a4d9b865478edaf85eba80ebf` |
| Review target / accepted ADR | Только блок D01–D10 | `d8a17a406a4532fd23be0230017481397b09bf0bacb01f073ff3a6e3c6676a99` |

## 4. Semantic impact

`NONE`.

Применённая поправка:

- не меняет D01–D10;
- не меняет review target или принятый ADR-001;
- не меняет ни одно человеческое решение, scope, дату или evidence ref;
- не открывает повторный formal review самого ADR-001;
- не принимает Blueprint и не завершает H0.1;
- не разрешает изменение application-code, database schema или production data до `GREEN H0.6`.

Прямой `APPROVE` Architecture Owner получен для review target `0c716c985915ace13492f0e4bd2ad7153fb391168249eedea399b485c668a679`. Действующей принятой редакцией Acceptance Record является `1.0.1`.

## 5. Проверяемые артефакты

- исходный снимок: `./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.0.snapshot.md`;
- действующий Acceptance Record 1.0.1: `./ADR-001-organization-as-tenant-boundary.acceptance-record.md`;
- неизменяемый снимок 1.0.1: `./ADR-001-organization-as-tenant-boundary.acceptance-record-1.0.1.snapshot.md`;
- review target 1.0.1-rc.1: `./ADR-001-organization-as-tenant-boundary.acceptance-record.review-target-1.0.1-rc.1.md`;
- formal Review Pack: `./ADR-001-organization-as-tenant-boundary.review-pack.md`;
- review target: `./ADR-001-organization-as-tenant-boundary.review-target-0.2.1.md`;
- принятый ADR-001: `./ADR-001-organization-as-tenant-boundary.md`.

## 6. Human review

```yaml
review_target_full_file_sha256: 0c716c985915ace13492f0e4bd2ad7153fb391168249eedea399b485c668a679
required_decisions:
  - role: Architecture Owner
    human_identity_ref: person:envidicy:0002
    name: "Колядов Денис Викторович"
    scope: [ADR-001-AR-A001]
    decision: APPROVE
    reviewed_at: 2026-07-23
    evidence_ref: "#approval-attestation-denis-2026-07-23"
```

<a id="approval-attestation-denis-2026-07-23"></a>
### Approval attestation — Колядов Денис Викторович

Колядов Денис Викторович напрямую подтвердил:

> Я, Колядов Денис Викторович, подтверждаю APPROVE для amendment ADR-001-AR-A001, review target SHA-256 0c716c985915ace13492f0e4bd2ad7153fb391168249eedea399b485c668a679 от 2026-07-23. Semantic impact: NONE.

Attestation является human evidence для governance record. Репозиторий не выдаёт её за криптографическую подпись или независимо аутентифицированную platform identity.

Formal review amendment завершён. Acceptance Record 1.0.1 выпущен с полным SHA-256 `200b0f4ccdf204707b689092cfab93d1a532aef7cfeca3a75a1c27177cb5997c`.
