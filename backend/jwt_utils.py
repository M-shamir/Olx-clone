import jwt
import datetime
from fastapi import HTTPException
from typing import Optional

# Use a static secret key. Store this securely in environment variables in production.
SECRET_KEY = "Key"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None) -> str:

    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(hours=1))
    to_encode.update({"exp": expire})
    try:
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except Exception as e:
        raise RuntimeError(f"Error creating token: {str(e)}")

def decode_access_token(token: str) -> dict:

    try:
   
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        print("one")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print("two")
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
