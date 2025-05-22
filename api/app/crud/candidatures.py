from typing import List

from sqlalchemy.orm import Session

from app.models.candidature import Candidature as DBCandidature
from app.schemas.candidature import CandidatureCreate


def get_candidatures(db: Session) -> List[DBCandidature]:
    return db.query(DBCandidature).all()


def create_candidature(db: Session, candidature: CandidatureCreate) -> DBCandidature:
    db_candidature = DBCandidature(**candidature.dict())
    db.add(db_candidature)
    db.commit()
    db.refresh(db_candidature)
    return db_candidature
