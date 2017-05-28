from helpers import database as db
from helpers.auth import create_token, insert_token
from helpers.erorrs import BadRequest
from helpers import time


def login(user_data):
    sql_select_query = 'SELECT id, password FROM users'
    user, pas = user_data

    constrain = " WHERE username='"+user+"'"

    res = db.query(sql_select_query + constrain)
    mes = res.statusmessage

    if mes[-1] == "1":
        data = res.fetchone()
        if pas == data["password"]:
            token_time = time.now()
            salt = {
                "user_id": data["id"],
                "created": token_time,
                "password": pas

            }
            token = create_token(salt)
            token = insert_token(data["id"], token, token_time)
        else:
            raise BadRequest("Wrong password")
    else:
        raise BadRequest("No such user")

    return token
