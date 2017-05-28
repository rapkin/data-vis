import hashlib
from helpers import database as db
from helpers.erorrs import BadRequest
from helpers import sql
from flask import request, current_app
import jwt


def create_token(data):
    secret = current_app.config["SECRET"]
    token = jwt.encode(data, secret, algorithm="HS256")
    return token.decode()


def insert_token(user_id, token, token_time):
    token_fields = ["token", "created", "user_id"]

    select_query = "SELECT id FROM tokens WHERE"
    select_query += " user_id="+str(user_id)

    res = db.query(select_query)
    mes = res.statusmessage
    if mes[-1] == "1":
        data = res.fetchone()
        token_id = data["id"]
        upd_vals = {
            "id": token_id,
            "token": token,
            "created": token_time
        }
        upd_q = sql.update("tokens", user_id, upd_vals)
        mes += db.save(upd_q)
        return token

    insert_query = 'INSERT INTO tokens'

    val_list = ["'"+str(token)+"'", "'"+str(token_time)+"'", str(user_id)]

    insert_query += "("+', '.join(token_fields)+") VALUES "
    insert_query += "("+', '.join(val_list)+")"

    mes = db.save(insert_query)

    return token

def get_token():
    token = request.headers.get('Authorization')

    if token is None:
        raise BadRequest("Token not provided in header Authorization")

    return token

def check_token(status=False):
    token = get_token()

    select_query = 'SELECT user_id, created FROM tokens'

    select_query += " WHERE token="
    select_query += "'"+str(token)+"'"

    res = db.query(select_query)
    mes = res.statusmessage

    if mes[-1] != "1":
        raise BadRequest("Token is not in db")

    if status:
        select_query = 'SELECT username, is_admin FROM users'

        data = res.fetchone()

        select_query += " WHERE id="+str(data["user_id"])
        res = db.query(select_query)

        data.update(res.fetchone())
        res.close()
        return data

    data = res.fetchone()
    return data["user_id"]
