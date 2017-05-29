import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../colors'
import { OutlineButtonGreen } from '../elements/buttons.jsx'

export const getToken = () =>
    sessionStorage.getItem('authToken')

export const setToken = (token) =>
    token ? sessionStorage.setItem('authToken', token) : sessionStorage.removeItem('authToken')


const Hero = styled.div`
    background: ${colors.font};
    color: ${colors.background};
    padding: 20px;
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1, h2 {
        font-weight: 100;
    }

    h1 {
        font-size: 73px;
        margin: 0;
    }

    h2 {
        font-size: 30px;
    }

    button {
        margin: 0 20px;
    }
`

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
