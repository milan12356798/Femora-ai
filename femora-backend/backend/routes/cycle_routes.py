from fastapi import APIRouter, Depends, Body
from backend.models.cycle import CycleLog
from backend.database.firestore import db
from backend.auth.jwt_handler import decode_jwt
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_jwt(token)
    if not payload:
        return None
    return payload["user_id"]

@router.post("/log", tags=["cycle"])
async def log_cycle(cycle_data: CycleLog = Body(...), user_id: str = Depends(get_current_user)):
    if not user_id:
        return {"error": "Invalid token"}
    
    db.collection("users").document(user_id).collection("cycles").add(cycle_data.dict())
    return {"message": "Cycle logged successfully"}

@router.get("/history", tags=["cycle"])
async def get_cycle_history(user_id: str = Depends(get_current_user)):
    if not user_id:
        return {"error": "Invalid token"}
    
    docs = db.collection("users").document(user_id).collection("cycles").stream()
    history = [doc.to_dict() for doc in docs]
    return {"history": history}
