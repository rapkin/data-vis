from flask.views import MethodView
from flask import jsonify, request
from subapps.api.models import cities


class CitiesAPI(MethodView):

    def get(self):
        try:
            args = request.args.get('id').replace('[', '').replace(']', '')
        except:
            args = ''

        if args != '':
            data = cities.get_cities_by_id(args.split(','))
        else:
            data = cities.get_all()

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

        data = cities.update_by_filter(json)
        status = data[0]
        return jsonify({"message": status})

    
    def delete(self):
        """
        {"ids": [1,2,3,4,5]}
        """
        json = request.get_json()

        ids = [str(id) for id in json["ids"]]

        data = cities.delete_by_id(ids)
        status = data[0]
        return jsonify({"message": status})
        
    
    def put(self):
        """
        [
            {
                "lat": 123.54,
                "lon": 31.42,
                "name": "some point"
            },
        ]
        """
        json = request.get_json()

        data = cities.insert_many(json)
        status = data[0]
        return jsonify({"message": status})
