from helpers import database as db

table = "users"

def register(user, pas):
    sql_insert_query = 'INSERT INTO ' + table
    
    fields = ["username", "password"]

    field_str = "("+', '.join(fields)+") VALUES "
    val_str = "("+', '.join([user, pas])+")"

    res = db.save(sql_insert_query+field_str+val_str)

    return [res]
