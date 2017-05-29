import { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { unsetToken } from '../actions/auth'

@connect()
export default class Logout extends Component {
    componentWillMount () {
        const { dispatch } = this.props
        dispatch(unsetToken())
        dispatch(replace('/'))
    }

    render() {
        return null
    }
}
