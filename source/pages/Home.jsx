import React from 'react'
import { authRequired } from '../helpers/auth.jsx'
import { Hero } from '../elements/common.jsx'

@authRequired
export default class Home extends React.Component {
    render() {
        return <Hero><h1>hi</h1></Hero>
    }
}
