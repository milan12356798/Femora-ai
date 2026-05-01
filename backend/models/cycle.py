from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class CycleLog(BaseModel):
    start_date: date
    end_date: Optional[date] = None
    symptoms: List[str] = []
    mood: str
    flow: str # Light, Medium, Heavy

    class Config:
        json_schema_extra = {
            "example": {
                "start_date": "2024-05-01",
                "end_date": "2024-05-05",
                "symptoms": ["cramps", "bloating"],
                "mood": "happy",
                "flow": "Medium"
            }
        }
