from fastapi import APIRouter, HTTPException, Path, Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schemas import RequestResume, Response, ResumeSchema
import controller
from time import time

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create(request: RequestResume, db: Session = Depends(get_db)):
    try:
        _resume = ResumeSchema(id=int(time()), name=request.name, salary=request.salary,
                               tags=request.tags, education=request.education, experience=request.experience,
                               languages=request.languages, about=request.about, link=request.link)
        controller.create_resume(db, _resume)
        return Response(code=200, status="Ok", message="Resume has been created successfully").dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.get("/{skip}")
async def get(skip:int, db: Session = Depends(get_db)):
    try:
        _resume = controller.get_limited_resume(db, skip)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_resume).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)
    
@router.get("/")
async def get(db: Session = Depends(get_db)):
    try:
        _resume = controller.get_all_resume(db)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_resume).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)
    

@router.get("/{id}")
async def get_by_id(id:int, db: Session = Depends(get_db)):
    try:
        _resume = controller.get_resume_by_id(db, id)
        return Response(code=200, status="Ok", message="Successfull fetch", result=_resume).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.put("/{id}")
async def update(id: int, request: RequestResume, db: Session = Depends(get_db)):
    try:
        _resume = controller.update_resume(db, resume_id=id, name=request.name, salary=request.salary,
                                        tags=request.tags, education=request.education, experience=request.experience,
                                        languages=request.languages, about=request.about, link=request.link)
        return Response(code=200, status="Ok", message="Successfull update", result=_resume).dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)


@router.delete("/{id}")
async def delete(id:int, db: Session = Depends(get_db)):
    try:
        controller.delete_resume(db, resume_id=id)
        return Response(code=200, status="Ok", message="Successfull delete").dict(exclude_none=True)
    except Exception as e:
        print(f"{e}")
        return Response(code=400, status="Not ok", message=f"{e}").dict(exclude_none=True)