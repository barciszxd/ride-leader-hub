"""This route handles Strava webhook events and subscription callbacks."""
import logging

import app.services.athlete as athlete_service
import app.services.effort as effort_service

from app.routes import api_bp
from config import config
from flask import jsonify, request

logger = logging.getLogger(__name__)


@api_bp.get('/webhook')
def subscription_callback():
    """Handle Strava subscription callback"""

    # Get query parameters
    challenge = request.args.get('hub.challenge')
    verify_token = request.args.get('hub.verify_token')

    if verify_token == config.STRAVA_VERIFY_TOKEN:
        return jsonify({"success": True, "hub.challenge": challenge}), 200

    return jsonify({"success": False, "message": "Bad request"}), 403


@api_bp.post('/webhook')
def webhook():
    """Handle Strava webhook events"""
    # Initialize response variables
    status_code = 400
    msg = ""

    data = request.get_json()

    if not data:
        msg = "Received webhook event with no data."
        status_code = 400
        logger.warning(msg)
        return jsonify({"success": False, "message": msg}), status_code

    object_type = data.get('object_type')
    aspect_type = data.get('aspect_type')
    athlete_id = data.get('owner_id')

    # handle activity-related events
    if object_type == 'activity':
        activity_id = data.get('object_id')
        effort_repo = effort_service.EffortRepository()

        if aspect_type == 'create':
            effort_added = effort_repo.add(activity_id, athlete_id)

            msg = f"New activity ...{str(activity_id)[-3:]} of athlete ...{str(athlete_id)[-3:]} registered."

            if effort_added:
                msg += " Segment effort added to the database."
                status_code = 201
            else:
                msg += " No segment effort was added."
                status_code = 200

        elif aspect_type == 'update':
            updates = data.get('updates', {})
            private = updates.get('private', False)

            if private and private == "true":
                deleted_efforts = effort_repo.delete_efforts_by_activity_id(activity_id)

                msg = f"Setting activity ...{str(activity_id)[-3:]} to private registered."
                msg += f" {deleted_efforts} related efforts were deleted." if deleted_efforts else " No efforts to delete from leaderboard."

            elif private and private == "false":
                effort_added = effort_repo.add(activity_id, athlete_id)

                msg = f"Setting activity ...{str(activity_id)[-3:]} to public registered. "

                if effort_added:
                    msg += " Segment effort added to the database."
                    status_code = 201
                else:
                    msg += " No segment effort was added."
                    status_code = 200

            else:
                msg = f"Activity ...{str(activity_id)[-3:]} update registered. No relevant changes detected."
                status_code = 200

        elif aspect_type == 'delete':
            deleted_efforts = effort_repo.delete_efforts_by_activity_id(
                activity_id)

            msg = f"Deletion of activity ...{str(activity_id)[-3:]} registered."
            msg += f" {deleted_efforts} efforts deleted." if deleted_efforts else "No efforts to delete."
            status_code = 200

        else:
            msg = f"Received unsupported aspect type '{aspect_type}' for activity webhook event."
            status_code = 400

    # handle athlete-related events
    elif object_type == 'athlete':
        if aspect_type == 'update':
            effort_repo = effort_service.EffortRepository()
            athlete_repo = athlete_service.AthleteRepository()
            updates = data.get('updates', {})

            # handles the event of athlete deauthorizing the application
            if (authorized := updates.get('authorized', False)) and authorized == "false":
                athlete_deleted = athlete_repo.delete_by_id(athlete_id)
                deleted_efforts = effort_repo.delete_efforts_by_athlete_id(athlete_id)

                msg = f"Athlete ...{str(athlete_id)[-3:]} deauthorized the application. "
                msg += "Athlete record deleted." if athlete_deleted else "No athlete record to delete."
                msg += f" {deleted_efforts} his/her efforts deleted." if deleted_efforts else " No efforts to delete."
                status_code = 200
            else:
                msg = f"Athlete ...{str(athlete_id)[-3:]} update registered. No relevant changes detected."
                status_code = 200
        else:
            msg = f"Received unsupported aspect type '{aspect_type}' for athlete webhook event."
            status_code = 400

    else:
        msg = f"Received unsupported object type '{object_type}' in webhook event."
        status_code = 400

    if status_code >= 400:
        logger.warning(msg)
    else:
        logger.info(msg)

    return jsonify({"success": status_code < 400, "message": msg}), status_code
