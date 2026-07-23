import sqlite3
from contextlib import contextmanager

import pytest
from fastapi.testclient import TestClient

from app import main as main_module


@pytest.fixture()
def phone_verification_db(tmp_path, monkeypatch):
    db_path = tmp_path / "phone-verification.db"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE
        );
        CREATE TABLE user_profiles (
          user_id INTEGER PRIMARY KEY,
          whatsapp_phone TEXT
        );
        CREATE TABLE phone_verifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone TEXT NOT NULL UNIQUE,
          code_hash TEXT NOT NULL,
          expires_at TEXT NOT NULL,
          attempts INTEGER DEFAULT 0,
          verified_at TEXT,
          verification_token_hash TEXT,
          consumed_at TEXT,
          last_sent_at TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.close()

    @contextmanager
    def fake_get_conn():
        connection = sqlite3.connect(db_path)
        connection.row_factory = sqlite3.Row
        try:
            yield connection
        finally:
            connection.close()

    sent = {}

    def fake_send(phone, code):
        sent["phone"] = phone
        sent["code"] = code

    monkeypatch.setattr(main_module, "get_conn", fake_get_conn)
    monkeypatch.setattr(main_module, "_send_whatsapp_verification_code", fake_send)
    monkeypatch.setenv("WHATSAPP_VERIFICATION_SECRET", "test-verification-secret")
    return db_path, sent


def test_phone_verification_send_and_confirm(phone_verification_db):
    db_path, sent = phone_verification_db
    client = TestClient(main_module.app)

    send_response = client.post(
        "/auth/phone-verification/send",
        json={"phone": "+7 700 123 45 67"},
    )
    assert send_response.status_code == 200
    assert sent["phone"] == "+77001234567"
    assert len(sent["code"]) == 6

    conn = sqlite3.connect(db_path)
    stored_hash = conn.execute(
        "SELECT code_hash FROM phone_verifications WHERE phone=?",
        ("+77001234567",),
    ).fetchone()[0]
    conn.close()
    assert stored_hash != sent["code"]

    confirm_response = client.post(
        "/auth/phone-verification/confirm",
        json={"phone": "+7 700 123 45 67", "code": sent["code"]},
    )
    assert confirm_response.status_code == 200
    body = confirm_response.json()
    assert body["status"] == "verified"
    assert len(body["verification_token"]) >= 32


def test_phone_verification_rejects_wrong_code(phone_verification_db):
    _, sent = phone_verification_db
    client = TestClient(main_module.app)
    assert client.post(
        "/auth/phone-verification/send",
        json={"phone": "+7 701 765 43 21"},
    ).status_code == 200

    response = client.post(
        "/auth/phone-verification/confirm",
        json={"phone": sent["phone"], "code": "000000" if sent["code"] != "000000" else "111111"},
    )
    assert response.status_code == 400
    assert "Attempts remaining" in response.json()["detail"]
