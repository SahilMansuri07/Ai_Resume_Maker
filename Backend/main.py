from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
import os
import json

from helper import extract_pdf_text, prepare_prompt, Configure_genai, get_gemini_response, get_summary_response
from Model.UserModel import User, LoginUser
from Model.AddResumeModel import Resume

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Gemini
try:
    Configure_genai(api_key)
except Exception as e:
    raise RuntimeError(f"Failed to configure Google Generative AI: {e}")

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["Airesume"]
collection = db["users"]
resume_collection = db["resumes"]

# FastAPI app
app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        resume_text = extract_pdf_text(resume.file)
        prompt = prepare_prompt(resume_text, job_description)
        ai_response = get_gemini_response(prompt)
        response_json = json.loads(ai_response)
        return JSONResponse(content=response_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/register/")
async def register_user(user: User):
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    result = await collection.insert_one(user.dict())
    return {"message": "User registered", "id": str(result.inserted_id)}

@app.post("/login/")
async def login_user(user: LoginUser):
    if not user.email or not user.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    existing_user = await collection.find_one({"email": user.email, "password": user.password})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "id": str(existing_user["_id"])}

@app.post("/resume/add")
async def add_new_resume(resume: Resume = Body(...)):
    resume_data = jsonable_encoder(resume)
    result = await resume_collection.insert_one(resume_data)
    return {"message": "Resume added", "id": str(result.inserted_id)}

@app.post("/gen/summary")
async def Generate_summary(request: Request):
    try:
        data = await request.json()
        job_title = data.get("job_title", "").strip()
        if not job_title:
            raise ValueError("Please enter a job title.")

        prompt = f"""
Act as a professional resume writer. Generate a compelling, concise, and job-specific professional summary suitable for the beginning of a resume.

The summary should highlight key strengths, relevant experience, and skills based on the given job title.

Job Title: {job_title}

Guidelines:
- Keep it within 3–4 sentences.
- Use confident, formal tone.
- Focus on industry-relevant keywords and impact-driven language.
- Avoid fluff, make it tailored and job-ready.

Return only the summary text without headings.
"""
        summary = await get_summary_response(prompt)
        return {"summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
