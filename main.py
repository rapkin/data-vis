#!/usr/bin/env python

from flask import Flask, send_from_directory, request, Response, jsonify
from api.controler import api
import json
import models

app = Flask(__name__)

app.register_blueprint(api)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/bower_components/<path:path>')
def send_bower_components(path):
    return send_from_directory('bower_components', path)

# @app.route('/api/config/')
# def config():
#     with open('config.json') as data_file:
#         data = json.load(data_file)
#         return jsonify(data)
#
# @app.route('/api/cities/')
# def cities():
#     data = models.cities.get_all()
#     return jsonify({"list":data})
#
# @app.route('/api/data_sets/')
# def data_sets():
#     data = models.data_sets.get_all()
#     return jsonify({"sets":data})
#
# @app.route('/api/data_entries/', methods=['GET', 'POST'])
# def data_entries():
#     filter = request.get_json(silent=True)
#     data = models.data_entries.get_by_set_city_time(filter)
#     return jsonify({"data":data})

@app.route('/')
def root():
    return send_from_directory('static', 'index.html')

if __name__ == "__main__":
    app.run(port=3333, debug=True)
