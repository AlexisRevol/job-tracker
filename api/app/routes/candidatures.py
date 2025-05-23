from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import candidatures as crud
from app.database import get_db
from app.models.user import User as DBUser
from app.schemas.candidature import Candidature, CandidatureCreate
from app.security.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=list[Candidature])
def read_candidatures(
    db: Session = Depends(get_db), current_user: DBUser = Depends(get_current_user)
) -> list[Candidature]:
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
    candidature: CandidatureCreate,
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user),
) -> Candidature:
    """
    Crée une nouvelle candidature à partir des données reçues.

    Args:
        candidature (CandidatureCreate): Données de la nouvelle candidature.
        db (Session): Session de base de données injectée.

    Returns:
        Candidature: La candidature créée avec son ID attribué.
    """
    return crud.create_candidature_for_user(db, candidature, current_user.id)
