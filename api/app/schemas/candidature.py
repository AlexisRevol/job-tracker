from datetime import date
from typing import Optional

from pydantic import BaseModel


class CandidatureBase(BaseModel):
    """
    Schéma de base représentant les données d'une candidature, sans ID.
    """

    entreprise: str
    poste: str
    date_candidature: date
    statut: str
    commentaire: Optional[str] = None


class CandidatureCreate(CandidatureBase):
    """
    Schéma utilisé pour créer une nouvelle candidature.
    Hérite de tous les champs de CandidatureBase.
    """

    pass


class Candidature(CandidatureBase):
    """
    Schéma utilisé pour renvoyer une candidature avec son ID.

    Attributs:
        id (int): Identifiant unique de la candidature.
    """

    id: int

    class Config:
        from_attributes = True
