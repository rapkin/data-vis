from flask.views import MethodView
from flask import jsonify, request

from subapps.auth.models import login as model


class LoginControler(MethodView):

    def post(self):
        """auth by json"""
        username = request.json["username"]
        password = request.json["password"]
        username = str(username)
        password = str(password)

        user_data = [username, password]

        mes, token = model.login(user_data)

        return jsonify({"message": mes, "token": token})
