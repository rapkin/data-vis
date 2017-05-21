from flask import Blueprint, render_template
from subapps.auth.controller import login, logup, users


auth = Blueprint('auth', "auth")

@auth.route("/auth/")
def send_index():
	return render_template("auth_index.html")

# @auth.route("/auth/logup")
# def logup():
# 	return render_template("logup.html")

login_api = login.LoginControler.as_view("login")
auth.add_url_rule('/auth/login/',
                    view_func=login_api,
                    methods=['GET', 'POST'])

logup_api = logup.LogupControler.as_view("logup")
auth.add_url_rule('/auth/logup/',
                    view_func=logup_api,
                    methods=['GET', 'POST'])

users_api = users.UsersControler.as_view("users")
auth.add_url_rule('/auth/users/',
                    view_func=users_api,
                    methods=['GET', 'POST'])