from helpers.database import init_db
from helpers.config import load_cfg
from flask import Flask
app = Flask(__name__)

if __name__ == "__main__":
    with app.app_context():
        load_cfg("config.json")
        init_db()
