#!/usr/bin/env python

from flask import Flask, send_from_directory
from subapps.api.index import api
from subapps.auth.index import auth
from helpers.database import get_db
from helpers.config import load_cfg


app = Flask(__name__)

app.register_blueprint(api)
app.register_blueprint(auth)


@app.route('/dist/<path:path>')
def send_dist(path):
    app.logger.error(path)
    return send_from_directory('dist', path)


@app.route('/')
def root():
    return send_from_directory('dist', 'index.html')


if __name__ == "__main__":
    #app.config.from_object("configs.dev_cfg.DevelopmentConfig")
    with app.app_context():
        load_cfg("config.json")
        app.app_ctx_globals_class.db_conn = get_db()

    app.run(port=app.config["PORT"])
