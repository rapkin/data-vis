from helpers import database as db
from helpers import sql

class GenericModel():

    def get_all(self, user_id):
        select_query = sql.select(self.table, str(user_id))
        res = db.query(select_query)
        return [res.statusmessage, res.fetchall()] 


    def get_by_id(self, ids, user_id):
        select_query = sql.select(
            self.table, 
            str(user_id), 
            ids)

        res = db.query(select_query)     
        return [res.statusmessage, res.fetchall()]

    def update_by_id(self, data, user_id):
        """{
            "id": 1,
            <"field">: <"value">,
            ...
        }
        """

        update_query = sql.update(
            self.table,
            str(user_id),
            data,
            self.fields)

        mes = db.save(update_query)
        return [mes]



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

        delete_query = sql.delete(
            self.table,
            str(user_id),
            ids)

        res = db.query(delete_query)
        return [res.statusmessage]

    def insert_one(self, data, user_id):
        insert_query = sql.insert(
            self.table,
            str(user_id),
            data,
            self.fields)

        mes = db.save(insert_query)
        return [mes]
