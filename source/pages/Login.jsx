import LoginForm from '../components/LoginForm.jsx'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../api/auth'
import { redirectAuthorized } from '../helpers/auth.jsx'
import { setToken } from '../actions/auth'

@redirectAuthorized()
@connect()
export default class Login extends Component {
    onSuccess({data}, dispatch) {
        dispatch(setToken(data.token))
    }

    render() {
        return <LoginForm
            onSubmit={login}
            onSubmitSuccess={::this.onSuccess} />
    }
}
