import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { OutlineButtonGreen } from '../elements/buttons.jsx'
import { Hero } from '../elements/common.jsx'

export const getToken = () =>
    sessionStorage.getItem('authToken')

export const setToken = (token) =>
    token ? sessionStorage.setItem('authToken', token) : sessionStorage.removeItem('authToken')

const Authorize = ({ changeLocation }) => {
    const signIn = () => changeLocation('/login')
    const signUp = () => changeLocation('/registration')

    return (
        <Hero>
            <h1>Hello!</h1>
            <h2>
                <OutlineButtonGreen onClick={signIn}>Sign in</OutlineButtonGreen>
                or
                <OutlineButtonGreen onClick={signUp}>Sign up</OutlineButtonGreen>
                to continue
                </h2>
        </Hero>
    )
}

@withRouter
export class Auth extends Component {
    render() {
        const {children, history: {push}} = this.props
        return getToken() ? children : <Authorize changeLocation={push} />
    }
}

export class AuthRedirect extends Component {
    render() {
        const {children, to = '/'} = this.props
        return getToken() ? <Redirect to={to} /> : children
    }
}

export const authRequired = (Component) => () =>
    <Auth><Component /></Auth>

export const redirectAuthorized = (to) => (Component) => () =>
    <AuthRedirect to={to}><Component /></AuthRedirect>
