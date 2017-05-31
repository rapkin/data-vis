import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { Icon } from './icons.jsx'

export const FullWrapper = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
    position: relative
`

export const SideWrapper = styled.div`
    position: relative;
    width: 400px;
    padding: 10px;
    overflow: auto;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
`

export const SearchInput = styled.input`
    height: 50px;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${colors.green};
    outline: none;
    padding: 0 20px;
    font-size: 18px;
`

export const MapWrapper = styled.div`
    width: calc(100% - 400px);
`

export const ButtonsWrapper = styled.div`
    position: absolute;
    height: 50px;
    bottom: 0;
    right: 0;
    width: calc(100% - 400px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: white;
    z-index: 900;
    box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, .3);
`

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
