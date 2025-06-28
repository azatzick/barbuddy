from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str


class UserCreate(UserBase):
    password: Optional[str] = None
    google_id: Optional[str] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class GoogleAuthRequest(BaseModel):
    google_token: str


# Bar schemas
class BarBase(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float


class BarCreate(BarBase):
    pass


class Bar(BarBase):
    id: int
    rating: float
    total_ratings: int
    created_at: datetime

    class Config:
        from_attributes = True


# Map and location schemas
class LocationRequest(BaseModel):
    latitude: float
    longitude: float
    radius: float = 5.0  # Default 5km radius


class BarSearchResponse(BaseModel):
    bars: List[Bar]
    total: int 