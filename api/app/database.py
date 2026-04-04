"""Database connection and session management for Flask application"""
import functools
import logging

from config import config
from flask import g
from sqlalchemy import create_engine
from sqlalchemy.exc import DisconnectionError, OperationalError, SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import NullPool

logger = logging.getLogger(__name__)

_db_initialized = False

# NullPool: No connection pooling per instance (for ephemeral functions)
engine = create_engine(
    config.DATABASE_URL,
    echo=False,
    poolclass=NullPool,
    connect_args={
        "connect_timeout": 5,
        "application_name": "cora_leaderboard",
        "options": "-c statement_timeout=10000",
    }
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
    """Initialize database tables on startup (called only once)"""
    global _db_initialized

    if _db_initialized:
        logger.debug("Database already initialized, skipping")
        return
    try:

        from app.models import Base
        from app.models.athlete import Athlete
        from app.models.challenge import Challenge
        from app.models.effort import Effort
        from app.models.segment import Segment

        logger.info("Initializing database tables...")
        Base.metadata.create_all(bind=engine)
        _db_initialized = True
        logger.info("Database tables initialized successfully")

    except (OperationalError, DisconnectionError) as e:
        logger.error("Database operation failed: %s", e)
        raise

    except Exception as e:
        logger.error("Non-recoverable database error: %s", e)
        raise
