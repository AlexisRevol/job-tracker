from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import candidatures

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # frontend Angular
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(candidatures.router, prefix="/candidatures", tags=["Candidatures"])


@app.get("/")
def read_root() -> dict:
    return {"message": "API suivi candidatures"}
