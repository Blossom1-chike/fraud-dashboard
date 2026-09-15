from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.dataset import Dataset
import csv

from app.models.transaction import Transaction

def process_csv_background(
        dataset_id: int,
        file_path: str
) -> None:
    """
    Background entry point.

    Creates its own database session because the original
    API request may already have finished.
    """

    db = SessionLocal()

    try:
        transaction_count = process_csv(
            file_path=file_path,
            dataset_id=dataset_id,
            db=db
        )

        dataset = db.get(Dataset, dataset_id)

        if dataset:
            dataset.record = transaction_count # Store the number of transactions processed.

            db.commit()
    finally:
        db.close()

def process_csv(
        file_path: str,
        dataset_id: int,
        db: Session 
) -> int:
    """
    Read a CSV file and create Transaction records.

    Returns:
        The number of transactions successfully created.
    """
    transaction_count = 0

    with open(file_path, "r", encoding="utf-8-sig", newline="") as csv_file:
        reader = csv.DictReader(csv_file)

        print(reader.fieldnames)

        for row in reader:
            transaction = Transaction(
                dataset_id = dataset_id,
                # PaySim's nameOrig identifies the account
                # that initiated the transaction.
                transaction_reference = row["nameOrig"],

                amount = float(row["amount"]),

                transaction_type=row["type"],

                old_balance=float(row["oldbalanceOrg"]),

                new_balance=float(row["newbalanceOrig"]),

                time_step=int(row["step"]),
            )

            db.add(transaction)

            transaction_count += 1

        # Save all the transactions to PostgreSQL.
        db.commit()

    return transaction_count 
