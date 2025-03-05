from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.operations import init_db
from app.api.router import include_app_router

#Create FastAPI App
app = FastAPI()
#Init DB
init_db()

app = include_app_router(app)


origins = [
    "http://localhost:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3005)