import psycopg2

conn = psycopg2.connect(
    database="data-vis",
    user="postgres",
    password="",
    host="127.0.0.1",
    port="5432")

print "Opened database successfully"

# def remove():
# def create():
# def import():
