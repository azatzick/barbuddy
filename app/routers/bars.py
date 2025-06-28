from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from typing import List
from app.database import get_db
from app.models import Bar, User
from app.schemas import BarCreate, Bar as BarSchema, BarSearchResponse
from app.dependencies import get_current_active_user
import math

router = APIRouter(prefix="/bars", tags=["bars"])


@router.get("/nearby", response_model=BarSearchResponse)
async def get_nearby_bars(
    latitude: float = Query(..., description="User's latitude"),
    longitude: float = Query(..., description="User's longitude"),
    radius: float = Query(5.0, description="Search radius in kilometers"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Convert radius from km to degrees (approximate)
    radius_degrees = radius / 111.0
    
    # Query bars within the radius
    result = await db.execute(
        select(Bar).where(
            func.abs(Bar.latitude - latitude) <= radius_degrees,
            func.abs(Bar.longitude - longitude) <= radius_degrees
        )
    )
    bars = result.scalars().all()
    
    return BarSearchResponse(bars=bars, total=len(bars))


@router.get("/{bar_id}", response_model=BarSchema)
async def get_bar(bar_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Bar).where(Bar.id == bar_id)
    )
    bar = result.scalar_one_or_none()
    
    if not bar:
        raise HTTPException(status_code=404, detail="Bar not found")
    return bar


@router.get("/", response_model=List[BarSchema])
async def get_all_bars(db: AsyncSession = Depends(get_db)):
    """Get all bars (for testing)"""
    result = await db.execute(select(Bar))
    bars = result.scalars().all()
    return bars 