#!/usr/bin/env python

from flask import Flask, send_from_directory, request, Response, jsonify
from api.index import api
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
    app.config.from_object("configs.dev_cfg.DevelopmentConfig")
    
    app.run(port=app.config["APP_PORT"])

