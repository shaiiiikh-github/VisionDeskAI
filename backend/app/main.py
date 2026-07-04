from fastapi import FastAPI
from app.services.capture_service import capture_screen
from app.services.gemini_service import analyze_image

app = FastAPI()

@app.get("/analyze")
def analyze():

    image = capture_screen()

    answer = analyze_image(image)

    return {
        "response": answer
    }