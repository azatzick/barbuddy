# Barbuddy Backend

A simple FastAPI backend for finding bars near you.

## Features

- **Authentication**: Email/password registration and login
- **Map Functionality**: Find bars near your location
- **Simple & Clean**: Just the essentials you need

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT tokens

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barbuddy
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database info
   ```

5. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb barbuddy
   
   # Run migrations
   alembic upgrade head
   ```

6. **Add sample bars**
   ```bash
   python scripts/setup_db.py
   ```

7. **Run the application**
   ```bash
   python start.py
   ```

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email/password
- `GET /auth/me` - Get current user info

### Bars
- `GET /bars/nearby` - Find bars near your location
- `GET /bars/{bar_id}` - Get bar details
- `GET /bars/` - Get all bars (for testing)

## Database Schema

### Users
- `id`: Primary key
- `email`: Unique email address
- `name`: User's display name
- `hashed_password`: Hashed password
- `is_active`: Account status
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Bars
- `id`: Primary key
- `name`: Bar name
- `address`: Bar address
- `latitude`: GPS latitude
- `longitude`: GPS longitude
- `rating`: Average rating
- `total_ratings`: Number of ratings
- `created_at`: Bar creation timestamp

## Usage Example

1. **Register a user:**
   ```bash
   curl -X POST "http://localhost:8000/auth/register" \
        -H "Content-Type: application/json" \
        -d '{"email": "user@example.com", "name": "John Doe", "password": "password123"}'
   ```

2. **Login:**
   ```bash
   curl -X POST "http://localhost:8000/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email": "user@example.com", "password": "password123"}'
   ```

3. **Find nearby bars:**
   ```bash
   curl -X GET "http://localhost:8000/bars/nearby?latitude=40.7128&longitude=-74.0060&radius=5.0" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://user:password@localhost/barbuddy` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |

## Next Steps

- Build a frontend to consume these APIs
- Add real bar data from a location API
- Deploy to production
