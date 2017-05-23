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

        status, values = data
        return jsonify({"list": values, "message": status})

    def post(self):
        """Old
        [
        {
            "filter_name": "id",
            "filter_value": "2",
            "values":{
                "name": "check2"
            }
        }
        ]
        New
                {
            "id": 1,
            "token": ...
            <"field">: <"value">,
            ...
        }
        """
        json = request.get_json()

        if "token" in json:
            token = json["token"]
        else:
            return jsonify({"message": "Token not provided"})

        data = self.model.update_by_id(json, token)
        status = data[0]
        return jsonify({"message": status})

    
    def delete(self):
        """
        {"ids": [1,2,3,4,5]}
        """
        json = request.get_json()

        if "token" in json:
            token = json["token"]
        else:
            return jsonify({"message": "Token not provided"})

        ids = [str(id) for id in json["ids"]]

        data = self.model.delete_by_id(ids, token)
        status = data[0]
        return jsonify({"message": status})
        
    
    def put(self):
        """
        [
            {
                "lat": 123.54,
                "lon": 31.42,
                "name": "some point",
                "token": ...
            },
        ]
        """
        json = request.get_json()

        data = self.model.insert_many(json)
        status = data[0]
        return jsonify({"message": status})