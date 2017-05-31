import React, { Component } from 'react'
import styled from 'styled-components'
import colors from '../colors'

const getInputColor = (props) =>
    props.error ? colors.red : props.active ? colors.green : colors.grey

export const Form = styled.form`
    margin: 20px auto;
    padding: 30px;
    width: 100%;
    max-width: 500px;
    background: white;
    border-radius: 5px;

    button {
        margin-top: 20px;
        width: 100%;
    }
`

export const FormTitle = styled.h1`
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

export const InputWrapper = styled.div`
    margin-top: 15px;
    position: relative;
`

export const InputLabel = styled.span`
    color: ${getInputColor};
    font-size: 12px;
`

export const InputError = styled.span`
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

export const Input = styled.input`
    width: 100%;
    min-width: 200px;
    background: transparent;
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: solid 2px ${getInputColor};
    padding: 10px 15px;
`

export const StyledInput = ({ input, type, label, meta: { touched, error, active } }) => {
    const hasError = touched && error
    return <InputWrapper>
        <InputLabel active={active} error={hasError}>{label}</InputLabel>
        <Input active={active} error={hasError} {...input} type={type} placeholder={label} />
        {hasError && <InputError>{error}</InputError>}
    </InputWrapper>
}

export class RawStyledInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            touched: false,
            active: false
        }
    }

    onFocus(event) {
        this.setState({active: true, touched: true})
        this.props.onFocus && this.props.onFocus(event)
    }

    onBlur(event) {
        this.setState({active: false})
        this.props.onBlur && this.props.onBlur(event)
    }

    render() {
        const onFocus = (e) => this.onFocus(e)
        const onBlur = (e) => this.onBlur(e)

        const { type, label } = this.props
        const input = {...this.props, onFocus, onBlur}

        return <StyledInput
            input={input}
            type={type}
            label={label}
            meta={this.state} />
    }
}
