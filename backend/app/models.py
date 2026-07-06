from pydantic import BaseModel

class Region(BaseModel):
    x: int
    y: int
    width: int
    height: int