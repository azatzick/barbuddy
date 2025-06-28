from pydantic_settings import BaseSettings
from typing import Optional, List


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql+asyncpg://user:password@localhost/barbuddy"
    
    # JWT
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # API Configuration
    api_v1_prefix: str = "/api/v1"
    project_name: str = "BarBuddy"
    backend_cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"]
    debug: bool = False
    
    # Google OAuth
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings() 