# Author: Casta-mere
import threading
import time
import webbrowser
from Backend.server import run_backend
from Backend.server import app
from Backend.ui import BackendAppUI
from Backend.functions.logger import setup_logger

if __name__ == "__main__":
    logger = setup_logger("uvicorn") 
    logger.info("Server started")
    app_ui = BackendAppUI(run_backend_func=run_backend, app=app)
    threading.Thread(target=app_ui.run_backend_wrapper, daemon=True).start()
    time.sleep(2)
    webbrowser.open("http://127.0.0.1:8765")
    app_ui.root.after(100, app_ui.update_log_text)
    app_ui.root.mainloop()
