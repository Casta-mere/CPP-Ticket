# Author: Casta-mere
from .constants import HEADERS, LOGIN_URL, DB_PATH, CREATE_DB, USER_INFO_URL
import sqlite3
import requests
import logging
import json
import time

logger = logging.getLogger("uvicorn")

class LoginManager:

    def  __init__(self):
        self._create_table()
        self.account = None
        self.cookies = None
        self.loggedIn = False
        self.userInfo = {}
        self._load_if_exists()

    def _get_conn(self):
        return sqlite3.connect(DB_PATH)

    def _create_table(self):
        with self._get_conn() as conn:
            conn.execute(CREATE_DB)

    def _load_if_exists(self):
        with self._get_conn() as conn:
            cur = conn.cursor()
            cur.execute("SELECT account, cookies_dict FROM cookies LIMIT 1")
            row = cur.fetchone()
            if row:
                self.account, cookies_str = row
                self.cookies = json.loads(cookies_str)
                if self._is_cookie_valid(self.cookies):
                    self.loggedIn = True
                    self._get_user_info()
                else:
                    self.account = None
                    self.cookies = None

    def login(self, account: str, password: str):
        data = f"account={account}&password={password}&phoneAccountBindToken=undefined&thirdAccountBindToken=undefined"
        response = requests.post(LOGIN_URL, headers=HEADERS, data=data)
        logger.info(response.json())
        logger.info(response)
        if response.status_code == 200:
            self.loggedIn = True
            self.account = account
            self.cookies = response.cookies.get_dict()
            self._save_cookies()
            self._get_user_info()
            return {"success": True, "cookies": self.cookies}
        elif  response.json()["description"] :
            return {"success": False, "errormsg": response.json()["description"]}
        return {"success": False, "errormsg": "出现未知问题"}

    def get_cookie(self, account: str):
        self.account = account
        self.cookies = self._load_cookies(account)
        if self.cookies and self._is_cookie_valid(self.cookies):
            return self.cookies
        return None
    
    def _is_cookie_valid(self, cookie):
        # TODO implement cookie check
        return True

    def _save_cookies(self):
        with self._get_conn() as conn:
           conn.execute(
                "REPLACE INTO cookies (account, cookies_dict, timestamp) VALUES (?, ?, ?)",
                (self.account, json.dumps(self.cookies), int(time.time()))
            )

    def _load_cookies(self, account: str):
        with self._get_conn() as conn:
            cur = conn.cursor()
            cur.execute("SELECT cookies_dict FROM cookies WHERE account = ?", (account))
            row = cur.fetchone()
            if row:
                return json.loads(row[0])
            return None
    
    def _is_loggedIn(self):
        return self.loggedIn

    def logout(self):
        with self._get_conn() as conn:
            conn.execute("DELETE FROM cookies WHERE account = ?", (self.account,))
        self.loggedIn = False
        self.account = None
        self.cookies = None
        self.userInfo = {}

    def _get_user_info(self):
        try:
            response = requests.get(USER_INFO_URL, headers=HEADERS, cookies=self.cookies)
            res = response.json()
            logger.info(res)
            self.userInfo["nickname"] = res.get("nickname", "")
            self.userInfo["faceUrl"] =  "https://imagecdn3.allcpp.cn/face" + res.get("face", {}).get("picUrl", "")
            logger.info("Fetched user info: %s", self.userInfo)
        except requests.RequestException as e:
            logger.error("Failed to fetch user info: %s", e)
        except ValueError as e:
            logger.error("Failed to parse JSON response: %s", e)

    def get_user_info(self):
        if self.loggedIn:
            return self.userInfo
        else: return None
