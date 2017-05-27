import {LOGIN} from '../constants'
import axios from 'axios'

export const login = (data) => ({
    type: LOGIN,
    payload: axios.post('/api/auth/login/', data)
})
