# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import os

# from routes.resume_routes import router as resume_router


# from helper import extract_pdf_text, prepare_prompt, Configure_genai, get_gemini_response, get_summary_response
# from Model.UserModel import User, LoginUser
# from Model.AddResumeModel import Resume

# from auth_utils import create_access_token, verify_token

# # Load environment variables
# load_dotenv()
# api_key = os.getenv("GOOGLE_API_KEY")

# # Configure Gemini
# try:
#     Configure_genai(api_key)
# except Exception as e:
#     raise RuntimeError(f"Failed to configure Google Generative AI: {e}")

# # MongoDB setup
# MONGO_URI = os.getenv("MONGO_URI")
# client = AsyncIOMotorClient(MONGO_URI)
# db = client["Airesume"]
# collection = db["users"]
# resume_collection = db["resumes"]

# # FastAPI app
# app = FastAPI()

# # Allow CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # resume analyze endpoint
# @app.post("/analyze")
# async def analyze_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
#     if resume.content_type != "application/pdf":
#         raise HTTPException(status_code=400, detail="Only PDF files are supported.")
#     try:
#         resume_text = extract_pdf_text(resume.file)
#         prompt = prepare_prompt(resume_text, job_description)
#         ai_response = get_gemini_response(prompt)
#         response_json = json.loads(ai_response)
#         return JSONResponse(content=response_json)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # user register endpoint
# app.include_router(user_router)





# # resume add endpoint
# @app.post("/resume/add")
# async def add_new_resume(resume: Resume = Body(...), token_data: dict = Depends(verify_token)):
#     # token_data contains the JWT payload, including 'sub' (email)
#     user_email = token_data.get("sub")
#     if not user_email:
#         raise HTTPException(status_code=401, detail="Invalid token: no user email found")

#     resume_data = jsonable_encoder(resume)
#     resume_data["user_email"] = user_email

#     result = await resume_collection.insert_one(resume_data)
#     return {"message": "Resume added", "id": str(result.inserted_id)}

# @app.delete("/resume/{resume_id}")
# async def delete_resume(resume_id: str, token_data: dict = Depends(verify_token)):
#     user_email = token_data.get("sub")
#     if not user_email:
#         raise HTTPException(status_code=401, detail="Invalid token: user email missing")

#     # Validate ID format
#     try:
#         obj_id = ObjectId(resume_id)
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid resume ID format")

#     # DEBUG logs (remove in production)
#     print(f"🔐 Authenticated user: {user_email}")
#     print(f"🧾 Requested delete resume ID: {resume_id}")

#     # Find resume by ID first (optional for better error tracing)
#     resume = await resume_collection.find_one({"_id": obj_id})
#     if not resume:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Resume not found in database"
#         )

#     # Now check if the authenticated user owns it
#     if resume.get("user_email") != user_email:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Access denied: You do not own this resume"
#         )

#     # Perform deletion
#     result = await resume_collection.delete_one({"_id": obj_id})
#     if result.deleted_count == 1:
#         return {"message": "Resume deleted successfully"}
#     else:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Failed to delete resume due to internal error"
#         )

# # resume list endpoint
# @app.get("/resume/list")
# async def get_resumes(token_data: dict = Depends(verify_token)):
#     user_email = token_data.get("sub")
#     if not user_email:
#         raise HTTPException(status_code=401, detail="Invalid token: no user email found")

#     # Find all resumes for the current user
#     resumes = []
#     async for doc in resume_collection.find({"user_email": user_email}):
#         doc["_id"] = str(doc["_id"])
#         resumes.append(doc)
#     return resumes


# # in resume generate summary endpoint
# @app.post("/gen/summary")
# async def Generate_summary(request: Request):
#     try:
#         data = await request.json()
#         job_title = data.get("job_title", "").strip()
#         if not job_title:
#             raise ValueError("Please enter a job title.")

#         prompt = f"""
# Act as a professional resume writer. Generate a compelling, concise, and job-specific professional summary suitable for the beginning of a resume.

# The summary should highlight key strengths, relevant experience, and skills based on the given job title.

# Job Title: {job_title}

# Guidelines:
# - Keep it within 3–4 sentences.
# - Use confident, formal tone.
# - Focus on industry-relevant keywords and impact-driven language.
# - Avoid fluff, make it tailored and job-ready.

# Return only the summary text without headings.
# """
#         summary = await get_summary_response(prompt)
#         return {"summary": summary}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e)) 


# @app.get("/resume/get/{resume_id}")
# async def get_resume_by_id(resume_id: str, token_data: dict = Depends(verify_token)):
#     user_email = token_data.get("sub")
#     if not user_email:
#         raise HTTPException(status_code=401, detail="Invalid token.")

#     try:
#         obj_id = ObjectId(resume_id)
#     except:
#         raise HTTPException(status_code=400, detail="Invalid resume ID format.")

#     resume = await resume_collection.find_one({"_id": obj_id, "user_email": user_email})
#     if not resume:
#         raise HTTPException(status_code=404, detail="Resume not found or access denied.")

#     resume["id"] = str(resume["_id"])
#     del resume["_id"]
#     return resume



# @app.put("/resume/update/{resume_id}")
# async def update_resume(
#     resume_id: str,
#     updated_resume: Resume = Body(...),
#     token_data: dict = Depends(verify_token)
# ):
#     user_email = token_data.get("sub")
#     if not user_email:
#         raise HTTPException(status_code=401, detail="Invalid token.")

#     try:
#         obj_id = ObjectId(resume_id)
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid resume ID format.")

#     # Check ownership
#     existing_resume = await resume_collection.find_one({"_id": obj_id, "user_email": user_email})
#     if not existing_resume:
#         raise HTTPException(status_code=404, detail="Resume not found or access denied.")

#     updated_data = jsonable_encoder(updated_resume)
#     updated_data["user_email"] = user_email  # ensure user association remains correct

#     result = await resume_collection.update_one(
#         {"_id": obj_id},
#         {"$set": updated_data}
#     )

#     if result.modified_count == 1:
#         return {"message": "Resume updated successfully"}
#     else:
#         return {"message": "No changes were made to the resume"}

# # @app.get("/resume/download/{_id}")
# # async def download_resume(_id: str, token_data: dict = Depends(verify_token)):
# #     user_email = token_data.get("sub")
# #     if not user_email:
# #         raise HTTPException(status_code=401, detail="Invalid token: no user email found")

# #     resume = await resume_collection.find_one({"_id": ObjectId(_id), "user_email": user_email})
# #     if not resume:
# #         raise HTTPException(status_code=404, detail="Resume not found or access denied.")
    
# #     pdf_data = resume.get("pdf_data")
# #     if not pdf_data:
# #         raise HTTPException(status_code=404, detail="Resume PDF not found.")

# #     return Response(
# #         content=pdf_data,
# #         media_type="application/pdf",
# #         headers={"Content-Disposition": f"attachment; filename=resume_{_id}.pdf"}
# #     )

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routes.user_routes import router as user_router
from routes.resume_routes import router as resume_router

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
