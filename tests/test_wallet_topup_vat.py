import sqlite3

import pytest

from app import main as main_module


@pytest.fixture()
def topup_db():
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    conn.executescript(
        """
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          email TEXT NOT NULL
        );
        CREATE TABLE wallets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          balance DOUBLE PRECISION DEFAULT 0,
          currency TEXT DEFAULT 'KZT',
          low_threshold DOUBLE PRECISION DEFAULT 50000,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE wallet_topup_requests (
          id INTEGER PRIMARY KEY,
          user_id INTEGER NOT NULL,
          amount DOUBLE PRECISION NOT NULL,
          currency TEXT DEFAULT 'KZT',
          status TEXT DEFAULT 'requested',
          amount_kind TEXT DEFAULT 'gross',
          tax_mode TEXT DEFAULT 'without_vat',
          vat_rate DOUBLE PRECISION DEFAULT 0
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
          source_key TEXT UNIQUE,
          note TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        INSERT INTO users (id, email) VALUES (1, 'client@example.com');
        INSERT INTO wallets (user_id, balance, currency) VALUES (1, 5000, 'KZT');
        """
    )
    try:
        yield conn
    finally:
        conn.close()


def test_wallet_topup_without_vat_credits_full_amount(topup_db):
    topup_db.execute(
        """
        INSERT INTO wallet_topup_requests
          (id, user_id, amount, currency, status, tax_mode, vat_rate)
        VALUES (10, 1, 116000, 'KZT', 'requested', 'without_vat', 0)
        """
    )

    result = main_module._credit_wallet_topup_request(topup_db, 10, credited_by="telegram")

    assert result["amount"] == 116000
    assert result["vat_amount"] == 0
    assert result["balance"] == 121000
    transactions = topup_db.execute(
        "SELECT amount, type FROM wallet_transactions ORDER BY id"
    ).fetchall()
    assert [(row["amount"], row["type"]) for row in transactions] == [(116000, "wallet_topup")]


def test_wallet_topup_with_vat_records_gross_and_withholds_vat(topup_db):
    topup_db.execute(
        """
        INSERT INTO wallet_topup_requests
          (id, user_id, amount, currency, status, tax_mode, vat_rate)
        VALUES (11, 1, 116000, 'KZT', 'requested', 'with_vat', 16)
        """
    )

    result = main_module._credit_wallet_topup_request(topup_db, 11, credited_by="telegram")

    assert result["gross_amount"] == 116000
    assert result["vat_amount"] == 16000
    assert result["net_amount"] == 100000
    assert result["balance"] == 105000
    transactions = topup_db.execute(
        "SELECT amount, type, source_key FROM wallet_transactions ORDER BY id"
    ).fetchall()
    assert [(row["amount"], row["type"]) for row in transactions] == [
        (116000, "wallet_topup"),
        (-16000, "wallet_vat"),
    ]
    assert transactions[1]["source_key"] == "wallet_topup_request:11:vat"
