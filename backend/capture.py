from mss import mss
from PIL import Image

def capture_screen():

    with mss() as sct:

        monitor = sct.monitors[1]

        screenshot = sct.grab(monitor)

        img = Image.frombytes(
            "RGB",
            screenshot.size,
            screenshot.rgb
        )

        img.save("screen.png")

        return "screen.png"