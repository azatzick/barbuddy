from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, Token, LoginRequest, GoogleAuthRequest
from app.auth import verify_password, get_password_hash, create_access_token
from app.dependencies import get_current_active_user
import httpx

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=Token)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = None
    if user_data.password:
        hashed_password = get_password_hash(user_data.password)
    
    db_user = User(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hashed_password,
        google_id=user_data.google_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_data.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/google", response_model=Token)
async def google_auth(auth_data: GoogleAuthRequest, db: Session = Depends(get_db)):
    # Verify Google token (simplified - you'll need to implement proper Google OAuth)
    # This is a placeholder implementation
    try:
        # In a real implementation, you would verify the token with Google
        # For now, we'll assume the token is valid and contains user info
        # You should implement proper Google OAuth verification here
        
        # Placeholder: extract user info from token
        # This is where you'd decode the Google token and extract user info
        user_info = {"email": "user@example.com", "name": "Google User", "google_id": "google_123"}
        
        # Check if user exists
        user = db.query(User).filter(User.google_id == user_info["google_id"]).first()
        
        if not user:
            # Create new user
            user = User(
                email=user_info["email"],
                name=user_info["name"],
                google_id=user_info["google_id"]
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )


@router.get("/me")
def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    return current_user 