from fastapi import FastAPI
from backend.routes.user_routes import router as UserRouter
from backend.routes.cycle_routes import router as CycleRouter
from backend.routes.chatbot_routes import router as ChatRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Femora AI API", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(UserRouter, prefix="/user")
app.include_router(CycleRouter, prefix="/cycle")
app.include_router(ChatRouter, prefix="/chatbot")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Femora AI Backend Service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
