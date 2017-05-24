from helpers import database as db
from helpers import sql


def get_by_name(user_id, name, tables):
	queries = []
	for item in tables:
		q = sql.search(
			user_id,
			item,
			fltr_val=name
			)
		obj = {"table":item, "query": q}
		queries.append(obj)

	data = {}
	mes = ""
	for item in queries:
		res = db.query(item["query"])
		mes += res.statusmessage + "   "
		data.update({item["table"]:res.fetchall()})

	return [mes, data]

def get_by_field(user_id, table, fields, fltr):
	search_query =sql.search_by_fields(
		user_id,
		table,
		fields,
		fltr
		)

	res = db.query(search_query)
	return [res.statusmessage, res.fetchall()]


# def get_by_field(user_id, fltr_val, tables, fltr):
# 	queries = []
# 	for item in tables:
# 		q = sql.search(
# 			user_id,
# 			item["table_name"],
# 			fields=item["fields"]
# 			)
# 		obj = {"table":item["table_name"], "query": q}
# 		queries.append(obj)

# 	data = {}
# 	mes = ""
# 	for item in queries:
# 		res = db.query(item["query"])
# 		mes += res.statusmessage + "   "
# 		data.update({item["table"]:res.fetchall()})

# 	return [mes, data]
