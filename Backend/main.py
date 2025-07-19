from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routes.user_routes import router as user_router
from routes.resume_routes import router as resume_router
from analyzer.function import router as function

from helper import Configure_genai

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Gemini
try:
    Configure_genai(api_key)
except Exception as e:
    raise RuntimeError(f"Failed to configure Google Generative AI: {e}")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include user and resume routers
app.include_router(user_router)
app.include_router(resume_router)
app.include_router(function)
