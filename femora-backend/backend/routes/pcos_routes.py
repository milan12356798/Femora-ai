from fastapi import APIRouter, Body, Depends
from backend.models.pcos import PCOSLog
from backend.database.firestore import db
from backend.routes.cycle_routes import get_current_user

router = APIRouter()

@router.post("/log", tags=["pcos"])
async def log_pcos_wellness(data: PCOSLog = Body(...), user_id: str = Depends(get_current_user)):
    if not user_id:
        return {"error": "Invalid token"}
    
    db.collection("users").document(user_id).collection("pcos").add(data.dict())
    return {"message": "PCOS wellness logged"}
