from sqlalchemy import Column, Date, Integer, String

from app.database import Base


class Candidature(Base):
    """
    Modèle SQLAlchemy représentant une candidature à un poste.

    Cette classe correspond à la table "candidatures" dans la base de données.
    Chaque instance représente une ligne de candidature contenant les infos principales.
    """

    __tablename__ = "candidatures"

    id = Column(Integer, primary_key=True, index=True)
    entreprise = Column(String, nullable=False)
    poste = Column(String, nullable=False)
    date_candidature = Column(Date, nullable=False)
    statut = Column(String, nullable=False, default="envoyée")
    commentaire = Column(String, nullable=True)
