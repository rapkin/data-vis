import React from 'react'
import styled from 'styled-components'
import { Icon } from './icons.jsx'
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

    &:hover {
        background: ${colors.greyDarken};
    }
`

export const ButtonRed = styled(Button)`
    background: ${colors.red};

    &:hover {
        background: ${colors.redDarken};
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

const RemoveButtonWrapper = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: ${colors.red};
    color: white;
    cursor: pointer;

    &:hover {
        background: ${colors.redDarken};
    }
`

const ClearButtonWrapper = styled(RemoveButtonWrapper)`
    background: ${colors.yellow};
    &:hover {
        background: ${colors.yellowDarken};
    }
`

export const RemoveButton = (props) =>
    <RemoveButtonWrapper {...props}>
        <Icon name='times' />
    </RemoveButtonWrapper>

export const ClearButton = (props) =>
    <ClearButtonWrapper {...props}>
        <Icon name='minus-circle' />
    </ClearButtonWrapper>
