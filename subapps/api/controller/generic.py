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
            <"field">: <"value">,
            ...
        }
        """
        json = request.get_json()
        user_id = check_token()

        data = self.model.update_by_id(json, user_id)
        status = data[0]
        return jsonify({"message": status})

    
    def delete(self):
        """
        {"ids": [1,2,3,4,5]}
        """
        json = request.get_json()
        user_id = check_token()

        ids = [str(id) for id in json["ids"]]

        data = self.model.delete_by_id(ids, user_id)
        status = data[0]
        return jsonify({"message": status})
        
    
    def put(self):
        """
        
            {
                "lat": 123.54,
                "lon": 31.42,
                "name": "some point",
            },
        
        """
        json = request.get_json()
        user_id = check_token()

        data = self.model.insert_one(json, user_id)
        status = data[0]
        return jsonify({"message": status})
