from fastapi import APIRouter, HTTPException, Path, Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schemas import Response, VacancySchema # VacancySchema = RequestVacancy
import controller

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create(request: VacancySchema, db: Session = Depends(get_db)):
    try:
        controller.create_vacancy(db, request)
        return Response(code=200, status="Ok", message="Vacancy has been created successfully").dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.get("/")
async def get_all_vacancies(db: Session = Depends(get_db)):
    try:
        _vacancy = controller.get_all_vacancies(db)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_vacancy).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)
    
@router.get("/{skip}")
async def get_limitted_vacancies(skip: int, db: Session = Depends(get_db)):
    try:
        _vacancy = controller.get_limitted_vacancies(db, skip, 100)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_vacancy).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)
    

@router.get("/one/{id}")
async def get_by_id(id:int, db: Session = Depends(get_db)):
    try:
        _vacancy = controller.get_vacancy_by_id(db, id)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_vacancy).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.put("/{id}")
async def update(id: int, request: VacancySchema, db: Session = Depends(get_db)):
    try:
        _vacancy = controller.update_vacancy(db, vacancy_id=id, name=request.name, department=request.department, area=request.area, salary=request.salary,
                                        type=request.type, published_at=request.published_at, created_at=request.created_at, 
                                        url=request.url, requirement=request.requirement, responsibility=request.responsibility,
                                        shedule=request.shedule, experience=request.experience, employment=request.employment)
        return Response(code=200, status="Ok", message="Successfull update", result=_vacancy).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.delete("/{id}")
async def delete(id:int, db: Session = Depends(get_db)):
    try:
        controller.delete_vacancy(db, vacancy_id=id)
        return Response(code=200, status="Ok", message="Successfull delete").dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)