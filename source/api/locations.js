import Api from '../helpers/api'
const api = new Api('locations')

api.post()
api.get()
api.put()
api.del()

api.expose(exports)
