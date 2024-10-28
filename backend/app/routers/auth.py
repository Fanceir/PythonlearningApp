# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from pydantic import BaseModel
from ..db import prisma
from ..core.security import create_access_token
from datetime import timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCreate(BaseModel):
    username: str
    password: str


@router.post("/register")
async def register(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    new_user = await prisma.user.create(
        data={"username": user.username, "hashed_password": hashed_password}
    )
    return {"msg": "User created successfully", "user_id": new_user.id}


@router.post("/login")
async def login(user: UserCreate):
    db_user = await prisma.user.find_unique(where={"username": user.username})
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}
