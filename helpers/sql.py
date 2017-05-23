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