from helpers import database as db

table = "users"

def get_all():
    sql_select_query = 'SELECT * FROM ' + table
    res = db.query(sql_select_query)
    return [res.statusmessage, res.fetchall()]
