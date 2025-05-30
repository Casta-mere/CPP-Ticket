# Author: Casta-mere

import tkinter as tk
from .functions.logger import log_queue

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

        self.popup_menu = tk.Menu(self.root, tearoff=0)
        self.popup_menu.add_command(label="Copy", command=self.copy_selection)

        self.text_widget.bind("<Button-3>", self.show_context_menu)

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

    def copy_selection(self, event=None):
        try:
            selection = self.text_widget.get(tk.SEL_FIRST, tk.SEL_LAST)
            self.root.clipboard_clear()
            self.root.clipboard_append(selection)
        except tk.TclError:
            pass 

    def show_context_menu(self, event):
        try:
            self.popup_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.popup_menu.grab_release()