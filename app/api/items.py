from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.operations import get_items, create_item, get_items_count
from app.schemas.item import ItemResponse, ItemCreate 
from app.db.session import get_db
import math

items_router = APIRouter()

@items_router.get("/", response_model=dict)
async def read_items(
    page: int = Query(default=1, ge=1, description="Page number as a query parameter"),
    per_page: int = Query(default=10, ge=1, le=100, description="Number of items per page as a query parameter"),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * per_page
    limit = per_page
    items = get_items(db, skip=skip, limit=limit)
    total_count = get_items_count(db)

    if not items and page != 1:
        raise HTTPException(status_code=404, detail="Page not found")

    items_response = [ItemResponse.model_validate(item) for item in items]

    total_pages = math.ceil(total_count / per_page)

    return {
        "items": items_response,
        "total_pages": total_pages,
        "current_page": page,
        "per_page": per_page,
        "total_count": total_count
    }

@items_router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item_endpoint(item_data: ItemCreate, db: Session = Depends(get_db)):
    item = create_item(db, item_data)
    return item
