# Author: Casta-mere
import os
import sys
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .functions.login import LoginManager
from pydantic import BaseModel
import uvicorn
import logging

logger = logging.getLogger("uvicorn")

origins = [
    "http://localhost:8555",  
    "http://127.0.0.1:8555", 
]

loginmanager = LoginManager()

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

@app.post("/api/login")
async def login(req: LoginRequest):
    logger.info("Login attempt with account: %s, password: %s", req.account, req.password)
    result = loginmanager.login(req.account, req.password)
    return result

@app.get("/api/login")
async def loggedIn():
    if loginmanager._is_loggedIn():
        return {"loggedIn": True}
    return {"loggedIn": False}

@app.get("/api/user")
async def userInfo():
    return loginmanager.get_user_info()

@app.post("/api/logout")
async def logout():
    logger.info(f"Logout for {loginmanager.account}")
    loginmanager.logout()

def get_static_dir():
    if hasattr(sys, "_MEIPASS"):
        return os.path.join(sys._MEIPASS, "Frontend/static")
    return os.path.abspath("Frontend/static")

app.mount("/", StaticFiles(directory=get_static_dir(), html=True), name="static")

def run_backend(app):
    uvicorn.run(app, host="127.0.0.1", port=8765, log_config=None)

if __name__ == "__main__":
    run_backend(app)
