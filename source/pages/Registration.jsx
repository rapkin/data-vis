import React, { Component } from 'react'
import RegistrationForm from '../components/RegistrationForm.jsx'
import { connect } from 'react-redux'
import { setToken } from '../actions/auth'
import { redirectAuthorized } from '../helpers/auth.jsx'
import { register as registration } from '../api/auth'

@redirectAuthorized()
@connect()
export default class Registration extends Component {
    onSuccess({data}, dispatch) {
        dispatch(setToken(data.token))
    }

    render() {
        return (
            <RegistrationForm
                onSubmit={registration}
                onSubmitSuccess={::this.onSuccess} />
        )
    }
}
