from helpers import database as db
from helpers import sql

class GenericModel():

    def get_all(self, user_id):
        select_query = sql.select(self.table, str(user_id))
        res = db.query(select_query)
        return res.fetchall()


    def get_by_id(self, ids, user_id):
        select_query = sql.select(
            self.table, 
            str(user_id), 
            ids)

        res = db.query(select_query)     
        return res.fetchall()

    def update_by_id(self, data, user_id):
        update_query = sql.update(
            self.table,
            str(user_id),
            data)

        mes = db.save(update_query)
        return mes

    def delete_by_id(self, ids, user_id):
        delete_query = sql.delete(
            self.table,
            str(user_id),
            ids)

        res = db.query(delete_query)
        return res.statusmessage

    def insert_one(self, data, user_id):
        insert_query = sql.insert(
            self.table,
            str(user_id),
            data,
            self.fields)

        mes = db.save(insert_query)
        return mes
