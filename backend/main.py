from fastapi import FastAPI, Depends, HTTPException,UploadFile,File
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from schemas import UserCreate,UserOut,LoginRequest,SellCreate,SellOut
from models import User,Sell
from utils import hash_password
from typing import Optional
from sqlalchemy.orm import Session
from mimetypes import guess_extension
from database import SessionLocal
from jwt_utils import create_access_token, decode_access_token  # Import JWT functions
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import ExpiredSignatureError, PyJWTError
import shutil
import os
from pathlib import Path
from fastapi.staticfiles import StaticFiles





app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

Base.metadata.create_all(bind=engine)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

origins = [
    "http://localhost",
    "http://localhost:5176",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify the frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

ALLOWED_EXTENSIONS = ["image/jpeg", "image/png"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        if not token:
            raise HTTPException(
                status_code=401,
                detail="No token provided",
            )
        
        # Decode the token using the decode_access_token function
        payload = decode_access_token(token)
        user_email: str = payload.get("sub")  # Get email from the token payload
        if user_email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token: User email missing",
            )
        
        # Query user by email
        user = db.query(User).filter(User.email == user_email).first()
        if user is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication credentials",
            )
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")


def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

@app.post("/signup/", response_model=UserOut)
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    try:
        
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        
        hashed_password = hash_password(user.password)

        
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            is_active=True,  
            is_verified=False  
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during sign-up: {str(e)}")


@app.post("/login/")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if not existing_user:
            raise HTTPException(status_code=400, detail="Invalid credentials")

        if not verify_password(user.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid credentials")


        access_token = create_access_token(data={'sub':existing_user.email})
        return {"message": "Login successful", "user": existing_user.username,"token":access_token,"token_type": "bearer"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during login: {str(e)}")


@app.post("/products/", response_model=SellOut)
def create_product(
    product: SellCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        # Create a new Sell entry
        db_product = Sell(
            user_id=current_user.id,
            brand=product.brand,
            year=product.year,
            fuel=product.fuel,
            transmission=product.transmission,
            kilometer_driven=product.kilometer_driven,
            no_of_owners=product.no_of_owners,
            title=product.title,
            description=product.description,
            price=product.price,
            location=product.location,
        )

        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        return db_product

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while creating the product: {str(e)}",
        )

