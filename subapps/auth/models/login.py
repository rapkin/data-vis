from helpers import database as db
from helpers.auth import create_token, insert_token
from helpers.erorrs import BadRequest

table = "users"

def login(user_data):
    sql_select_query = 'SELECT id, password FROM ' + table

    user, pas = user_data

    constrain = " WHERE username='"+user+"'"

    res = db.query(sql_select_query + constrain)
    mes = res.statusmessage
    if mes[-1] == "1":
        data = res.fetchone()
        if pas == data["password"]:
            token = create_token(user)
            upd_mes, time, token = insert_token(data["id"], token)
            mes += "   " + upd_mes + "   " +str(time)
        else:
            raise BadRequest("Wrong password")
    else:
        raise BadRequest("No such user")

    return token
