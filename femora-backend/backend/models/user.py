from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "Jane Doe",
                "email": "jane@example.com",
                "password": "strongpassword123"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "email": "jane@example.com",
                "password": "strongpassword123"
            }
        }
