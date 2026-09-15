run:
	uvicorn app.main:app --reload

migration:	
	alembic revision --autogenerate -m "$(msg)"

migrate:
	alembic upgrade head	