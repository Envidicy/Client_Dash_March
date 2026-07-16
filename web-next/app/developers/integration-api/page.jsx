import Link from 'next/link'
import styles from './page.module.css'

const ENDPOINT_GROUPS = [
  {
    title: 'Подключение и аккаунты',
    items: [
      { path: '/me', scope: 'API key', text: 'Проверка ключа, клиент и доступные scopes.' },
      { path: '/accounts', scope: 'accounts:read', text: 'Рекламные аккаунты, идентификаторы, статусы и текущие комиссии.' },
    ],
  },
  {
    title: 'Финансы',
    items: [
      { path: '/wallet-topups', scope: 'finance:read', text: 'Заявки на пополнение общего кошелька и реквизиты счетов.' },
      { path: '/wallet-transactions', scope: 'finance:read', text: 'Фактические движения клиентского кошелька.' },
      { path: '/account-topups', scope: 'finance:read', text: 'Пополнения кабинетов, комиссии, НДС и применённые курсы.' },
      { path: '/funding-events', scope: 'finance:read', text: 'Фактические зачисления на рекламные кабинеты и сторно.' },
      { path: '/finance/summary', scope: 'finance:read', text: 'Текущий кошелёк и финансовая сводка по аккаунтам.' },
      { path: '/exchange-rates/current', scope: 'finance:read', text: 'Текущие информационные валютные курсы.' },
    ],
  },
  {
    title: 'Статистика',
    items: [
      { path: '/performance/daily', scope: 'performance:read', text: 'Расходы, показы и клики по дням и аккаунтам.' },
    ],
  },
]

const SCOPES = [
  {
    code: 'accounts:read',
    title: 'Аккаунты',
    text: 'Идентификаторы, статусы, валюты и текущие настройки комиссий.',
  },
  {
    code: 'finance:read',
    title: 'Финансы',
    text: 'Кошелёк, пополнения, фактические зачисления, остатки и курсы.',
  },
  {
    code: 'performance:read',
    title: 'Статистика',
    text: 'Дневные расходы, показы и клики рекламных аккаунтов.',
  },
]

export const metadata = {
  title: 'Integration API v1 — Envidicy Developers',
  description: 'Документация read-only API Envidicy для финансовых и аналитических интеграций.',
}

function EndpointCard({ item }) {
  return (
    <article className={styles.endpointCard}>
      <div className={styles.endpointLine}>
        <span className={styles.method}>GET</span>
        <code>{item.path}</code>
      </div>
      <p>{item.text}</p>
      <span className={styles.scopeBadge}>{item.scope}</span>
    </article>
  )
}

export default function IntegrationApiPage() {
  const apiOrigin = (process.env.NEXT_PUBLIC_API_BASE || 'https://envidicy-dash-client.onrender.com').replace(/\/$/, '')
  const apiBase = `${apiOrigin}/api/v1/integration`
  const curlExample = `curl --request GET \\
  --url "${apiBase}/accounts?limit=100" \\
  --header "Accept: application/json" \\
  --header "X-API-Key: env_live_your_secret_key"`

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>E</span>
          <span>
            <strong>Envidicy</strong>
            <small>Developers</small>
          </span>
        </Link>
        <nav aria-label="Developer documentation">
          <a href="#quickstart">Быстрый старт</a>
          <a href="#endpoints">Endpoint’ы</a>
          <a href="#data-model">Модель данных</a>
        </nav>
        <div className={styles.topActions}>
          <span className={styles.versionBadge}>v1 · Stable</span>
          <Link className={styles.workspaceLink} href="/settings">Ключи в кабинете</Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>READ-ONLY INTEGRATION API</span>
            <h1>Финансы и статистика Envidicy — в вашей системе</h1>
            <p>
              Стабильный API для выгрузки пополнений, движений кошелька, комиссий,
              курсов, фактических зачислений и дневных показателей по рекламным аккаунтам.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={`${apiOrigin}/integration/docs`} rel="noreferrer" target="_blank">
                Открыть Swagger
              </a>
              <a
                className={styles.secondaryButton}
                download
                href="/envidicy-integration-api-v1.postman_collection.json"
              >
                Скачать Postman Collection
              </a>
            </div>
            <div className={styles.trustRow}>
              <span>Ключ на клиента</span>
              <span>Scopes</span>
              <span>Cursor pagination</span>
              <span>Audit log</span>
            </div>
          </div>

          <div className={styles.heroCode}>
            <div className={styles.codeHeader}>
              <span>Первый запрос</span>
              <code>curl</code>
            </div>
            <pre><code>{curlExample}</code></pre>
            <div className={styles.codeFooter}>
              <span className={styles.statusDot} />
              <span>HTTPS · JSON · UTF-8</span>
            </div>
          </div>
        </section>

        <section className={styles.signalGrid} aria-label="API guarantees">
          <article>
            <strong>Read-only</strong>
            <span>Ключ не может менять баланс или создавать операции</span>
          </article>
          <article>
            <strong>1–500</strong>
            <span>Записей на страницу через cursor pagination</span>
          </article>
          <article>
            <strong>600/min</strong>
            <span>Стандартный лимит запросов на один ключ</span>
          </article>
          <article>
            <strong>v1</strong>
            <span>Версионированный стабильный контракт</span>
          </article>
        </section>

        <div className={styles.docsLayout}>
          <aside className={styles.sidebar}>
            <p>Содержание</p>
            <a href="#quickstart">Быстрый старт</a>
            <a href="#authentication">Авторизация</a>
            <a href="#scopes">Разрешения</a>
            <a href="#pagination">Пагинация</a>
            <a href="#endpoints">Endpoint’ы</a>
            <a href="#data-model">Финансовая модель</a>
            <a href="#errors">Ошибки</a>
            <a href="#postman">Postman</a>
          </aside>

          <div className={styles.content}>
            <section id="quickstart" className={styles.docSection}>
              <span className={styles.sectionNumber}>01</span>
              <div>
                <h2>Быстрый старт</h2>
                <p>
                  Владелец клиента создаёт ключ в разделе <strong>Настройки → API для интеграций</strong>.
                  Полный секрет показывается один раз, поэтому его нужно сразу сохранить на сервере интегратора.
                </p>
                <ol className={styles.steps}>
                  <li><span>1</span><p>Создайте ключ и выберите минимально необходимые scopes.</p></li>
                  <li><span>2</span><p>Сохраните секрет в серверном secret manager.</p></li>
                  <li><span>3</span><p>Проверьте подключение запросом <code>GET /me</code>.</p></li>
                  <li><span>4</span><p>Читайте списки по ID и сохраняйте <code>next_cursor</code>.</p></li>
                </ol>
              </div>
            </section>

            <section id="authentication" className={styles.docSection}>
              <span className={styles.sectionNumber}>02</span>
              <div>
                <h2>Авторизация</h2>
                <p>Передавайте ключ в заголовке каждого запроса. Не используйте query-параметры.</p>
                <div className={styles.inlineCode}>
                  <span>Header</span>
                  <code>X-API-Key: env_live_your_secret_key</code>
                </div>
                <p className={styles.callout}>
                  Envidicy хранит только SHA-256 хеш. Потерянный секрет нельзя восстановить —
                  необходимо выпустить новый ключ и отозвать старый.
                </p>
              </div>
            </section>

            <section id="scopes" className={styles.docSection}>
              <span className={styles.sectionNumber}>03</span>
              <div>
                <h2>Разрешения</h2>
                <p>Каждый ключ получает только выбранные владельцем группы данных.</p>
                <div className={styles.scopeGrid}>
                  {SCOPES.map((scope) => (
                    <article key={scope.code}>
                      <code>{scope.code}</code>
                      <h3>{scope.title}</h3>
                      <p>{scope.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="pagination" className={styles.docSection}>
              <span className={styles.sectionNumber}>04</span>
              <div>
                <h2>Cursor pagination</h2>
                <p>
                  Списки возвращаются по возрастанию ID. Если <code>has_more=true</code>,
                  передайте <code>next_cursor</code> как следующий <code>after_id</code>.
                </p>
                <pre className={styles.responseCode}><code>{`{
  "items": [],
  "pagination": {
    "limit": 100,
    "has_more": true,
    "next_cursor": 1842
  }
}`}</code></pre>
              </div>
            </section>

            <section id="endpoints" className={styles.docSection}>
              <span className={styles.sectionNumber}>05</span>
              <div>
                <h2>Endpoint’ы</h2>
                <p>Все пути указаны относительно <code>{apiBase}</code>.</p>
                <div className={styles.endpointGroups}>
                  {ENDPOINT_GROUPS.map((group) => (
                    <div key={group.title}>
                      <h3>{group.title}</h3>
                      <div className={styles.endpointGrid}>
                        {group.items.map((item) => <EndpointCard item={item} key={item.path} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="data-model" className={styles.docSection}>
              <span className={styles.sectionNumber}>06</span>
              <div>
                <h2>Финансовая модель</h2>
                <p>Для корректной сверки разделяйте заявку, движение денег и фактическое зачисление.</p>
                <div className={styles.ledgerFlow}>
                  <article>
                    <span>1</span>
                    <div>
                      <code>/wallet-topups</code>
                      <strong>Заявка и счёт</strong>
                      <p>Документ и намерение клиента. Не подтверждает зачисление.</p>
                    </div>
                  </article>
                  <article>
                    <span>2</span>
                    <div>
                      <code>/wallet-transactions</code>
                      <strong>Движение кошелька</strong>
                      <p>Фактическое зачисление или списание общего баланса.</p>
                    </div>
                  </article>
                  <article>
                    <span>3</span>
                    <div>
                      <code>/funding-events</code>
                      <strong>Зачисление в кабинет</strong>
                      <p>Append-only реестр фактических пополнений и сторно.</p>
                    </div>
                  </article>
                </div>
                <p className={styles.callout}>
                  Комиссии, НДС и исторический применённый курс берите из <code>/account-topups</code>.
                  Текущий курс нельзя использовать для пересчёта прошлой операции.
                </p>
              </div>
            </section>

            <section id="errors" className={styles.docSection}>
              <span className={styles.sectionNumber}>07</span>
              <div>
                <h2>Ошибки</h2>
                <div className={styles.errorGrid}>
                  <span><code>400</code> Неверные параметры</span>
                  <span><code>401</code> Ключ неверен или отозван</span>
                  <span><code>403</code> Нет необходимого scope</span>
                  <span><code>429</code> Превышен rate limit</span>
                </div>
              </div>
            </section>

            <section id="postman" className={styles.postmanSection}>
              <div>
                <span className={styles.eyebrow}>READY TO IMPORT</span>
                <h2>Коллекция Postman уже настроена</h2>
                <p>
                  Внутри — все endpoint’ы, переменные окружения, API-key авторизация,
                  фильтры, cursor pagination и базовые response tests.
                </p>
              </div>
              <a download href="/envidicy-integration-api-v1.postman_collection.json">
                Скачать Collection v2.1
              </a>
            </section>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Envidicy Integration API v1</span>
        <div>
          <a href={`${apiOrigin}/integration/docs`} rel="noreferrer" target="_blank">Swagger</a>
          <Link href="/settings">Управление ключами</Link>
        </div>
      </footer>
    </div>
  )
}
