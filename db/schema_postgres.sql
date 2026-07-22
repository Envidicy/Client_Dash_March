CREATE TABLE IF NOT EXISTS campaigns (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS plans (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES campaigns(id) ON DELETE CASCADE,
  payload JSONB NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fact_rows (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  platform TEXT NOT NULL,
  ad_account_id TEXT,
  campaign_name TEXT,
  impressions DOUBLE PRECISION DEFAULT 0,
  clicks DOUBLE PRECISION DEFAULT 0,
  cost DOUBLE PRECISION DEFAULT 0,
  leads DOUBLE PRECISION DEFAULT 0,
  conversions DOUBLE PRECISION DEFAULT 0,
  views DOUBLE PRECISION DEFAULT 0,
  raw JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  salt TEXT,
  is_client INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agencies (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  owner_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agency_members (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'client_viewer',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, user_id)
);

CREATE TABLE IF NOT EXISTS agency_clients (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  client_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  default_rebate_percent DOUBLE PRECISION DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, client_user_id)
);

CREATE TABLE IF NOT EXISTS agency_client_rates (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  client_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  platform_fee_percent DOUBLE PRECISION,
  rebate_percent DOUBLE PRECISION DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, client_user_id, platform)
);

CREATE TABLE IF NOT EXISTS agency_wallets (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  balance DOUBLE PRECISION DEFAULT 0,
  currency TEXT DEFAULT 'KZT',
  low_threshold DOUBLE PRECISION DEFAULT 50000,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id)
);

CREATE TABLE IF NOT EXISTS agency_wallet_transactions (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  client_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  account_id BIGINT REFERENCES ad_accounts(id) ON DELETE SET NULL,
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'KZT',
  type TEXT NOT NULL,
  source_type TEXT,
  source_id BIGINT,
  source_key TEXT UNIQUE,
  note TEXT,
  created_by TEXT,
  initiated_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  acting_as_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  company TEXT,
  language TEXT DEFAULT 'ru',
  whatsapp_phone TEXT,
  telegram_handle TEXT,
  fee_config TEXT,
  notifications_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_telegram_chats (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  chat_id TEXT NOT NULL UNIQUE,
  chat_title TEXT,
  message_thread_id BIGINT,
  bound_by_telegram_user_id TEXT,
  enabled INTEGER DEFAULT 1,
  bound_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telegram_bind_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at BIGINT NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ad_accounts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  owner_type TEXT DEFAULT 'client',
  agency_id BIGINT REFERENCES agencies(id) ON DELETE SET NULL,
  platform TEXT NOT NULL,
  external_id TEXT,
  name TEXT NOT NULL,
  account_code TEXT,
  visible_to_client INTEGER DEFAULT 1,
  currency TEXT DEFAULT 'USD',
  budget_total DOUBLE PRECISION DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS account_saved_views (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  viewer_email TEXT NOT NULL,
  name TEXT NOT NULL,
  is_pinned INTEGER DEFAULT 1,
  is_default INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, viewer_email, name)
);

CREATE INDEX IF NOT EXISTS idx_account_saved_views_owner
  ON account_saved_views(user_id, viewer_email, position);

CREATE TABLE IF NOT EXISTS account_saved_view_accounts (
  view_id BIGINT NOT NULL REFERENCES account_saved_views(id) ON DELETE CASCADE,
  account_id BIGINT NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(view_id, account_id)
);

CREATE TABLE IF NOT EXISTS account_overview_preferences (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  viewer_email TEXT NOT NULL,
  account_id BIGINT NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  is_hidden INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(user_id, viewer_email, account_id)
);

CREATE TABLE IF NOT EXISTS ad_account_stats (
  id BIGSERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  account_id BIGINT NOT NULL REFERENCES ad_accounts(id) ON DELETE CASCADE,
  client_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_external_id TEXT,
  stat_date DATE NOT NULL,
  currency TEXT DEFAULT 'USD',
  spend DOUBLE PRECISION DEFAULT 0,
  impressions DOUBLE PRECISION DEFAULT 0,
  clicks DOUBLE PRECISION DEFAULT 0,
  raw_payload_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(account_id, stat_date)
);

CREATE INDEX IF NOT EXISTS idx_ad_account_stats_client_date ON ad_account_stats(client_id, stat_date);
CREATE INDEX IF NOT EXISTS idx_ad_account_stats_platform_date ON ad_account_stats(platform, stat_date);

CREATE TABLE IF NOT EXISTS ad_account_finance_snapshots (
  account_id BIGINT PRIMARY KEY REFERENCES ad_accounts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  client_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_external_id TEXT,
  currency TEXT DEFAULT 'USD',
  spend_today DOUBLE PRECISION DEFAULT 0,
  spend_total DOUBLE PRECISION DEFAULT 0,
  optional_balance DOUBLE PRECISION,
  internal_client_balance DOUBLE PRECISION DEFAULT 0,
  remaining_balance DOUBLE PRECISION DEFAULT 0,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ad_account_finance_snapshots_client ON ad_account_finance_snapshots(client_id);

CREATE TABLE IF NOT EXISTS agency_ad_accounts (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  ad_account_id BIGINT REFERENCES ad_accounts(id) ON DELETE CASCADE,
  label TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, ad_account_id)
);

CREATE TABLE IF NOT EXISTS agency_user_account_access (
  id BIGSERIAL PRIMARY KEY,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  agency_ad_account_id BIGINT REFERENCES agency_ad_accounts(id) ON DELETE CASCADE,
  access_level TEXT DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, user_id, agency_ad_account_id)
);

CREATE TABLE IF NOT EXISTS account_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  platform TEXT NOT NULL,
  name TEXT NOT NULL,
  payload JSONB NOT NULL,
  contract_code TEXT,
  account_code TEXT,
  comment TEXT,
  manager_email TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS account_request_events (
  id BIGSERIAL PRIMARY KEY,
  request_id BIGINT REFERENCES account_requests(id) ON DELETE CASCADE,
  admin_email TEXT,
  manager_email TEXT,
  type TEXT NOT NULL,
  status TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wallets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  balance DOUBLE PRECISION DEFAULT 0,
  currency TEXT DEFAULT 'KZT',
  low_threshold DOUBLE PRECISION DEFAULT 50000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  account_id BIGINT REFERENCES ad_accounts(id),
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'KZT',
  type TEXT NOT NULL,
  source_type TEXT,
  source_id BIGINT,
  source_key TEXT UNIQUE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS integration_api_keys (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  scopes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_integration_api_keys_user
  ON integration_api_keys(user_id, status);

CREATE TABLE IF NOT EXISTS integration_api_audit_log (
  id BIGSERIAL PRIMARY KEY,
  api_key_id BIGINT REFERENCES integration_api_keys(id) ON DELETE SET NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  method TEXT NOT NULL,
  path TEXT NOT NULL,
  status_code INTEGER,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_integration_api_audit_key_created
  ON integration_api_audit_log(api_key_id, created_at);

CREATE TABLE IF NOT EXISTS legal_entities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  full_name TEXT,
  issuer_type TEXT DEFAULT 'too',
  tax_mode TEXT DEFAULT 'without_vat',
  contract_number TEXT,
  contract_date TEXT,
  bin TEXT,
  address TEXT,
  legal_address TEXT,
  email TEXT,
  bank TEXT,
  iban TEXT,
  bic TEXT,
  kbe TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topups (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT REFERENCES ad_accounts(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id),
  amount_input DOUBLE PRECISION NOT NULL,
  fee_percent DOUBLE PRECISION DEFAULT 0,
  platform_fee_percent DOUBLE PRECISION DEFAULT 0,
  agency_id BIGINT REFERENCES agencies(id) ON DELETE SET NULL,
  agency_rebate_percent DOUBLE PRECISION DEFAULT 0,
  agency_rebate_amount DOUBLE PRECISION DEFAULT 0,
  vat_percent DOUBLE PRECISION DEFAULT 0,
  amount_net DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'USD',
  fx_rate DOUBLE PRECISION,
  hold_applied INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  seen_by_admin INTEGER DEFAULT 0,
  meta_cap_before BIGINT,
  meta_cap_target BIGINT,
  meta_cap_confirmed BIGINT,
  meta_cap_error TEXT,
  meta_cap_attempted_at TIMESTAMPTZ,
  meta_cap_applied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS background_job_leases (
  job_key TEXT PRIMARY KEY,
  lock_owner TEXT,
  locked_until TIMESTAMPTZ,
  last_started_at TIMESTAMPTZ,
  last_finished_at TIMESTAMPTZ,
  last_error TEXT
);

CREATE TABLE IF NOT EXISTS wallet_topup_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'KZT',
  note TEXT,
  status TEXT DEFAULT 'requested',
  amount_kind TEXT DEFAULT 'gross',
  issuer_type TEXT DEFAULT 'too',
  tax_mode TEXT DEFAULT 'without_vat',
  vat_rate DOUBLE PRECISION DEFAULT 0,
  contract_number TEXT,
  contract_date TEXT,
  issuer_name TEXT,
  issuer_bin TEXT,
  issuer_iin TEXT,
  issuer_legal_address TEXT,
  issuer_factual_address TEXT,
  issuer_bank TEXT,
  issuer_iban TEXT,
  issuer_bic TEXT,
  issuer_kbe TEXT,
  issuer_currency TEXT,
  legal_entity_id BIGINT REFERENCES legal_entities(id),
  client_name TEXT,
  client_bin TEXT,
  client_address TEXT,
  client_email TEXT,
  order_ref TEXT,
  invoice_number TEXT,
  invoice_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_legal_entities (
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  legal_entity_id BIGINT REFERENCES legal_entities(id) ON DELETE CASCADE,
  is_default INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, legal_entity_id)
);

CREATE TABLE IF NOT EXISTS billing_issuers (
  issuer_type TEXT PRIMARY KEY,
  name TEXT,
  bin TEXT,
  iin TEXT,
  legal_address TEXT,
  factual_address TEXT,
  bank TEXT,
  iban TEXT,
  bic TEXT,
  kbe TEXT,
  currency TEXT DEFAULT 'KZT',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_uploads (
  id BIGSERIAL PRIMARY KEY,
  request_id BIGINT REFERENCES wallet_topup_requests(id),
  invoice_number TEXT,
  invoice_date TEXT,
  amount DOUBLE PRECISION,
  currency TEXT,
  client_name TEXT,
  client_bin TEXT,
  client_address TEXT,
  order_ref TEXT,
  pdf_path TEXT,
  status TEXT DEFAULT 'pending',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_counters (
  year INTEGER PRIMARY KEY,
  seq INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS company_profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT,
  bin TEXT,
  iin TEXT,
  legal_address TEXT,
  factual_address TEXT,
  bank TEXT,
  iban TEXT,
  bic TEXT,
  kbe TEXT,
  currency TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  login_email TEXT,
  expires_at BIGINT,
  absolute_expires_at BIGINT,
  last_seen_at BIGINT,
  revoked_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_documents (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
