from flask.views import MethodView
from flask import jsonify, request, render_template
from helpers.auth import check_token
from subapps.auth.models import users as model


class UsersControler(MethodView):

    def get(self):
        mes = check_token()  	

        data = model.get_all()
        return render_template("auth/users.html", data=data)