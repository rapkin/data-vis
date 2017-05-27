import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { Icon } from './icons.jsx'

export const Message = styled.p`
    background: ${colors.blue};
    width: 100%;
    text-align: center;
    padding: 20px;
    border-radius: 5px;
    margin-top: 15px;
    color: white;

    .fa {
        margin-right: 10px;
    }
`

const ErrorEl = styled(Message)`
    background: ${colors.red}
`

export const Error = ({children, text, retry, retryLabel = 'Retry'}) =>
    text ? (
        <ErrorEl>
            <Icon name='exclamation-circle' />
            {text}
            {retry && <button onClick={retry}>{retryLabel}</button>}
        </ErrorEl>
    ) : children || null

export const Loading = ({children, text = 'Loading. Please wait', loading}) =>
    loading ? (
        <Message>
            <Icon name='circle-o-notch' spin={true} />
            {text}
        </Message>
    ) : children || null
