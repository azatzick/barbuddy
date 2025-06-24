from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, bars, friends, profile
from app.database import engine
from app.models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Barbuddy API",
    description="A social app for tracking bar visits and connecting with friends",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(bars.router)
app.include_router(friends.router)
app.include_router(profile.router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to Barbuddy API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"} 