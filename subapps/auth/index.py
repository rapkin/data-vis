from flask import Blueprint, render_template
from subapps.auth.controller import login, logup, users, logout
from helpers.auth import check_token
from flask import jsonify

auth = Blueprint('auth', "auth")

login_api = login.LoginControler.as_view("login")
auth.add_url_rule('/auth/login/',
                    view_func=login_api,
                    methods=['POST'])

logup_api = logup.LogupControler.as_view("logup")
auth.add_url_rule('/auth/logup/',
                    view_func=logup_api,
                    methods=['POST'])

users_api = users.UsersControler.as_view("users")
auth.add_url_rule('/auth/users/',
                    view_func=users_api,
                    methods=['GET'])

logout_api = logout.LogoutControler.as_view("logout")
auth.add_url_rule('/auth/logout/',
                    view_func=logout_api,
                    methods=['GET'])

@auth.route('/auth/token/')
def token_status():
	data = check_token(status=True)
	return jsonify(data)