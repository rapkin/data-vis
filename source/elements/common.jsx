import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { Icon } from './icons.jsx'

export const Hero = styled.div`
    background: ${colors.font};
    color: ${colors.background};
    padding: 20px;
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1, h2 {
        font-weight: 100;
    }

    h1 {
        font-size: 73px;
        margin: 0;
    }

    h2 {
        font-size: 30px;
    }

    button {
        margin: 0 20px;
    }
`

const LoadingWrapper = styled.div`
    font-size: 24px;
    text-align: center;
    width: 100%;
    padding: 40px 20px;

    .fa {
        margin-right: 20px;
    }
`

export const Loading = () =>
    <LoadingWrapper>
        <Icon name='circle-o-notch' spin={true} />
        Loading
    </LoadingWrapper>
