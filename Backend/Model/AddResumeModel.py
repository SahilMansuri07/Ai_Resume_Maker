from typing import List, Optional, Union  
from pydantic import BaseModel, EmailStr, HttpUrl , Field
from datetime import date


class PersonalDetails(BaseModel):
    name: str
    job_title: str
    email: EmailStr
    github: Optional[HttpUrl] = None
    linkedin: Optional[HttpUrl] = None
    portfolio: Optional[HttpUrl] = None


class Project(BaseModel):
    title: str
    description: str
    technologies: Union[str, List[str]]
    location: Optional[str] = None
    start_date: Union[date, str]
    end_date: Union[date, str]  # allow "Present" as a string


class Experience(BaseModel):
    title: str
    company: str
    description: str
    start_date: Union[date, str]
    end_date: Union[date, str]  # allow "Present" as a string


class Education(BaseModel):
    degree: str
    institution: str
    location: str
    start_date: Union[date, str]
    end_date: Union[date, str]  # allow "Present" as a string


class Resume(BaseModel):
    user_id: str = Field(default=None, description="User ID associated with the resume")
    personal_details: PersonalDetails
    summary: str
    skills: List[str]
    projects: List[Project]
    experience: List[Experience]
    education: List[Education]
