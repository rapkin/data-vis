from flask import Blueprint, jsonify, request
import json
import models

api = Blueprint('api', __name__)

@api.route('/api/config/')
def config():
    with open('config.json') as data_file:
        data = json.load(data_file)
        return jsonify(data)

@api.route('/api/cities/')
def cities():
    data = models.cities.get_all()
    return jsonify({"list":data})

@api.route('/api/data_sets/')
def data_sets():
    data = models.data_sets.get_all()
    return jsonify({"sets":data})

@api.route('/api/data_entries/', methods=['GET', 'POST'])
def data_entries():
    filter = request.get_json(silent=True)
    data = models.data_entries.get_by_set_city_time(filter)
    return jsonify({"data":data})
