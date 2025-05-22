from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./candidatures.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


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
