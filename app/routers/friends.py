from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, BarVisit, HereNowStatus, Bar
from app.schemas import FriendRequest, FriendResponse
from app.dependencies import get_current_active_user

router = APIRouter(prefix="/friends", tags=["friends"])


@router.post("/add")
def add_friend(
    friend_request: FriendRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Find the friend by email
    friend = db.query(User).filter(User.email == friend_request.friend_email).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User not found")
    
    if friend.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot add yourself as a friend")
    
    # Check if already friends
    if friend in current_user.friends:
        raise HTTPException(status_code=400, detail="Already friends")
    
    # Add friend
    current_user.friends.append(friend)
    db.commit()
    
    return {"message": f"Added {friend.name} as a friend"}


@router.delete("/remove/{friend_id}")
def remove_friend(
    friend_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    friend = db.query(User).filter(User.id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    
    if friend not in current_user.friends:
        raise HTTPException(status_code=400, detail="Not friends")
    
    # Remove friend
    current_user.friends.remove(friend)
    db.commit()
    
    return {"message": f"Removed {friend.name} from friends"}


@router.get("/", response_model=List[FriendResponse])
def get_friends(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    friends_response = []
    
    for friend in current_user.friends:
        # Check if friend is currently at a bar
        here_now_status = db.query(HereNowStatus).filter(
            HereNowStatus.user_id == friend.id,
            HereNowStatus.is_here == True
        ).first()
        
        current_bar = None
        if here_now_status:
            bar = db.query(Bar).filter(Bar.id == here_now_status.bar_id).first()
            current_bar = bar.name if bar else None
        
        friend_data = FriendResponse(
            id=friend.id,
            name=friend.name,
            email=friend.email,
            is_here_now=here_now_status is not None,
            current_bar=current_bar
        )
        friends_response.append(friend_data)
    
    return friends_response


@router.get("/{friend_id}/activity")
def get_friend_activity(
    friend_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if they are friends
    friend = db.query(User).filter(User.id == friend_id).first()
    if not friend or friend not in current_user.friends:
        raise HTTPException(status_code=404, detail="Friend not found")
    
    # Get friend's bar visits
    visits = db.query(BarVisit).filter(BarVisit.user_id == friend_id).all()
    
    # Get friend's current here_now status
    here_now_status = db.query(HereNowStatus).filter(
        HereNowStatus.user_id == friend_id,
        HereNowStatus.is_here == True
    ).first()
    
    current_bar = None
    if here_now_status:
        bar = db.query(Bar).filter(Bar.id == here_now_status.bar_id).first()
        current_bar = bar.name if bar else None
    
    return {
        "friend": {
            "id": friend.id,
            "name": friend.name,
            "email": friend.email
        },
        "current_location": {
            "is_here_now": here_now_status is not None,
            "bar_name": current_bar
        },
        "visits": [
            {
                "bar_name": visit.bar.name,
                "rating": visit.rating,
                "review": visit.review,
                "visited_at": visit.visited_at
            }
            for visit in visits
        ]
    }


@router.get("/activity")
def get_friends_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Get all friends' current here_now status
    friends_here_now = []
    
    for friend in current_user.friends:
        here_now_status = db.query(HereNowStatus).filter(
            HereNowStatus.user_id == friend.id,
            HereNowStatus.is_here == True
        ).first()
        
        if here_now_status:
            bar = db.query(Bar).filter(Bar.id == here_now_status.bar_id).first()
            friends_here_now.append({
                "friend": {
                    "id": friend.id,
                    "name": friend.name,
                    "email": friend.email
                },
                "bar": {
                    "id": bar.id,
                    "name": bar.name,
                    "address": bar.address
                },
                "since": here_now_status.updated_at
            })
    
    return {
        "friends_here_now": friends_here_now,
        "total_friends_here_now": len(friends_here_now)
    } 