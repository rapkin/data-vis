from helpers import database

def get_all():
    sql_query = 'SELECT id, name, lat, lon FROM cities'

    cursor = database.conn.cursor()
    cursor.execute(sql_query)
    database.conn.commit()
    return cursor.fetchall()
