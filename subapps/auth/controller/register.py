from flask.views import MethodView
from flask import jsonify, request, render_template
from subapps.auth.models import register as model
from helpers.erorrs import BadRequest
from helpers import auth


class RegisterControler(MethodView):

    def put(self):
        json = request.get_json()
        user = json.get("username")
        pas = json.get("password")

        if user is None or pas is None:
            raise BadRequest("username or password not provided")

        token = model.register(user, pas)

        user_id = auth.decrypt(token)["user_id"]
        
        return jsonify({
                "token": token, 
                "username": user,
                "user_id": user_id
            })
