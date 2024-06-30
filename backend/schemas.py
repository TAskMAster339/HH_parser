from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel
import time
T = TypeVar('T')

class ResumeSchema(BaseModel):
    id: Optional[int]=None
    name: Optional[str]=None
    salary: Optional[str]=None
    tags: Optional[str]=None
    education: Optional[str]=None
    experience: Optional[str]=None
    languages: Optional[str]=None
    about: Optional[str]=None
    link: Optional[str]=None

    class Config:
        orm_mode = True

class RequestResume(BaseModel):
    name: Optional[str]=None
    salary: Optional[str]=None
    tags: Optional[str]=None
    education: Optional[str]=None
    experience: Optional[str]=None
    languages: Optional[str]=None
    about: Optional[str]=None
    link: Optional[str]=None

class Response(GenericModel, Generic[T]):
    code: int = 100
    status: str = ""
    message: str = ""
    result: Optional[T] | None = {}

class VacancySchema(BaseModel):
    id: Optional[int]=None
    name: Optional[str]=None
    department: Optional[str]=None
    salary: Optional[str]=None
    type: Optional[str]=None
    published_at: Optional[str]=None
    created_at: Optional[str]=None
    url: Optional[str]=None
    requirement: Optional[str]=None
    responsibility: Optional[str]=None
    shedule: Optional[str]=None
    experience: Optional[str]=None
    employment: Optional[str]=None

    class Config:
        orm_mode = True