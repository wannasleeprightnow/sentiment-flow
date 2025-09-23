from fastapi import APIRouter

router = APIRouter(prefix="/healthcheck", tags=["healthcheck"])


@router.get("", status_code=200, response_model=dict)
async def healthcheck() -> dict:
    return {"status": "OK"}
