import nest_asyncio
from pyngrok import ngrok
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import List

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomLog(BaseModel):
    symptoms: List[str]
    severity: int
    duration: str

@app.get("/")
def read_root():
    return {"status": "Femora AI Backend is online", "model": "Med-Gemma-Mock"}

@app.post("/api/insights")
async def get_insights(data: SymptomLog):
    # Placeholder for Med-Gemma processing
    # In a real scenario, you would load the model here and generate a response
    insights = [
        f"Based on your {data.severity}/10 severity of {', '.join(data.symptoms)}, it's recommended to monitor your sleep patterns.",
        "Increased cycle variability detected. Consider tracking your basal body temperature.",
        "Educational Note: These insights are for informational purposes only."
    ]
    return {"insights": insights, "score": 65}

if __name__ == "__main__":
    # If you want to use ngrok locally, uncomment the lines below and add your token
    # auth_token = "YOUR_NGROK_AUTHTOKEN"
    # if auth_token != "YOUR_NGROK_AUTHTOKEN":
    #     ngrok.set_auth_token(auth_token)
    # public_url = ngrok.connect(8000).public_url
    # print(f"\n * FEMORA AI BACKEND URL: {public_url} * \n")
    
    print("\n Starting local backend on http://localhost:8000 ... \n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
