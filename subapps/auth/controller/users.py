from flask.views import MethodView
from flask import jsonify, render_template
from helpers.auth import check_token
from subapps.auth.models import users as model


class UsersControler(MethodView):

    def get(self):
        check_token()

        data = model.get_all()
        return jsonify({"list":data})
