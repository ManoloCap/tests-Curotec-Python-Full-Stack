# app/api/redis.py

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional

redis_router = APIRouter()

class RedisResponse(BaseModel):
    status: str
    detail: Optional[str]

# Example dependency function
async def some_valid_dependency() -> str:
    return "Redis is connected successfully."

@redis_router.get("/health", response_model=RedisResponse)
async def test_redis_route(dep: str = Depends(some_valid_dependency)):
    return RedisResponse(status="ok", detail=dep)