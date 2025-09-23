from typing import Literal
from uuid import uuid4, UUID

from pydantic import BaseModel, Field


class User(BaseModel):
    user_id: UUID
    username: str
    password: bytes
    role: Literal["user", "admin"] = Field(default="user")


class UserRegistration(BaseModel):
    username: str
    password: str
    role: Literal["user", "admin"] = Field(default="user")


class UserCredentials(BaseModel):
    username: str
    password: str


class UserAdd(BaseModel):
    user_id: UUID = Field(default_factory=uuid4)
    username: str
    password: bytes
    role: Literal["user", "admin"] = Field(default="user")
