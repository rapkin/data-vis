import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { StyledInput, Form, FormTitle } from '../elements/forms.jsx'
import { SendButton } from '../elements/buttons.jsx'
import { Error } from '../elements/messages.jsx'
import { Icon } from '../elements/icons.jsx'
import { registrationForm as validate } from '../helpers/validation'

@reduxForm({form: 'registrationForm', validate})
export default class RegistrationForm extends Component {
    render() {
        const {handleSubmit, submitting, error} = this.props
        return (
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    <span>
                        <Icon name='user-plus' />
                        Registration
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
                <Field
                    name="confirmPassword"
                    type="password"
                    component={StyledInput}
                    label="Confirm password" />

                <SendButton type="submit" disabled={submitting}>Register</SendButton>
            </Form>
        )
    }
}
