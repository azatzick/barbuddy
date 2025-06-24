from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Association table for friends relationship
friends = Table(
    'friends',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('friend_id', Integer, ForeignKey('users.id'), primary_key=True)
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String, nullable=True)
    google_id = Column(String, unique=True, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    friends = relationship(
        "User",
        secondary=friends,
        primaryjoin=id == friends.c.user_id,
        secondaryjoin=id == friends.c.friend_id,
        backref="friend_of"
    )
    bar_visits = relationship("BarVisit", back_populates="user")
    here_now_status = relationship("HereNowStatus", back_populates="user")


class Bar(Base):
    __tablename__ = "bars"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    rating = Column(Float, default=0.0)
    total_ratings = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    visits = relationship("BarVisit", back_populates="bar")
    here_now_users = relationship("HereNowStatus", back_populates="bar")


class BarVisit(Base):
    __tablename__ = "bar_visits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    bar_id = Column(Integer, ForeignKey("bars.id"))
    rating = Column(Integer)  # 1-5 stars
    review = Column(String, nullable=True)
    visited_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="bar_visits")
    bar = relationship("Bar", back_populates="visits")


class HereNowStatus(Base):
    __tablename__ = "here_now_status"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    bar_id = Column(Integer, ForeignKey("bars.id"))
    is_here = Column(Boolean, default=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="here_now_status")
    bar = relationship("Bar", back_populates="here_now_users") 