from typing import Optional
from datetime import date
from pydantic import BaseModel

class Candidature(BaseModel):
    id: Optional[int] = None
    entreprise: str
    poste: str
    date_candidature: date
    statut: str = "envoyée"
    commentaire: Optional[str] = None
