import Api from '../helpers/api'
const api = new Api('auth', '')

api.post('login')
api.post('register')

api.expose(exports)
