import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { StyledInput, Form, FormTitle, SendButton } from '../elements/forms.jsx'
import { Error } from '../elements/messages.jsx'
import { Icon } from '../elements/icons.jsx'

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

@reduxForm({form: 'loginForm', validate})
export default class LoginForm extends Component {
    render() {
        const {handleSubmit, submitting, error} = this.props
        return (
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    <span>
                        <Icon name='user-circle' />
                        Login
                    </span>
                    {submitting && <Icon name='circle-o-notch' spin={true}/>}
                </FormTitle>

                <Error text={error} />

                <Field name="username" type="text" component={StyledInput} label="Username" />
                <Field name="password" type="password" component={StyledInput} label="Password" />

                <SendButton type="submit" disabled={submitting}>Login</SendButton>
            </Form>
        )
    }
}
