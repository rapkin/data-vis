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

        return jsonify({"list": data})



#    def post(self):
# update

    #
    # def delete(self):
    #     #del city
    #     pass
    #
    # def put(self):
    #     #add city
    #     pass
