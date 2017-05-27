import React from 'react'
import TopMenu from './TopMenu.jsx'
import styled from 'styled-components'

const menuItems = [
    {
        link: '/',
        name: 'Home',
        icon: 'home'
    }
]

const rightMenuSection = [
    {
        link: '/login/',
        name: 'Sign in',
        icon: 'sign-in'
    }
]

const Root = styled.div`
    height: 100vh;
    background: #f1f4f9;
    color: #4e5e6a;
`

const Page = styled.div`
    padding-top: 50px;
    height: 100%;
`

export default ({children}) => (
    <Root>
        <TopMenu items={menuItems} rightSection={rightMenuSection} logo={true} />
        <Page>{children}</Page>
    </Root>
)
