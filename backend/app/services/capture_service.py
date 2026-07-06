from mss import mss
from PIL import Image
from pathlib import Path


def capture_screen(region):

    output_dir = Path("captures")
    output_dir.mkdir(exist_ok=True)

    image_path = output_dir / "screen.png"

    with mss() as sct:

        monitor = {
            "left": region.x,
            "top": region.y,
            "width": region.width,
            "height": region.height,
        }

        screenshot = sct.grab(monitor)

        img = Image.frombytes(
            "RGB",
            screenshot.size,
            screenshot.rgb,
        )

        img.save(image_path)

        print("📸 Region captured!")

    return str(image_path)