from helpers import database as db
from helpers import auth
from werkzeug.exceptions import BadRequest

table = "users"

def login(user_data):
	sql_select_query = 'SELECT id, password FROM ' + table

	user, pas = user_data
	
	user = "'"+user+"'"
	constrain = " WHERE username=" + user

	res = db.query(sql_select_query + constrain)
	mes = res.statusmessage
	if mes[-1] == "1":
		data = res.fetchone()
		print(data, pas, pas == data["password"])
		if pas == data["password"]:			
			token = auth.create_token(user)
			#upd_mes = update_token(data["id"], token)
			mes += "   " #+ upd_mes
		else:
			raise BadRequest("Wrong password")
	else:
		raise BadRequest("No such user")

	return [mes, token]

def update_token(user_id, token):
	sql_update_query = 'UPDATE ' + table

	sql_update_query += " SET token='" + str(token) + "'"
	sql_update_query += " WHERE id="+str(user_id)

	res = db.query(sql_update_query)
	mes = res.statusmessage

	return mes


