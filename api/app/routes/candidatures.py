from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import candidatures as crud
from app.database import get_db
from app.schemas.candidature import Candidature, CandidatureCreate, CandidatureCreateBis

router = APIRouter()


@router.get("/", response_model=list[Candidature])
def read_candidatures(db: Session = Depends(get_db)) -> list[Candidature]:
    """
    Récupère la liste de toutes les candidatures.

    Args:
        db (Session): Session de base de données injectée via Depends.

    Returns:
        list[Candidature]: Liste des candidatures enregistrées.
    """
    return crud.get_candidatures(db)


@router.post("/", response_model=Candidature)
def add_candidature(
    candidature: CandidatureCreate, db: Session = Depends(get_db)
) -> Candidature:
    """
    Crée une nouvelle candidature à partir des données reçues.

    Args:
        candidature (CandidatureCreate): Données de la nouvelle candidature.
        db (Session): Session de base de données injectée.

    Returns:
        Candidature: La candidature créée avec son ID attribué.
    """
    fake_user_id = 1  # 🔥 simulé pour l'instant
    candidature_dict = candidature.model_dump()
    candidature_dict["user_id"] = fake_user_id
    return crud.create_candidature(db, CandidatureCreateBis(**candidature_dict))
