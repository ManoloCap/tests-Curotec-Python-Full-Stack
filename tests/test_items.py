# tests/test_items.py

import pytest
from fastapi.testclient import TestClient
from app.main import app  # Ensure this imports your FastAPI app correctly

client = TestClient(app)

def test_read_items():
    # Use the TestClient to create a synchronous HTTP request
    response = client.get("/items", params={"page": 1, "per_page": 10})

    # Check that the status code is 200 (OK)
    assert response.status_code == 200
    # Parse JSON response
    json_response = response.json()
    # Check response keys
    assert "items" in json_response
    assert "total_pages" in json_response
    assert "current_page" in json_response
    assert "per_page" in json_response
    assert "total_count" in json_response