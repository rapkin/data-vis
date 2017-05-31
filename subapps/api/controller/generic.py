from flask.views import MethodView
from flask import jsonify, request
from helpers.auth import check_token


class GenericControler(MethodView):
    def get(self):
        try:
            args = request.args.get('id').replace('[', '').replace(']', '')
        except:
            args = ''

        user_id = check_token()

        if args!='':
            data = self.model.get_by_id(args, user_id)
        else:
            data = self.model.get_all(user_id)

        values = data
        return jsonify({"list": values})

    def post(self):
        json = request.get_json()
        user_id = check_token()

        status = self.model.update_by_id(json, user_id)
        return jsonify({"message": status})
    
    def delete(self):
        json = request.get_json()
        user_id = check_token()

        ids = [str(id) for id in json["ids"]]

        status = self.model.delete_by_id(ids, user_id)
        return jsonify({"message": status})
        
    def put(self):
        json = request.get_json()
        user_id = check_token()

        status = self.model.insert_one(json, user_id)
        return jsonify({"message": status})
