from subapps.api.models import data_entries as model
from subapps.api.controller.generic import GenericControler
from flask import jsonify, request
from helpers.auth import check_token

class DataEntriesAPI(GenericControler):
    model = model.DataEntriesModel()

    def get(self):

        user_id = check_token()

        req_iter = request.args.items()
        req_dict = {key: val for key, val in req_iter}

        if 'id' in req_dict:
            ids = req_dict["id"].split(",")
        else:
            ids = None

        if ids is not None:
            data = self.model.get_by_id(ids, user_id)
        elif ids is None and len(req_dict)!=0:
            data = self.model.get_by_set_city_time(req_dict, user_id)
        else:            
            data = self.model.get_all(user_id)

        status, values = data
        return jsonify({"list": values, "message": status})
