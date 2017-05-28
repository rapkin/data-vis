import {
    SET_AUTH_TOKEN,
    UNSET_AUTH_TOKEN
} from '../constants'

export const initial = {
    token: null
}

export default (state = initial, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN: {
            const token = action.payload
            sessionStorage.setItem('authToken', token)
            return {...state, token}
        }

        case UNSET_AUTH_TOKEN: {
            sessionStorage.removeItem('authToken')
            return {...state, token: null}
        }

        default: {
            return state
        }
    }
}
