from typing import List

from sqlalchemy.orm import Session

from app.models.candidature import Candidature as DBCandidature
from app.schemas.candidature import CandidatureCreate


def get_candidatures_for_user(db: Session, user_id: int) -> List[DBCandidature]:
    return db.query(DBCandidature).filter(DBCandidature.user_id == user_id).all()


def create_candidature_for_user(
    db: Session, candidature: CandidatureCreate, user_id: int
) -> DBCandidature:
    data = candidature.model_dump()
    data["user_id"] = user_id
    db_candidature = DBCandidature(**data)
    db.add(db_candidature)
    db.commit()
    db.refresh(db_candidature)
    return db_candidature
