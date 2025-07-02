from Model.UserModel import User, LoginUser
from auth_utils import create_access_token
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["Airesume"]
collection = db["users"]

router = APIRouter()


@router.post("/register/")
async def register_user(user: User):
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    result = await collection.insert_one(user.dict())
    return {"message": "User registered", "id": str(result.inserted_id)}


# User Login endpoint
@router.post("/login/")
async def login_user(user: LoginUser):
    if not user.email or not user.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    existing_user = await collection.find_one({"email": user.email, "password": user.password})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token_data = {"sub": existing_user["email"]}
    access_token = create_access_token(data=token_data)
    return {"message": "Login successful", "access_token": access_token}
