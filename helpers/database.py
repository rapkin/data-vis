import psycopg2
import psycopg2.extras
import json
from os import path
from flask import current_app, g
root = path.dirname(path.dirname(path.realpath(__file__)))

# conn = psycopg2.connect(
#     database="data-vis",
#     user="postgres",
#     host="127.0.0.1",
#     password='root',
#     port="5432",
#     cursor_factory=psycopg2.extras.RealDictCursor)

#print("Opened database successfully")

def get_db():
    db = getattr(g, 'db_conn', None)
    if db is None:
        db_cfg = current_app.config["DATABASE"]
        db = g.db_conn = psycopg2.connect(
                database=db_cfg["database"],
                user=db_cfg["user"],
                host=db_cfg["host"],
                password=db_cfg["password"],
                port=db_cfg["port"],
                cursor_factory=psycopg2.extras.RealDictCursor)
    
    return db

def init_db():
    remove()
    create()
    import_data()


def remove():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(open(root+"/helpers/sql/drop_tables.sql", "r").read())
    conn.commit()
    print("Removed tables successfully")

def create():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(open(root+"/helpers/sql/create_tables.sql", "r").read())
    conn.commit()
    print("Created tables successfully")

def query(querySql):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(querySql)
    conn.commit()
    result = cursor.fetchall()
    return result

def import_data():
    with open(root+'/helpers/export/import.json', encoding='utf-8') as data_file:
        data = json.load(data_file)
    insert_data(data)

def insert_data(data):
    conn = get_db()
    table_queue = ['cities','data_sets', 'data_entries']

    for table_name in table_queue:
        table_fields = data[table_name][0].keys()
        fields_str = ", ".join(table_fields)

        fields_value_list = [[row[field] for field in table_fields] for row in data[table_name]]

        fields_value_flat = []
        for item in fields_value_list:
            fields_value_flat.extend(item)

        fields_value_str = []
        for row in fields_value_list:
            fields_value_str.append("({0})".format(",".join(['%s'] * len(row))))
        fields_value_str = ",".join(fields_value_str)

        sql_string = 'INSERT INTO {table} ({fields}) VALUES {values}'.format(
            table  = table_name,
            fields = fields_str,
            values = fields_value_str
        )
        cursor = conn.cursor()
        cursor.execute(sql_string, fields_value_flat)
        conn.commit()


    
