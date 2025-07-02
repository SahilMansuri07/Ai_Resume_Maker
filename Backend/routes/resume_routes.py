from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Body, Request, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv
import os
import json

from auth_utils import verify_token
from Model.AddResumeModel import Resume
from helper import extract_pdf_text, prepare_prompt, get_gemini_response, get_summary_response

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

@router.post("/resume/add")
async def add_new_resume(resume: Resume = Body(...), token_data: dict = Depends(verify_token)):
    user_email = token_data.get("sub")
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid token: no user email found")
    resume_data = jsonable_encoder(resume)
    resume_data["user_email"] = user_email
    result = await resume_collection.insert_one(resume_data)
    return {"message": "Resume added", "id": str(result.inserted_id)}

@router.delete("/resume/{resume_id}")
async def delete_resume(resume_id: str, token_data: dict = Depends(verify_token)):
    user_email = token_data.get("sub")
    try:
        obj_id = ObjectId(resume_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid resume ID format")

    resume = await resume_collection.find_one({"_id": obj_id})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found in database")

    if resume.get("user_email") != user_email:
        raise HTTPException(status_code=403, detail="Access denied: You do not own this resume")

    result = await resume_collection.delete_one({"_id": obj_id})
    if result.deleted_count == 1:
        return {"message": "Resume deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete resume")

@router.get("/resume/list")
async def get_resumes(token_data: dict = Depends(verify_token)):
    user_email = token_data.get("sub")
    resumes = []
    async for doc in resume_collection.find({"user_email": user_email}):
        doc["_id"] = str(doc["_id"])
        resumes.append(doc)
    return resumes

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

@router.get("/resume/get/{resume_id}")
async def get_resume_by_id(resume_id: str, token_data: dict = Depends(verify_token)):
    user_email = token_data.get("sub")
    try:
        obj_id = ObjectId(resume_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid resume ID format.")

    resume = await resume_collection.find_one({"_id": obj_id, "user_email": user_email})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found or access denied.")

    resume["id"] = str(resume["_id"])
    del resume["_id"]
    return resume

@router.put("/resume/update/{resume_id}")
async def update_resume(resume_id: str, updated_resume: Resume = Body(...), token_data: dict = Depends(verify_token)):
    user_email = token_data.get("sub")
    try:
        obj_id = ObjectId(resume_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid resume ID format.")

    existing_resume = await resume_collection.find_one({"_id": obj_id, "user_email": user_email})
    if not existing_resume:
        raise HTTPException(status_code=404, detail="Resume not found or access denied.")

    updated_data = jsonable_encoder(updated_resume)
    updated_data["user_email"] = user_email
    result = await resume_collection.update_one({"_id": obj_id}, {"$set": updated_data})

    if result.modified_count == 1:
        return {"message": "Resume updated successfully"}
    return {"message": "No changes were made to the resume"}
