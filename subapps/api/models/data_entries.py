from subapps.api.models.generic import GenericModel
from helpers import database as db

class DataEntriesModel(GenericModel):
    table = "data_entries"
    fields = ["city_id", "set_id", "time", "value"]

    def get_by_set_city_time(self, filtr):
        sql_query = 'SELECT * FROM ' + self.table

        if filtr is not None:
            filter_keys = filtr.keys()
            sql_filter_list = []

            if 'sets' in filter_keys:
                sql_filter_list.append('set_id IN ({})'.format(",".join(str(item) for item in filtr['sets'])))
            if 'cities' in filter_keys:
                sql_filter_list.append('city_id IN ({})'.format(",".join(str(item) for item in filtr['cities'])))
            if 'after' in filter_keys:
                sql_filter_list.append('time > {}'.format(filtr['after']))
            if 'before' in filter_keys:
                sql_filter_list.append('time < {}'.format(filtr['before']))

            if sql_filter_list:
                sql_query += ' WHERE '
                sql_query += ' AND '.join(sql_filter_list)
        res = db.query(sql_query)

        return [res.statusmessage, res.fetchall()]
