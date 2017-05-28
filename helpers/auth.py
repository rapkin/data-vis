import hashlib
from helpers import database as db
from helpers.erorrs import BadRequest
from helpers import sql
from helpers import time
from flask import request, current_app
import jwt


def create_token(data):
    secret = current_app.config["SECRET"]
    token = jwt.encode(data, secret, current_app.config["ENCRYPT_ALGO"])
    return token.decode()

def decrypt(token):
    secret = current_app.config["SECRET"]
    data = jwt.decode(token, secret)
    return data


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

    print(insert_query)
    mes = db.save(insert_query)

    return token

def get_token():
    token = request.headers.get('Authorization')

    if token is None:
        raise BadRequest("Token not provided in header Authorization")

    return token

def check_token(status=False):
    token = get_token()
    token_data = decrypt(token)

    select_query = 'SELECT id FROM tokens'

    select_query += " WHERE user_id="
    select_query += "'"+str(token_data["user_id"])+"'"

    res = db.query(select_query)
    mes = res.statusmessage

    if mes[-1] != "1":
        raise BadRequest("Token is not in db")

    data = res.fetchone()

    token_created = time.decode_iso(token_data["created"])
    Eps = current_app.config["token_life"]

    if time.time() - token_created > Eps:
        del_q = sql.delete("tokens", token_data["user_id"], [str(data["id"])])
        res = db.query(del_q)
        raise BadRequest("Token expired")


    if status:
        data = {
            "user_id": token_data["user_id"],
            "created": token_data["created"],
            "token": token
        }
        select_query = 'SELECT username, is_admin FROM users'
        select_query += " WHERE id="+str(token_data["user_id"])
        res = db.query(select_query)

        data.update(res.fetchone())
        res.close()
        return data

    return token_data["user_id"]
