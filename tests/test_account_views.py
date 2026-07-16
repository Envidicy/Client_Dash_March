import sqlite3
from contextlib import contextmanager
from pathlib import Path

import pytest
from fastapi import HTTPException

import app.main as main_module


@pytest.fixture()
def account_views_db(tmp_path, monkeypatch):
    db_path = tmp_path / "account-views.db"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        CREATE TABLE account_saved_views (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          viewer_email TEXT NOT NULL,
          name TEXT NOT NULL,
          is_pinned INTEGER DEFAULT 0,
          is_default INTEGER DEFAULT 0,
          position INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, viewer_email, name)
        );
        CREATE TABLE account_saved_view_accounts (
          view_id INTEGER NOT NULL,
          account_id INTEGER NOT NULL,
          position INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY(view_id, account_id)
        );
        CREATE TABLE account_overview_preferences (
          user_id INTEGER NOT NULL,
          viewer_email TEXT NOT NULL,
          account_id INTEGER NOT NULL,
          is_hidden INTEGER DEFAULT 0,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY(user_id, viewer_email, account_id)
        );
        """
    )
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
    monkeypatch.setattr(
        main_module,
        "_list_accessible_accounts",
        lambda conn, current_user: [{"id": 10}, {"id": 11}, {"id": 12}],
    )
    return db_path


def _user(email="owner@example.com"):
    return {"id": 1, "email": email, "primary_email": "owner@example.com"}


def _payload(name, account_ids=None, *, pinned=False, default=False, position=0):
    return main_module.AccountSavedViewPayload(
        name=name,
        account_ids=account_ids or [],
        is_pinned=pinned,
        is_default=default,
        position=position,
    )


def test_account_view_crud_and_membership(account_views_db):
    created = main_module.create_account_view(
        _payload("Рабочие", [11, 10, 11], pinned=True),
        _user(),
    )

    assert created["id"] > 0
    assert created["views"][0]["name"] == "Рабочие"
    assert created["views"][0]["account_ids"] == [11, 10]
    assert created["views"][0]["is_pinned"] is True

    updated = main_module.update_account_view(
        created["id"],
        _payload("Основные", [12], default=True, position=4),
        _user(),
    )
    view = updated["views"][0]
    assert view["name"] == "Основные"
    assert view["account_ids"] == [12]
    assert view["is_pinned"] is True
    assert view["is_default"] is True
    assert view["position"] == 4

    deleted = main_module.delete_account_view(created["id"], _user())
    assert deleted["views"] == []
    conn = sqlite3.connect(account_views_db)
    try:
        member_count = conn.execute(
            "SELECT COUNT(*) FROM account_saved_view_accounts WHERE view_id=?",
            (created["id"],),
        ).fetchone()[0]
    finally:
        conn.close()
    assert member_count == 0


def test_account_views_are_personal_to_each_login(account_views_db):
    main_module.create_account_view(_payload("Владелец", [10]), _user())

    member = _user("manager@example.com")
    assert main_module.list_account_views(member)["views"] == []

    main_module.create_account_view(_payload("Менеджер", [11]), member)
    owner_names = [view["name"] for view in main_module.list_account_views(_user())["views"]]
    member_names = [view["name"] for view in main_module.list_account_views(member)["views"]]
    assert owner_names == ["Владелец"]
    assert member_names == ["Менеджер"]


def test_only_one_default_group_is_kept(account_views_db):
    first = main_module.create_account_view(_payload("Первая", [10], default=True), _user())
    second = main_module.create_account_view(_payload("Вторая", [11], default=True), _user())

    views = {view["id"]: view for view in second["views"]}
    assert views[first["id"]]["is_default"] is False
    assert views[second["id"]]["is_default"] is True
    assert views[second["id"]]["is_pinned"] is True


def test_sixth_pinned_group_is_rejected(account_views_db):
    for index in range(5):
        main_module.create_account_view(
            _payload(f"Группа {index + 1}", [10], pinned=True),
            _user(),
        )

    with pytest.raises(HTTPException) as error:
        main_module.create_account_view(_payload("Группа 6", [10], pinned=True), _user())

    assert error.value.status_code == 409
    assert "5 pinned" in str(error.value.detail)


def test_unavailable_account_is_rejected(account_views_db):
    with pytest.raises(HTTPException) as error:
        main_module.create_account_view(_payload("Чужой кабинет", [999]), _user())

    assert error.value.status_code == 400
    assert "999" in str(error.value.detail)


def test_hidden_accounts_are_replaced_and_scoped_by_login(account_views_db):
    saved = main_module.update_account_overview_preferences(
        main_module.AccountOverviewPreferencesPayload(hidden_account_ids=[10, 12, 10]),
        _user(),
    )
    assert saved["hidden_account_ids"] == [10, 12]
    assert main_module.list_account_views(_user("manager@example.com"))["hidden_account_ids"] == []

    replaced = main_module.update_account_overview_preferences(
        main_module.AccountOverviewPreferencesPayload(hidden_account_ids=[11]),
        _user(),
    )
    assert replaced["hidden_account_ids"] == [11]


def test_fresh_sqlite_schema_contains_account_view_tables(tmp_path):
    schema = (Path(__file__).parents[1] / "db" / "schema.sql").read_text(encoding="utf-8")
    conn = sqlite3.connect(tmp_path / "fresh-schema.db")
    try:
        conn.executescript(schema)
        tables = {
            row[0]
            for row in conn.execute(
                """
                SELECT name
                FROM sqlite_master
                WHERE type='table'
                  AND name IN (
                    'account_saved_views',
                    'account_saved_view_accounts',
                    'account_overview_preferences'
                  )
                """
            ).fetchall()
        }
    finally:
        conn.close()

    assert tables == {
        "account_saved_views",
        "account_saved_view_accounts",
        "account_overview_preferences",
    }
