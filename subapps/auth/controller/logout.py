from flask.views import MethodView
from flask import jsonify
from subapps.auth.models import logout as model
from helpers.auth import check_token

class LogoutControler(MethodView):

    def det(self):
        """auth by form"""
        user_id =	check_token()

        mes = model.logout(user_id)

        return jsonify({"message": mes})
