from helpers import database as db

def get_all():
    sql_query = 'SELECT id, name, lat, lon FROM cities'

    return db.query(sql_query)
