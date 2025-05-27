# Author: Casta-mere
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn
import logging
import queue

app = FastAPI()

def get_static_dir():
    if hasattr(sys, "_MEIPASS"):
        return os.path.join(sys._MEIPASS, "Frontend/static")
    return os.path.abspath("Frontend/static")

app.mount("/", StaticFiles(directory=get_static_dir(), html=True), name="static")

log_queue = queue.Queue()

class LogHandler(logging.Handler):
    def emit(self, record):
        log_queue.put(self.format(record))

def run_backend(app):
    logger = logging.getLogger("uvicorn")
    logger.setLevel(logging.INFO)
    handler = LogHandler()
    handler.setFormatter(logging.Formatter('%(message)s'))
    logger.addHandler(handler)

    uvicorn.run(app, host="127.0.0.1", port=8765, log_config=None)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8765)
