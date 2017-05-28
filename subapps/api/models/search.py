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
