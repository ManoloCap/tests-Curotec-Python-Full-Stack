from fastapi import FastAPI
from app.db.operations import init_db
from app.api.router import include_app_router

#Create FastAPI App
app = FastAPI()
#Init DB
init_db()

app = include_app_router(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3005)