# Portfolio Module Registry Envidicy

Статус: `Review Candidate v0.2`

Baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

## 1. Назначение

Этот документ является **управленческим Portfolio Module Registry**: каталогом продуктовых и платформенных направлений, их зрелости и инвестиционных решений. Он не равен runtime-компоненту `Core Module Registry & Entitlements`, который технически определяет активированные модули, тарифные права и квоты конкретной организации.

Portfolio Registry не является списком обещаний. Он отделяет:

- что уже существует;
- что принято к укреплению или разработке;
- что требует discovery;
- что остаётся стратегической опцией;
- что сознательно исключено.

Детальный PRD заранее пишется только для модулей ближайшего горизонта. Для дальних направлений достаточно карточки возможности.

## 2. Независимые классификации

### Фактическая зрелость

| Статус | Значение |
|---|---|
| `PRODUCTION` | используется в реальном процессе |
| `PARTIAL` | реализована часть сценария или не все providers |
| `PROTOTYPE` | проверена технология, но нет production-контура |
| `DESIGN` | есть концепция/ТЗ, реализации нет |
| `IDEA` | портфельная гипотеза |
| `EXCLUDED` | сознательно вне портфеля |

### Инвестиционное решение

| Решение | Значение |
|---|---|
| `RUN` | поддерживать и продавать |
| `HARDEN` | повышать надёжность существующего |
| `BUILD` | утверждено к реализации после выполнения gate |
| `DISCOVER` | проверить спрос, legal и feasibility |
| `HOLD` | не выделять delivery capacity до trigger |
| `EXIT` | прекратить или не включать |

### Горизонт

| Горизонт | Смысл |
|---|---|
| PH0 | сейчас, ориентир 0–3 месяца |
| PH1 | следующий фокус, ориентир 3–6 месяцев |
| PH2 | расширение основного цикла, ориентир 6–12 месяцев |
| PH3 | опциональный рост, 12–24 месяца |
| PH4 | стратегическая опция без календарного обязательства |

Сроки станут обязательствами только после capacity planning и прохождения stage gate.

## 3. Верхнеуровневый портфель

| ID | Платформа / вертикаль | Сейчас | Решение | Горизонт | Следующий результат |
|---|---|---|---|---|---|
| CORE | Envidicy Core | `PARTIAL`, встроен в Ads | `HARDEN + BUILD` | PH0–PH1 | логические границы Identity, Tenancy, RBAC, Ledger, Vault, Files, Audit, Entitlements |
| PLT | Shared Platform Services | `PARTIAL` | `BUILD MINIMUM` | PH0–PH2 | Jobs, Outbox, Integration Runtime, Data contracts; AI Gateway к CI |
| ADS | Advertising OS | `PRODUCTION`, неоднородно | `RUN + HARDEN` | PH0–PH1 | надёжный funding loop, reconciliation, tenant connections, canonical advertising data |
| CRE | Creative & Content OS | CI — `DESIGN`, остальное — `IDEA` | `DISCOVER → BUILD CI` | PH1–PH2 | внутренний CI MVP и связь с Advertising |
| DAT | Analytics & Data OS | `PARTIAL` | `BUILD INCREMENTALLY` | PH0–PH2 | canonical metrics, ingestion, creative-to-ad analytics, затем attribution |
| CRM | CRM & Communications OS | `IDEA/PARTIAL ADJACENT` | `DISCOVER MINIMAL OVERLAY` | PH2 | Lead Capture + CRM Overlay для связи рекламы с продажей |
| REP | Reputation OS | `IDEA` | `HOLD / DISCOVER` | PH3 | узкий monitoring/reviews pilot при спросе |
| INF | Influencer & Social Commerce | `IDEA` | `HOLD` | PH3–PH4 | база и analytics раньше marketplace |
| CRD | Crowd & Proof | `IDEA` | `HOLD / DISCOVER` | PH3 | один проверяемый proof-сценарий |
| OPE | Operations & ERP | `IDEA` | `HOLD` | PH4 | отдельный рынок и P&L обязательны |
| PRD | Productivity & AI Assistants | `IDEA` | `HOLD` | PH4 | точечные internal tools, не новая вертикаль сейчас |
| OFF | Offline Advertising | `IDEA` | `DISCOVER CONDITIONALLY` | PH3 | Claim ID/Proof pilot с партнёром и измеримой атрибуцией |
| RISK | Account Farming | `EXCLUDED` | `EXIT` | — | не включать; допустим только compliant provisioning |

## 4. Core и общие сервисы

| ID | Модуль | Сейчас | Решение | H | Примечание |
|---|---|---|---|---|---|
| CORE-ID | Identity & Sessions | `PARTIAL` | `HARDEN` | PH0 | обобщить существующих users/sessions, MFA и service accounts |
| CORE-TEN | Organizations, Workspaces, Projects | `PARTIAL` | `BUILD` | PH0 | agency/client преобразовать в organizations + relationship |
| CORE-AUTH | RBAC, Policy, AccessDelegation | `PARTIAL` | `BUILD` | PH0 | убрать специальные роли/email, scope и impersonation policy |
| CORE-MOD | Module Registry & Entitlements | `DESIGN` | `BUILD MINIMUM` | PH1 | только для первых двух продуктов |
| CORE-BIL | Billing & Immutable Ledger | `PARTIAL` | `HARDEN + BUILD` | PH0 | reservations, postings, payments, invoices, reconciliation |
| CORE-VLT | Integration Vault | `PARTIAL` | `BUILD` | PH0–PH1 | generic connection и защищённые credentials |
| CORE-FIL | File Catalog | `PARTIAL` | `BUILD MINIMUM` | PH1 | FileAsset/version/object refs, сначала документы и CI media |
| CORE-NOT | Notification Center | `PARTIAL` | `MODULARIZE` | PH1 | intent/preferences/inbox; delivery отдельно |
| CORE-AUD | Audit Trail | `PARTIAL` | `HARDEN` | PH0 | деньги, права, integrations, impersonation и AI |
| PLT-JOB | Jobs, Queue, Scheduler | `PARTIAL` | `BUILD` | PH0 | durable workers, retries, DLQ, rate limits |
| PLT-EVT | Outbox & Event Transport | `DESIGN/PARTIAL` | `BUILD` | PH0 | сначала billing и advertising flows |
| PLT-INT | Integration Runtime | `PARTIAL` | `BUILD` | PH0–PH1 | connector contract, cursors, retry, health |
| PLT-DAT | Data Platform | `PARTIAL` | `BUILD INCREMENTALLY` | PH1–PH2 | raw/normalized/semantic/serving |
| PLT-AI | AI Gateway | `PROTOTYPE/PARTIAL` | `BUILD MINIMUM` | PH1 | versioning, cost, structured output, evals |
| PLT-APR | Approval Engine | `PARTIAL/DESIGN` | `BUILD MINIMUM` | PH1 | funding/campaign/AI critical actions |
| PLT-TSK | Task Engine | `PARTIAL` | `BUILD WHEN USED` | PH1–PH2 | reconciliation и review tasks |
| PLT-REC | Recommendation Engine | `DESIGN` | `HOLD UNTIL DATA` | PH2–PH3 | строить после measurable outcome loop |

## 5. Advertising OS

| ID | Модуль | Сейчас | Решение | H | Следующий gate |
|---|---|---|---|---|---|
| ADS-ACC | Advertising Account Management | `PRODUCTION` | `RUN + HARDEN` | PH0 | org/project ownership и capability model |
| ADS-PRV | Account Provisioning | `PRODUCTION/MANUAL` | `HARDEN` | PH0–PH1 | state machine, attempts, SLA и evidence |
| ADS-FND | Top-up & Funding Operations | `PRODUCTION` | `HARDEN` | PH0 | Core reservation, idempotency, reconciliation |
| ADS-CON | Provider Connectors | `PARTIAL` | `BUILD INCREMENTALLY` | PH0–PH2 | Meta → Google/TikTok → discovery остальных |
| ADS-MGR | Unified Ads Manager | `PARTIAL READ` | `BUILD AFTER DATA` | PH1–PH2 | canonical hierarchy и reliable read sync |
| ADS-CMP | Campaign Builder | `DESIGN` | `BUILD STAGED` | PH2 | draft, validation, diff, approval, затем publish |
| ADS-PLAN | Media Planning | `PRODUCTION/PARTIAL` | `RUN + MODULARIZE` | PH0–PH1 | отделить MediaPlan от provider campaign |
| ADS-ANA | Advertising Analytics | `PRODUCTION/PARTIAL` | `HARDEN` | PH0–PH1 | freshness, canonical metrics, quality flags |
| ADS-AGY | Agency Advertising Operations | `PRODUCTION` | `RUN + MIGRATE` | PH1 | Core relationship/delegation, versioned terms |
| ADS-API | Reporting & Integration API | `PRODUCTION` | `RUN + VERSION` | PH0–PH1 | совместимость v1, Core API identity/scopes |
| ADS-CAPI | CAPI Hub | `DESIGN` | `DISCOVER → BUILD` | PH2 | один provider/use case, consent и dedup |
| ADS-AIT | AI Targetologist | `DESIGN/PARTIAL ADJACENT` | `DISCOVER` | PH2 | рекомендации/drafts раньше auto publish |
| ADS-AIC | AI Contextologist | `DESIGN` | `DISCOVER` | PH2–PH3 | provider feasibility и узкий workflow |
| ADS-OPT | AI Advertising Optimizer | `DESIGN` | `HOLD UNTIL ATTRIBUTION` | PH3 | verified metrics, policies и rollback |
| ADS-LOY | Loyalty Conversion Hub | `DESIGN` | `DISCOVER LATER` | PH3 | требует CRM/consent/commercial use case |
| ADS-AUTO | Advertising Autopilot | `DESIGN` | `HOLD` | PH3–PH4 | только после controlled optimizer evidence |
| ADS-PROV | Compliant Account Provisioning | `PARTIAL` | `BUILD WITH COMPLIANCE` | PH1 | официальные/партнёрские процессы вместо farming |

## 6. Creative and Content OS

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| CRE-CI | Creative Intelligence | `DESIGN` | `DISCOVER → BUILD MVP` | PH1 | build, один источник/проект, human corrections |
| CRE-STR | AI Marketing Strategist | `DESIGN` | `DISCOVER AFTER DATA` | PH2 | composition поверх Brand/Profile, CI, Ads, CRM facts |
| CRE-QA | AI Quality Assurance | `DESIGN` | `DISCOVER` | PH2 | rules + AI, сначала узкие brand/compliance checks |
| CRE-PROD | Creative Production | `DESIGN` | `HOLD / INTEGRATE FIRST` | PH2–PH3 | orchestration внешних генераторов раньше собственной студии |
| CRE-VID | Mobile/Web Video Editor | `DESIGN` | `HOLD / BUY-INTEGRATE` | PH3–PH4 | тяжёлый самостоятельный продукт |
| CRE-BAN | Banner Generator | `DESIGN` | `DISCOVER AS WORKFLOW` | PH2–PH3 | templates + external generation APIs |
| CRE-SITE | Site Builder | `DESIGN` | `HOLD / INTEGRATE` | PH3–PH4 | не строить generic builder сейчас |
| CRE-POST | Autoposting | `DESIGN` | `DISCOVER / INTEGRATE` | PH2–PH3 | provider APIs, approvals, schedule |
| CRE-INBOX | Social Inbox | `DESIGN` | `HOLD UNTIL COMMUNICATIONS` | PH3 | общая conversation model с CRM |
| CRE-BOT | AI Bot Builder | `DESIGN` | `HOLD` | PH3–PH4 | требует knowledge, consent, channels, evals |
| CRE-CHAT | Website Chat | `DESIGN` | `HOLD / INTEGRATE` | PH3 | часть Communications, не отдельный ранний продукт |

## 7. Influencer and Social Commerce

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| INF-DB | Blogger Database | `IDEA` | `DISCOVER` | PH3 | узкая ниша, legal/source feasibility |
| INF-MKT | Blogger Marketplace | `IDEA` | `HOLD` | PH4 | только после доказанной liquidity |
| INF-ANA | Influencer Analytics | `IDEA` | `HOLD / DISCOVER` | PH3 | связать с Creative/Data, не отдельный ingestion stack |
| INF-POP | Proof of Placement | `IDEA` | `DISCOVER WITH PROOF` | PH3 | общий proof primitive, один pilot |

## 8. Reputation OS

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| REP-MON | Brand Monitoring | `IDEA` | `DISCOVER` | PH3 | buy/integrate sources, build workflow/insights |
| REP-SERM | SERM | `IDEA` | `HOLD` | PH3–PH4 | зависит от monitoring и operations |
| REP-RVW | Review Management | `IDEA` | `DISCOVER LATER` | PH3 | один channel cluster |
| REP-ACQ | Review Acquisition | `IDEA` | `HOLD` | PH3 | consent, anti-abuse и channel rules |
| REP-CRD | Crowd Review Tasks | `IDEA` | `HOLD / RESTRICT` | PH4 | compliance и platform policies прежде marketplace |

## 9. CRM and Communications OS

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| CRM-LEAD | Lead Capture Hub | `IDEA/PARTIAL ADJACENT` | `DISCOVER → BUILD MINIMUM` | PH2 | canonical lead intake для full loop |
| CRM-OVR | CRM Overlay | `DESIGN` | `BUILD MINIMUM` | PH2 | соединить существующие CRM с Ads, не заменять их сразу |
| CRM-FULL | Envidicy CRM | `DESIGN` | `HOLD` | PH3–PH4 | только если overlay докажет gap и рынок |
| CRM-OMNI | Omnichannel Communication Hub | `DESIGN` | `DISCOVER / INTEGRATE` | PH3 | единая conversation model, adapters |
| CRM-MSG | Corporate Messenger | `IDEA` | `HOLD / BUY` | PH4 | commodity-heavy, вне основного data loop |
| CRM-DIAL | Autodialer | `IDEA` | `HOLD / INTEGRATE` | PH4 | telecom/compliance burden |
| CRM-PBX | Virtual PBX | `IDEA` | `HOLD / INTEGRATE` | PH4 | не строить telecom core самостоятельно |
| CRM-AISM | AI Sales Manager | `DESIGN` | `DISCOVER AFTER OVERLAY` | PH3 | assist/draft прежде autonomy |
| CRM-AIROP | AI-РОП | `DESIGN/PARTIAL SEPARATE` | `DISCOVER INTEGRATION` | PH2–PH3 | подключить как продукт/consumer общих contracts |

## 10. Analytics and Data OS

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| DAT-CON | Unified Analytics Connector | `PARTIAL` | `BUILD INCREMENTALLY` | PH1 | общая ingestion основа, domain semantics у products |
| DAT-BI | Business Intelligence | `PARTIAL` | `HARDEN` | PH1–PH2 | semantic metrics и role-based dashboards |
| DAT-E2E | End-to-End Analytics | `DESIGN` | `BUILD STAGED` | PH2 | creative→ad→lead→sale graph |
| DAT-ATR | Attribution | `DESIGN` | `DISCOVER → BUILD MINIMUM` | PH2 | прозрачные модели/window, не «магический AI» |
| DAT-CDP | CDP | `IDEA` | `HOLD` | PH3–PH4 | identity/privacy/scale только после real need |
| DAT-SEO | SEO Analytics | `IDEA` | `HOLD / INTEGRATE` | PH3 | сторонние data providers |
| DAT-LNK | Link Management | `IDEA` | `DISCOVER AS ENABLER` | PH2–PH3 | UTM, redirect, consent, attribution IDs |
| DAT-DOM | Expired Domains | `IDEA` | `HOLD / RESTRICT` | PH4 | legal/reputation checks, не core loop |
| DAT-EXP | Experimentation Platform | `DESIGN` | `BUILD MINIMUM WITH CI` | PH2 | experiment registry и evidence, не generic platform сначала |

## 11. Crowd and Proof Platform

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| CRD-CORE | Crowd Platform | `IDEA` | `HOLD` | PH4 | marketplace только после одного доказанного workflow |
| CRD-PERF | Proof of Performance | `IDEA` | `DISCOVER` | PH3 | common evidence model |
| CRD-PLACE | Proof of Placement | `IDEA` | `DISCOVER` | PH3 | совместить с influencer/offline pilots |
| CRD-FIELD | Field Tasks | `IDEA` | `HOLD / PILOT` | PH3–PH4 | geo/privacy/fraud controls |
| CRD-MKT | Task Marketplace | `IDEA` | `HOLD` | PH4 | network effects и trust/safety |

## 12. Operations and ERP

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| OPE-WMS | Warehouse Management | `IDEA` | `HOLD / INTEGRATE` | PH4 | отдельный продукт и рынок |
| OPE-PRC | Procurement Control | `IDEA` | `HOLD` | PH4 | отдельное discovery/P&L |
| OPE-TND | Tender Management | `IDEA` | `HOLD` | PH4 | legal/process specialization |
| OPE-CTR | Contracts | `IDEA` | `HOLD / INTEGRATE` | PH4 | DMS/e-sign integrations |
| OPE-FIN | Accounting & Finance Services | `IDEA` | `HOLD / PARTNER` | PH4 | не смешивать с Core Billing |
| OPE-TIME | Work Time Control | `IDEA` | `HOLD / BUY` | PH4 | commodity/HR compliance |
| OPE-MGMT | Financial Management / P&L | `DESIGN` | `DISCOVER AFTER FULL LOOP` | PH3 | управленческая аналитика поверх sales/cost facts |

## 13. Productivity and AI Assistants

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| PRD-MTG | Meeting Assistant | `IDEA` | `HOLD / INTEGRATE` | PH4 | commodity capability |
| PRD-MAIL | AI Mail Control Center | `IDEA` | `HOLD / INTEGRATE` | PH4 | privacy, provider APIs и crowded market |
| PRD-KNOW | Knowledge Management | `DESIGN` | `DISCOVER AS ENABLER` | PH2–PH3 | сначала scoped knowledge для AI use cases |
| PRD-EXEC | Executive Assistant | `IDEA` | `HOLD` | PH4 | composition после mature tasks/knowledge/policies |

## 14. Offline Advertising

| ID | Модуль | Сейчас | Решение | H | Подход |
|---|---|---|---|---|---|
| OFF-CLAIM | Claim ID | `IDEA` | `DISCOVER CONDITIONALLY` | PH3 | один partner pilot |
| OFF-ATR | Offline Attribution | `IDEA` | `HOLD / DISCOVER` | PH3 | identity/consent/evidence |
| OFF-PROOF | Outdoor Proof | `IDEA` | `DISCOVER WITH CROWD` | PH3 | общий proof/evidence primitive |

## 15. Дополнительные рекомендуемые модули

| ID | Модуль | Решение | H | Место в архитектуре |
|---|---|---|---|---|
| EXT-DAM | Digital Asset Management | `BUILD INCREMENTALLY` | PH1–PH2 | расширение Core Files + Creative metadata/search |
| EXT-PRIV | Consent & Privacy Management | `BUILD BEFORE CRM SCALE` | PH1–PH2 | Core/policy capability |
| EXT-FRN | Franchise & Branch Management | `HOLD` | PH3–PH4 | specialized organization/project overlay |
| EXT-PART | Partner Portal | `BUILD EVOLUTIONARILY` | PH1–PH2 | evolution agency/organization relationship UX |
| EXT-PRICE | Pricing & Offer Intelligence | `DISCOVER` | PH3 | Data/Product module при надёжных sources |
| EXT-CS | Customer Success | `DISCOVER AFTER USAGE EVENTS` | PH2–PH3 | product adoption/health поверх event data |
| EXT-MKT | Marketing Asset Marketplace | `HOLD` | PH4 | только после собственной библиотеки и спроса |

## 16. Композиционные продукты, а не новые владельцы данных

`Envidicy Marketing OS` следует трактовать как единый пользовательский experience и workflow поверх Core, Advertising, Creative, CRM и Analytics, а не как ещё один домен, копирующий их сущности.

Аналогично:

- AI Marketing Strategist собирает facts и создаёт Strategy/Hypotheses, но не владеет кампаниями и сделками;
- Executive Dashboard агрегирует read models, но не становится источником истины;
- mobile app — канал доступа к разрешённым возможностям, а не отдельный backend-домен;
- Notification & Approval Center — общая capability, а не продуктовая вертикаль.

## 17. Высокорисковое направление

`Account Farming` имеет статус `EXCLUDED/EXIT`. Envidicy не проектирует обход правил площадок, массовую неаутентичную регистрацию или сокрытие владения.

Разрешённый продуктовый контур — `Compliant Account Provisioning`:

- официальные API и partner programs;
- проверяемое юридическое владение;
- согласия и документы;
- прозрачная история действий;
- антифрод и provider policy compliance.

## 18. Обязательные поля рабочей карточки

```text
id, name, type, vertical,
product_owner, engineering_owner,
as_is_status, investment_status, horizon,
target_user, problem, outcome_metric,
depends_on, provides, data_owner,
api_contracts, events_in, events_out,
security_class, compliance_risks,
delivery_approach, estimated_size, confidence,
decision_date, next_gate
```

Пустой owner или next gate означает, что модуль не готов к delivery.
