from sqlalchemy import Column, Integer, Text
from config import Base


class Resume(Base):
    __tablename__ = "resume"

    id=Column(Integer, primary_key=True)
    name=Column(Text)
    salary=Column(Text)
    tags=Column(Text)
    education=Column(Text)
    experience=Column(Text)
    languages=Column(Text)
    about=Column(Text)
    link=Column(Text)

class Vacancy(Base):
    __tablename__ = "vacancies"

    id=Column(Integer, primary_key=True)
    name=Column(Text)
    area=Column(Text)
    salary=Column(Text)
    type=Column(Text)
    published_at=Column(Text)
    created_at=Column(Text)
    url=Column(Text)
    requirement=Column(Text)
    responsibility=Column(Text)
    schedule=Column(Text)
    experience=Column(Text)
    employment=Column(Text)