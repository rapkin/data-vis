from flask.views import MethodView
from flask import jsonify, request
from subapps.api.models import data_sets


class DataSetsAPI(MethodView):

    def get(self):
        try:
            args = request.args.get('id').replace('[', '').replace(']', '')
        except:
            args = ''

        if args != '':
            data = data_sets.get_by_id(args.split(','))
        else:
            data = data_sets.get_all()

        status, values = data
        return jsonify({"list": values, "message": status})



    def post(self):
        """[
        {
            "filter_name": "id",
            "filter_value": "2",
            "values":{
                "name": "check2"
            }
        }
        ]"""
        json = request.get_json()

        data = data_sets.update_by_filter(json)
        status = data[0]
        return jsonify({"message": status})

    
    def delete(self):
        """
        {"ids": [1,2,3,4,5]}
        """
        json = request.get_json()

        ids = [str(id) for id in json["ids"]]

        data = data_sets.delete_by_id(ids)
        status = data[0]
        return jsonify({"message": status})
        
    
    def put(self):
        """
        [
            {
                "name": "some point"
            },
        ]
        """
        json = request.get_json()

        data = data_sets.insert_many(json)
        status = data[0]
        return jsonify({"message": status})