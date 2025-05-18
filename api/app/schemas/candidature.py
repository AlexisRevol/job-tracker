from pydantic import BaseModel
from typing import Optional
from datetime import date

class CandidatureBase(BaseModel):
    entreprise: str
    poste: str
    date_candidature: date
    statut: str = "envoyée"
    commentaire: Optional[str] = None

class CandidatureCreate(CandidatureBase):
    pass

class Candidature(CandidatureBase):
    id: int

    class Config:
        orm_mode = True
