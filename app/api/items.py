from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.operations import get_items
from app.schemas.item import ItemResponse
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=list[ItemResponse])
async def read_items(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1, le=100), db: Session = Depends(get_db)):
    items = get_items(db, skip=skip, limit=limit)
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")
    return items