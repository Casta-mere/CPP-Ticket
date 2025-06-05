# Author: Casta-mere

from filelock import FileLock, Timeout
import os
import sys

def ensure_single_instance(lock_filename: str = ".app.lock"):
    lock_path = os.path.join(os.path.dirname(sys.argv[0]), lock_filename)
    lock = FileLock(lock_path)

    try:
        lock.acquire(timeout=0.1)
        return lock
    except Timeout:
        sys.exit(0)
