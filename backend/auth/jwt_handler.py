import jwt
from datetime import datetime, timedelta
from typing import Dict
import os

JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-key-for-femora-ai")
JWT_ALGORITHM = "HS256"

def sign_jwt(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": (datetime.utcnow() + timedelta(days=7)).timestamp()
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"access_token": token}

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= datetime.utcnow().timestamp() else None
    except:
        return None
