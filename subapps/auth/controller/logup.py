from flask.views import MethodView
from flask import jsonify, request, render_template
from subapps.auth.models import logup as model


class LogupControler(MethodView):

    def get(self):
        return render_template("logup.html")

    def post(self):
        print(request.form)
        username = request.form["username"]
        password = request.form["password"]
        print("3")
        username = "'" + str(username) + "'"
        password = "'" + str(password) + "'"

        data = model.logup(username, password)
        status = data[0]        
        return jsonify({"message": status})