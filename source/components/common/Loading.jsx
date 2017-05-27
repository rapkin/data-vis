import React from 'react'
import Wrapper from './Message.jsx'

class Loading extends React.Component {
    render() {
        const {text = 'Loading. Please wait', loading} = this.props
        return (loading ? <Wrapper>{text}</Wrapper> : this.props.children || null)
    }
}

export default Loading
