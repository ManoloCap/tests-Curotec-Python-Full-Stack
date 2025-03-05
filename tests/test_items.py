from typing import Dict, List
from fastapi.testclient import TestClient
from app.main import app  # Ensure this imports your FastAPI app correctly

client = TestClient(app)

def test_read_items_correct_page():
    # Use the TestClient to create a synchronous HTTP request
    test_params = {"page": 1, "per_page": 10}
    response = client.get("/items", params=test_params)

    # Check that the status code is 200 (OK)
    assert response.status_code == 200
    # Parse JSON response
    json_response = response.json()
    # Check response keys
    keys_to_check = [
        "items",
        "total_pages",
        "current_page",
        "per_page",
        "total_count"
    ]
    check_response_keys(json_response, keys_to_check)
    assert json_response["current_page"] == test_params["page"]
    assert json_response["per_page"] == test_params["per_page"]
    assert json_response["total_count"] <= json_response["total_pages"] * json_response["per_page"]
    assert json_response["total_pages"] * json_response["per_page"] >= json_response["total_count"] 
    

def check_response_keys(json_response: Dict, list_of_keys: List[str]):
    for key in list_of_keys:
        assert key in json_response