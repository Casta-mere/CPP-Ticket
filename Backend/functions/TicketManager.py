# Author: Casta-mere
from .constants import EVENTS_URL, HEADERS, EVENTS_FILE_PATH
import requests
import logging
from datetime import datetime
import json
import os

logger = logging.getLogger("uvicorn")

class TicketManager:

    def __init__(self):
        self.events = self._load_events_from_file()

    def _get_events_from_api(self):
        try:
            response = requests.get(EVENTS_URL, headers=HEADERS)
            response.raise_for_status()
            res = response.json()
            if res.get("isSuccess") and "result" in res:
                return res["result"].get("list", [])
            else:
                logger.warning("API returned unsuccessful or invalid structure.")
                return []
        except Exception as e:
            logger.error(f"Error fetching events: {e}")
            return []
        
    def _save_events_to_file(self, events):
        os.makedirs(os.path.dirname(EVENTS_FILE_PATH), exist_ok=True)
        with open(EVENTS_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump({
                "updatedAt": datetime.now().isoformat(),
                "events": events
            }, f, ensure_ascii=False, indent=2)

    def _load_events_from_file(self):
        if not os.path.exists(EVENTS_FILE_PATH):
            return [] 
        with open(EVENTS_FILE_PATH, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                return data.get("events", [])
            except json.JSONDecodeError:
                logger.warning("JSON decode error - events file may be corrupted or empty.")
                return []

    def update_events(self):
        self.events = self._get_events_from_api()
        if self.events:
            self._save_events_to_file(self.events)
            logger.info(f"Updated {len(self.events)} events.")
        else:
            logger.warning("No events to update.")

    def get_events(self):
        if not self.events:
            logger.info("No local events found. Fetching from API...")
            self.update_events()
            self.events = self._load_events_from_file()
        return self.events or []

    def get_last_update_time(self):
        if not os.path.exists(EVENTS_FILE_PATH):
            return [] 
        with open(EVENTS_FILE_PATH, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                return data.get("updatedAt")
            except json.JSONDecodeError:
                logger.warning("JSON decode error - events file may be corrupted or empty.")
                return []
