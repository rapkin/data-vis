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

def update(table, user_id, data):
    update_query = 'UPDATE ' + table
    update_query += " SET "

    pairs = []
    for key in data:
        if key != "id":
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
    heh = "(" + "(SELECT MAX(id) from "+table+")+1, "
    value_str = heh+', '.join(val_list)+")"
    insert_query += " (id, "+', '.join(fields)+") VALUES " + value_str

    return insert_query

def search(user_id, table, fltr_val="", fields="*", fltr="name"):
    if fields!="*":
        fields = ", ".join(fields)

    select_query = 'SELECT '+fields+' FROM '+table

    select_query += " WHERE user_id="+str(user_id)
    if fltr_val != "":
        select_query += " AND "+fltr+" LIKE '%"+fltr_val+"%'"

    return select_query
