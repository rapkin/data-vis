from flask.views import MethodView
from flask import jsonify, request
from helpers.erorrs import BadRequest
from subapps.auth.models import login as model


class LoginControler(MethodView):

    def post(self):
        """auth by json"""
        user = request.json.get("username")
        pas = request.json.get("password")

        if user is None or pas is None:
            raise BadRequest("username or password not provided")

        user_data = [str(user), str(pas)]

        token = model.login(user_data)

        return jsonify({"token": token})
