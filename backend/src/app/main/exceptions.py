from fastapi import HTTPException, status


class UserAlreadyExistsError(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with that name already exists.",
        )


class InvalidCredentials(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
