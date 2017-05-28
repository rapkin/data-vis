import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import colors from '../colors'
import { OutlineButtonGreen } from '../elements/buttons.jsx'

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

const Authorize = ({ dispatch }) => {
    const signIn = () => dispatch(push('/login'))
    const signUp = () => dispatch(push('/registration'))

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

@connect((state) => ({authToken: state.auth.token}))
export class Auth extends Component {
    render() {
        const {authToken, children, dispatch} = this.props
        return authToken ? children : <Authorize dispatch={dispatch} />
    }
}

export const authRequired = (Component) => () =>
    <Auth><Component /></Auth>
