import React from 'react'
import styled from 'styled-components'
import Message from './Message.jsx'

const Wrapper = styled(Message)`
    background: indianred;
`

class Error extends React.Component {
    render() {
        const {text, retry, retryLabel = 'Retry'} = this.props
        if (text) return (
                <Wrapper>
                    {text}
                    {retry && <button onClick={retry}>{retryLabel}</button>}
                </Wrapper>
            )
        else return this.props.children || null
    }
}

export default Error
