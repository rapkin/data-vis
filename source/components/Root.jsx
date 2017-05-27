import React from 'react'
import TopMenu from './TopMenu.jsx'

const menuItems = [
    {
        link: '/',
        name: 'Home',
        icon: 'home'
    },
    {
        link: '/login/',
        name: 'Sign in'
    }
]

export default ({children}) => (
    <div>
        <TopMenu items={menuItems} />
        <div>{children}</div>
    </div>
)
