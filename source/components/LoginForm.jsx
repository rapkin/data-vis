import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components'
import {Icon, Error} from './common'

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

const getInputColor = (props) =>
    props.error ? colors.red : props.active ? colors.green : colors.grey

const colors = {
    green: '#20b2aa',
    greenDarken: '#1b9b94',
    red: '#cd5c5c',
    grey: '#666'
}

const Form = styled.form`
    margin: 20px auto;
    padding: 30px;
    width: 100%;
    max-width: 500px;
    background: white;
    border-radius: 5px;
`

const FormTitle = styled.h1`
    font-size: 24px;
    margin: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .fa {
        margin-right: 10px;
    }
`

const InputWrapper = styled.div`
    margin-top: 15px;
    position: relative;
`

const InputLabel = styled.span`
    color: ${getInputColor};
    font-size: 12px;
`

const InputError = styled.span`
    opacity: 0.5;
    font-size: 10px;
    color: white;
    position: absolute;
    right: 5px;
    top: 5px;
    height: 20px;
    background: indianred;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    &:hover {
        opacity: 1;
    }
`

const Input = styled.input`
    width: 100%;
    background: transparent;
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: solid 2px ${getInputColor};
    padding: 10px 15px;
`

const SendButton = styled.button`
    background: ${colors.green};
    border: none;
    outline: none;
    color: white;
    text-transform: uppercase;
    font-size: 20px;
    padding: 10px 20px;
    width: 100%;
    margin-top: 15px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: ${colors.greenDarken};
    }

    &:disabled, &[disabled=disabled] {
        opacity: 0.7;
        background: ${colors.grey};
    }
`

const FormInput = ({input, label, type, meta: {touched, error, active}}) => {
    const hasError = touched && error
    return (
        <InputWrapper>
            <InputLabel active={active} error={hasError}>{label}</InputLabel>
            <Input active={active} error={hasError} {...input} placeholder={label} type={type} />
            {hasError && <InputError>{error}</InputError>}
        </InputWrapper>
    )
}

@reduxForm({form: 'loginForm', validate, destroyOnUnmount: false})
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

                <Field name="username" type="text" component={FormInput} label="Username" />
                <Field name="password" type="password" component={FormInput} label="Password" />

                <SendButton type="submit" disabled={submitting}>Login</SendButton>
            </Form>
        )
    }
}
