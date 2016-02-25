import psycopg2

conn = psycopg2.connect(
    database="data-vis",
    user="data-vis",
    host="127.0.0.1",
    password='data-vis',
    port="5432")

print "Opened database successfully"

def remove():
    cursor = conn.cursor()
    cursor.execute(open("../sql/drop_tables.sql", "r").read())
    conn.commit()
    print "Removed tables successfully"

def create():
    cursor = conn.cursor()
    cursor.execute(open("../sql/create_tables.sql", "r").read())
    conn.commit()
    print "Created tables successfully"

def query(querySql):
    cursor = conn.cursor()
    cursor.execute(querySql)
    conn.commit()
    result = cursor.fetchall()
    return result
