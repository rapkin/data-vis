from flask import Blueprint, jsonify, request, current_app
from . import cities
import json
import models

api = Blueprint('api', "api")

@api.route('/api/config/')
def send_config():
    cfg = current_app.config["MAPBOX"]
    return jsonify(cfg)


cities_api = cities.CitiesAPI.as_view("cities_api")
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
