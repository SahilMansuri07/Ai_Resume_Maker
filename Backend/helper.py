import PyPDF2 as pdf
import google.generativeai as genai
import json
import re
from Model.AddResumeModel import Resume
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from fastapi import FastAPI, UploadFile, File, Form, HTTPException

def Configure_genai(api_key):
    try:
        genai.configure(api_key=api_key)
    except Exception as e:
        raise Exception(f"Error configuring Google Generative AI: {str(e)}")

def extract_pdf_text(uploaded_file):
    try:
        reader = pdf.PdfReader(uploaded_file)
        if len(reader.pages) == 0:
            raise Exception("The PDF file is empty or has no pages.")
        text = [page.extract_text() for page in reader.pages if page.extract_text()]
        if not text:
            raise Exception("No text found in the PDF file.")
        return "".join(text)
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def prepare_prompt(resume_text, job_description):
    if not resume_text or not job_description:
        raise ValueError("Resume text and job description cannot be empty.")

    prompt = f"""
You are a professional resume reviewer. 
Please analyze the following resume against the job description and respond **strictly in JSON format only**.

Resume:
{resume_text.strip()}

Job Description:
{job_description.strip()}

Respond ONLY in this JSON format:
{{
  "JD Match": "percentage between 0-100",
  "Missing Keywords": ["keyword1", "keyword2", ...],
  "Profile Summary": "Detailed analysis of resume with specific improvements"
}}
"""
    return prompt

def get_gemini_response(prompt):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if not response or not response.text:
            raise Exception("No response received from the Google Generative AI API.")

        raw_text = response.text.strip()
        json_pattern = r"\{(?:[^{}]|(?:\{[^{}]*\}))*\}"
        match = re.search(json_pattern, raw_text)

        if not match:
            json_pattern_simple = r"\{[\s\S]*?\}"
            match = re.search(json_pattern_simple, raw_text)
            if not match:
                raise ValueError("Could not find a valid JSON object in the response.")

        json_str = match.group()
        response_json = json.loads(json_str)

        required_fields = ["JD Match", "Missing Keywords", "Profile Summary"]
        for field in required_fields:
            if field not in response_json:
                raise ValueError(f"Missing required field in response: {field}")

        return json_str

    except Exception as e:
        raise Exception(f"Error getting response from Google Generative AI: {str(e)}")

async def get_summary_response(prompt: str) -> str:
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if not response or not response.text:
            raise Exception("No response received from Gemini.")

        return response.text.strip()

    except Exception as e:
        raise Exception(f"Error generating summary: {str(e)}")


# def generate_resume_pdf(resume: Resume) -> bytes:
#     buffer = BytesIO()
#     c = canvas.Canvas(buffer, pagesize=letter)
#     width, height = letter

#     y = height - 50
#     c.setFont("Helvetica-Bold", 16)
#     c.drawString(50, y, resume.personal_details.get("name", "Unnamed"))
#     y -= 20

#     c.setFont("Helvetica", 10)
#     c.drawString(50, y, f"Email: {resume.personal_details.get('email', '')}")
#     y -= 15
#     c.drawString(50, y, f"Phone: {resume.personal_details.get('phone', '')}")
#     y -= 25

#     def draw_section(title, items):
#         nonlocal y
#         c.setFont("Helvetica-Bold", 12)
#         c.drawString(50, y, title)
#         y -= 15
#         c.setFont("Helvetica", 10)
#         if isinstance(items, str):
#             c.drawString(60, y, items)
#             y -= 15
#         elif isinstance(items, list):
#             for item in items:
#                 line = f"- {item}" if isinstance(item, str) else str(item)
#                 c.drawString(60, y, line[:100])
#                 y -= 15
#                 if y < 50:
#                     c.showPage()
#                     y = height - 50

#     draw_section("Summary", resume.summary)
#     draw_section("Skills", resume.skills)
#     draw_section("Projects", resume.projects)
#     draw_section("Experience", resume.experience)
#     draw_section("Education", resume.education)

#     c.showPage()
#     c.save()
#     return buffer.getvalue()