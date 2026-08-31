from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated

from app.core.database import get_database
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth_service import AuthService
from app.models.user import User
from app.api.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

CurrentUser = Annotated[User, Depends(get_current_user)]

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_database)):
    auth_service = AuthService(db)

    return auth_service.login(request)

@router.get("/me")
def get_me(
    current_user: CurrentUser
):
    return current_user