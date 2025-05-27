# Author: Casta-mere
import tkinter as tk
from Backend.server import log_queue

class BackendAppUI:

    def __init__(self, run_backend_func, app):
        self.server = None
        self.run_backend_func = run_backend_func
        self.app = app

        self.root = tk.Tk()
        self.root.title("Backend Logs")
        self.root.geometry("1000x600") 

        self.frame = tk.Frame(self.root)
        self.frame.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

        self.text_widget = tk.Text(self.frame, height=20, width=80)
        self.text_widget.pack(fill=tk.BOTH, expand=True)

        self.quit_button = tk.Button(self.frame, text="Quit", command=self.on_quit)
        self.quit_button.pack(pady=(10, 0), anchor='e')

    def run_backend_wrapper(self):
        self.run_backend_func(self.app)

    def update_log_text(self):
        while not log_queue.empty():
            log_text = log_queue.get_nowait()
            self.text_widget.insert(tk.END, log_text + "\n")
            self.text_widget.see(tk.END)
        self.root.after(100, self.update_log_text)

    def on_quit(self):
        self.root.destroy()
