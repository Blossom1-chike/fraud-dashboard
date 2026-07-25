from typing import TYPE_CHECKING
from sqlalchemy import (
    String,
    Float,
    ForeignKey
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.dataset import Dataset

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    dataset_id: Mapped[int] = mapped_column(
        ForeignKey("datasets.id"),
        nullable=False
    )

    transaction_reference: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    transaction_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    old_balance: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    new_balance: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    dataset: Mapped["Dataset"] = relationship(
        back_populates="transactions"
    )