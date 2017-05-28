from flask.views import MethodView
from flask import jsonify, request, render_template
from subapps.auth.models import register as model
from helpers.erorrs import BadRequest


class RegisterControler(MethodView):

    def put(self):
        json = request.get_json()
        user = json.get("username")
        pas = json.get("password")

        if user is None or pas is None:
            raise BadRequest("username or password not provided")

        token = model.register(user, pas)
        json.update({"token": token})
        return jsonify(json)
