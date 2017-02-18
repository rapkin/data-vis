from flask.views import MethodView
from flask import jsonify, request
from models import cities


class CitiesAPI(MethodView):

    def __init__(self):
        self.cities_id = request.get_json(silent=True)


    def get(self):
        data = cities.get_all()
        return jsonify({"list": data})


    def post(self):
        if self.cities_id is not None:
            data = cities.get_cities_by_id(self.cities_id["ids"])
            return jsonify({"list": data})
        else:
            return self.get()
    #
    # def delete(self):
    #     #del city
    #     pass
    #
    # def put(self):
    #     #add/update city
    #     pass
