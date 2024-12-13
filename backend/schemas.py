from pydantic import BaseModel,EmailStr,constr
from typing import Optional

class UserBase(BaseModel):
    username:str
    email:EmailStr

class UserCreate(UserBase):
    password:constr(min_length=8)

class UserOut(UserBase):
    id:int
    is_active:bool
    is_verified:bool

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str

class SellCreate(BaseModel):
    brand: str
    year: int
    fuel: str
    transmission: str
    kilometer_driven: int
    no_of_owners: int
    title: str
    description: str
    price: float
    location: str

class SellOut(BaseModel):
    id: int
    user_id: int
    brand: str
    year: int
    fuel: str
    transmission: str
    kilometer_driven: int
    no_of_owners: int
    title: str
    description: str
    price: float
    location: str

    class Config:
        from_attributes = True


