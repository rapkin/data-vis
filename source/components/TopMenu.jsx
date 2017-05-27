import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { Icon } from '../elements/icons.jsx'

const Menu = styled.div`
    position: fixed;
    height: 50px;
    width: 100%;
    display: flex;
    background: #0099cc;
    justify-content: space-between;

    > div {
        display: flex;
    }
`

const menuItem = css`
    height: 100%;
    padding: 0 20px;
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;

    .fa {
        font-size: 20px;
        margin-right: 5px;
    }

    span {
        padding-top: 2px;
    }
`

const MenuLink = styled(Link)`
    ${menuItem}
    text-decoration: none;

    &:hover {
        background: rgba(0, 0, 0, .1);
    }
`

const Logo = styled.div`
    ${menuItem}
    font-size: 20px;
    font-weight: bold;
`

const MenuItem = (item) => (
    <MenuLink key={item.link} to={item.link}>
        <Icon name={item.icon} />
        <span>{item.name}</span>
    </MenuLink>
)

export default ({items, logo, rightSection}) => (
    <Menu>
        <div>
            {logo && (
                <Logo>
                    <Icon name='map' />
                    <span>data-vis</span>
                </Logo>
            )}

            {items.map(MenuItem)}
        </div>

        {rightSection && <div>{rightSection.map(MenuItem)}</div>}
    </Menu>
)
