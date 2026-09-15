from fastapi import APIRouter, Depends, File, Form, UploadFile, BackgroundTasks
from app.schemas.dataset import DatasetResponse
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user
from app.core.database import get_database
from app.models.user import User
from app.services.dataset_service import DatasetService
from app.workers.transaction_worker import process_csv_background

from pathlib import Path

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)

@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(
    background_tasks: BackgroundTasks,

    file: UploadFile = File(...),

    name: str = Form(...),
    source: str = Form(...),

    db: Session = Depends(get_database),

    current_user: User = Depends(get_current_user)
):
    """Upload and register a new dataset."""

    service = DatasetService(db)

    dataset = await service.upload_dataset(
        file=file,
        name=name,
        source=source,
        uploaded_by=current_user.id
    )

    background_tasks.add_task(
        process_csv_background,
        dataset.id,
        str(Path("uploads") / dataset.file_name)
    )

    return dataset
