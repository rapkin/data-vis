from helpers import database as db


def logout(user_id):
    delete_query = 'DELETE FROM tokens WHERE user_id='

    delete_query += "'"+str(user_id)+"'"

    res = db.query(delete_query)
    mes = res.statusmessage
    
    return "Logout 6s"
