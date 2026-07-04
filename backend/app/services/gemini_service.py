import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai.errors import ServerError

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


SYSTEM_PROMPT = """
You are VisionDesk AI.

Analyze the screenshot carefully.

Your responsibilities:

1. Describe what is visible on the screen.
2. Identify the application(s) currently open.
3. If source code is visible:
   - Explain what the code is doing.
   - Identify bugs or errors.
   - Suggest improvements.
4. If an error message is visible:
   - Explain the cause.
   - Provide the solution.
5. If it is a website:
   - Summarize the page.
6. If it is a document:
   - Summarize the important points.

Respond in clean Markdown.

Use headings and bullet points when appropriate.
"""


def analyze_image(image_path: str) -> str:
    """
    Uploads an image to Gemini and returns the AI response.
    Retries automatically if Google's servers are temporarily unavailable.
    """

    max_retries = 3

    for attempt in range(max_retries):

        try:
            print("📤 Uploading screenshot...")
            uploaded_file = client.files.upload(
                file=image_path
            )
            print("✅ Screenshot uploaded!")

            print("🤖 Sending request to Gemini...")
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    uploaded_file,
                    SYSTEM_PROMPT,
                ],
            )
            print("🎉 Gemini replied successfully!")
            return response.text

        except ServerError as e:

            print(f"[Gemini] Server busy ({attempt + 1}/{max_retries})")

            if attempt < max_retries - 1:
                time.sleep(5)
            else:
                return (
                    "⚠️ Gemini servers are currently experiencing high demand.\n"
                    "Please try again in a few moments.\n\n"
                    f"Details: {e}"
                )

        except Exception as e:

            return f"❌ Unexpected error:\n\n{str(e)}"