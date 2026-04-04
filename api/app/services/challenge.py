"""Challenge Repository Module"""
from datetime import datetime, timedelta, timezone

from app.database import get_db_session
from app.models.challenge import Challenge
from app.services.segment import SegmentRepository


class ChallengeRepository:
    """Repository for managing Challenge records in the database."""

    def __init__(self):
        self.session = get_db_session()

    def add(self, challenge_data: dict) -> Challenge | None:
        """Add a new challenge."""
        climb_segment_id  = challenge_data.get('climb_segment_id', 0)
        sprint_segment_id = challenge_data.get('sprint_segment_id', 0)

        segment_repo = SegmentRepository()
        if segment_repo.create(climb_segment_id) is None:
            return None
        if segment_repo.create(sprint_segment_id) is None:
            return None

        challenge = Challenge(
            climb_segment_id  = climb_segment_id,
            sprint_segment_id = sprint_segment_id,
            start_date        = challenge_data.get('start_date', datetime.now(timezone.utc)),
            end_date          = challenge_data.get('end_date', datetime.now(timezone.utc) + timedelta(days=14))
        )
        self.session.add(challenge)

        return challenge

    def delete_by_id(self, challenge_id: int) -> bool:
        """Delete challenge by ID."""
        deleted_count = self.session.query(Challenge).filter_by(id=challenge_id).delete()
        return deleted_count > 0

    def get_by_id(self, challenge_id: int) -> Challenge | None:
        """Get challenge by ID."""
        return self.session.query(Challenge).filter_by(id=challenge_id).first()

    def get_current(self) -> Challenge | None:
        """Get current active challenge.

        Returns the challenge where current time is between start_time and end_time.

        Returns:
            Challenge | None: The current active challenge if found, otherwise None.
        """
        current_time = datetime.now(timezone.utc)

        return self.session.query(Challenge).filter(
            Challenge.start_date <= current_time,
            Challenge.end_date >= current_time
        ).first()

    def get_by_year(self, year: int) -> list[Challenge]:
        """Get challenges by year."""
        start_of_year = datetime(year, 1, 1, tzinfo=timezone.utc)
        end_of_year   = datetime(year, 12, 31, 23, 59, 59, tzinfo=timezone.utc)

        return self.session.query(Challenge).filter(
            Challenge.start_date >= start_of_year,
            Challenge.end_date <= end_of_year
        ).all()
