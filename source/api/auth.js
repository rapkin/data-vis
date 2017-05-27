import Api from '../helpers/api'
const api = new Api('auth')

api.post('login')
api.post('logup')

api.expose(exports)
