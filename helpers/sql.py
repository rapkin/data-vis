def select(table, user_id, constrains='', fields="*"):
	"""
		fields = []
		constrains = [1,2,3]
	"""


	if fields!='*':
		fields = ", ".join(fields)

	select_query = 'SELECT '+fields+" FROM "
	select_query += table
	select_query += " WHERE user_id="+user_id

	if constrains!='':
		select_query += " AND "
		select_query += 'id IN ({})'.format(",".join(str(item) for item in constrains))

	return select_query