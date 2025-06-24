from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, BarVisit, HereNowStatus, Bar
from app.schemas import UserUpdate, BarVisit as BarVisitSchema
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("/")
def get_profile(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.put("/")
def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.email is not None:
        # Check if email is already taken
        existing_user = db.query(User).filter(
            User.email == user_update.email,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already taken")
        current_user.email = user_update.email
    
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/visits", response_model=List[BarVisitSchema])
def get_my_visits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    visits = db.query(BarVisit).filter(BarVisit.user_id == current_user.id).all()
    return visits


@router.get("/stats")
def get_profile_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Get total visits
    total_visits = db.query(BarVisit).filter(BarVisit.user_id == current_user.id).count()
    
    # Get average rating given
    avg_rating = db.query(BarVisit.rating).filter(BarVisit.user_id == current_user.id).all()
    avg_rating = sum(rating[0] for rating in avg_rating) / len(avg_rating) if avg_rating else 0
    
    # Get current here_now status
    current_here_now = db.query(HereNowStatus).filter(
        HereNowStatus.user_id == current_user.id,
        HereNowStatus.is_here == True
    ).first()
    
    current_bar = None
    if current_here_now:
        bar = db.query(Bar).filter(Bar.id == current_here_now.bar_id).first()
        current_bar = bar.name if bar else None
    
    # Get favorite bars (most visited)
    favorite_bars = db.query(Bar.name, db.query(BarVisit).filter(
        BarVisit.user_id == current_user.id,
        BarVisit.bar_id == Bar.id
    ).count().label('visit_count')).filter(
        db.query(BarVisit).filter(
            BarVisit.user_id == current_user.id,
            BarVisit.bar_id == Bar.id
        ).count() > 0
    ).order_by(db.query(BarVisit).filter(
        BarVisit.user_id == current_user.id,
        BarVisit.bar_id == Bar.id
    ).count().desc()).limit(5).all()
    
    return {
        "total_visits": total_visits,
        "average_rating_given": round(avg_rating, 2),
        "current_location": {
            "is_here_now": current_here_now is not None,
            "bar_name": current_bar
        },
        "favorite_bars": [
            {"name": bar.name, "visit_count": visit_count}
            for bar, visit_count in favorite_bars
        ]
    }


@router.get("/activity")
def get_my_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Get recent visits
    recent_visits = db.query(BarVisit).filter(
        BarVisit.user_id == current_user.id
    ).order_by(BarVisit.visited_at.desc()).limit(10).all()
    
    # Get current here_now status
    current_here_now = db.query(HereNowStatus).filter(
        HereNowStatus.user_id == current_user.id,
        HereNowStatus.is_here == True
    ).first()
    
    current_bar = None
    if current_here_now:
        bar = db.query(Bar).filter(Bar.id == current_here_now.bar_id).first()
        current_bar = bar.name if bar else None
    
    return {
        "current_location": {
            "is_here_now": current_here_now is not None,
            "bar_name": current_bar
        },
        "recent_visits": [
            {
                "bar_name": visit.bar.name,
                "rating": visit.rating,
                "review": visit.review,
                "visited_at": visit.visited_at
            }
            for visit in recent_visits
        ]
    } 