import hashlib
import json
import sqlite3
from contextlib import contextmanager

import pytest
from fastapi.testclient import TestClient

import app.main as main_module


@pytest.fixture()
def integration_db(tmp_path, monkeypatch):
    db_path = tmp_path / "integration-api.db"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          email TEXT NOT NULL UNIQUE
        );
        CREATE TABLE user_profiles (
          user_id INTEGER PRIMARY KEY,
          fee_config TEXT
        );
        CREATE TABLE integration_api_keys (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          key_prefix TEXT NOT NULL,
          key_hash TEXT NOT NULL UNIQUE,
          scopes TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'active',
          expires_at TEXT,
          last_used_at TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          revoked_at TEXT
        );
        CREATE TABLE integration_api_audit_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          api_key_id INTEGER,
          user_id INTEGER,
          method TEXT NOT NULL,
          path TEXT NOT NULL,
          status_code INTEGER,
          ip_address TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE ad_accounts (
          id INTEGER PRIMARY KEY,
          user_id INTEGER NOT NULL,
          platform TEXT NOT NULL,
          external_id TEXT,
          name TEXT NOT NULL,
          account_code TEXT,
          visible_to_client INTEGER DEFAULT 1,
          currency TEXT DEFAULT 'USD',
          status TEXT DEFAULT 'active',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE agencies (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          status TEXT DEFAULT 'active'
        );
        CREATE TABLE agency_clients (
          id INTEGER PRIMARY KEY,
          agency_id INTEGER NOT NULL,
          client_user_id INTEGER NOT NULL,
          status TEXT DEFAULT 'active',
          default_rebate_percent DOUBLE PRECISION DEFAULT 3
        );
        CREATE TABLE agency_client_rates (
          id INTEGER PRIMARY KEY,
          agency_id INTEGER NOT NULL,
          client_user_id INTEGER NOT NULL,
          platform TEXT NOT NULL,
          platform_fee_percent DOUBLE PRECISION,
          rebate_percent DOUBLE PRECISION DEFAULT 3
        );
        CREATE TABLE wallets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          balance DOUBLE PRECISION DEFAULT 0,
          currency TEXT DEFAULT 'KZT',
          low_threshold DOUBLE PRECISION DEFAULT 50000,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE wallet_transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          account_id INTEGER,
          amount DOUBLE PRECISION NOT NULL,
          currency TEXT DEFAULT 'KZT',
          type TEXT NOT NULL,
          source_type TEXT,
          source_id INTEGER,
          source_key TEXT,
          note TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE wallet_topup_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount DOUBLE PRECISION NOT NULL,
          currency TEXT DEFAULT 'KZT',
          note TEXT,
          status TEXT DEFAULT 'requested',
          amount_kind TEXT DEFAULT 'gross',
          tax_mode TEXT,
          vat_rate DOUBLE PRECISION DEFAULT 0,
          legal_entity_id INTEGER,
          client_name TEXT,
          client_bin TEXT,
          order_ref TEXT,
          invoice_number TEXT,
          invoice_date TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE legal_entities (
          id INTEGER PRIMARY KEY,
          name TEXT,
          bin TEXT
        );
        CREATE TABLE invoice_uploads (
          id INTEGER PRIMARY KEY,
          request_id INTEGER,
          invoice_number TEXT,
          invoice_date TEXT,
          status TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE topups (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          amount_input DOUBLE PRECISION NOT NULL,
          fee_percent DOUBLE PRECISION DEFAULT 0,
          platform_fee_percent DOUBLE PRECISION DEFAULT 0,
          agency_id INTEGER,
          agency_rebate_percent DOUBLE PRECISION DEFAULT 0,
          agency_rebate_amount DOUBLE PRECISION DEFAULT 0,
          vat_percent DOUBLE PRECISION DEFAULT 0,
          amount_net DOUBLE PRECISION NOT NULL,
          currency TEXT DEFAULT 'KZT',
          fx_rate DOUBLE PRECISION,
          status TEXT DEFAULT 'pending',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE account_funding_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          platform TEXT NOT NULL,
          amount DOUBLE PRECISION NOT NULL,
          currency TEXT NOT NULL,
          amount_usd DOUBLE PRECISION,
          amount_kzt DOUBLE PRECISION,
          source_type TEXT NOT NULL,
          source_id INTEGER,
          reversed_by_event_id INTEGER,
          reversal_for_event_id INTEGER,
          voided_at TEXT,
          note TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE ad_account_finance_snapshots (
          account_id INTEGER PRIMARY KEY,
          spend_today DOUBLE PRECISION,
          spend_total DOUBLE PRECISION,
          optional_balance DOUBLE PRECISION,
          remaining_balance DOUBLE PRECISION,
          last_synced_at TEXT
        );
        CREATE TABLE ad_account_stats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          platform TEXT NOT NULL,
          account_id INTEGER NOT NULL,
          client_id INTEGER NOT NULL,
          stat_date TEXT NOT NULL,
          currency TEXT DEFAULT 'USD',
          spend DOUBLE PRECISION DEFAULT 0,
          impressions DOUBLE PRECISION DEFAULT 0,
          clicks DOUBLE PRECISION DEFAULT 0,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.execute("INSERT INTO users (id, email) VALUES (1, 'owner@example.com')")
    conn.execute("INSERT INTO users (id, email) VALUES (2, 'other@example.com')")
    conn.execute(
        "INSERT INTO user_profiles (user_id, fee_config) VALUES (1, ?)",
        (json.dumps({"meta": 6}),),
    )
    conn.execute(
        "INSERT INTO ad_accounts (id, user_id, platform, external_id, name, currency) VALUES (10, 1, 'meta', 'act_10', 'Main Meta', 'USD')"
    )
    conn.execute(
        "INSERT INTO ad_accounts (id, user_id, platform, external_id, name, currency) VALUES (20, 2, 'google', '20', 'Other Google', 'USD')"
    )
    conn.execute("INSERT INTO wallets (user_id, balance, currency) VALUES (1, 250000, 'KZT')")
    conn.execute(
        """
        INSERT INTO topups
          (id, account_id, user_id, amount_input, fee_percent, platform_fee_percent,
           vat_percent, amount_net, currency, fx_rate, status)
        VALUES (100, 10, 1, 100000, 6, 6, 0, 200, 'KZT', 500, 'completed')
        """
    )
    conn.commit()
    conn.close()

    @contextmanager
    def fake_get_conn():
        test_conn = sqlite3.connect(db_path)
        test_conn.row_factory = sqlite3.Row
        try:
            yield test_conn
        finally:
            test_conn.close()

    monkeypatch.setattr(main_module, "get_conn", fake_get_conn)
    main_module._INTEGRATION_RATE_LOG.clear()
    return db_path


def _owner():
    return {
        "id": 1,
        "email": "owner@example.com",
        "primary_email": "owner@example.com",
        "can_manage_accesses": True,
    }


def test_client_can_create_key_and_secret_is_never_listed(integration_db):
    created = main_module.create_profile_api_key(
        main_module.IntegrationApiKeyCreatePayload(
            name="Finance export",
            scopes=["accounts:read", "finance:read"],
            expires_in_days=365,
        ),
        _owner(),
    )

    assert created["secret"].startswith("env_live_")
    assert created["secret_shown_once"] is True
    listed = main_module.list_profile_api_keys(_owner())
    assert len(listed["items"]) == 1
    assert "secret" not in listed["items"][0]

    conn = sqlite3.connect(integration_db)
    row = conn.execute("SELECT key_hash FROM integration_api_keys WHERE id=?", (created["id"],)).fetchone()
    conn.close()
    assert row[0] == hashlib.sha256(created["secret"].encode("utf-8")).hexdigest()
    assert created["secret"] not in row[0]


def test_only_workspace_owner_can_manage_api_keys(integration_db):
    secondary_user = {
        "id": 1,
        "email": "team@example.com",
        "primary_email": "owner@example.com",
        "can_manage_accesses": False,
    }

    with pytest.raises(main_module.HTTPException) as exc:
        main_module.create_profile_api_key(
            main_module.IntegrationApiKeyCreatePayload(name="Blocked key"),
            secondary_user,
        )

    assert exc.value.status_code == 403


def test_api_key_name_cannot_contain_only_spaces(integration_db):
    with pytest.raises(main_module.HTTPException) as exc:
        main_module.create_profile_api_key(
            main_module.IntegrationApiKeyCreatePayload(name="  "),
            _owner(),
        )

    assert exc.value.status_code == 422


def test_integration_key_is_scoped_to_own_client_accounts(integration_db):
    created = main_module.create_profile_api_key(
        main_module.IntegrationApiKeyCreatePayload(name="Accounts export", scopes=["accounts:read"]),
        _owner(),
    )
    client = TestClient(main_module.app)

    response = client.get(
        "/api/v1/integration/accounts",
        headers={"X-API-Key": created["secret"]},
    )

    assert response.status_code == 200
    payload = response.json()
    assert [item["id"] for item in payload["items"]] == [10]
    assert payload["items"][0]["commission"]["platform_fee_percent"] == 6
    assert payload["items"][0]["commission"]["total_fee_percent"] == 6
    conn = sqlite3.connect(integration_db)
    audit = conn.execute(
        "SELECT method, path, status_code FROM integration_api_audit_log ORDER BY id DESC LIMIT 1"
    ).fetchone()
    conn.close()
    assert audit == ("GET", "/api/v1/integration/accounts", 200)


def test_account_topups_expose_financial_breakdown_and_applied_rate(integration_db):
    created = main_module.create_profile_api_key(
        main_module.IntegrationApiKeyCreatePayload(name="Finance export", scopes=["finance:read"]),
        _owner(),
    )
    client = TestClient(main_module.app)

    response = client.get(
        "/api/v1/integration/account-topups",
        headers={"X-API-Key": created["secret"]},
    )

    assert response.status_code == 200
    item = response.json()["items"][0]
    assert item["id"] == 100
    assert item["account"]["id"] == 10
    assert item["amounts"]["account_credit"] == 200
    assert item["amounts"]["platform_fee"] == 6000
    assert item["amounts"]["wallet_debit"] == 106000
    assert item["commission"]["platform_fee_percent"] == 6
    assert item["exchange_rate"]["rate"] == 500


def test_revoked_key_is_rejected(integration_db):
    created = main_module.create_profile_api_key(
        main_module.IntegrationApiKeyCreatePayload(name="Temporary export", scopes=["accounts:read"]),
        _owner(),
    )
    main_module.revoke_profile_api_key(created["id"], _owner())
    client = TestClient(main_module.app)

    response = client.get(
        "/api/v1/integration/accounts",
        headers={"X-API-Key": created["secret"]},
    )

    assert response.status_code == 401


def test_expired_key_is_rejected(integration_db):
    raw_key = "env_live_expired_test_key"
    conn = sqlite3.connect(integration_db)
    conn.execute(
        """
        INSERT INTO integration_api_keys
          (user_id, name, key_prefix, key_hash, scopes, status, expires_at)
        VALUES (1, 'Expired key', 'env_live_expired', ?, ?, 'active', '2020-01-01T00:00:00+00:00')
        """,
        (
            hashlib.sha256(raw_key.encode("utf-8")).hexdigest(),
            json.dumps(["accounts:read"]),
        ),
    )
    conn.commit()
    conn.close()
    client = TestClient(main_module.app)

    response = client.get(
        "/api/v1/integration/accounts",
        headers={"X-API-Key": raw_key},
    )

    assert response.status_code == 401
    assert "expired" in response.json()["detail"].lower()


def test_key_scope_is_enforced(integration_db):
    created = main_module.create_profile_api_key(
        main_module.IntegrationApiKeyCreatePayload(name="Accounts only", scopes=["accounts:read"]),
        _owner(),
    )
    client = TestClient(main_module.app)

    response = client.get(
        "/api/v1/integration/wallet-transactions",
        headers={"X-API-Key": created["secret"]},
    )

    assert response.status_code == 403
    assert "finance:read" in response.json()["detail"]


def test_filtered_openapi_contains_only_integration_v1_paths(integration_db):
    client = TestClient(main_module.app)

    response = client.get("/api/v1/integration/openapi.json")

    assert response.status_code == 200
    schema = response.json()
    assert schema["info"]["title"] == "Envidicy Integration API"
    assert "/api/v1/integration/accounts" in schema["paths"]
    assert "/profile/api-keys" not in schema["paths"]
    assert all(path.startswith("/api/v1/integration/") for path in schema["paths"])
