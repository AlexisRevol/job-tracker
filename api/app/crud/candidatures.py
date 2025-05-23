from typing import List

from sqlalchemy.orm import Session

from app.models.candidature import Candidature as DBCandidature
from app.models.user import User as DBUser
from app.schemas.candidature import CandidatureCreate


def get_candidatures(db: Session) -> List[DBCandidature]:
    fake_user_id = 1
    return db.query(DBCandidature).filter(DBCandidature.user_id == fake_user_id).all()
    # return db.query(DBCandidature).all()


def create_candidature(db: Session, candidature: CandidatureCreate) -> DBCandidature:
    db_candidature = DBCandidature(**candidature.model_dump())
    db.add(db_candidature)
    db.commit()
    db.refresh(db_candidature)
    return db_candidature
