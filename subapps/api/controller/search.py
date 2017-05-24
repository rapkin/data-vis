from flask.views import MethodView
from flask import jsonify, request
from helpers.auth import check_token
from subapps.api.models import search as model
from werkzeug.exceptions import BadRequest


class SearchAPI(MethodView):

    def get(self):
        q = request.args.get('q')
        table = request.args.get('table')
        user_id = check_token()

        if q is None:
            raise BadRequest("Url adrg q is not provided") 	
        elif table is not None:
        	table = table.split(",")
        	if len(table)!=1:
        		raise BadRequest("Only one table per req")
        	data = model.get_by_name(user_id, q, table[0])
        else:
        	tables = ["cities", "data_sets"]
        	data = model.get_by_name(user_id, q, tables)    

        status, values = data
        return jsonify({"list": values, "message": status})
