from pydantic import BaseModel
from typing import List

class PCOSLog(BaseModel):
    irregular_cycles: bool
    acne_severity: int # 1-10
    hair_thinning: bool
    mood_swings: bool
    weight_fluctuation: float

    class Config:
        json_schema_extra = {
            "example": {
                "irregular_cycles": True,
                "acne_severity": 7,
                "hair_thinning": False,
                "mood_swings": True,
                "weight_fluctuation": +1.5
            }
        }
