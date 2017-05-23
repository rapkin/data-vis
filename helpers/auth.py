import hashlib
from helpers import database as db
from werkzeug.exceptions import BadRequest
from flask import request

def create_token(salt):
	return hashlib.md5(salt.encode()).hexdigest()


def insert_token(user_id, token):
	token_fields = ["token", "created", "user_id"]
	token_time = "100500"

	select_query = "SELECT token, created FROM tokens WHERE"
	select_query += " user_id="+str(user_id)

	res = db.query(select_query)
	mes = res.statusmessage
	if mes[-1] != "0":
		data = res.fetchone()
		token_time = data["created"]
		token_old = data["token"]
		return [mes + "  exist", token_time, token_old]

	insert_query = 'INSERT INTO tokens'

	val_list = ["'"+str(token)+"'", "'"+str(token_time)+"'", str(user_id)]

	insert_query += "("+', '.join(token_fields)+") VALUES "
	insert_query += "("+', '.join(val_list)+")"

	mes = db.save(insert_query)

	return [mes, token_time, token]

def get_token():
	token =	request.headers.get('Authorization')

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
	#data = res.fetchall()

	#check = True if mes[-1] == "1" else False

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

	