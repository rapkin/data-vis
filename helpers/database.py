import psycopg2
import json

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

def import_data():
    remove()
    create()
    with open('../export/import.json') as data_file:
        data = json.load(data_file)
    insert_data(data)

def insert_data(data):
    table_queue = ['cities','data_sets', 'data_entries']

    cursor = conn.cursor()
    
    sql_column_info = "SELECT table_name, column_name FROM information_schema.columns WHERE table_catalog = 'data-vis' AND table_name IN ('cities', 'data_sets', 'data_entries')"
    cursor.execute(sql_column_info)
    column_info = cursor.fetchall()

    for table_name in table_queue:
        table_fields = filter(lambda x: x[0] == table_name, column_info)
        table_fields = map(lambda t_f: t_f[1], table_fields)

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
                                                                            values = fields_value_str)
        cursor.execute(sql_string, fields_value_flat)
        conn.commit()
