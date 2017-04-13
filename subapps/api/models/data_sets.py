from helpers import database as db

def get_all():
    sql_query = 'SELECT id, name FROM data_sets'

    return db.query(sql_query)
