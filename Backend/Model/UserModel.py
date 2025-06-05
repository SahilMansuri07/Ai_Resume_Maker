from pydantic  import BaseModel, EmailStr


# Pydantic model
class User(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str
   
    