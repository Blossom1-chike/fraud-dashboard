from pathlib import Path

from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException, status

from app.models.dataset import Dataset
from app.repositories.dataset_repository import DatasetRepository

UPLOAD_DIRECTORY = Path("uploads")

class DatasetService:
    def __init__(self, db: Session):
        self.repository = DatasetRepository(db)

    async def upload_dataset(
            self, 
            file: UploadFile,
            source: str,
            name: str,
            uploaded_by: int
    ) -> Dataset:
        
        # We only support CSV files for now.
        if not file.filename or not file.filename.lower().endswith(".csv"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV files are supported"
            )
        
        # Create the uploads directory if it doesn't exist.
        UPLOAD_DIRECTORY.mkdir(
            parents=True,
            exist_ok=True
        )

        file_path = UPLOAD_DIRECTORY / file.filename

        # Read the uploaded file and save it
        contents = await file.read()

        with open(file_path, "wb") as destination: # wb means writing brinary
            destination.write(contents)
        
        dataset = Dataset(
            name = name, 
            source = source,
            file_name= file.filename,
            record= None,
            uploaded_by=uploaded_by
        )
        
        return self.repository.create(dataset)
