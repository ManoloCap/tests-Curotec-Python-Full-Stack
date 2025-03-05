from fastapi import FastAPI
from app.api.items import items_router
from app.api.redis import redis_router
def include_app_router(app: FastAPI):
    """ Registers the items router with the FastAPI application """
    
    #Items Router
    app.include_router(
        items_router,
        prefix="/items",
        tags=["items"]
    )
    
    #Items Router
    app.include_router(
        redis_router,
        prefix="/redis",
        tags=["redis"]
    )
    
    return app