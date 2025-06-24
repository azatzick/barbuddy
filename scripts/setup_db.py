#!/usr/bin/env python3
"""
Database setup script for Barbuddy
Creates sample bars and users for testing
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, User, Bar
from app.auth import get_password_hash

def create_sample_data():
    db = SessionLocal()
    try:
        # Create sample bars
        sample_bars = [
            {
                "name": "The Blue Moon",
                "address": "123 Main St, Downtown",
                "latitude": 40.7128,
                "longitude": -74.0060
            },
            {
                "name": "Red Lion Pub",
                "address": "456 Oak Ave, Midtown",
                "latitude": 40.7589,
                "longitude": -73.9851
            },
            {
                "name": "Green Dragon Tavern",
                "address": "789 Pine St, Uptown",
                "latitude": 40.7505,
                "longitude": -73.9934
            },
            {
                "name": "Golden Gate Bar",
                "address": "321 Elm St, Westside",
                "latitude": 40.7614,
                "longitude": -73.9776
            },
            {
                "name": "Silver Star Lounge",
                "address": "654 Maple Dr, Eastside",
                "latitude": 40.7484,
                "longitude": -73.9857
            }
        ]
        
        for bar_data in sample_bars:
            existing_bar = db.query(Bar).filter(Bar.name == bar_data["name"]).first()
            if not existing_bar:
                bar = Bar(**bar_data)
                db.add(bar)
                print(f"Created bar: {bar_data['name']}")
        
        # Create sample users
        sample_users = [
            {
                "email": "john@example.com",
                "name": "John Doe",
                "password": "password123"
            },
            {
                "email": "jane@example.com",
                "name": "Jane Smith",
                "password": "password123"
            },
            {
                "email": "bob@example.com",
                "name": "Bob Johnson",
                "password": "password123"
            }
        ]
        
        for user_data in sample_users:
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                hashed_password = get_password_hash(user_data["password"])
                user = User(
                    email=user_data["email"],
                    name=user_data["name"],
                    hashed_password=hashed_password
                )
                db.add(user)
                print(f"Created user: {user_data['name']} ({user_data['email']})")
        
        db.commit()
        print("\nSample data created successfully!")
        print("\nSample users:")
        print("- john@example.com / password123")
        print("- jane@example.com / password123")
        print("- bob@example.com / password123")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Setting up Barbuddy database...")
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created.")
    
    # Create sample data
    create_sample_data() 