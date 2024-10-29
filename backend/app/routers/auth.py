from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from ..db import prisma
from ..core.security import create_access_token
from datetime import timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# 定义用户注册模型
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    fullName: str


# 定义用户登录模型
class UserLogin(BaseModel):
    username: str
    password: str


@router.post("/register")
async def register(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)

    # 检查用户名或邮箱是否已存在
    existing_user = await prisma.user.find_first(
        where={"OR": [{"username": user.username}, {"email": user.email}]}
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )

    # 创建新用户
    new_user = await prisma.user.create(
        data={
            "username": user.username,
            "hashed_password": hashed_password,
            "email": user.email,
            "fullName": user.fullName,
        }
    )
    return {"msg": "User created successfully", "user_id": new_user.id}


@router.post("/login")
async def login(user: UserLogin):  # 使用 UserLogin 模型
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
