from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/analyze")
def analyze():

    image = capture_screen()

    answer = analyze_image(image)

    return {
        "response": answer
    }