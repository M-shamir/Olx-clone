import jwt
import os
import datetime
from fastapi import HTTPException
from typing import Optional

# Use a static secret key. Store this securely in environment variables in production.
SECRET_KEY = os.getenv("SECRET_KEY", "default-key-for-local-testing")  
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None) -> str:
    """
    Create a JWT access token.
    
    :param data: The payload to encode into the token.
    :param expires_delta: An optional timedelta for token expiry. Default is 1 hour.
    :return: Encoded JWT token as a string.
    """
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(hours=1))
    to_encode.update({"exp": expire})
    try:
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except Exception as e:
        raise RuntimeError(f"Error creating token: {str(e)}")

def decode_access_token(token: str) -> dict:
    """
    Decode a JWT access token and validate it.
    
    :param token: The JWT token to decode.
    :return: Decoded payload as a dictionary.
    :raises HTTPException: If the token is expired or invalid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
