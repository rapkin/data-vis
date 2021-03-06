from flask import Blueprint, jsonify, current_app
from subapps.api.controller import locations , data_entries, data_sets, search


api = Blueprint('api', "api")

@api.route('/api/config/')
def send_config():
    cfg = current_app.config["MAP"]
    return jsonify(cfg)

locations_api = locations.LocationsAPI.as_view("locations_api")
api.add_url_rule('/api/locations/',
                    view_func=locations_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])

data_sets_api = data_sets.DataSetsAPI.as_view("data_sets_api")
api.add_url_rule('/api/data_sets/',
                    view_func=data_sets_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])

data_entries_api = data_entries.DataEntriesAPI.as_view("data_entries_api")
api.add_url_rule('/api/data_entries/',
                    view_func=data_entries_api,
                    methods=['GET', 'POST', 'PUT', 'DELETE'])

search_api = search.SearchAPI.as_view("search_api")
api.add_url_rule('/api/search/',
                    view_func=search_api,
                    methods=['GET', 'POST'])
