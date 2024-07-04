from fastapi import APIRouter, HTTPException, Path, Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schemas import Response, RequestResumeParsing, ResumeSchema, RequestVacancyParsing, VacancySchema
from time import time, sleep
import controller
import parser_service


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/resume")
async def parse_resume(request: RequestResumeParsing, db: Session = Depends(get_db)):
    try:
        result = []
        for link in parser_service.get_links(request.text, request.start_page, request.end_page):
            data = parser_service.get_resume(link) #parsing one resume
            db_resume = controller.get_resume_by_link(db, link) #check resume unique
            if (not db_resume): #if resume is unique
                _resume = ResumeSchema(id=int(time()), name=data['name'], salary=data['salary'],
                                tags=str(data['tags']), education=data['education'], experience=data['experience'],
                                languages=str(data['languages']), about=data['about'], link=data['link'])
                controller.create_resume(db, _resume)
                sleep(1)
                result.append(_resume)
            else:
                _resume = controller.update_resume(db, resume_id=db_resume.id, name=data['name'], salary=data['salary'],
                                tags=str(data['tags']), education=data['education'], experience=data['experience'],
                                languages=str(data['languages']), about=data['about'], link=data['link'])
                result.append(_resume)

        return Response(code=200, status="Ok", message="Resumes has been parsed successfully", result=result).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)
    
@router.post("/vacancy")
async def parse_vacancy(request: RequestVacancyParsing, db: Session = Depends(get_db)):
    try:
        query_params = {
            "page": 0,
            "per_page": int(request.per_page),
            "text": request.text,
            "search_field": request.search_field,
            "experience": request.experience,
            "employment": request.employment,
            "schedule": request.schedule,
            "area": request.area,
            "currency": request.currency,
            "salary": request.salary,
            "only_with_salary": bool(request.only_with_salary),
            "date_from": request.date_from,
            "date_to": request.date_to,
        }   
        number_of_pages = request.number_of_pages
        if (number_of_pages * request.per_page >= 2000):
            number_of_pages = 1
        for page in range(number_of_pages):
            query_params["page"] = page
            _vacancies = parser_service.parse_all_vacancies(query_params)["items"]
            
            for vacancy in _vacancies:
                db_vacancy = controller.get_vacancy_by_id(db, int(vacancy["id"]))
                if (not vacancy["salary"]):
                    salary = "undefined"
                else:
                    if (not vacancy["salary"]["from"] and vacancy["salary"]['to']):
                        salary = f'до {vacancy["salary"]["to"]} {vacancy["salary"]["currency"]} {"до вычета налога" if vacancy["salary"]["gross"] else "с вычетом налога"}'
                    elif (vacancy["salary"]["from"] and not vacancy["salary"]['to']):
                        salary = f'От {vacancy["salary"]["from"]} {vacancy["salary"]["currency"]} {"до вычета налога" if vacancy["salary"]["gross"] else "с вычетом налога"}'
                    else:
                        salary = f'От {vacancy["salary"]["from"]} до {vacancy["salary"]["to"]} {vacancy["salary"]["currency"]} {"до вычета налога" if vacancy["salary"]["gross"] else "с вычетом налога"}'
                if (not db_vacancy):
                    _vacancy = VacancySchema(
                        id=int(vacancy["id"]),
                        name=str(vacancy["name"]),
                        area=str(vacancy["area"]["name"]),
                        salary=salary,
                        type=str(vacancy["type"]["name"]),
                        published_at=str(vacancy["published_at"]),
                        created_at=str(vacancy["created_at"]),
                        url=str(vacancy["url"]),
                        requirement=str(vacancy["snippet"]["requirement"]).replace("<highlighttext>", " ").replace("</highlighttext>", " "),
                        responsibility=str(vacancy["snippet"]["responsibility"]).replace("<highlighttext>", " ").replace("</highlighttext>", " "),
                        schedule=str(vacancy["schedule"]["name"]),
                        experience=str(vacancy["experience"]["name"]),
                        employment=str(vacancy["employment"]["name"])
                    )
                    controller.create_vacancy(db, _vacancy)
                else:
                    _vacancy = controller.update_vacancy(db, vacancy_id=int(vacancy["id"]),name=str(vacancy["name"]), area=str(vacancy["area"]["name"]),
                        salary=salary, type=str(vacancy["type"]["name"]), published_at=str(vacancy["published_at"]), created_at=str(vacancy["created_at"]),
                        url=str(vacancy["url"]), requirement=str(vacancy["snippet"]["requirement"]).replace("<highlighttext>", " ").replace("</highlighttext>", " "), 
                        responsibility=str(vacancy["snippet"]["responsibility"]).replace("<highlighttext>", " ").replace("</highlighttext>", " "),
                        schedule=str(vacancy["schedule"]["name"]), experience=str(vacancy["experience"]["name"]), employment=str(vacancy["employment"]["name"])
                    )
        return Response(code=200, status="Ok", message="Vacancies has been parsed successfully", result=_vacancies).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)