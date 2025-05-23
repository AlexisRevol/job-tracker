from sqlalchemy.orm import Session

from app.models.user import User as DBUser
from app.schemas.user import UserCreate
from app.security.password import hash_password, verify_password


def get_user_by_email(db: Session, email: str) -> DBUser | None:
    return db.query(DBUser).filter(DBUser.email == email).first()


def create_user(db: Session, user: UserCreate) -> DBUser:
    hashed = hash_password(user.password)
    db_user = DBUser(email=user.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> DBUser | None:
    user = get_user_by_email(db, email)
    if user and verify_password(password, user.hashed_password):
        return user
    return None
