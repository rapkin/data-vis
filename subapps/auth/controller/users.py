from flask.views import MethodView
from flask import jsonify, request, render_template

from subapps.auth.models import users as model


class UsersControler(MethodView):

    def get(self):
    	mes = ""

    	try:
    		token = request.args.get("token")
    		mes, check = model.check_token(token)
    	except:
    		token = None    	

    	if token is None:
    		mes += "  Token not provided in url args"
    	elif check:
            data = model.get_all()
            return render_template("users.html", data=data)
    	else:
    		mes += "  Token not in db"

    	return mes

    def post(self):
        """auth by form"""
        username = request.form["username"]
        password = request.form["password"]
        username = "'" + str(username) + "'"
        password = "'" + str(password) + "'"

        user_data = [username, password]

        mes, token = model.login(user_data)

        return jsonify({"message": mes, "token": token})