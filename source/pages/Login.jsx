import LoginForm from '../components/LoginForm.jsx'
import React, { Component } from 'react'
import { login } from '../api/auth'

export default class Login extends Component {
    render() {
        return (
            <LoginForm onSubmit={login} />
        )
    }
}

