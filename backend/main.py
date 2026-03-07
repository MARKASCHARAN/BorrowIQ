from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.score_routes import router as score_router
from api.profile_routes import router as profile_router
from api.eligibility_routes import router as eligibility_router
from api.loan_status_routes import router as loan_status_router
from api.protocol_routes import router as protocol_router
from api.ai_explain_routes import router as explain_router
from api.ai_advisor_routes import router as advisor_router

app = FastAPI(
    title="BorrowIQ AI Credit Engine"
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(score_router)
app.include_router(profile_router)
app.include_router(eligibility_router)
app.include_router(loan_status_router)
app.include_router(protocol_router)
app.include_router(explain_router)
app.include_router(advisor_router)

@app.get("/")
def root():
    return {"status": "BorrowIQ AI Engine Running"}