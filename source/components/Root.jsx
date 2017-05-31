import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TopMenu from './TopMenu.jsx'
import styled from 'styled-components'
import colors from '../colors'

const Wrapper = styled.div`
    min-height: 100vh;
    height: 100%;
    background: ${colors.background};
    color: ${colors.font};
`

const Page = styled.div`
    padding-top: 50px;
    height: 100%;
`

const menu = {
    home: {
        link: '/',
        name: 'Home',
        icon: 'home'
    },
    locations: {
        link: '/locations/',
        name: 'Locations',
        icon: 'map-marker'
    },
    data: {
        link: '/data/',
        name: 'Data',
        icon: 'database'
    },
    login: {
        link: '/login/',
        name: 'Sign in',
        icon: 'sign-in'
    },
    registration: {
        link: '/registration/',
        name: 'Sign up',
        icon: 'user-plus'
    } ,
    logout: {
        link: '/logout/',
        name: 'Sign out',
        icon: 'sign-out'
    }
}

@withRouter
@connect((state) => ({authToken: state.auth.token}))
export default class Root extends Component {
    render() {
        const { children, authToken } = this.props
        const rightSection = authToken ? [menu.logout] : [menu.login, menu.registration]

        return (
            <Wrapper>
                <TopMenu
                    logo={true}
                    items={[menu.home, menu.locations, menu.data]}
                    rightSection={rightSection} />
                <Page>{children}</Page>
            </Wrapper>
        )
    }
}
