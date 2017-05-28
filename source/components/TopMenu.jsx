import React from 'react'
import {Link} from 'react-router-dom'

export default ({items}) => (
    <ul>
        {items.map(item => (
            <li key={item.link}>
                <Link to={item.link}>{item.name}</Link>
            </li>
        ))}
    </ul>
)
