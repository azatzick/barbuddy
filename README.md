# Barbuddy Backend

A FastAPI backend for Barbuddy - a social app for tracking bar visits and connecting with friends.

## Features

- **Authentication**: Email/password and Google OAuth support
- **Map Functionality**: Find bars near your location
- **Friend System**: Add friends and see their bar activities
- **Profile Management**: Track your bar visits and ratings
- **Here Now Feature**: Toggle your presence at bars to let friends know you're there

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT tokens
- **Migrations**: Alembic

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
   # Edit .env with your configuration
   ```

5. **Set up PostgreSQL database**
   ```bash
   # Open the PostgreSQL prompt
   psql postgres

   # In the prompt, run:
   CREATE USER user WITH PASSWORD 'password';
   CREATE DATABASE barbuddy OWNER user;
   ```

6. **Run the application**
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email/password
- `POST /auth/google` - Login with Google OAuth
- `GET /auth/me` - Get current user info

### Bars
- `GET /bars/nearby` - Find bars near your location
- `GET /bars/{bar_id}` - Get bar details
- `POST /bars/{bar_id}/visit` - Rate and review a bar
- `GET /bars/{bar_id}/visits` - Get all visits for a bar
- `POST /bars/{bar_id}/here-now` - Toggle here now status
- `GET /bars/{bar_id}/here-now` - Get users currently at a bar

### Friends
- `POST /friends/add` - Add a friend by email
- `DELETE /friends/remove/{friend_id}` - Remove a friend
- `GET /friends/` - Get your friends list
- `GET /friends/{friend_id}/activity` - Get friend's activity
- `GET /friends/activity` - Get all friends' current locations

### Profile
- `GET /profile/` - Get your profile
- `PUT /profile/` - Update your profile
- `GET /profile/visits` - Get your bar visits
- `GET /profile/stats` - Get your statistics
- `GET /profile/activity` - Get your recent activity

## Database Schema

### Users
- `id`: Primary key
- `email`: Unique email address
- `name`: User's display name
- `hashed_password`: Hashed password (nullable for Google OAuth)
- `google_id`: Google OAuth ID (nullable)
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

### Bar Visits
- `id`: Primary key
- `user_id`: Foreign key to users
- `bar_id`: Foreign key to bars
- `rating`: User's rating (1-5)
- `review`: Optional review text
- `visited_at`: Visit timestamp

### Here Now Status
- `id`: Primary key
- `user_id`: Foreign key to users
- `bar_id`: Foreign key to bars
- `is_here`: Current presence status
- `updated_at`: Last status update

### Friends (Association Table)
- `user_id`: Foreign key to users
- `friend_id`: Foreign key to users

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Database Migrations
```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migrations
alembic downgrade -1
```

### Code Formatting
```bash
# Install formatting tools
pip install black isort

# Format code
black app/
isort app/
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost/barbuddy` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `None` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `None` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `["http://localhost:3000", "http://localhost:8000"]` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.