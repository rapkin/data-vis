from helpers import database as db
from subapps.auth.models import login
from helpers.erorrs import BadRequest


def register(user, pas):
    sql_insert_query = 'INSERT INTO users'

    username = "'" + str(user) + "'"
    password = "'" + str(pas) + "'"

    sel_q = "SELECT id FROM users WHERE username="+username
    res = db.query(sel_q)
    mes = res.statusmessage
    res.close()
    if mes[-1] != "0":
        raise BadRequest("username already used")

    fields = ["username", "password"]

    field_str = "("+', '.join(fields)+") VALUES "
    val_str = "("+', '.join([username, password])+")"

    res = db.save(sql_insert_query+field_str+val_str)
    token = login.login([user, pas])

    return token
