from helpers import database as db

table = "users"

def get_all():
	sql_select_query = 'SELECT * FROM ' + table
	res = db.query(sql_select_query)
	return [res.statusmessage, res.fetchall()] 

def check_token(token):
	sql_select_query = 'SELECT id, username FROM ' + table

	sql_select_query += " WHERE token="
	sql_select_query += "'"+str(token)+"'"

	res = db.query(sql_select_query)
	mes = res.statusmessage
	data = res.fetchall()

	if len(data) == 1:
		check = True
		mes += " 6s "
	else:
		check = False

	return [mes, check]



