# Envidicy Architecture Governance Framework

Статус: `Accepted v1.0`

Дата решения: `2026-07-23`

Included in baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

Approval source: explicit project-sponsor decision; named accountable assignee is recorded before formal H0.1 review.

Область действия: архитектура платформы Envidicy, продуктовые модули, bounded contexts, данные, API, события, безопасность, миграции и delivery planning.

## 1. Назначение

Этот документ определяет, **как Envidicy принимает и изменяет архитектурные решения**. Он управляет процессом проектирования системы, но не утверждает конкретный Core Blueprint: Blueprint проходит отдельный цикл Principles → ADR → Conformance Review.

Главное правило:

> До завершения H0.6 разрешены только документация, архитектурный review и read-only аудит. Production-код, schema и production-данные не изменяются.

## 2. Иерархия решений

Внутри архитектурного контура действует следующая иерархия:

```text
Architecture Principles
        ↓
Accepted ADR
        ↓
Accepted Blueprint
        ↓
PRD + API/Event/Data Contracts
        ↓
Epic → Story → Task
        ↓
Implementation
        ↓
Review → Tests → Release
```

Обязательные правовые требования и утверждённая бизнес-стратегия стоят выше этой цепочки. При конфликте создаётся явное решение, а не скрытое исключение в коде.

Каждый ADR обязан содержать:

- какие Architecture Principles он реализует;
- создаёт ли он исключение из принципа;
- почему исключение допустимо;
- scope, срок и условия удаления исключения;
- влияние на Blueprint, контракты и Golden Flows.

## 3. Классы изменений

### Level 1 — Architecture Change

Примеры:

- новый или изменённый bounded context;
- смена владельца данных;
- tenancy, identity, permissions или ledger;
- изменение зависимости Core ↔ Product;
- выбор sync/async взаимодействия;
- выделение сервиса;
- необратимая migration или новый security boundary.

Обязательный путь:

```text
Documented proposal
→ Architecture review
→ ADR
→ Approved
→ Blueprint/contract update
→ Epic
```

### Level 2 — Contract or Product Change

Примеры:

- новый продуктовый сценарий;
- изменение public/internal API;
- новое или breaking event;
- изменение schema с влиянием на consumers;
- новый provider capability;
- изменение пользовательского outcome или финансового правила.

Обязательный путь:

```text
PRD / Contract change
→ Domain, Security and Consumer review
→ ADR, если меняется архитектурное решение
→ Approved
→ Epic / Story
```

### Level 3 — Implementation Change

Примеры:

- локальный refactoring без изменения контракта;
- оптимизация SQL без смены модели данных и consistency;
- переименование private-функции;
- исправление дефекта в принятом поведении.

Путь:

```text
Story / Task
→ Code
→ Review
→ Tests
→ Release
```

ADR не используется для локальных деталей, но Pull Request не может незаметно изменить Level 1 или Level 2 решение.

## 4. H0 Framework

| Этап | Результат | Запрет перехода дальше |
|---|---|---|
| H0.0 Baseline Freeze | content-addressed `Review Candidate`, scope и acceptance pack | baseline не идентифицируем или меняется без контроля |
| H0.1 Architecture Principles + ADR | принятые принципы и 5–7 фундаментальных ADR | отсутствует решение по tenant, Core ownership, ledger, events или deployment shape |
| Blueprint Conformance Review | доказано соответствие Principles/ADR, Blueprint получает `Accepted` | есть неснятое нарушение или незафиксированное исключение |
| H0.2 Golden Flow Contracts | versioned contracts жизненно важных процессов | критический flow не описан или не имеет test obligations |
| H0.3 Legacy → Target Mapping | полный inventory таблиц, endpoints, services, jobs, cron и integrations | существует legacy writer/side effect без целевого owner/strategy |
| H0.4 Migration Safety & Recovery | безопасная migration и recovery strategy | restore не проверен, compatibility/compensation не описаны |
| H0.5 Epic → Story → Task | исполнимый delivery plan с acceptance и dependencies | задача не трассируется до PRD/ADR/GF |
| H0.6 Final Readiness Gate | evidence-based решение `GREEN`, `N/A` или `STOP` | любой обязательный пункт имеет `STOP` |
| H0.7 Controlled Start | backup, restore validation, первая migration и development | начинается только после GREEN H0.6 |

H0.6 не допускает статуса `YELLOW` и не принимает формулировку «доделаем после старта». `N/A` требует письменного обоснования и reviewer.

## 5. Baseline Freeze

Baseline Freeze не означает принятие архитектуры. Он означает:

1. зафиксирован точный набор документов;
2. каждому документу присвоены version/status;
3. содержимое идентифицировано hash или version-control reference;
4. все изменения после freeze проходят change record;
5. известны owners/reviewers;
6. unresolved decisions переданы в H0.1;
7. Blueprint остаётся `Review Candidate` до Conformance Review.

```text
Draft
→ Review Candidate (Baseline Freeze)
→ Architecture Principles
→ ADR
→ Blueprint Conformance Review
→ Accepted
```

## 6. Golden Flow как отдельный тип контракта

Golden Flow — versioned business-process contract, а не narrative-документ.

Обязательная структура:

```text
GF ID and version
Owner and criticality
Description and scope
Preconditions
Commands
State machine
Invariants
Expected events
Expected ledger postings
Expected audit
Expected notifications
Failure and degraded paths
Recovery / compensation
Required tests
Observability evidence
```

Golden Flow является основой integration, E2E, regression, resilience/chaos tests и SRE runbook. Критический релиз блокируется, если обязательный GF не проходит.

## 7. Migration Safety & Recovery

Термин `rollback` без qualifier не используется как план безопасности. Различаются:

### Feature Rollback

Новая логика отключается feature flag. Код и данные могут остаться, но не используются новым write path.

### Application Rollback

Возвращается предыдущая версия приложения. Schema и contracts обязаны оставаться обратно совместимыми в rollback window.

### Read/Cutover Rollback

Чтение или маршрутизация возвращаются на предыдущий source/read model. Dual/shadow validation продолжает фиксировать расхождения.

### Data Compensation

Новые production-записи не удаляются и база не восстанавливается целиком. Ошибка исправляется versioned compensating migration/transaction с audit и reconciliation.

### Disaster Recovery

Полный restore применяется только при катастрофе. Для него заранее определяются:

- RPO и допустимая потеря данных;
- RTO;
- backup chain и encryption keys;
- isolated restore validation;
- replay/reconciliation после точки backup;
- коммуникация и incident ownership.

## 8. Final Readiness Gate

H0.6 проверяет evidence, а не качество формулировок.

Обязательные категории:

- Architecture: Principles, ADR, Blueprint Conformance;
- Security: threat model, tenant model, roles, secrets, audit;
- Product: owners, Golden Flows, Module Registry, outcomes;
- Migration: inventory, backup, restore validation, compatibility, compensation, disaster recovery;
- Engineering: epics, stories, tasks, acceptance, tests, observability, runbooks;
- Operations: owners, SLO, alerts, support and incident path.

Результат gate подписывается accountable roles и содержит ссылки на evidence.

## 9. Изменение принятой архитектуры

`Accepted` не означает «никогда не менять». Оно означает «не менять неявно».

- Principle меняется только отдельным governance decision с оценкой всех затронутых ADR.
- ADR не переписывается; новое решение получает новый ADR и `supersedes`.
- Blueprint получает новую версию после conformance review.
- API/event/data contract меняется по compatibility policy.
- Golden Flow получает новую версию вместе с tests и migration impact.

Аварийное изменение допускается только для немедленного снижения активного production-риска. Оно получает incident reference, минимальный scope и обязательный post-factum document/review в установленный срок.

## 10. Ответственность

| Роль | Ответственность |
|---|---|
| Product/Business Sponsor | стратегия, приоритеты, коммерческие ограничения |
| Architecture Owner | Principles, ADR process, Blueprint conformance |
| Domain Owner | сущности, invariants, contracts и Golden Flows домена |
| Security Reviewer | threat model, tenancy, access, secrets, privacy |
| Finance Reviewer | ledger, money, tax/FX snapshots, reconciliation |
| Engineering Owner | delivery design, migration, tests, operation |
| Operations/SRE Owner | backup/restore, SLO, alerts, incident/recovery |

Имена назначаются в Acceptance Pack. AI может готовить документы и анализ, но не является accountable owner или утверждающей стороной.
