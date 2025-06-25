# Barbuddy

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
