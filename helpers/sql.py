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

#update("cities", "1", {"id":1,"name":"loh", "lat":"heh"}, ["name", "lat", "lon", "user_id"])