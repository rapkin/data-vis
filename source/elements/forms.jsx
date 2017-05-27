import React from 'react'
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
    background: transparent;
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: solid 2px ${getInputColor};
    padding: 10px 15px;
`

export const SendButton = styled.button`
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

export const StyledInput = ({input, label, type, meta: {touched, error, active}}) => {
    const hasError = touched && error
    return (
        <InputWrapper>
            <InputLabel active={active} error={hasError}>{label}</InputLabel>
            <Input active={active} error={hasError} {...input} placeholder={label} type={type} />
            {hasError && <InputError>{error}</InputError>}
        </InputWrapper>
    )
}
