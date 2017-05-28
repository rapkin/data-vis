from flask.views import MethodView
from flask import jsonify, request, render_template
from subapps.auth.models import logup as model


class LogupControler(MethodView):

    def put(self):
        user = request.json.get("username")
        pas = request.json.get("password")

        if user is None or pas is None:
            raise BadRequest("username or password not provided")

        username = "'" + str(user) + "'"
        password = "'" + str(pas) + "'"

        data = model.logup(username, password)
        status = data[0]        
        return jsonify({"message": status})
