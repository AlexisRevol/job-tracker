from fastapi import APIRouter, Depends

from app.models.user import User as DBUser
from app.security.deps import get_current_user

router = APIRouter()


@router.get("/me")
def read_current_user(current_user: DBUser = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
    }
