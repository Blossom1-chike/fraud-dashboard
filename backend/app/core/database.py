from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.core.config import settings

engine = create_engine( # creates the connection between FastAPI and PostgreSQL
    settings.DATABASE_URL 
)

SessionLocal = sessionmaker( # the conversation with the database
    autocommit=False,
    autoflush=False,
    bind=engine
)

class Base(DeclarativeBase): # every model inherits from this
    pass

def get_database(): # reusable databse connection for all API endpoints
    db = SessionLocal()

    try:
        yield db
    
    finally: 
        db.close()