from flask.views import MethodView
from flask import jsonify, request
from helpers.auth import check_token
from subapps.api.models import search as model
from werkzeug.exceptions import BadRequest


class SearchAPI(MethodView):

    def get(self):
        name = request.args.get('q')

        if name is None:
            raise BadRequest("Url adrg name is not provided")

        user_id = check_token()

        data = model.get_by_name(user_id, name)

        status, values = data
        return jsonify({"list": values, "message": status})