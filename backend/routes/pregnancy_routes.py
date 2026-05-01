from fastapi import APIRouter, Body, Depends
from backend.models.pregnancy import PregnancyWellness
from backend.database.firestore import db
from backend.routes.cycle_routes import get_current_user

router = APIRouter()

@router.post("/log", tags=["pregnancy"])
async def log_pregnancy_wellness(data: PregnancyWellness = Body(...), user_id: str = Depends(get_current_user)):
    if not user_id:
        return {"error": "Invalid token"}
    
    db.collection("users").document(user_id).collection("pregnancy").add(data.dict())
    return {"message": "Pregnancy wellness logged"}
