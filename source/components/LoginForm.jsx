import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { StyledInput, Form, FormTitle } from '../elements/forms.jsx'
import { Error } from '../elements/messages.jsx'
import { Icon } from '../elements/icons.jsx'
import { SendButton } from '../elements/buttons.jsx'
import { loginForm as validate } from '../helpers/validation'

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

                <Field
                    name="username"
                    type="text"
                    component={StyledInput}
                    label="Username" />
                <Field
                    name="password"
                    type="password"
                    component={StyledInput}
                    label="Password" />

                <SendButton type="submit" disabled={submitting}>Login</SendButton>
            </Form>
        )
    }
}
