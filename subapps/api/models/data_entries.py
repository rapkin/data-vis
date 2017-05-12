from helpers import database as db

def get_by_set_city_time(filter):
    sql_query = 'SELECT * FROM data_entries'

    if filter is not None:
        filter_keys = filter.keys()
        sql_filter_list = []

        if 'sets' in filter_keys:
            sql_filter_list.append('set_id IN ({})'.format(",".join(str(item) for item in filter['sets'])))
        if 'cities' in filter_keys:
            sql_filter_list.append('city_id IN ({})'.format(",".join(str(item) for item in filter['cities'])))
        if 'after' in filter_keys:
            sql_filter_list.append('time > {}'.format(filter['after']))
        if 'before' in filter_keys:
            sql_filter_list.append('time < {}'.format(filter['before']))

        if sql_filter_list:
            sql_query += ' WHERE '
            sql_query += ' AND '.join(sql_filter_list)

    return db.query(sql_query).fetchall()
