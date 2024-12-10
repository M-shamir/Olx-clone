from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from schemas import UserCreate,UserOut,LoginRequest
from models import User
from utils import hash_password


app = FastAPI()

Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

        return {"message": "Login successful", "user": existing_user.username}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during login: {str(e)}")


