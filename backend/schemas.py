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
    area: Optional[str]=None
    salary: Optional[str]=None
    type: Optional[str]=None
    published_at: Optional[str]=None
    created_at: Optional[str]=None
    url: Optional[str]=None
    requirement: Optional[str]=None
    responsibility: Optional[str]=None
    schedule: Optional[str]=None
    experience: Optional[str]=None
    employment: Optional[str]=None

    class Config:
        orm_mode = True

class RequestResumeParsing(BaseModel):
    text: Optional[str]=None
    start_page: Optional[int]=None
    end_page: Optional[int]=None

class RequestVacancyParsing(BaseModel):
    number_of_pages: Optional[int]=1
    per_page: Optional[int]=100
    text: Optional[str]=None
    search_field: Optional[str]=None
    experience: Optional[str]=None
    employment: Optional[str]=None
    schedule: Optional[str]=None
    area: Optional[str]=None
    currency: Optional[str]=None
    salary: Optional[str]=None
    only_with_salary: Optional[bool]=None
    period: Optional[str]=None
    date_from: Optional[str]=None
    date_to: Optional[str]=None
    locale: Optional[str]=None