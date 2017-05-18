from helpers import database as db

class GenericModel():

	def get_all(self):
		sql_select_query = 'SELECT * FROM ' + self.table
		res = db.query(sql_select_query)
		return [res.statusmessage, res.fetchall()] 


	def get_by_id(self, id):
		sql_select_query = 'SELECT * FROM ' + self.table
		filter_str = ' WHERE id IN ({})'.format(",".join(str(item) for item in id))
		res = db.query(sql_select_query + filter_str)     
		return [res.statusmessage, res.fetchall()] 


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


	def delete_by_id(self, ids):
		"""
			{"ids": [1,2,3,4,5]}
		"""
		sql_delete_query = 'DELETE FROM ' + self.table
		filter_str = ' WHERE id IN ('+', '.join(ids)+')'
		res = db.query(sql_delete_query + filter_str)
		return [res.statusmessage]


	def insert_many(self, data):
		"""
		[
	 		{
			"lat": 123.54,
			"lon": 31.42,
			"name": "some point"
			},
	    ]
	    """
		#fields = ["name", "lat", "lon"]
		
		sql_insert_query = 'INSERT INTO ' + self.table

		val_list = []
		for item in data:
			values = ["'"+str(item[key])+"'" for key in self.fields]

			value_str =  "("+', '.join(values)+")"

			val_list.append(value_str)

		values_str = "("+', '.join(self.fields)+") VALUES " + ", ".join(val_list)

		print(sql_insert_query + values_str)
		res = db.save(sql_insert_query + values_str)

		return [res]