from helpers import database as db
from helpers import sql


def get_by_name(user_id, name):
	search_cities = sql.search(user_id, name, "cities")
	search_data_sets = sql.search(user_id, name, "data_sets")

	res = db.query(search_cities)
	mes = res.statusmessage

	data = {"cities": res.fetchall()}

	res = db.query(search_data_sets)
	mes += "   "+res.statusmessage

	data.update({"data_sets": res.fetchall()})


	return [mes, data]