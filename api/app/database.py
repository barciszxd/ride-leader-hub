"""Database connection and session management for Flask application"""
import logging

from config import config
from flask import g
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import NullPool

logger = logging.getLogger(__name__)

# Create database engine optimized for serverless environments
engine = create_engine(
    config.DATABASE_URL,
    echo=False,
    poolclass=NullPool
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db_session() -> Session:
    """Get or create a database session for the current request"""
    if 'db_session' not in g:
        g.db_session = SessionLocal()
    return g.db_session


def close_db_session(error=None) -> None:
    """Close the database session at the end of the request"""
    session = g.pop('db_session', None)
    if session is not None:
        try:
            if error is None:
                session.commit()
            else:
                session.rollback()
        except SQLAlchemyError as e:
            logger.error("Error closing session: %s", e)
            session.rollback()
        finally:
            session.close()


def init_db():
    """Initialize database tables on startup.

    base.metadata.create_all() is idempotent - it only creates tables that don't exist.
    Safe to call multiple times on warm container restarts.
    """
    try:
        from app.models import Base
        from app.models.athlete import Athlete
        from app.models.challenge import Challenge
        from app.models.effort import Effort
        from app.models.segment import Segment

        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized successfully")
    except Exception as e:
        logger.error("Failed to initialize database: %s", e)
        raise
