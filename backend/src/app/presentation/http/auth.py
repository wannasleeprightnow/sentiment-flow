from fastapi import APIRouter
from dishka.integrations.fastapi import DishkaRoute, FromDishka

from app.application.dto.user import UserRegistration
from app.application.usecases.create_user import CreateUserUseCase

router = APIRouter(prefix="/auth", tags=["auth"], route_class=DishkaRoute)


@router.post("/login")
async def login():
    pass


@router.post("/registration", response_model=None, status_code=201)
async def registration(usecase: FromDishka[CreateUserUseCase], user: UserRegistration):
    await usecase(user)


@router.post("/logout")
async def logout():
    pass
