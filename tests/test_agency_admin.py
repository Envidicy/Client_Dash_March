import sqlite3
from contextlib import contextmanager

import pytest
from fastapi import HTTPException

import app.main as main_module


@pytest.fixture()
def agency_db(tmp_path, monkeypatch):
    db_path = tmp_path / "agency-admin.db"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        CREATE TABLE agencies (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL
        );
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          email TEXT NOT NULL
        );
        CREATE TABLE agency_clients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          agency_id INTEGER NOT NULL,
          client_user_id INTEGER NOT NULL,
          status TEXT DEFAULT 'active',
          default_rebate_percent DOUBLE PRECISION DEFAULT 3,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(agency_id, client_user_id)
        );
        CREATE TABLE agency_wallets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          agency_id INTEGER NOT NULL UNIQUE,
          balance DOUBLE PRECISION DEFAULT 0,
          currency TEXT DEFAULT 'KZT',
          low_threshold DOUBLE PRECISION DEFAULT 50000,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE agency_wallet_transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          agency_id INTEGER NOT NULL,
          client_user_id INTEGER,
          account_id INTEGER,
          amount DOUBLE PRECISION NOT NULL,
          currency TEXT DEFAULT 'KZT',
          type TEXT NOT NULL,
          source_type TEXT,
          source_id INTEGER,
          source_key TEXT UNIQUE,
          note TEXT,
          created_by TEXT,
          initiated_by_user_id INTEGER,
          acting_as_user_id INTEGER,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.execute("INSERT INTO agencies (id, name) VALUES (1, 'Test Agency')")
    conn.execute("INSERT INTO users (id, email) VALUES (10, 'client@example.com')")
    conn.execute(
        "INSERT INTO agency_clients (agency_id, client_user_id, status) VALUES (1, 10, 'active')"
    )
    conn.execute(
        "INSERT INTO agency_wallets (agency_id, balance, currency) VALUES (1, 1000, 'KZT')"
    )
    conn.execute(
        """
        INSERT INTO agency_wallet_transactions
          (agency_id, amount, currency, type, source_type, source_id, source_key)
        VALUES (1, 1000, 'KZT', 'rebate_accrual', 'topup_rebate', 101, 'topup_rebate:101')
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
    return db_path


def _read_one(db_path, query, params=()):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        return conn.execute(query, params).fetchone()
    finally:
        conn.close()


def test_rebate_payout_deducts_wallet_and_records_dedicated_transaction(agency_db):
    result = main_module.admin_pay_agency_rebate(
        1,
        main_module.AgencyRebatePayoutPayload(amount=400, currency="KZT", note="Bank transfer 42"),
        {"email": "admin@envidicy.kz"},
    )

    assert result["amount"] == 400
    assert result["balance"] == 600
    assert result["rebate_available"] == 600
    wallet = _read_one(agency_db, "SELECT balance FROM agency_wallets WHERE agency_id=1")
    payout = _read_one(
        agency_db,
        "SELECT amount, type, note, created_by FROM agency_wallet_transactions WHERE type='rebate_payout'",
    )
    assert wallet["balance"] == 600
    assert payout["amount"] == -400
    assert payout["type"] == "rebate_payout"
    assert payout["note"] == "Bank transfer 42"
    assert payout["created_by"] == "admin@envidicy.kz"


def test_rebate_payout_cannot_exceed_unpaid_accrued_rebate(agency_db):
    conn = sqlite3.connect(agency_db)
    conn.execute("UPDATE agency_wallets SET balance=1500 WHERE agency_id=1")
    conn.execute(
        """
        INSERT INTO agency_wallet_transactions (agency_id, amount, currency, type, note)
        VALUES (1, 500, 'KZT', 'deposit', 'Extra operating funds')
        """
    )
    conn.commit()
    conn.close()

    with pytest.raises(HTTPException) as exc:
        main_module.admin_pay_agency_rebate(
            1,
            main_module.AgencyRebatePayoutPayload(amount=1200, currency="KZT"),
            {"email": "admin@envidicy.kz"},
        )

    assert exc.value.status_code == 400
    assert "Available: 1000.00 KZT" in exc.value.detail
    wallet = _read_one(agency_db, "SELECT balance FROM agency_wallets WHERE agency_id=1")
    assert wallet["balance"] == 1500


def test_detach_agency_client_marks_relation_inactive_and_is_idempotent(agency_db):
    first = main_module.admin_detach_agency_client(1, 10, {"email": "admin@envidicy.kz"})
    second = main_module.admin_detach_agency_client(1, 10, {"email": "admin@envidicy.kz"})

    assert first["relation_status"] == "inactive"
    assert second["relation_status"] == "inactive"
    relation = _read_one(
        agency_db,
        "SELECT status FROM agency_clients WHERE agency_id=1 AND client_user_id=10",
    )
    assert relation["status"] == "inactive"
