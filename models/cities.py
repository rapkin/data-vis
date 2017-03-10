from helpers import database as db

sql_select_query = 'SELECT id, name, lat, lon FROM cities'


def get_all():
    return db.query(sql_select_query)


def get_cities_by_id(cities_id):
    filter_str = ' WHERE id IN ({})'.format(",".join(str(item) for item in cities_id))
    return db.query(sql_select_query + filter_str)

# def put_cities_by_id(cities_id):
#     sql_update_query = 'UPDATE cities ....'
#
