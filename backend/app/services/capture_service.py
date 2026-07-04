from mss import mss
from PIL import Image
from pathlib import Path


def capture_screen():
    output_dir = Path("captures")
    output_dir.mkdir(exist_ok=True)

    image_path = output_dir / "screen.png"

    with mss() as sct:
        monitor = sct.monitors[1]
        screenshot = sct.grab(monitor)

        img = Image.frombytes(
            "RGB",
            screenshot.size,
            screenshot.rgb
        )

        img.save(image_path)
        print("📸 Screenshot saved!")
    return str(image_path)