from helper import extract_pdf_text, prepare_prompt, get_gemini_response, get_summary_response
from fastapi.responses import JSONResponse
import os
import json
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["Airesume"]
resume_collection = db["resumes"]

router = APIRouter()



@router.post("/analyze")
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

@router.post("/gen/summary")
async def generate_summary(request: Request):
    try:
        data = await request.json()
        job_title = data.get("job_title", "").strip()
        if not job_title:
            raise ValueError("Please enter a job title.")

        prompt = f"""
Act as a professional resume writer. Generate a compelling, concise, and job-specific professional summary suitable for the beginning of a resume.
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
