from fastapi import FastAPI;
from app.core.config import settings
from app.core.database import engine, Base

from app.api import auth

from app.models import User

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title= settings.APP_NAME,
    version= settings.APP_VERSION,
    description="Backend API for FraudShield AI."
)

app.include_router(
    auth.router
)

@app.get("/")
def health_check():
    return {
        "status": "running"
    }