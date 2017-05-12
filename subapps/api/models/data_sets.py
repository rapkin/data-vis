from helpers import database as db

sql_select_query = 'SELECT * FROM data_sets'
sql_update_query = 'UPDATE data_sets'
sql_delete_query = 'DELETE FROM data_sets'
sql_insert_query = 'INSERT INTO data_sets'


def get_all():
    res = db.query(sql_select_query)
    return [res.statusmessage, res.fetchall()] 


def get_by_id(ids):
    filter_str = ' WHERE id IN ({})'.format(",".join(str(item) for item in ids))
    res = db.query(sql_select_query + filter_str)     
    return [res.statusmessage, res.fetchall()] 


def update_by_filter(data):
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


def delete_by_id(ids):
    """
    {"ids": [1,2,3,4,5]}
    """
    filter_str = ' WHERE id IN ('+', '.join(ids)+')'
    res = db.query(sql_delete_query + filter_str)
    return [res.statusmessage]


def insert_many(data):
    """
    [
        {
            "name": "some point"
        },
    ]
    """
    fields = ["name"]

    val_list = []
    for item in data:
        values = ["'"+str(item[key])+"'" for key in fields]

        value_str =  "("+', '.join(values)+")"

        val_list.append(value_str)

    values_str = " ("+', '.join(fields)+") VALUES " + ", ".join(val_list)
    
    res = db.query(sql_insert_query + values_str)
    res.close()

    return [res.statusmessage]

# data = [{
#     "filter_name": "id",
#     "filter_value": "6",
#     "values":{"key1": "value1", "key2": "value2", "key3": "value3"}
#     }, {
#     "filter_name": "name",
#     "filter_value": "10",
#     "values":{"key1": "value1", "key2": "value2", "key3": "value3"}
#     }]
#
