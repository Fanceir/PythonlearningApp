from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from datetime import timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from ..db import prisma
from ..core.security import create_access_token
from ..core.config import settings
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# Define models for user registration, login, and profile update
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    fullName: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserUpdate(BaseModel):
    fullName: str
    email: EmailStr


from pydantic import BaseModel, EmailStr


class UserUpdate(BaseModel):
    fullName: str
    email: EmailStr


class UserUpdate(BaseModel):
    fullName: Optional[str] = None
    email: Optional[EmailStr] = None
    current_password: Optional[str] = Field(None, min_length=8)
    new_password: Optional[str] = Field(None, min_length=8)


# Helper function to get the current user from the token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
        user = await prisma.user.find_unique(where={"username": username})
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# Register new user
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)

    # Check if the username or email already exists
    existing_user = await prisma.user.find_first(
        where={"OR": [{"username": user.username}, {"email": user.email}]}
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )

    # Create a new user
    new_user = await prisma.user.create(
        data={
            "username": user.username,
            "hashed_password": hashed_password,
            "email": user.email,
            "fullName": user.fullName,
        }
    )
    return {"msg": "User created successfully", "user_id": new_user.id}


# User login
@router.post("/login")
async def login(user: UserLogin):
    db_user = await prisma.user.find_unique(where={"username": user.username})
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Update user profile
# Get current user profile
# Get current user profile
@router.get("/me", status_code=status.HTTP_200_OK)
async def get_profile(current_user=Depends(get_current_user)):
    return {
        "username": current_user.username,
        "fullName": current_user.fullName,
        "email": current_user.email,
    }


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
        user = await prisma.user.find_unique(where={"username": username})
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# Update user profile
@router.put("/me", status_code=status.HTTP_200_OK)
async def update_profile(
    user_update: UserUpdate, current_user=Depends(get_current_user)
):
    # Update the user in the database
    updated_user = await prisma.user.update(
        where={"id": current_user.id},
        data={
            "fullName": user_update.fullName,
            "email": user_update.email,
        },
    )
    return {"msg": "Profile updated successfully", "user": updated_user}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Helper function to get the current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
        user = await prisma.user.find_unique(where={"username": username})
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# Update user profile and/or password
@router.put("/me", status_code=status.HTTP_200_OK)
async def update_profile(
    user_update: UserUpdate, current_user=Depends(get_current_user)
):
    update_data = {}

    # Update full name and email if provided
    if user_update.fullName:
        update_data["fullName"] = user_update.fullName
    if user_update.email:
        update_data["email"] = user_update.email

    # Update password if current_password and new_password are provided
    if user_update.current_password and user_update.new_password:
        # Verify the current password
        if not pwd_context.verify(
            user_update.current_password, current_user.hashed_password
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect",
            )
        # Hash the new password and add it to the update data
        update_data["hashed_password"] = pwd_context.hash(user_update.new_password)

    # Ensure there is data to update
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data provided for update",
        )

    # Update the user in the database
    updated_user = await prisma.user.update(
        where={"id": current_user.id}, data=update_data
    )
    return {"msg": "Profile updated successfully", "user": updated_user}
