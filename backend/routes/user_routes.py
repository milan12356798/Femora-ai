from fastapi import APIRouter, Body, HTTPException
from backend.models.user import UserSchema, UserLoginSchema
from backend.database.firestore import db
from backend.auth.jwt_handler import sign_jwt
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup", tags=["user"])
async def create_user(user: UserSchema = Body(...)):
    user_ref = db.collection("users").document(user.email)
    if user_ref.get().exists:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    user_ref.set({
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_password
    })
    return sign_jwt(user.email)

@router.post("/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    user_ref = db.collection("users").document(user.email)
    user_data = user_ref.get()
    
    if not user_data.exists:
        raise HTTPException(status_code=403, detail="Invalid login details")
    
    stored_password = user_data.to_dict()["password"]
    if not pwd_context.verify(user.password, stored_password):
        raise HTTPException(status_code=403, detail="Invalid login details")
    
    return sign_jwt(user.email)
