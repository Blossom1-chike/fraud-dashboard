from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.core.security import (
    verify_password,
    create_access_token
)

from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest, TokenResponse

class AuthService:
    def __init__(self, db: Session):
        self.db = db

        self.user_repository = UserRepository(db)

    def login(self, request: LoginRequest) -> TokenResponse:

        user = self.user_repository.get_user_by_email(request.email)

        # checks if user exists first
        if not user:
            raise HTTPException (
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
                
        # compare plain text password with hashed password to verify user
        if not verify_password(request.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # create the info to be embeded inside the JWT
        token = create_access_token(
            data = {
                "sub": str(user.id),
                "role": user.role.name
            }
        )

        # return the token in a consistent response format
        return TokenResponse(
            access_token=token,
            token_type="bearer"
        )


