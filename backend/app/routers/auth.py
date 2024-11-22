from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from jose import JWTError, jwt
from datetime import timedelta
from ..db import prisma
from ..core.security import create_access_token
from ..core.config import settings
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# 用户注册模型
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    fullName: str


# 用户登录模型
class UserLogin(BaseModel):
    username: str
    password: str


# 用户更新资料模型
class UserUpdate(BaseModel):
    fullName: Optional[str] = None
    email: Optional[EmailStr] = None
    current_password: Optional[str] = Field(None)
    new_password: Optional[str] = Field(None, min_length=8)


# 获取当前用户的帮助函数
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="无效的令牌"
            )
        user = await prisma.user.find_unique(where={"username": username})
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="用户未找到"
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="无效的令牌"
        )


# 注册新用户
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)

    # 检查用户名或邮箱是否已经存在
    existing_user = await prisma.user.find_first(
        where={"OR": [{"username": user.username}, {"email": user.email}]}
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="用户名或邮箱已被注册",
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
    return {"msg": "用户注册成功", "user_id": new_user.id}


# 用户登录
@router.post("/login")
async def login(user: UserLogin):
    db_user = await prisma.user.find_unique(where={"username": user.username})
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}


# 获取当前用户资料
@router.get("/me", status_code=status.HTTP_200_OK)
async def get_profile(current_user=Depends(get_current_user)):
    return {
        "username": current_user.username,
        "fullName": current_user.fullName,
        "email": current_user.email,
    }


# 更新用户资料或密码
@router.put("/me", status_code=status.HTTP_200_OK)
async def update_profile(
    user_update: UserUpdate, current_user=Depends(get_current_user)
):
    update_data = {}

    # 如果提供了 fullName 和 email，则更新
    if user_update.fullName:
        update_data["fullName"] = user_update.fullName
    if user_update.email:
        update_data["email"] = user_update.email

    # 如果提供了 current_password 和 new_password，则更新密码
    if user_update.current_password and user_update.new_password:
        # 验证当前密码
        if not pwd_context.verify(
            user_update.current_password, current_user.hashed_password
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="当前密码错误",
            )
        # 哈希新密码并添加到更新数据中
        update_data["hashed_password"] = pwd_context.hash(user_update.new_password)

    # 检查是否有需要更新的数据
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="没有提供任何需要更新的数据",
        )

    # 更新用户信息
    updated_user = await prisma.user.update(
        where={"id": current_user.id}, data=update_data
    )
    return {"msg": "用户资料更新成功", "user": updated_user}
