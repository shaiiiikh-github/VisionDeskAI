from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import Region
from app.services.capture_service import capture_screen
from app.services.gemini_service import analyze_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
def analyze(region: Region):

    image = capture_screen(region)

    answer = analyze_image(image)

    return {
        "response": answer
    }