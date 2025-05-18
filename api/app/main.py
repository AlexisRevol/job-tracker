from fastapi import FastAPI
from app.routes import candidatures

app = FastAPI()

app.include_router(candidatures.router, prefix="/candidatures", tags=["Candidatures"])

@app.get("/")
def read_root():
    return {"message": "API suivi candidatures"}
