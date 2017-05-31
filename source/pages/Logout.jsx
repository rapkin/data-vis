import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { unsetToken } from '../actions/auth'
import { logout } from '../api/auth'

@withRouter
@connect()
export default class Logout extends Component {
    componentWillMount () {
        const { dispatch, history: {replace}} = this.props
        logout()
        dispatch(unsetToken())
        replace('/')
    }

    render() {
        return null
    }
}
