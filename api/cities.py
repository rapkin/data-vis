from flask.views import MethodView
from flask import jsonify, request
from models import cities


class CitiesAPI(MethodView):

    def __init__(self):
        json_req = request.get_json(silent=True)
        self.cities_id = json_req['id'] if json_req is not None else None
        if self.cities_id is None:
            try:
                args = request.args.get('id').replace('[', '').replace(']', '')
            except:
                args = ''
            self.cities_id = args.split(',') if args != '' else None


    def get(self):
        if self.cities_id is not None:
            data = cities.get_cities_by_id(self.cities_id)
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
