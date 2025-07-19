from fastapi import APIRouter, HTTPException, Depends, Body
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from dotenv import load_dotenv
import os
import json


from auth_utils import verify_token
from Model.AddResumeModel import Resume


# from fastapi.responses import StreamingResponse
# from jinja2 import Environment, FileSystemLoader
# from weasyprint import HTML
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["Airesume"]
resume_collection = db["resumes"]

router = APIRouter()

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
