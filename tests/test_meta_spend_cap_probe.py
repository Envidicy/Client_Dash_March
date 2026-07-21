import json

import pytest
from fastapi import HTTPException

import app.main as main_module


class FakeResponse:
    def __init__(self, status_code, payload):
        self.status_code = status_code
        self._payload = payload

    def json(self):
        return self._payload


def test_meta_spend_cap_probe_writes_same_value_and_confirms(monkeypatch):
    token = "secret-meta-token"
    monkeypatch.setenv("META_ACCESS_TOKEN", token)
    monkeypatch.setenv("META_GRAPH_API_VERSION", "v24.0")

    account_reads = iter(
        [
            FakeResponse(
                200,
                {
                    "id": "act_123",
                    "name": "Test account",
                    "account_id": "123",
                    "spend_cap": "250000",
                    "currency": "USD",
                    "account_status": 1,
                },
            ),
            FakeResponse(
                200,
                {
                    "id": "act_123",
                    "name": "Test account",
                    "account_id": "123",
                    "spend_cap": "250000",
                    "currency": "USD",
                    "account_status": 1,
                },
            ),
        ]
    )

    def fake_get(url, params, timeout):
        assert params["access_token"] == token
        assert timeout == 20
        if url.endswith("/me/permissions"):
            return FakeResponse(200, {"data": [{"permission": "ads_management", "status": "granted"}]})
        assert url == "https://graph.facebook.com/v24.0/act_123"
        return next(account_reads)

    def fake_post(url, data, timeout):
        assert url == "https://graph.facebook.com/v24.0/act_123"
        assert data == {"access_token": token, "spend_cap": "250000"}
        assert timeout == 20
        return FakeResponse(200, {"success": True})

    monkeypatch.setattr(main_module.httpx, "get", fake_get)
    monkeypatch.setattr(main_module.httpx, "post", fake_post)

    result = main_module._meta_probe_spend_cap_write("act_123")

    assert result["write_access_confirmed"] is True
    assert result["safe_noop"] is True
    assert result["spend_cap_raw_before"] == "250000"
    assert result["spend_cap_raw_after"] == "250000"
    assert result["permissions"] == [{"permission": "ads_management", "status": "granted"}]
    assert token not in json.dumps(result)


def test_meta_spend_cap_probe_returns_sanitized_meta_error(monkeypatch):
    token = "secret-meta-token"
    monkeypatch.setenv("META_ACCESS_TOKEN", token)

    def fake_get(url, params, timeout):
        if url.endswith("/me/permissions"):
            return FakeResponse(200, {"data": []})
        return FakeResponse(200, {"spend_cap": "250000"})

    def fake_post(url, data, timeout):
        return FakeResponse(
            403,
            {"error": {"message": "Permissions error", "code": 200, "error_subcode": 18157520}},
        )

    monkeypatch.setattr(main_module.httpx, "get", fake_get)
    monkeypatch.setattr(main_module.httpx, "post", fake_post)

    with pytest.raises(HTTPException) as exc_info:
        main_module._meta_probe_spend_cap_write("123")

    assert exc_info.value.status_code == 502
    assert "Permissions error (code 200, subcode 18157520)" in exc_info.value.detail
    assert token not in exc_info.value.detail


def test_meta_spend_cap_probe_skips_write_without_current_cap(monkeypatch):
    monkeypatch.setenv("META_ACCESS_TOKEN", "secret-meta-token")
    monkeypatch.setattr(
        main_module.httpx,
        "get",
        lambda *args, **kwargs: FakeResponse(200, {"id": "act_123", "currency": "USD"}),
    )

    def unexpected_post(*args, **kwargs):
        raise AssertionError("The probe must not write when the current cap is unavailable")

    monkeypatch.setattr(main_module.httpx, "post", unexpected_post)

    with pytest.raises(HTTPException) as exc_info:
        main_module._meta_probe_spend_cap_write("123")

    assert exc_info.value.status_code == 409
    assert "safe no-op write was skipped" in exc_info.value.detail
