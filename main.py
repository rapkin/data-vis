#!/usr/bin/env python

from flask import Flask, send_from_directory
from subapps.api.index import api
from helpers.database import get_db
from helpers.config import load_cfg


app = Flask(__name__)

#/api/ routes
app.register_blueprint(api)


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@app.route('/bower_components/<path:path>')
def send_bower_components(path):
    return send_from_directory('bower_components', path)


@app.route('/')
def root():
    return send_from_directory('static', 'index.html')


if __name__ == "__main__":
    #app.config.from_object("configs.dev_cfg.DevelopmentConfig")

    # To init database uncoment code
    # from helpers.database import init_db
    # with app.app_context():
    #     load_cfg("config.json")
    #     init_db()

    with app.app_context():
        load_cfg("config.json")
        app.app_ctx_globals_class.db_conn = get_db()

    app.run(port=app.config["PORT"])
