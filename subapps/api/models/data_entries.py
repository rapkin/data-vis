from subapps.api.models.generic import GenericModel
from helpers import database as db

class DataEntriesModel(GenericModel):
    table = "data_entries"
    fields = ["location_id", "set_id", "time", "value", "user_id"]

    def get_by_set_city_time(self, filtr, user_id):
        sql_query = 'SELECT * FROM ' + self.table

        if filtr is not None:
            filter_keys = filtr.keys()
            sql_filter_list = []

            if 'sets' in filter_keys:
                sql_filter_list.append('set_id IN ({})'.format(",".join(str(item) for item in filtr['sets'])))
            if 'locations' in filter_keys:
                sql_filter_list.append('location_id IN ({})'.format(",".join(str(item) for item in filtr['locations'])))
            if 'after' in filter_keys:
                sql_filter_list.append('time > {}'.format(filtr['after']))
            if 'before' in filter_keys:
                sql_filter_list.append('time < {}'.format(filtr['before']))

            if sql_filter_list:
                sql_query += ' WHERE '
                sql_query += ' AND '.join(sql_filter_list)

        sql_query += " AND user_id="+str(user_id)
        res = db.query(sql_query)

        return [res.statusmessage, res.fetchall()]
