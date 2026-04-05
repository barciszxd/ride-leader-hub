"""API entry point. This file is used to start the Flask application.
"""
import sys
import os

# Add API directory to path so Python can find the app module
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

app = create_app()

# For testing locally
if __name__ == '__main__':
    app.run(debug=True)
