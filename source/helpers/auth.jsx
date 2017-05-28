import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import colors from '../colors'

const Hero = styled.div`
    background: ${colors.font};
    color: ${colors.background};
    padding: 20px;
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Authorize = () => (
    <Hero>
        <h1>Hello!</h1>
        <h2>Sign in or Sign up to continue</h2>
    </Hero>
)

@connect((state) => ({authToken: state.auth.token}))
export class Auth extends Component {
    render() {
        const {authToken, children} = this.props
        return authToken ? children : <Authorize />
    }
}

export const authRequired = (Component) => () =>
    <Auth><Component /></Auth>
