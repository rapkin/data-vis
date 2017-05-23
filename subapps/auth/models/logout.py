from helpers import database as db


def logout(token):
	delete_query = 'DELETE FROM tokens WHERE token='

	delete_query += "'"+str(token)+"'"

	res = db.query(delete_query)
	mes = res.statusmessage
	
	return mes
