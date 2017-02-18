from flask import Blueprint, jsonify, request
from . import cities_controler
import json
import models

api = Blueprint('api', __name__)

@api.route('/api/config/')
def config():
    with open('config.json') as data_file:
        data = json.load(data_file)
        return jsonify(data)


cities_api = cities_controler.CitiesAPI.as_view("cities_api")
api.add_url_rule('/api/cities/',
                    view_func=cities_api,
                    methods=['GET', 'POST', 'PUT'])



@api.route('/api/data_sets/')
def data_sets():
    data = models.data_sets.get_all()
    return jsonify({"sets":data})

@api.route('/api/data_entries/', methods=['GET', 'POST'])
def data_entries():
    filter = request.get_json(silent=True)
    data = models.data_entries.get_by_set_city_time(filter)
    return jsonify({"data":data})
