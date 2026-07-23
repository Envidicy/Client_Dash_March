# Безопасность, tenancy и права

Статус: `Review Candidate v0.1`

Baseline: `ENVIDICY-ARCH-RC-2026-07-23-01`

## 1. Security model

Основная граница безопасности Envidicy — `Organization`. Любое действие рассматривается как запрос конкретного actor над конкретным resource в доверенном tenant context.

```text
Identity
→ Membership / AccessDelegation
→ Tenant boundary
→ Module Entitlement
→ Permission at scope
→ Policy conditions
→ Step-up / Approval
→ Action
→ Audit
```

Принципы:

- deny by default;
- least privilege;
- backend принимает окончательное решение;
- tenant context не доверяется из body/query;
- права, тарифы и feature flags — разные механизмы;
- финансовые и необратимые действия требуют более сильного контроля;
- люди, сервисы и AI подчиняются одной модели policy/audit;
- impersonation не скрывает исходного actor.

## 2. Типы actor

| Тип | Пример | Требование |
|---|---|---|
| Human principal | пользователь, оператор, сотрудник агентства | login identity, session, MFA по риску |
| Service account | integration API client, worker | scoped credential, rotation, owner, expiry |
| AI agent | targetologist/analyst assistant | capability grant, use-case limits, provenance |
| System actor | scheduler, migration, reconciliation | строгое назначение, отдельный identity и audit |

Общий `admin` token, используемый всеми внутренними процессами, запрещён.

## 3. Authentication and sessions

### 3.1. Human access

- пароль хранится только как современный adaptive hash;
- session token имеет short-lived access часть и контролируемое обновление;
- refresh/session state отзывается сервером;
- login, logout, refresh, recovery и MFA events аудитируются;
- email/phone verification не равны authorization;
- чувствительные изменения требуют recent authentication;
- active sessions/devices видимы пользователю;
- brute-force и credential stuffing ограничиваются rate limit/risk detection.

### 3.2. MFA и step-up

MFA обязательно как минимум для:

- platform operators;
- владельца организации и finance role;
- просмотра/изменения integration secrets;
- изменения ролей и delegation;
- финансовых adjustments и операций выше порога;
- включения автономных AI действий;
- экспорта высокочувствительных данных.

Даже при активной MFA высокорисковое действие может требовать повторного step-up.

### 3.3. Service credentials

- отдельный service account на integration/use case;
- scope, tenant, expiry и IP/network conditions, если применимо;
- secret отображается один раз;
- хэш/secret reference вместо открытого ключа;
- rotation без остановки;
- last-used и anomaly audit;
- невозможность получить human session через service credential.

## 4. Tenant model

```text
Organization
└── Workspace
    └── Project
        └── product resources
```

Инварианты:

- business resource принадлежит organization, а не user;
- каждый запрос фильтруется по server-derived organization context;
- переданный ID проверяется на принадлежность scope;
- cross-organization доступ существует только через явный relationship и delegation;
- удаление membership немедленно лишает доступа к новым действиям;
- кеш policy/entitlement имеет безопасную invalidation;
- фоновые job/event сохраняют tenant и actor context;
- analytics/export повторяют tenant isolation source domains.

## 5. Authorization model

### 5.1. RBAC + scoped policy

Permission — стабильная атомарная возможность:

```text
core.membership.manage
billing.balance.read
billing.reservation.create
billing.adjustment.post
advertising.account.read
advertising.funding.request
advertising.campaign.publish
creative.analysis.review
creative.experiment.approve
```

Role — изменяемый шаблон permissions. RoleBinding назначает роль на scope:

```text
organization → workspace → project → module → resource
```

PolicyCondition ограничивает grant по сумме, provider, времени, resource ownership, auth strength, approval или другим проверяемым атрибутам.

### 5.2. Решение

```text
ALLOW =
  authenticated
  AND resource belongs to effective tenant
  AND membership/delegation active
  AND entitlement active
  AND permission granted in applicable scope
  AND policy conditions satisfied
  AND auth strength sufficient
  AND required approval valid
  AND no explicit deny
```

### 5.3. Разные gates

| Gate | На какой вопрос отвечает |
|---|---|
| Entitlement | организация приобрела/получила возможность? |
| Permission | actor вправе использовать её? |
| Feature flag | функция технически включена в rollout? |
| Approval | конкретное критическое действие согласовано? |

Ни один gate не заменяет другой.

## 6. Базовые role templates

Шаблоны ускоряют настройку, но владелец организации может создавать ограниченные роли.

| Role | Назначение |
|---|---|
| Organization Owner | владение tenant, назначение owners, contract-level настройки |
| Organization Admin | пользователи, workspace/project, модули без критических финансов |
| Finance Manager | счета, payments, balances, funding approvals по policy |
| Marketer | проекты, медиапланы, аналитика, creative hypotheses |
| Targetologist | кабинеты, campaign drafts, запуск в разрешённых пределах |
| Analyst | read analytics/export в разрешённом scope |
| Creative Producer | assets, analyses, scenarios без рекламного запуска |
| Client Approver | review/approval выбранных планов, creative и budgets |
| External Contractor | минимальный временный project/resource scope |
| Platform Operator | эксплуатационные действия Envidicy с отдельным control plane |

`Platform Operator` не является tenant owner и не получает неограниченный доступ к клиентским данным по умолчанию.

## 7. Делегирование агентству

Агентство и клиент — разные Organizations. Relationship фиксирует договорную связь, `AccessDelegation` — фактические полномочия. Она не совпадает с `ApproverSubstitution` в Approval Engine.

```text
effective agency employee permission =
employee permission in agency
∩ client delegation to agency
∩ client entitlements
∩ resource policy
```

AccessDelegation содержит:

- provider/recipient organization;
- permissions или role template;
- workspace/project/resource scope;
- financial limits;
- start/end;
- право redelegation, обычно `false`;
- author/approver и reason;
- revocation state.

Relationship без AccessDelegation не даёт доступа. Отзыв AccessDelegation не меняет владельца данных и credentials.

## 8. Матрица критических действий

| Действие | Permission | Дополнительный контроль |
|---|---|---|
| пригласить участника | `core.membership.manage` | запрет повысить выше собственных прав |
| передать ownership | `core.organization.transfer_ownership` | MFA, второй owner/confirmation, audit |
| создать API key | `core.api_credential.create` | scopes, expiry, one-time reveal |
| подключить provider | `core.integration.authorize` | OAuth state/PKCE, scopes preview |
| запросить funding | `advertising.funding.request` | entitlement, amount/provider policy |
| согласовать funding | `advertising.funding.approve` | segregation of duties, MFA по порогу |
| manual financial adjustment | `billing.adjustment.post` | mandatory approval, reason, evidence |
| опубликовать campaign | `advertising.campaign.publish` | preview diff, budget limit, approval |
| изменить бюджет | `advertising.campaign.budget_change` | threshold, recent auth, audit |
| запустить AI action | product-specific execute permission | autonomy policy, cost limit, approval |
| экспортировать данные | `*.export` | data classification, audit, watermark/expiry |
| impersonate | `core.support.impersonate` | reason/ticket, TTL, original actor, restrictions |

Для создания и согласования критической операции может применяться segregation of duties: один actor не выполняет оба шага выше заданного порога.

## 9. Impersonation

Impersonation — отдельная короткоживущая delegated session, а не подмена user token.

Обязательные свойства:

- `original_actor_id` и `effective_subject_id`;
- причина и support ticket;
- ограниченный TTL;
- banner в UI;
- полный audit;
- права не превышают пересечение инициатора и целевого контекста;
- secrets и критические финансовые операции запрещены или требуют отдельного клиентского approval;
- возможность немедленного завершения владельцем/оператором;
- уведомление клиента согласно policy.

## 10. Secret and integration security

- refresh/access tokens не хранятся открытым текстом в основной БД;
- envelope encryption через KMS и versioned secret reference;
- worker получает short-lived credential lease;
- token отсутствует в event, job payload, logs и analytics;
- OAuth использует state, PKCE где доступно, exact redirect allowlist и scope review;
- refresh сериализуется на connection;
- webhook проверяет signature, timestamp, replay и event ID;
- provider error сохраняется redacted;
- connection owner/binding/scopes проверяются на каждом use;
- revoke/expiry немедленно блокирует новые jobs.

## 11. Files and data classification

### 11.1. Классы

| Class | Пример | Минимальный контроль |
|---|---|---|
| Public | публичный маркетинговый материал | integrity, source provenance |
| Internal | продуктовые настройки, агрегированные метрики | tenant access, audit для export |
| Confidential | финансы, клиентские отчёты, договоры | encryption, scoped access, retention |
| Restricted | credentials, PII, auth/security evidence | separate access, redaction, strict audit, least retention |

### 11.2. File access

- storage key не является permission;
- download URL short-lived и выдаётся после policy check;
- malware scan до обычного использования;
- версии immutable;
- retention/legal hold проверяются до удаления;
- cross-tenant dedup не раскрывает существование чужого файла;
- export bundle получает manifest, classification и expiry.

## 12. AI security and control

AI получает не роль «суперадмин», а use-case capability grant:

```text
use_case
allowed tools/commands
tenant/project scope
data classes
max cost
max amount/budget impact
autonomy level
approval policy
validity window
```

Правила:

- model output не считается доверенной командой;
- tool call проходит обычную validation/authorization;
- prompt injection из внешнего контента рассматривается как недоверенный input;
- secrets не помещаются в prompt;
- input/output, model и prompt version имеют provenance;
- A3/A4 actions имеют kill switch, лимит и rollback plan;
- human approval привязан к digest неизменного proposed action;
- high-risk output проходит deterministic checks;
- feedback не превращается автоматически в обучающие данные без policy.

## 13. Audit and evidence

Audit record фиксирует:

```text
when, tenant context, original/effective actor,
action, resource, result, reason,
request/correlation ID, policy/approval ref,
redacted before/after, source IP/device,
AI provenance when applicable
```

Обязательно аудитируются:

- входы, recovery, MFA, revoke;
- membership, role, delegation и ownership;
- выдача и использование privileged credentials;
- secret access/rotation;
- invoice/payment/ledger/reservation/adjustment;
- funding и provider confirmation;
- campaign publish/budget change;
- export/download restricted data;
- impersonation;
- AI-proposed and AI-executed actions;
- denied high-risk attempts.

Audit append-only. В него не помещаются полные токены, пароли и избыточные PII.

## 14. Security minimum для production

- threat model для нового bounded context;
- tenant isolation tests, включая agency delegation;
- permission tests на каждый privileged endpoint;
- MFA/step-up для high-risk flows;
- secret scanning и log redaction;
- dependency/container scanning;
- rate limits и abuse controls;
- encryption in transit/at rest;
- backup restore test и key recovery procedure;
- retention/deletion process;
- security events/alerts и incident runbook;
- audit completeness;
- rollback и kill switch для automation;
- периодический access review.

## 15. Приоритеты перехода из текущего состояния

1. закрыть unauthenticated/insufficiently protected write paths;
2. убрать hardcoded email/role exceptions;
3. сформировать единый server-side tenant context;
4. отделить agency relationship от фактических grants;
5. защитить API keys/tokens, rotation и redaction;
6. ввести audit для денег, impersonation и role changes;
7. перенести provider secrets в Vault;
8. добавить MFA/step-up и approval для критических операций;
9. внедрить automated tenant/permission regression tests;
10. формализовать privacy, retention и incident response до CRM/массового collection.
