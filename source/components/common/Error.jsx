import React from 'react'

class Error extends React.Component {
    render() {
        const {text, retry, retryLabel = 'Retry'} = this.props
        if (text) return (
                <p className='error'>
                    {text}
                    {retry && <button onClick={retry}>{retryLabel}</button>}
                </p>
            )
        else return this.props.children || null
    }
}

export default Error
