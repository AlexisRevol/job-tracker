from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.database import Base, engine
from app.routes import auth, candidatures

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # frontend Angular
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir le dossier static à la racine /static
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(candidatures.router, prefix="/candidatures", tags=["Candidatures"])


@app.get("/")
def read_root() -> dict:
    return {"message": "API suivi candidatures"}


@app.get("/favicon.ico")
async def favicon():
    return RedirectResponse(url="/static/favicon.ico")
