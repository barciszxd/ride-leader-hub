import sys
import os

# Add API directory to path so Python can find the app module
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

app = create_app()