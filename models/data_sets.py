from helpers import database

def get_all():
    sql_query = 'SELECT id, name FROM data_sets'

    cursor = database.conn.cursor()
    cursor.execute(sql_query)
    database.conn.commit()
    return cursor.fetchall()
