from pydantic import BaseModel
from typing import Optional
from datetime import date

class PregnancyWellness(BaseModel):
    due_date: date
    current_week: int
    weight: float
    blood_pressure: str
    symptoms: list[str]

    class Config:
        json_schema_extra = {
            "example": {
                "due_date": "2025-01-15",
                "current_week": 14,
                "weight": 65.5,
                "blood_pressure": "110/70",
                "symptoms": ["nausea", "fatigue"]
            }
        }
