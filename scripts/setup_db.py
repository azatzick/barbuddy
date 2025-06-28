#!/usr/bin/env python3
"""
Database setup script for Barbuddy
Creates sample bars for testing
"""
import sys
import os
import asyncio
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from app.database import async_session, engine, Base
from app.models import Bar

async def create_sample_data():
    async with async_session() as db:
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
                existing_bar = (await db.execute(
                    db.query(Bar).filter(Bar.name == bar_data["name"])
                )).scalar_one_or_none()
                
                if not existing_bar:
                    bar = Bar(**bar_data)
                    db.add(bar)
                    print(f"Created bar: {bar_data['name']}")
            
            await db.commit()
            print("\nSample bars created successfully!")
            print(f"Total bars: {len(sample_bars)}")
            
        except Exception as e:
            print(f"Error creating sample data: {e}")
            await db.rollback()
            raise

async def main():
    print("Setting up Barbuddy database...")
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created.")
    
    # Create sample data
    await create_sample_data()

if __name__ == "__main__":
    asyncio.run(main()) 