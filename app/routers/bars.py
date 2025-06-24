from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.database import get_db
from app.models import Bar, BarVisit, HereNowStatus, User
from app.schemas import BarCreate, Bar as BarSchema, BarVisitCreate, BarVisit as BarVisitSchema, BarSearchResponse, BarWithVisitors
from app.dependencies import get_current_active_user
import math

router = APIRouter(prefix="/bars", tags=["bars"])


@router.get("/nearby", response_model=BarSearchResponse)
def get_nearby_bars(
    latitude: float = Query(..., description="User's latitude"),
    longitude: float = Query(..., description="User's longitude"),
    radius: float = Query(5.0, description="Search radius in kilometers"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Convert radius from km to degrees (approximate)
    radius_degrees = radius / 111.0
    
    # Query bars within the radius
    bars = db.query(Bar).filter(
        func.abs(Bar.latitude - latitude) <= radius_degrees,
        func.abs(Bar.longitude - longitude) <= radius_degrees
    ).all()
    
    # Calculate here_now count for each bar
    bars_with_visitors = []
    for bar in bars:
        here_now_count = db.query(HereNowStatus).filter(
            HereNowStatus.bar_id == bar.id,
            HereNowStatus.is_here == True
        ).count()
        
        bar_data = BarWithVisitors(
            id=bar.id,
            name=bar.name,
            address=bar.address,
            latitude=bar.latitude,
            longitude=bar.longitude,
            rating=bar.rating,
            total_ratings=bar.total_ratings,
            created_at=bar.created_at,
            here_now_count=here_now_count
        )
        bars_with_visitors.append(bar_data)
    
    return BarSearchResponse(bars=bars_with_visitors, total=len(bars_with_visitors))


@router.get("/{bar_id}", response_model=BarSchema)
def get_bar(bar_id: int, db: Session = Depends(get_db)):
    bar = db.query(Bar).filter(Bar.id == bar_id).first()
    if not bar:
        raise HTTPException(status_code=404, detail="Bar not found")
    return bar


@router.post("/{bar_id}/visit", response_model=BarVisitSchema)
def create_bar_visit(
    bar_id: int,
    visit_data: BarVisitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if bar exists
    bar = db.query(Bar).filter(Bar.id == bar_id).first()
    if not bar:
        raise HTTPException(status_code=404, detail="Bar not found")
    
    # Check if user already visited this bar
    existing_visit = db.query(BarVisit).filter(
        BarVisit.user_id == current_user.id,
        BarVisit.bar_id == bar_id
    ).first()
    
    if existing_visit:
        raise HTTPException(
            status_code=400,
            detail="You have already visited this bar"
        )
    
    # Create new visit
    visit = BarVisit(
        user_id=current_user.id,
        bar_id=bar_id,
        rating=visit_data.rating,
        review=visit_data.review
    )
    db.add(visit)
    
    # Update bar rating
    bar.total_ratings += 1
    bar.rating = (bar.rating * (bar.total_ratings - 1) + visit_data.rating) / bar.total_ratings
    
    db.commit()
    db.refresh(visit)
    return visit


@router.get("/{bar_id}/visits", response_model=List[BarVisitSchema])
def get_bar_visits(
    bar_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    visits = db.query(BarVisit).filter(BarVisit.bar_id == bar_id).all()
    return visits


@router.post("/{bar_id}/here-now")
def toggle_here_now(
    bar_id: int,
    is_here: bool = Query(..., description="Set here now status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if bar exists
    bar = db.query(Bar).filter(Bar.id == bar_id).first()
    if not bar:
        raise HTTPException(status_code=404, detail="Bar not found")
    
    # Check if user already has a here_now status for this bar
    existing_status = db.query(HereNowStatus).filter(
        HereNowStatus.user_id == current_user.id,
        HereNowStatus.bar_id == bar_id
    ).first()
    
    if existing_status:
        existing_status.is_here = is_here
        db.commit()
        return {"message": f"Here now status updated to {is_here}"}
    else:
        # Create new here_now status
        new_status = HereNowStatus(
            user_id=current_user.id,
            bar_id=bar_id,
            is_here=is_here
        )
        db.add(new_status)
        db.commit()
        return {"message": f"Here now status set to {is_here}"}


@router.get("/{bar_id}/here-now")
def get_here_now_users(
    bar_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if bar exists
    bar = db.query(Bar).filter(Bar.id == bar_id).first()
    if not bar:
        raise HTTPException(status_code=404, detail="Bar not found")
    
    # Get users who are currently at this bar
    here_now_users = db.query(User).join(HereNowStatus).filter(
        HereNowStatus.bar_id == bar_id,
        HereNowStatus.is_here == True
    ).all()
    
    return [{"id": user.id, "name": user.name, "email": user.email} for user in here_now_users] 