from datetime import datetime

from pydantic import BaseModel

class DatasetResponse(BaseModel):
    """Information about an uploaded dataset returned to the frontend."""

    id: int
    name: str 
    source: str 
    file_name: str 
    record: int | None
    uploaded_at: datetime
    uploaded_by: int

    # allows pydantic to convert the SQLAlchemy Dataset object
    # into this response schema
    model_config = {
        "from_attributes": True
    }
    