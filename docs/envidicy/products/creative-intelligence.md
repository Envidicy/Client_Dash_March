# Envidicy Creative Intelligence

Статус: `Draft v0.1`

## 1. Product brief

Creative Intelligence — первый модуль вертикали Creative & Content OS. Он превращает доступные публикации, рекламные креативы и их динамику в структурированную базу знаний, гипотезы и сценарии, которые затем можно проверить в Advertising OS.

Продукт отвечает на четыре вопроса:

1. что публикуют конкуренты и референсные авторы;
2. из каких маркетинговых и визуальных элементов состоит креатив;
3. какие паттерны заслуживают проверки;
4. как связать гипотезу с рекламным и затем коммерческим результатом.

Ценность MVP — не «проанализировать весь интернет», а вдвое сократить ручной поиск референсов и довести реальный креатив от наблюдения до тестируемой гипотезы.

## 2. Граница продукта

### Creative Intelligence владеет

- наблюдаемыми source accounts;
- креативами и их source references;
- снимками публичных/разрешённых метрик;
- структурированными observations;
- AI analyses и human corrections;
- patterns;
- creative hypotheses и adapted scenarios;
- experiments и связью с рекламным тестом;
- рекомендациями в креативном контексте.

### Core и shared services владеют

| Возможность | Владелец |
|---|---|
| Organization, Workspace, Project, RBAC | Core |
| модульные права, квоты | Core Module Registry |
| подключения и secret refs | Core Integration Vault |
| FileAsset, версии, retention | Core Files |
| очереди и расписания | Shared Jobs |
| connector runtime, retry, rate limit | Shared Integration Runtime |
| object bytes, transcoding, OCR/STT execution | Shared media pipeline |
| вызов моделей, cost и prompt provenance | AI Gateway |
| аналитические витрины | Data Platform |
| рекламные кампании и performance | Advertising OS |
| лиды, сделки, продажи | CRM/Sales domain |

Creative Intelligence не создаёт собственные дубликаты пользователей, проектов, хранилища секретов или рекламных кампаний.

## 3. Целевые пользователи и сценарии

| Пользователь | Основная задача |
|---|---|
| внутренняя команда Envidicy | быстро собирать референсы и гипотезы для SmartMed/SmartLab и клиентов |
| агентство | мониторить выбранных конкурентов и выпускать клиентский research |
| маркетолог бизнеса | понимать паттерны ниши и формировать бриф/сценарий |
| автор/production team | разбирать структуру роликов и переиспользовать механику без копирования контента |

Приоритетные сценарии:

1. добавить разрешённый источник;
2. собрать последние публикации и snapshots;
3. выбрать сильные/быстрорастущие креативы;
4. обработать конкретный ролик;
5. увидеть транскрипцию, OCR, сцены и маркетинговую структуру;
6. исправить классификацию;
7. адаптировать сценарий под Project/Brand context;
8. сохранить creative hypothesis;
9. передать её в рекламный experiment;
10. получить фактический результат и сформировать evidence.

## 4. Канонические сущности

### 4.1. SourceAccount

Наблюдаемый источник:

```text
source_account_id
project_id
source_type: own | competitor | industry | author | expert | media | reference
platform
external_account_ref
connection_id?
collection_method
legal_basis / consent_ref?
status
last_collected_at
```

### 4.2. Creative

Отдельная единица контента или рекламы: short video, image, carousel, banner, advertisement.

```text
creative_id
source_account_id?
platform
external_creative_ref?
canonical_url?
published_at?
media_asset_refs[]
content_fingerprint
source_metadata
status
```

Один и тот же ролик может появиться на нескольких площадках. `CreativeOccurrence` связывает канонический creative с конкретной публикацией, не уничтожая source lineage.

### 4.3. CreativeSnapshot

Неизменяемое наблюдение показателей в конкретный момент:

```text
snapshot_id
creative_occurrence_id
observed_at
views / likes / comments / shares / saves
provider_metric_extensions
quality_flags
source_ref
```

Snapshot нужен для скорости роста, а не только итогового значения. Пропущенный snapshot не интерполируется как факт без явного признака оценки.

### 4.4. MediaArtifact

Производный результат обработки:

- audio track;
- key frames;
- scene boundaries;
- transcript;
- OCR segments;
- detected objects;
- technical metadata;
- preview/thumbnail.

Файл хранится в Core Files/Object Storage, а Creative Intelligence хранит смысловую связь, тип artifact, processor/version и source span.

### 4.5. Analysis

Версионированная интерпретация конкретной версии creative:

```text
analysis_id
creative_id / file_version_id
analysis_schema_version
model_execution_refs[]
facts_refs[]
classification
reasoning_summary
confidence_by_field
status: draft | reviewed | accepted | superseded
reviewed_by?
```

Классификация может включать нишу, тему, аудиторию, funnel stage, hook, pain, need, offer, arguments, CTA, emotion, tone и structure.

### 4.6. HumanCorrection

Исправление не перезаписывает AI-output. Оно хранит field, before, after, actor, reason и timestamp. Accepted view строится из исходного анализа и подтверждённых corrections.

### 4.7. Pattern

Повторяющаяся механика с evidence:

```text
pattern_id
pattern_type
definition
scope: project | niche | platform | global
evidence_refs[]
sample_size
confidence
validity_window
status
```

«Часто встречается» и «улучшает продажи» — разные типы evidence и не должны смешиваться.

### 4.8. CreativeHypothesis и Scenario

`CreativeHypothesis` формулирует предполагаемый эффект и способ проверки. `ScenarioVersion` — конкретная адаптация идеи для бренда. Источник, заимствованные механики и отличия должны быть прослеживаемы.

### 4.9. Experiment

Experiment связывает:

- hypothesis;
- creative variants;
- Advertising OS campaign/ad bindings;
- audience и budget constraints;
- primary metric и guardrails;
- spend, leads, sales и revenue refs;
- result и conclusion.

Creative Intelligence владеет гипотезой и выводом эксперимента; Advertising OS — рекламными объектами и performance; CRM — лидами/сделками/продажами.

### 4.10. Recommendation

Рекомендация содержит evidence, expected effect, confidence, ограничения, срок актуальности и feedback. Она не выполняет автоматическое действие.

## 5. Наблюдения и интерпретации

Это одно из главных архитектурных правил продукта.

| Наблюдаемые факты | Интерпретации |
|---|---|
| дата, длительность, доступные метрики | тип хука |
| транскрипция и OCR | боль и потребность |
| сцены, кадры, detected objects | предполагаемая аудитория |
| внешний ID и URL | funnel stage |
| source snapshot и timestamp | причина предполагаемой эффективности |

Факты сохраняются с source lineage. Интерпретации сохраняются с model/prompt/schema version и confidence. Это позволяет повторно анализировать старые материалы новой моделью без потери исходных наблюдений.

## 6. Pipeline

```mermaid
flowchart LR
    SRC["Approved source"] --> COL["Collector"]
    COL --> RAW["Raw metadata + snapshots"]
    COL --> FILES["Core File / Object Storage"]
    FILES --> MEDIA["Media Processing"]
    MEDIA --> ART["Transcript / OCR / scenes / objects"]
    ART --> AI["AI Gateway"]
    AI --> ANALYSIS["Versioned Analysis"]
    ANALYSIS --> REVIEW["Human review & corrections"]
    REVIEW --> HYP["Hypothesis / Scenario"]
    HYP --> EXP["Advertising experiment"]
    EXP --> RESULT["Performance / lead / sale evidence"]
    RESULT --> PAT["Pattern / Recommendation"]
```

### 6.1. Collector

- регистрирует источник и способ доступа;
- обнаруживает публикации;
- собирает разрешённые metadata/snapshots;
- дедуплицирует по external ref и fingerprint;
- хранит cursor;
- соблюдает rate limit, terms и deletion requirements;
- создаёт job, но не выполняет тяжёлый AI-анализ синхронно.

### 6.2. Media Processor

- безопасно получает media asset;
- проверяет тип/размер и malware status;
- извлекает аудио и ключевые кадры;
- определяет сцены;
- запускает STT/OCR/object detection;
- сохраняет processor/version и quality flags;
- позволяет частичный результат при сбое одного processor.

### 6.3. AI Analyzer

- получает только необходимые artifacts;
- использует structured schema;
- сохраняет model, prompt version, cost и confidence;
- не смешивает факт и гипотезу;
- не становится единственным источником истины;
- возвращает draft для human correction.

## 7. MVP v1

### 7.1. Scope

1. один внутренний Project;
2. одна технически и юридически допустимая source-платформа;
3. ограниченный список source accounts;
4. initial и scheduled collection;
5. карточка Creative и история snapshots;
6. ручной запуск обработки выбранного видео;
7. transcript, OCR, scenes и базовые technical facts;
8. structured marketing analysis;
9. ручная корректировка ключевых полей;
10. поиск и фильтрация;
11. адаптация сценария под Project context;
12. сохранение CreativeHypothesis;
13. короткий конкурентный report;
14. audit/cost/quality telemetry.

Первый end-to-end demo:

```text
SourceAccount
→ последние публикации
→ выбранный ролик
→ transcript + OCR
→ structured analysis
→ «Адаптировать сценарий»
→ ScenarioVersion
→ CreativeHypothesis
```

### 7.2. Non-goals MVP

- глобальный поиск по соцсетям;
- массовый crawler;
- поддержка всех Instagram/TikTok/YouTube сценариев сразу;
- полноценная предиктивная ML-модель;
- автоматическое подключение всех рекламных кабинетов;
- анализ продаж;
- mobile app;
- сложный billing;
- marketplace сценариев;
- встроенный video editor и автоматический production;
- полностью автономные рекомендации.

### 7.3. Source strategy

Порядок определяется не популярностью платформы, а доказанной доступностью данных и правом использования:

1. manual upload или URL/import с подтверждением права;
2. official/partner API;
3. authorized account connection;
4. только затем — ограниченный compliant collection, если он разрешён правилами площадки и применимым правом.

Перед выбором первой платформы нужен capability/legal spike. Если автоматический сбор нестабилен, продуктовая гипотеза проверяется на ручном импорте, не откладывая media/AI pipeline.

## 8. Связь с Advertising OS

### 8.1. Идентификаторы

```text
Creative Intelligence Creative
    ↕ CreativeBinding
Advertising OS Advertisement
    ↕ Campaign / performance
Creative Intelligence Experiment
```

Файл или perceptual fingerprint помогают сопоставлению, но автоматический match ниже порога confidence требует подтверждения человека.

### 8.2. События Creative Intelligence

```text
creative.source.added.v1
creative.item.discovered.v1
creative.snapshot.captured.v1
creative.media.processed.v1
creative.analysis.completed.v1
creative.analysis.corrected.v1
creative.pattern.detected.v1
creative.hypothesis.created.v1
creative.scenario.version_created.v1
creative.experiment.started.v1
creative.experiment.completed.v1
creative.recommendation.created.v1
```

### 8.3. Потребляемые события

```text
advertising.creative.bound_to_ad.v1
advertising.statistics.sync_completed.v1
advertising.campaign.published.v1
advertising.campaign.paused.v1
crm.lead.created.v1
crm.deal.won.v1
crm.sale.recorded.v1
```

До появления CRM/Sales experiment честно ограничивается рекламными метриками; отсутствие revenue не заполняется AI-оценкой.

## 9. Права и безопасность

Базовые permissions:

```text
creative.source.read / manage
creative.item.read / import
creative.media.process
creative.analysis.run / review
creative.hypothesis.create / approve
creative.experiment.create / link
creative.report.export
```

Дополнительно:

- source принадлежит организации и Project;
- connection binding проверяется отдельно;
- export и download аудируются;
- исходные медиа имеют classification и retention;
- AI не получает credentials;
- PII в transcript/OCR проходит detection/redaction policy;
- удаление источника не уничтожает автоматически legal evidence и результаты, но останавливает дальнейший collection;
- использование чужого контента для генерации требует policy по IP, attribution и допустимой трансформации.

## 10. Метрики MVP

### Главный outcome

Доля принятых в работу hypotheses/scenarios при сокращении времени research минимум в два раза.

### Product metrics

- active Projects и tracked SourceAccounts;
- collected Creatives и snapshot coverage;
- доля успешно обработанных items;
- median time-to-analysis;
- количество/доля human corrections;
- сценарии, сгенерированные и взятые в работу;
- hypotheses, дошедшие до Advertising Experiment;
- повторное использование продукта командой;
- экономия времени по self-report/time study.

### Guardrails

- cost на обработанный Creative;
- процент duplicate/invalid items;
- collection/API error rate;
- доля low-confidence полей;
- количество legal/privacy incidents;
- hallucination/error rate на evaluation set;
- очередь обработки и freshness.

## 11. Волны развития

| Волна | Результат | Exit criterion |
|---|---|---|
| C0. Feasibility | один источник/импорт, один ролик, transcript/OCR/JSON analysis | воспроизводимый pipeline с известной стоимостью и legal path |
| C1. Internal MVP | Project, sources, collection, cards, search, analysis, corrections, scenario | команда реально использует результат и экономит ≥2x research time |
| C2. Agency pilot | roles, client reports, quotas, notifications, export | минимум один внешний pilot с повторным использованием |
| C3. Advertising link | creative/ad matching, Experiment, performance facts | гипотеза прослеживается до рекламного результата |
| C4. Sales link | lead/deal/sale/revenue refs | хотя бы один experiment измеряется по коммерческому outcome |
| C5. Learning loop | patterns, personalized recommendations, outcome feedback | рекомендации показывают lift в контролируемых тестах |

## 12. Production gates

- источник и collection method имеют owner и legal basis;
- повторный collection не создаёт дубли;
- raw observations и interpretations разделены;
- каждый AI-output воспроизводим по versioned inputs/config;
- confidence и human correction доступны;
- partial processing восстанавливаем;
- стоимость и quota ограничены;
- tenant/project isolation проверена;
- source deletion/revocation имеет workflow;
- experiment не смешивает correlation и causal conclusion;
- интеграция с Advertising OS использует contracts, а не прямое чтение таблиц.

## 13. Ключевое продуктовое решение

Creative Intelligence следует запускать как узкий внутренний инструмент на реальном проекте, поверх минимально необходимого Core и shared runtime. Масштаб сбора, сложные модели и публичный продукт появляются только после доказанной повторяемой ценности.
