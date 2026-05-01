from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from backend.services.med_gemma_service import med_gemma

router = APIRouter()

# Input Schemas
class CyclePredictionRequest(BaseModel):
    symptoms: List[str]
    cycle_length: int

class PCOSPredictionRequest(BaseModel):
    symptoms: List[str]
    user_metrics: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []
    userData: Optional[Dict[str, Any]] = None

@router.post("/predict-cycle", tags=["AI Integration"])
async def predict_cycle(data: CyclePredictionRequest = Body(...)):
    response = await med_gemma.predict_cycle(data.symptoms, data.cycle_length)
    if response.get("status") == "error":
        raise HTTPException(status_code=503, detail=response["message"])
    return response

@router.post("/predict-pcos", tags=["AI Integration"])
async def predict_pcos(data: PCOSPredictionRequest = Body(...)):
    response = await med_gemma.predict_pcos(data.symptoms, data.user_metrics)
    if response.get("status") == "error":
        raise HTTPException(status_code=503, detail=response["message"])
    return response

@router.post("/chat", tags=["AI Integration"])
async def chat_with_ai(data: ChatRequest = Body(...)):
    # Standard endpoint for the production-ready chatbot
    response = await med_gemma.chat(data.message, data.history, data.userData)
    if response.get("status") == "error":
        # Return the specific error message requested by the user
        return {
            "status": "success", # Return success to avoid frontend crash, but with error message in reply
            "data": {
                "reply": response["message"],
                "suggestions": ["Try again", "Refresh page"]
            }
        }
    return response
