from flask import Blueprint, jsonify, request, current_app
from subapps.api.controller import cities , data_entries, data_sets


api = Blueprint('api', "api")

@api.route('/api/config/')
def send_config():
    cfg = current_app.config["MAPBOX"]
    return jsonify(cfg)


cities_api = cities.CitiesAPI.as_view("cities_api")
api.add_url_rule('/api/cities/',
                    view_func=cities_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])

data_sets_api = data_sets.DataSetsAPI.as_view("data_sets_api")
api.add_url_rule('/api/data_sets/',
                    view_func=data_sets_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])

data_entries_api = data_entries.DataEntriesAPI.as_view("data_entries_api")
api.add_url_rule('/api/data_entries/',
                    view_func=data_entries_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])
