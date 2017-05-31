import Api from '../helpers/api'
const api = new Api('auth')

api.post('login')
api.get('logout')
api.put('register')

api.expose(exports)
