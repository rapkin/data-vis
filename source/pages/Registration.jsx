import RegistrationForm from '../components/RegistrationForm.jsx'
import React, { Component } from 'react'
import { register as registration } from '../api/auth'

export default class Registration extends Component {
    render() {
        return (
            <RegistrationForm onSubmit={registration} />
        )
    }
}
