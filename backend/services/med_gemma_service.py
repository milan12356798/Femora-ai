import requests
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class MedGemmaService:
    def __init__(self):
        self.endpoint = "https://api.medgamma.com/analyze"
        self.timeout = 5.0 # seconds

    def _call_api(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Base method to call the MedGamma API with error handling."""
        try:
            logger.info(f"Calling MedGamma API: {self.endpoint}")
            
            # NOTE: In a real environment, you would uncomment the following lines.
            # We are using a simulated response below because the URL is a mock.
            # response = requests.post(self.endpoint, json=payload, timeout=self.timeout)
            # response.raise_for_status()
            # return response.json()
            
            # --- Simulated MedGamma Response ---
            context_type = payload.get("user_context", {}).get("type", "chat")
            
            if context_type == "cycle_prediction":
                return {
                    "status": "success",
                    "data": {
                        "prediction": "Your next cycle is likely to start in 14 days.",
                        "confidence_score": 0.92,
                        "health_flags": ["normal_variation"]
                    }
                }
            elif context_type == "pcos_prediction":
                return {
                    "status": "success",
                    "data": {
                        "risk_level": "moderate",
                        "recommendations": ["Consult an endocrinologist", "Monitor insulin levels"],
                        "confidence_score": 0.85
                    }
                }
            else:
                return {
                    "status": "success",
                    "data": {
                        "reply": "Based on your symptoms, please ensure you are resting and staying hydrated. If symptoms persist, consult a doctor.",
                        "confidence_score": 0.95
                    }
                }
                
        except requests.exceptions.Timeout:
            logger.error("MedGamma API timeout.")
            return {"status": "error", "message": "The AI service is currently taking too long to respond. Please try again."}
        except requests.exceptions.RequestException as e:
            logger.error(f"MedGamma API request failed: {str(e)}")
            return {"status": "error", "message": "Failed to connect to the medical AI service."}
        except Exception as e:
            logger.error(f"Unexpected error in MedGamma Service: {str(e)}")
            return {"status": "error", "message": "An unexpected system error occurred."}

    async def predict_cycle(self, symptoms: List[str], cycle_length: int) -> Dict[str, Any]:
        payload = {
            "symptoms": symptoms,
            "cycle_length": cycle_length,
            "user_context": {"type": "cycle_prediction"}
        }
        return self._call_api(payload)

    async def predict_pcos(self, symptoms: List[str], user_metrics: Dict[str, Any] = None) -> Dict[str, Any]:
        payload = {
            "symptoms": symptoms,
            "cycle_length": user_metrics.get("cycle_length", 28) if user_metrics else 28,
            "user_context": {"type": "pcos_prediction", "metrics": user_metrics or {}}
        }
        return self._call_api(payload)

    async def chat(self, message: str, user_context: Dict[str, Any] = None) -> Dict[str, Any]:
        payload = {
            "symptoms": [message],
            "cycle_length": 0,
            "user_context": {"type": "chat", "history": user_context or {}}
        }
        return self._call_api(payload)

med_gemma = MedGemmaService()
