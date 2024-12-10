from pydantic import BaseModel,EmailStr,constr

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

