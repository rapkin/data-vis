#!/usr/bin/env python

from flask import Flask, send_from_directory, request, Response, jsonify
from api.index import api
from helpers.database import get_db
import json
import models

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
    
    #print(dir(app.app_context))
    with app.app_context():
        app.config.from_object("configs.dev_cfg.DevelopmentConfig")
        get_db(app)
    
        app.run(port=app.config["PORT"])

