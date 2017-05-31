import Api from '../helpers/api'
const api = new Api('data_sets')

api.post()
api.get()
api.put()
api.del()

api.expose(exports)
