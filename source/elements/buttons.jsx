import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

export const Button = styled.button`
    background: ${colors.grey};
    color: white;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:disabled, &[disabled=disabled] {
        opacity: 0.7;
        background: ${colors.grey};
        cursor: not-allowed;
    }
`

export const OutlineButton = styled(Button)`
    background: transparent;
    color: ${colors.grey};
    border: ${colors.grey} 2px solid;

    &:hover {
        background: ${colors.grey};
        color: white;
    }
`

export const OutlineButtonGreen = styled(Button)`
    background: transparent;
    color: ${colors.green};
    border: ${colors.green} 2px solid;

    &:hover {
        background: ${colors.green};
        color: white;
    }
`

export const SendButton = styled(Button)`
    background: ${colors.green};

    &:hover {
        background: ${colors.greenDarken};
    }
`
