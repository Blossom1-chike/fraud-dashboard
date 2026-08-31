from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.transaction import Transaction

class Dataset(Base):
    __tablename__ = "datasets"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    source: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    record: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    uploaded_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    uploader: Mapped["User"] = relationship(
        back_populates="datasets"
    )

    transactions: Mapped[list["Transaction"]] = relationship(
        back_populates="dataset"
    )