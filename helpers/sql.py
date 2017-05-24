def select(table, user_id, constr='', fields="*"):
	"""
		fields = []
		constr = [1,2,3] /id
	"""
	if fields!='*':
		fields = ", ".join(fields)

	select_query = 'SELECT '+fields+" FROM "
	select_query += table
	select_query += " WHERE user_id="+user_id

	if constr!='':
		select_query += " AND "
		select_query += 'id IN ({})'.format(",".join(str(item) for item in constr))

	return select_query

def update(table, user_id, data, fields):
	update_query = 'UPDATE ' + table
	update_query += " SET "

	pairs = []
	for key in data:
		if key in fields:
			pairs.append("{0}='{1}'".format(key, str(data.get(key))))

	update_query += ', '.join(pairs)
	update_query += ' WHERE id='+str(data["id"])
	update_query += " AND user_id="+str(user_id)

	return update_query

def delete(table, user_id, ids):
	delete_query = 'DELETE FROM ' + table
	delete_query += ' WHERE id IN ('+', '.join(ids)+')'
	delete_query += " AND user_id="+str(user_id)

	return delete_query

def insert(table, user_id, data, fields):
	insert_query = 'INSERT INTO ' + table
	data["user_id"] = user_id

	val_list = ["'"+str(data[key])+"'" for key in fields]
	value_str = "("+', '.join(val_list)+")"
	insert_query += " ("+', '.join(fields)+") VALUES " + value_str

	return insert_query

def search(user_id, name, table):
	select_query = 'SELECT * FROM '+table

	select_query += " WHERE user_id="+str(user_id)	
	select_query += " AND name LIKE '%"+name+"%'"

	return select_query



#search("1", "loh", "cities")

#update("cities", "1", {"id":1,"name":"loh", "lat":"heh"}, ["name", "lat", "lon", "user_id"])
#delete("cities", "1", ["1",'2',"3"])
# insert(
# 	"cities", 
# 	"1", 
# 	{"lat": 123.54,"lon": 31.42,"name": "some point"}, 
# 	["name", "lat", "lon", "user_id"])