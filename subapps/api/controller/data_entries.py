from flask.views import MethodView
from flask import jsonify, request
from subapps.api.models import data_entries


class DataEntriesAPI(MethodView):

    def get(self):
        try:
            args = request.args.get('id').replace('[', '').replace(']', '')
        except:
            args = ''

        if args != '':
            data = data_entries.get_by_id(args.split(','))
        else:
            data = data_entries.get_all()

        status, values = data
        return jsonify({"list": values, "message": status})