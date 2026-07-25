from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.core.security import hash_password

from app.models.role import Role
from app.models.user import User


def seed_roles(db: Session):
    roles = [
        "Admin",
        "Fraud Analyst",
        "Investigator"
    ]

    for role_name in roles:
        existing_role = (
            db.query(Role).filter(Role.name == role_name).first()
        )

        if not existing_role:
            role = Role(
                name=role_name
            )

            db.add(role)
        
    db.commit()

def seed_users(db: Session):
    admin_role = (
        db.query(Role).filter(Role.name == "Admin").first()
    )

    analyst_role = (
        db.query(Role).filter(Role.name == "Fraud Analyst").first()
    )

    users = [
        {
            "email": "admin@fraudshield.ai",
            "password": "Demo@123",
            "role": admin_role
        },
        {
            "email": "analyst@fraudshield.ai",
            "password": "Demo@123",
            "role": analyst_role
        }
    ] 

    for user in users:
        existing_user = (
            db.query(User).filter(User.email == user["email"]).first()
        )

        if not existing_user:
            user = User(
                email=user["email"],
                password_hash=hash_password(
                    user["password"]
                ),
                role_id=user["role"].id
            )

            db.add(user)
    db.commit()

def main():
    db = SessionLocal()

    try:
        print("Seeding roles....")
        seed_roles(db)


        print("Seeding users....")
        seed_users(db)

        print("Database seeded successfully!")

    
    finally:
        db.close()
        
if __name__ == "__main__":
    main()