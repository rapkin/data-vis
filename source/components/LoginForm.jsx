import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {login} from '../actions/auth'

const validate = (values) => {
    const errors = {}

    if (!values.username)
        errors.username = 'Required'
    else if (values.username.length > 15)
        errors.username = 'Must be 15 characters or less'

    if (!values.password)
        errors.password = 'Required'
    else if (!/^[a-z0-9_]{3,}$/i.test(values.password))
        errors.password = 'Invalid password'

    return errors
}

const Input = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

@reduxForm({form: 'loginForm', validate})
export default class LoginForm extends Component {
    render() {
        const {handleSubmit, submitting} = this.props
        return (
            <form onSubmit={handleSubmit(login)}>
                <Field name="username" type="text" component={Input} label="Username" />
                <Field name="password" type="password" component={Input} label="Password" />
                <button type="submit" disabled={submitting}>Login</button>
            </form>
        )
    }
}
