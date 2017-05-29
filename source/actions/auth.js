import { SET_AUTH_TOKEN, UNSET_AUTH_TOKEN } from '../constants'

export const setToken = (token) => ({
    type: SET_AUTH_TOKEN,
    payload: token
})

export const unsetToken = () => ({
    type: UNSET_AUTH_TOKEN
})
