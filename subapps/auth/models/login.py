from helpers import database as db
from helpers import auth

table = "users"

def login(user_data):
	sql_select_query = 'SELECT id FROM ' + table

	user, pas = user_data 

	constrain = " WHERE username=" + user
	constrain += " AND "
	constrain += "password=" + pas

	res = db.query(sql_select_query + constrain)
	mes = res.statusmessage
	if mes[-1] != "0":		
		data = res.fetchone()
		token = auth.create_token(user)
		upd_mes = update_token(data["id"], token)
	res.close()

	return [mes +'  '+ upd_mes, token]

def update_token(user_id, token):
	sql_update_query = 'UPDATE ' + table

	sql_update_query += " SET token='" + str(token) + "'"
	sql_update_query += " WHERE id="+str(user_id)

	res = db.query(sql_update_query)
	mes = res.statusmessage

	return mes


