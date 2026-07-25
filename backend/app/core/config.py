from pathlib import Path

from pydantic_settings import BaseSettings

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    APP_NAME : str
    APP_VERSION : str
    DATABASE_URL : str
    JWT_SECRET_KEY : str
    JWT_ALGORITHM : str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES : int = 60

    class Config:
        env_file = BACKEND_DIR / ".env"

settings = Settings()  # type: ignore[call-arg]