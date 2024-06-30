from sqlalchemy.orm import Session
from model import Resume, Vacancy
from schemas import ResumeSchema, VacancySchema

#Get all
def get_resume(db: Session, skip: int = 0, limit : int = 100) -> list[Resume]:
    return db.query(Resume).offset(skip).limit(limit).all()
#get one by id
def get_resume_by_id(db: Session, resume_id: int) -> Resume | None:
    return db.query(Resume).filter(Resume.id == resume_id).first()
#create one
def create_resume(db: Session, resume: ResumeSchema):
    _resume = Resume(id=resume.id, name=resume.name, salary=resume.salary, tags=resume.tags, 
                     education=resume.education, experience=resume.experience, 
                     languages=resume.languages, about=resume.about, link=resume.link)
    db.add(_resume)
    db.commit()
    db.refresh(_resume)
    return _resume
#delete one by id
def delete_resume(db: Session, resume_id: int) -> None:
    _resume = get_resume_by_id(db, resume_id)
    db.delete(_resume)
    db.commit()
#update one by id
def update_resume(db: Session, resume_id: int, name: str | None, salary: str | None, 
                  tags: str | None, education: str | None, experience: str | None, 
                  languages: str | None, about: str | None, link: str | None) -> Resume | None:
    _resume = get_resume_by_id(db, resume_id)
    if name != None:
        _resume.name = name
    if salary != None:
        _resume.salary = salary
    if tags != None:
        _resume.tags = tags
    if education != None:
        _resume.education = education
    if experience != None:
        _resume.experience = experience
    if languages != None:
        _resume.languages = languages
    if about != None:
        _resume.about = about
    if link != None:
        _resume.link = link
    
    db.commit()
    db.refresh(_resume)
    return _resume

#Get all
def get_vacancies(db: Session, skip: int = 0, limit: int = 100) -> list[Vacancy]:
    return db.query(Vacancy).offset(skip).limit(limit).all()
#get one by id
def get_vacancy_by_id(db: Session, vacancy_id: int) -> Vacancy | None:
    return db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()
#create one
def create_vacancy(db: Session, vacancy: VacancySchema) -> Vacancy:
    _vacancy = Vacancy(id=vacancy.id, name=vacancy.name, department=vacancy.department, salary=vacancy.salary, type=vacancy.type, 
                     published_at=vacancy.published_at, created_at=vacancy.created_at, url=vacancy.url, requirement=vacancy.requirement, 
                     responsibility=vacancy.responsibility, shedule=vacancy.shedule, experience=vacancy.experience, employment=vacancy.employment)
    db.add(_vacancy)
    db.commit()
    db.refresh(_vacancy)
    return _vacancy
#delete one by id
def delete_vacancy(db: Session, vacancy_id: int) -> None:
    _vacancy = get_vacancy_by_id(db, vacancy_id)
    db.delete(_vacancy)
    db.commit()
#update one by id
def update_vacancy(db: Session, vacancy_id: int, name: str | None, department: str | None, salary: str | None, 
                  type: str | None, published_at: str | None, created_at: str | None, url: str | None, 
                  requirement: str | None, responsibility: str | None, shedule: str | None, 
                  experience: str | None, employment: str | None) -> Vacancy | None:
    _vacancy = get_vacancy_by_id(db, vacancy_id)
    if name != None:
        _vacancy.name = name
    if salary != None:
        _vacancy.salary = salary
    if department != None:
        _vacancy.department = department
    if salary != None:
        _vacancy.salary = salary
    if type != None:
        _vacancy.type = type
    if published_at != None:
        _vacancy.published_at = published_at
    if created_at != None:
        _vacancy.created_at = created_at
    if url != None:
        _vacancy.url = url
    if requirement != None:
        _vacancy.requirement = requirement
    if shedule != None:
        _vacancy.shedule = shedule
    if experience != None:
        _vacancy.experience = experience
    if employment != None:
        _vacancy.employment = employment
    
    db.commit()
    db.refresh(_vacancy)
    return _vacancy
