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
        json = request.get_json()

        data = cities.update_by_filter(json)
        status = data[0]
        return jsonify({"message": status})

    #
    # def delete(self):
    #     #del city
    #     pass
    #
    # def put(self):
    #     #add city
    #     pass
