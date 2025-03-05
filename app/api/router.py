from fastapi import FastAPI
from app.api.items import router

def include_app_router(app: FastAPI):
    """ Registers the items router with the FastAPI application """
    app.include_router(
        router,
        prefix="/items",
        tags=["items"]
    )
    
    return app