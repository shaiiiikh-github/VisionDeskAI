import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

print("=" * 50)
print("CLIENT")
print("=" * 50)
print(dir(client))

print()

print("=" * 50)
print("MODELS")
print("=" * 50)
print(dir(client.models))

print()

print("=" * 50)
print("FILES")
print("=" * 50)
print(dir(client.files))