from pydantic import BaseModel
from typing import Optional
class NewMeasureDAO(BaseModel):
    patientId: int
    timestamp: int
    glucoseMgPerDl: float