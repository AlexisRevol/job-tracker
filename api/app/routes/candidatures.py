from typing import Generator

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import candidature as crud
from app.database import SessionLocal
from app.schemas.candidature import Candidature, CandidatureCreate

router = APIRouter()


def get_db() -> Generator[Session, None, None]:
    """
    Fournit une session de base de données pour la durée d'une requête.

    Yields:
        Generator[Session, None, None]: Une session SQLAlchemy active.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
    return crud.create_candidature(db, candidature)
