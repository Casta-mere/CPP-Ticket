# Author: Casta-mere
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .functions.Manager import Manager
from .functions.TicketManager import TicketManager
from typing import List
from pydantic import BaseModel
import uvicorn
import logging

STATIC_DIR_NAME = "Frontend/static"

logger = logging.getLogger("uvicorn")

origins = [
    "http://localhost:8555",  
    "http://127.0.0.1:8555", 
]

manager = Manager()
ticketManager = TicketManager()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],   
)

class LoginRequest(BaseModel):
    account: str
    password: str
class selectBuyerRequest(BaseModel):
    selected: List[str]

class selectEventRequest(BaseModel):
    event_id: str

@app.post("/api/login")
async def login(req: LoginRequest):
    logger.info("Login attempt with account: %s, password: %s", req.account, req.password)
    result = manager.login(req.account, req.password)
    return result

@app.get("/api/login")
async def loggedIn():
    if manager._is_loggedIn():
        return {"loggedIn": True}
    return {"loggedIn": False}

@app.get("/api/user")
async def userInfo():
    return manager.get_user_info()

@app.get("/api/buyer")
async def buyerInfo():
    return manager.get_buyer_info()

@app.get("/api/selectBuyer")
async def selectedBuyerInfo():
    return manager.get_selected_buyer_info()

@app.post("/api/logout")
async def logout():
    logger.info(f"Logout for {manager.account}")
    manager.logout()

@app.post("/api/selectBuyer")
async def selectBuyer(req: selectBuyerRequest):
    logger.info(f"Select {req.selected}")
    result = manager.selectBuyer(req.selected)
    return result

@app.get("/api/events")
async def getEvents():
    return {"events": ticketManager.get_events()}

@app.get("/api/events/updatetime")
async def getEventsUpdate():
    return {"updatedAt": ticketManager.get_last_update_time()}

@app.post("/api/events/update")
async def EventsUpdate():
    ticketManager.update_events()

@app.post("/api/events/select")
async def selectEvent(req: selectEventRequest):
    result = ticketManager.save_selected_event(req.event_id)
    return result

@app.get("/api/events/select")
async def getSelectedEvent():
    return {"event_id": ticketManager.get_selected_event_id()}

def get_static_dir():
    if hasattr(sys, "_MEIPASS"):
        static_dir = os.path.join(sys._MEIPASS, STATIC_DIR_NAME)
    else:
        static_dir = os.path.abspath(STATIC_DIR_NAME)
    if not os.path.exists(static_dir):
        os.makedirs(static_dir, exist_ok=True)
    return static_dir

app.mount("/", StaticFiles(directory=get_static_dir(), html=True), name="static")

def run_backend(app):
    uvicorn.run(app, host="127.0.0.1", port=8765, log_config=None)

if __name__ == "__main__":
    run_backend(app)
