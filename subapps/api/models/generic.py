from helpers import database as db
from helpers import sql

class GenericModel():

	def get_all(self, user_id):
		sql_select_query = sql.select(self.table, str(user_id))
		res = db.query(sql_select_query)
		return [res.statusmessage, res.fetchall()] 


	def get_by_id(self, id, user_id):
		sql_select_query = sql.select(self.table, str(user_id), id)

		res = db.query(sql_select_query)     
		return [res.statusmessage, res.fetchall()]

	def update_by_id(self, data, user_id):
		"""{
			"id": 1,
			<"field">: <"value">,
			...
		}
		"""
		sql_update_query = 'UPDATE ' + self.table

		sql_update_query += " SET "

		pairs = []
		for key in data:
			if key in self.fields:
				pairs.append("{0}='{1}'".format(key, str(data[key])))

		sql_update_query += ','.join(pairs)
		sql_update_query += ' WHERE id='+str(data["id"])

		sql_update_query += " AND user_id="+str(user_id)

		query = db.save(sql_update_query)
		return [query.statusmessage]



	def update_by_filter(self, data):
		sql_update_query = 'UPDATE ' + self.table
		"""data=[{
	    	filter_name: "",
			filter_value: "",
			values:{<key: value>, ...}
			}, {...}
	       ]"""
		for item in data:
			res = sql_update_query + " SET "
			temp1 = []
			for key in item["values"]:
				temp1.append("{0}='{1}'".format(key, str(item["values"][key])))

			res += ','.join(temp1)
			res += ' WHERE '
			res += "{0}='{1}'".format(item["filter_name"], item["filter_value"])

		query = db.query(res)
		return [query.statusmessage]


	def delete_by_id(self, ids, user_id):
		"""
			{"ids": [1,2,3,4,5]}
		"""
		sql_delete_query = 'DELETE FROM ' + self.table
		filter_str = ' WHERE id IN ('+', '.join(ids)+')'
		filter_str += " AND user_id="+str(user_id)

		res = db.query(sql_delete_query + filter_str)
		return [res.statusmessage]

	def insert_one(self, data, user_id):
		sql_insert_query = 'INSERT INTO ' + self.table

		data["user_id"] = user_id

		val_list = ["'"+str(data[key])+"'" for key in self.fields]
		value_str = " ("+', '.join(val_list)+")"
		sql_insert_query += "("+', '.join(self.fields)+") VALUES " + value_str

		print(sql_insert_query)

		mes = db.save(sql_insert_query)
		return [mes]


	def insert_many(self, data):
		"""
		[
	 		{
			"lat": 123.54,
			"lon": 31.42,
			"name": "some point",
			token": ...
			},
	    ]
	    """
		#fields = ["name", "lat", "lon"]
		token_query = "SELECT id FROM users WHERE token="
		
		sql_insert_query = 'INSERT INTO ' + self.table

		val_list = []
		for item in data:
			token = item["token"]
			res = db.query(token_query+"'"+token+"'")
			item["user_id"] = res.fetchone()["id"]
			values = ["'"+str(item[key])+"'" for key in self.fields]

			value_str = " ("+', '.join(values)+")"

			val_list.append(value_str)

		values_str = "("+', '.join(self.fields)+") VALUES " + ", ".join(val_list)

		print(sql_insert_query + values_str)
		res = db.save(sql_insert_query + values_str)

		return [res]