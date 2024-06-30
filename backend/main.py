from fastapi import FastAPI
import model
from config import engine
import resume_router
import vacancy_router
import parser_router

model.Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/")
async def Home():
    return {"message": "hello"}

app.include_router(resume_router.router, prefix="/resume", tags=["resume"])
app.include_router(vacancy_router.router, prefix="/vacancy", tags=["vacancy"])
app.include_router(parser_router.router, prefix="/parser", tags=["parser"])

if __name__ == "__main__":
    pass
