from datetime import datetime


def now():
    return datetime.now().isoformat(" ")

def decode_iso(iso_str):
    return datetime.strptime(iso_str, "%Y-%m-%d %H:%M:%S.%f" )

def time():
    return datetime.now()