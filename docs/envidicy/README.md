# Envidicy Architecture Blueprint

Статус: `Review Candidate Index v0.2`

Baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

Этот каталог является рабочим источником истины по продуктовой и технической архитектуре Envidicy. Он связывает:

- фактическое состояние текущей платформы;
- целевую продуктовую экосистему;
- Envidicy Core;
- общие технологические сервисы;
- продуктовые вертикали;
- зависимости, события и правила владения данными;
- последовательность развития без big-bang rewrite.

Документы описывают проектирование. Они не означают, что соответствующие изменения уже реализованы в коде.

## Главный архитектурный диагноз

Текущий проект является **Envidicy Advertising OS с встроенным proto-Core**.

В нём уже есть пользователи, доступы, агентства, кошельки, счета, документы, интеграции, уведомления и аудит отдельных операций. Однако эти функции пока тесно связаны с рекламными кабинетами и не оформлены как универсальная платформа для других продуктов.

Целевое разделение:

```text
Envidicy Core
    ↓
Shared Platform Services
    ↓
Product Verticals
    ├── Advertising OS
    ├── Creative and Content OS
    ├── CRM and Communications OS
    ├── Analytics and Data OS
    └── остальные продукты
```

## Карта документов

1. [Architecture Governance Framework](./00-architecture-governance-framework.md)
2. [Текущее состояние](./01-current-state.md)
3. [Границы платформы и продуктов](./02-platform-boundaries.md)
4. [Envidicy Core](./03-core-blueprint.md)
5. [Общие технологические сервисы](./04-shared-services.md)
6. [Advertising OS](./products/advertising-os.md)
7. [Creative Intelligence](./products/creative-intelligence.md)
8. [Межмодульные контракты и события](./05-cross-product-contracts.md)
9. [Безопасность и права](./06-security-and-permissions.md)
10. [Portfolio Module Registry](./07-module-registry.md)
11. [План развития](./08-development-roadmap.md)
12. [Правила ведения документации](./09-documentation-governance.md)

H0.0 Baseline Freeze:

- [Baseline Manifest](./governance/h0/H0-00-baseline-freeze.md)
- [Acceptance Checklist](./governance/h0/H0-00-acceptance-checklist.md)
- [Review Findings и handoff в ADR](./governance/h0/H0-00-review-findings.md)

Шаблоны:

- [Карточка модуля](./templates/module-card.md)
- [PRD продукта](./templates/product-prd.md)
- [ADR](./templates/adr.md)
- [Контракт события](./templates/event-contract.md)

## Как принять Blueprint и запустить работу

1. H0.0 фиксирует точный `Review Candidate` и open findings.
2. H0.1 принимает Architecture Principles и ADR-001–ADR-007.
3. Blueprint Conformance Review проверяет каждый нормативный документ против Principles/ADR.
4. Только после успешного conformance Blueprint получает `Accepted`.
5. H0.2–H0.5 создают Golden Flows, Legacy Mapping, Migration Safety и Delivery Plan.
6. H0.6 выдаёт бинарное решение `GREEN`, обоснованный `N/A` или `STOP`.
7. Backup, restore validation, migration и разработка начинаются только в H0.7.

Дальние PH3/PH4-модули остаются карточками и не требуют полного ТЗ.

## Источники

Blueprint подготовлен на основании:

- аудита репозитория `Client_Dash_March` на 23 июля 2026 года;
- ТЗ №2 «Envidicy Marketing OS»;
- ТЗ №3 «Карта продуктовой экосистемы Envidicy»;
- концепции «Envidicy Creative Intelligence»;
- текущих бизнес-сценариев пополнений рекламных кабинетов, агентств, аналитики и финансов.

При конфликте внутри архитектурного контура действует:

1. Architecture Principles;
2. принятый ADR;
3. актуальный Accepted Blueprint;
4. PRD и versioned contracts активного продукта;
5. старые концептуальные ТЗ;
6. фактическое поведение legacy-кода.

## Кандидаты в Architecture Principles

Этот список извлечён из Blueprint, но не считается формально принятым документом H0.1.

1. **Один владелец данных.** У каждой сущности есть один домен, являющийся источником истины.
2. **Core by demand.** В Core добавляется только то, что реально требуется нескольким продуктам.
3. **Модульный монолит раньше микросервисов.** Физическое разделение выполняется после логического и только при подтверждённой необходимости.
4. **Ledger раньше mutable balance.** Деньги определяются проводками, а баланс является проекцией.
5. **События являются контрактами.** Межмодульные процессы не строятся на чтении чужих таблиц.
6. **Человек контролирует критические действия.** Финансы, публикации, бюджеты и действия AI поддерживают подтверждение.
7. **Объяснимость и аудит по умолчанию.** Значимые решения должны быть воспроизводимы.
8. **Standalone, Connected, Full Loop.** Продукт может работать отдельно, использовать общие данные или участвовать в полном контуре.
9. **Эволюция без остановки текущего бизнеса.** Новая архитектура внедряется постепенно вокруг работающего Advertising OS.

## Статусы документов

- `Draft` — рабочее проектирование;
- `Review Candidate` — content-addressed baseline для Principles/ADR и conformance review; ещё не принято;
- `Review` — документ готов к продуктовому и техническому обсуждению;
- `Accepted` — решение принято;
- `Superseded` — заменено более новым документом;
- `Archived` — больше не применяется.

Normative-документы baseline `ENVIDICY-ARCH-RC-2026-07-23-01` имеют статус `Review Candidate`. Они станут `Accepted` только после Architecture Principles, ADR-001–ADR-007 и Blueprint Conformance Review.
