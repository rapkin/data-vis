from flask.views import MethodView
from flask import jsonify
from subapps.auth.models import logout as model
from helpers.auth import get_token

class LogoutControler(MethodView):

    def post(self):
        """auth by form"""
        token =	get_token()

        mes = model.logout(token)

        return jsonify({"message": mes})