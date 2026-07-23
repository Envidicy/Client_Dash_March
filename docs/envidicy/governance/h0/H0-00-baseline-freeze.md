# H0.0 Baseline Freeze Manifest

Статус: `Baseline Established`

Baseline ID: `ENVIDICY-ARCH-RC-2026-07-23-01`

Freeze date: `2026-07-23`

Hash algorithm: `SHA-256`

## 1. Решение

Текущий пакет архитектурной документации зафиксирован как `Review Candidate`. Он является точкой отсчёта для H0.1 Architecture Principles и ADR, но ещё не является утверждённой архитектурой.

```text
Draft
→ Review Candidate: ENVIDICY-ARCH-RC-2026-07-23-01
→ Principles + ADR
→ Blueprint Conformance Review
→ Accepted baseline (новый version/reference)
```

## 2. Что означает freeze

- состав документов перечислен явно;
- нормативные документы имеют baseline ID;
- содержимое идентифицируется hashes;
- unresolved decisions не маскируются и переданы H0.1;
- последующее изменение не перезаписывает смысл этой baseline молча;
- freeze не разрешает разработку и не меняет production.

## 3. Scope

### 3.1. Governance foundation

| Документ | Роль | Статус |
|---|---|---|
| `00-architecture-governance-framework.md` | правила принятия архитектурных решений | Accepted v1.0 |

### 3.2. Normative Review Candidate

| Документ | Архитектурная роль | Accountable role | Required reviewers |
|---|---|---|---|
| `02-platform-boundaries.md` | Core/Shared/Product boundaries | Architecture Owner | Product, Domain owners |
| `03-core-blueprint.md` | Core contexts и invariants | Core Domain Owner | Architecture, Security, Finance |
| `04-shared-services.md` | platform runtime boundaries | Platform Domain Owner | Architecture, Operations, Security |
| `05-cross-product-contracts.md` | commands/events/queries | Architecture Owner | producer/consumer owners, Data, Security |
| `06-security-and-permissions.md` | tenancy/authz/security baseline | Security Owner | Architecture, Core, Operations |
| `07-module-registry.md` | portfolio scope/maturity/investment | Portfolio Owner | Product, Architecture, Engineering |

### 3.3. Supporting baseline evidence

| Документ | Роль |
|---|---|
| `01-current-state.md` | factual current-state and risks |
| `08-development-roadmap.md` | H0 sequence and downstream delivery roadmap |
| `09-documentation-governance.md` | documentation lifecycle and templates |
| `README.md` | index and baseline navigation |

### 3.4. Reference only; not frozen as normative

- `products/advertising-os.md`;
- `products/creative-intelligence.md`;
- `templates/*`.

Product documents remain `Draft` until their own PRD/domain review. Templates may evolve without changing the architecture baseline.

## 4. Out of scope H0.0

- принятие Architecture Principles;
- принятие ADR-001–ADR-007;
- статус `Accepted` для Blueprint;
- Golden Flow Contracts;
- полный Legacy → Target Mapping;
- Migration Safety & Recovery design;
- Epic/Story/Task decomposition;
- backup/restore execution;
- любые изменения application code, database schema или production data.

## 5. Roles

В baseline зафиксированы accountable **roles**, а не вымышленные имена. Named human assignees назначаются до начала formal H0.1 review.

| Роль | Обязательность | Текущий статус |
|---|---|---|
| Product/Business Sponsor | обязательно | name pending |
| Architecture Owner | обязательно | name pending |
| Core Domain Owner | обязательно | name pending |
| Platform Domain Owner | обязательно | name pending |
| Security Reviewer | обязательно | name pending |
| Finance Reviewer | обязательно для ADR-003 | name pending |
| Engineering Owner | обязательно | name pending |
| Operations/SRE Reviewer | до H0.4/H0.6 | name pending |

AI не назначается accountable owner или утверждающей стороной.

## 6. Change control после freeze

Изменение normative candidate до Conformance Review требует:

1. `Baseline Change Record` вида `BCR-YYYY-NNN`;
2. причины и ссылки на finding/Principle/ADR;
3. перечня затронутых документов и contracts;
4. новой document version;
5. reviewer roles;
6. повторной проверки ссылок/consistency;
7. нового hash;
8. нового baseline ID или formal amendment, не перезаписывающего старую запись.

Исправление опечатки может быть Level 3 documentation change, но hash всё равно изменится и фиксируется amendment. Смысловое изменение без BCR запрещено.

## 7. Content hashes

Хэши вычислены после завершения H0.0 consistency edits. Сам Manifest не включается в собственный hash.

| Path | Classification | SHA-256 |
|---|---|---|
| `README.md` | index | `703b96c170381d25c83536a97b6b7588c7b9e3e046a5643254004706883b735c` |
| `00-architecture-governance-framework.md` | governance | `54096b6eb11c04dc8e8408a8304ab5675dd73af309e93b351f98a9db68876e24` |
| `01-current-state.md` | evidence | `75733a36a0d168871981df981fa7e2cc5f10ba33cea00d9ae16e69af42f2d0aa` |
| `02-platform-boundaries.md` | normative | `94b8bd2459b34949200a98fd2d8374a132add8312421370e5a2b26e604c05c3c` |
| `03-core-blueprint.md` | normative | `14d5dcc266d5768584c2cc63078bd50701140d18508dffa5fd38574b097f1d71` |
| `04-shared-services.md` | normative | `993803e2603b4a49edf6d287a7b96a1afd837c559432c4d6ec185dfd85dba5bd` |
| `05-cross-product-contracts.md` | normative | `aa29180f592b53e0d0f929286ebb9085ed6dcefb56a29216009dce83ada152ce` |
| `06-security-and-permissions.md` | normative | `16a79db6f5e6bed2a1121adc54d99d3139e89dea147928848316b564eefb7a2c` |
| `07-module-registry.md` | normative | `af327f268b74f14b9cecedd6ea272cf9452b054c514e49574c5905f0531b829f` |
| `08-development-roadmap.md` | supporting | `46cfe091a92bf96eb72b0876aec0b997fddd66f5b99a752feef1de28d175a249` |
| `09-documentation-governance.md` | supporting | `86d2406186ced7591d04a923439352e7db899a63eb7808183437d2e6b1c5f2c9` |
| `governance/h0/H0-00-review-findings.md` | control evidence | `04935063d3c5ae31a2894b4debe4c490ee04a83f9262efbe7f826321c8496f48` |
| `governance/h0/H0-00-acceptance-checklist.md` | control evidence | `51bf9fa0cf9eb8b49034c6510329539cc13f2218beff540bd34e0486b284c258` |

## 8. Persistence note

Content hashes идентифицируют baseline, но не заменяют version-control storage. Документальный commit/tag baseline является отдельным безопасным административным действием и в H0.0 автоматически не выполнялся.

До фиксации в version control текущие файлы нельзя изменять без сохранения предыдущего содержимого и BCR.

## 9. Handoff

- Open findings: [H0-00-review-findings.md](./H0-00-review-findings.md)
- Exit checklist: [H0-00-acceptance-checklist.md](./H0-00-acceptance-checklist.md)
- Next stage: H0.1 Architecture Principles + ADR-001–ADR-007.
