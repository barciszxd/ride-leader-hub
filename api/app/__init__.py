"""Flask application factory"""
import logging

from app.database import close_db_session, init_db
from config import config
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError

logger = logging.getLogger(__name__)


def create_app():
    """Create and configure Flask application"""
    app = Flask(__name__)

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(error):
        """Global database exception handler"""
        logger.error("Database error: %s", error)
        return jsonify({
            "success": False,
            "error": "Database connection issue. Please try again.",
            "details": str(error)
        }), 503

    app.config.from_object(config)

    # Register blueprints
    from app.api.routes import api_bp  # pylint: disable=import-outside-toplevel

    if config.DEBUG:
        CORS(
            app,
            origins=['http://localhost:8080'],
            supports_credentials=True       # Allow HTTP-only cookies to be sent
        )
    else:
        CORS(
            app,
            supports_credentials=True      # Allow HTTP-only cookies to be sent
        )

    app.register_blueprint(api_bp, url_prefix='/api')

    # Initialize database tables only once at startup (not on every request)
    init_db()

    # Register session cleanup for each request
    app.teardown_appcontext(close_db_session)

    return app


app = create_app()

if __name__ == '__main__':
    app.run()
