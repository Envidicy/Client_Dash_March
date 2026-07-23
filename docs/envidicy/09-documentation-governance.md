# Правила архитектурной и продуктовой документации

Статус: `Review Candidate Supporting v0.2`

Baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

## 1. Цель

Документация должна помогать принимать решения и безопасно доставлять продукт, а не создавать иллюзию готовности. Envidicy не пишет полное ТЗ на каждый дальний модуль заранее. Детализация растёт вместе с доказательствами и приближением к разработке.

## 2. Иерархия source of truth

Обязательные правовые требования и утверждённая бизнес-стратегия ограничивают все решения. Внутри архитектурного контура действует:

1. Architecture Principles;
2. принятый ADR;
3. актуальный Accepted Architecture Blueprint и domain ownership;
4. PRD активного продукта и versioned API/event/data/Golden Flow contracts;
5. delivery design;
6. старые концептуальные ТЗ;
7. поведение legacy-кода.

Legacy-поведение учитывается при миграции, но не определяет целевую архитектуру автоматически.

## 3. Уровни детализации

| Уровень | Когда нужен | Артефакт | Объём решения |
|---|---|---|---|
| L0 Portfolio Card | любая идея | Module Card | проблема, сегмент, ценность, зависимости, риск, горизонт |
| L1 Opportunity Brief | принят в discovery | Research brief | спрос, workflow, экономика, feasibility, legal, kill criteria |
| L2 PRD | кандидат PH0/PH1 | Product PRD | scope, UX, KPI, domain, rights, contracts, acceptance |
| L3 Delivery Design | есть команда/слот | Technical design | API/events, schema, migrations, NFR, rollout, tests |
| L4 Runbook | до beta/production | Operations guide | SLO, alerts, recovery, reconciliation, support |

Для PH3–PH4 запрещено создавать большой PRD без G1/G2. Там достаточно L0: документ устареет раньше реализации.

## 4. Рекомендуемая структура каталога

Текущий blueprint намеренно компактен. По мере принятия решений он развивается без одномоментного дробления:

```text
docs/envidicy/
├── 00-architecture-governance-framework.md
├── README.md
├── 01-current-state.md
├── 02-platform-boundaries.md
├── 03-core-blueprint.md
├── 04-shared-services.md
├── 05-cross-product-contracts.md
├── 06-security-and-permissions.md
├── 07-module-registry.md
├── 08-development-roadmap.md
├── 09-documentation-governance.md
├── products/
│   ├── advertising-os.md
│   └── creative-intelligence.md
├── decisions/
│   └── ADR-XXXX-<decision>.md
├── governance/
│   └── h0/
│       ├── H0-00-baseline-freeze.md
│       └── H0-00-acceptance-checklist.md
├── contracts/
│   ├── api/
│   ├── events/
│   └── data/
├── operations/
│   └── runbooks/
└── templates/
```

Новый подкаталог создаётся только когда документов действительно стало несколько. Слишком глубокая пустая иерархия не является архитектурой.

## 5. Виды документов и owners

| Документ | Accountable owner | Reviewers | Обновление |
|---|---|---|---|
| Architecture Principles | Architecture owner | Domain, Security, Engineering | только через governance review |
| Ecosystem/Portfolio Blueprint | Product/CEO | Architecture, Engineering | ежеквартально или при смене стратегии |
| Module Registry | Portfolio owner | Product/Engineering leads | после каждого portfolio decision, минимум ежемесячно |
| Domain/Data Ownership | Lead Architect | domain owners | при изменении границы |
| Roadmap | Product + Engineering | owners ключевых streams | ежемесячно |
| PRD | Product owner | Design, Engineering, Data, Security | до и во время delivery |
| API/Event contract | Engineering owner producer | consumers, Security/Data | вместе с изменением контракта |
| Delivery Design | Tech lead | Architecture, Operations | перед G3 Build |
| ADR | автор решения/domain owner | затронутые owners | append-only после принятия |
| Runbook/SLO | Engineering owner | Operations/Support | до G4 Pilot |

У документа без owner и review date статус не выше `Draft`.

## 6. Статусы

```text
Draft → Review Candidate → Review → Accepted → Superseded → Archived
                              └────→ Rejected
```

- `Draft` — рабочий вариант;
- `Review Candidate` — content-addressed baseline, зафиксированный для Principles/ADR и conformance review; это ещё не принятое решение;
- `Review` — готов к формальному обсуждению;
- `Accepted` — решение обязательно для новой разработки;
- `Superseded` — заменено указанным документом;
- `Archived` — только исторический контекст;
- `Rejected` — рассмотрено и сознательно не принято.

В шапке документа фиксируются:

```text
status
owner
reviewers
created_at
last_reviewed_at
next_review_at
supersedes / superseded_by
related ADR / PRD / contracts
```

Для Draft-пакета допустима сокращённая шапка. При переводе в `Review Candidate` состав, version, дата и hashes фиксируются в Baseline Manifest; named owners могут быть назначены до H0.1 exit, но accountable roles обязательны сразу.

## 7. Обязательный glossary

Термин получает одно каноническое значение и владельца. На первом review нужно принять как минимум:

| Термин | Каноническое значение |
|---|---|
| Organization | tenant и основная граница владения |
| Workspace | операционный контейнер одной Organization |
| Project | нейтральный cross-product рабочий context |
| AdAccount | кабинет рекламного provider, Advertising OS |
| MediaPlan | план и forecast, не provider campaign |
| ProviderCampaign | фактическая/черновая кампания площадки |
| FundingOrder | рекламный запрос на пополнение/лимит |
| Reservation | удержание средств в Core Billing |
| Wallet | read model над ledger, не mutable source |
| Connection | факт разрешённого подключения в Core Vault |
| Connector | исполняемый adapter/runtime provider API |
| Creative | предметная контентная единица |
| FileAsset | универсальный file/version resource Core |
| Experiment | проверка гипотезы с заранее заданной метрикой |
| Recommendation | объяснимое предложение, не выполненная команда |

Запрещается использовать один термин для разных aggregates без явного qualifier.

## 8. Domain ownership register

Для каждой сущности/таблицы/endpoint фиксируются:

```text
current_owner
target_domain_owner
source_of_truth
tenant_scope
writers
readers/projections
public commands/queries
events_out
migration_state
retention/classification
```

Правило review: если у новой сущности два owners или нет владельца, дизайн не проходит Definition of Ready.

## 9. Dependency register

Типы зависимостей:

| Тип | Значение | Правило |
|---|---|---|
| `REQUIRES` | жёсткая runtime dependency | минимизировать, определить timeout/SLO/fallback |
| `CONSUMES_EVENT` | асинхронный факт | versioned event, idempotent consumer |
| `USES_ANALYTICAL_COPY` | аналитическое чтение | не применять для transaction decisions |
| `OPTIONAL_CONNECTOR` | внешний provider | сбой не ломает базовый продукт |
| `ENABLES` | платформенная предпосылка | строить под утверждённого consumer |

Каждая dependency содержит provider, consumer, contract, criticality, data class, owner и failure mode.

## 10. Definition of Ready

Модуль готов к разработке, когда:

- назначены product owner и engineering owner;
- подтверждены пользователь, проблема и baseline;
- задан главный outcome KPI и guardrails;
- согласованы scope и non-goals;
- описаны happy path, ошибки, empty states и ручные fallback;
- определён owner каждой новой сущности;
- согласованы tenancy, permissions и audit;
- описаны commands, APIs, events и dependencies;
- проведены security/privacy/legal и provider feasibility reviews;
- есть migration/backward compatibility/rollback plan;
- определены NFR, observability и support model;
- имеются acceptance criteria и test strategy;
- выделена команда и учтена операционная стоимость;
- нет unresolved ADR, блокирующего реализацию.

## 11. Definition of Done

Модуль считается завершённым для production, когда:

- E2E и acceptance criteria выполнены;
- критические tests автоматизированы;
- tenant isolation, права и audit проверены;
- API/events versioned, documented и покрыты contract tests;
- migration повторяема, compatibility и rollback проверены;
- metrics/logs/traces/alerts работают;
- SLO, runbook, owner и support escalation определены;
- data lineage, retention и deletion реализованы;
- product telemetry измеряет outcome;
- Module Registry, ownership, dependencies и event catalog обновлены;
- pilot KPI достигнуты или принято явное решение о допустимом отклонении;
- financial flow доказал atomicity, idempotency и reconciliation;
- external integration доказала retry, rate limit, duplicate handling и degraded mode;
- AI use case имеет evals, provenance, cost limits и human-control policy.

Функция, существующая только в UI, но не наблюдаемая, не поддерживаемая и не измеряющая результат, не считается Done.

## 12. ADR governance

ADR обязателен, если решение затрагивает:

- bounded context или data owner;
- identity, tenancy, authorization или impersonation;
- ledger, налоги, FX или reconciliation;
- публичный API/event или breaking schema;
- sync/async interaction;
- новый critical provider/vendor lock-in;
- storage/queue/topology или service extraction;
- необратимую migration;
- AI autonomy выше recommendation/draft;
- retention/privacy/compliance policy.

Статусы:

```text
PROPOSED → ACCEPTED → SUPERSEDED
             └──────→ DEPRECATED
PROPOSED → REJECTED
```

Принятый ADR не переписывается под новое решение. Создаётся новый ADR с `supersedes`.

Обязательный H0.1 ADR backlog:

1. `ADR-001` — Organization как tenant boundary, organization membership и межорганизационный доступ;
2. `ADR-002` — Workspace/Project как рабочие scopes, membership/binding и допустимая nullability контекста;
3. `ADR-003` — Core Billing и immutable Ledger, Funding boundary, subscription/usage ownership и два вида reconciliation;
4. `ADR-004` — Integration Vault vs Integration Runtime: secret, OAuth refresh, health и credential lease;
5. `ADR-005` — Core vs Shared vs Product ownership, включая Approval, Delivery, Data и Recommendation boundaries;
6. `ADR-006` — command/event/audit architecture: outbox, versioning, idempotency и critical audit evidence;
7. `ADR-007` — Modular Monolith First и критерии физического выделения.

Product-specific решения вроде `MediaPlan` vs `ProviderCampaign` оформляются отдельным ADR/Domain Decision, если не меняют эти семь фундаментальных границ.

## 13. Change process

Класс изменения определяется до начала delivery:

- Level 1 Architecture Change → proposal, review, ADR, Blueprint/contract update;
- Level 2 Product/Contract Change → PRD/contract review и ADR только при смене архитектурного решения;
- Level 3 Implementation Change → Story/Task, code review и tests без лишнего ADR.

Для изменения, затрагивающего несколько модулей:

1. автор обновляет PRD/Module Card и impact section;
2. перечисляет affected owners, data, APIs/events, migrations и risks;
3. создаёт ADR, если меняется принцип/граница;
4. producer и consumers согласуют contract evolution;
5. определяется compatibility window;
6. rollout идёт через expand/dual/shadow/cutover/contract;
7. после production обновляются registry, diagrams, runbook и status;
8. superseded documents получают явную ссылку на замену.

Изменение кода без обновления затронутого контракта или ownership register считается незавершённым.

## 14. Review cadence

| Ритм | Review |
|---|---|
| перед каждым G2/G3 | PRD, domain, security, dependencies, ADR |
| еженедельно во время delivery | open decisions и contract changes |
| ежемесячно | Module Registry, roadmap, risks, WIP |
| ежеквартально | ecosystem map, horizons, product economics |
| после incident | runbook, threat model, ADR/guardrails |
| после provider breaking change | capability matrix, connector contract, migration |

Review должен завершаться решением и owner/date, а не только комментариями.

## 15. Documentation quality checks

Минимальные автоматизируемые проверки:

- все локальные ссылки существуют;
- уникальные IDs ADR/modules/events;
- документ Review/Accepted имеет metadata;
- event examples соответствуют schema;
- OpenAPI/AsyncAPI changes проходят diff;
- запрещённые secrets отсутствуют;
- Module Registry entries имеют owner/next gate перед BUILD;
- superseded document ссылается на replacement;
- diagrams и glossary не используют конфликтующие имена.

## 16. Шаблоны

- [Module Card](./templates/module-card.md) — L0/L1;
- [Product PRD](./templates/product-prd.md) — L2;
- [ADR](./templates/adr.md) — архитектурное решение;
- [Event Contract](./templates/event-contract.md) — межмодульное событие.

Шаблон — список обязательных вопросов, а не требование заполнять текст ради объёма. Неприменимый раздел помечается `N/A` с кратким объяснением.
