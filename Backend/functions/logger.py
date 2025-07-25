# Author: Casta-mere
import logging
import queue
import sys

log_queue = queue.Queue()

class QueueHandler(logging.Handler):
    
    def emit(self, record):
        log_entry = self.format(record)
        log_queue.put(log_entry)

def setup_logger(name="app", level=logging.DEBUG, logfile="server.log"):
    formatter = logging.Formatter(
        '[%(asctime)s] [%(levelname)s] [%(module)s.%(funcName)s] %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    logger = logging.getLogger(name)
    logger.setLevel(level)

    if not logger.handlers:
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

        file_handler = logging.FileHandler(logfile, encoding='utf-8')
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

        queue_handler = QueueHandler()
        queue_handler.setFormatter(formatter)
        logger.addHandler(queue_handler)

    return logger

def get_log_queue():
    return log_queue
