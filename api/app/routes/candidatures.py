from fastapi import APIRouter, HTTPException
#from typing import List
from app.schemas.candidature import Candidature, CandidatureCreate

router = APIRouter()

candidatures = []
current_id = 1

@router.get("/", response_model=list[Candidature])
def get_candidatures():
    return candidatures

@router.post("/", response_model=Candidature)
def create_candidature(cand: CandidatureCreate):
    global current_id
    new_cand = Candidature(id=current_id, **cand.dict())
    current_id += 1
    candidatures.append(new_cand)
    return new_cand
