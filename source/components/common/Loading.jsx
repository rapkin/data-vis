import React from 'react'

class Loading extends React.Component {
    render() {
        const {text = 'Loading. Please wait', loading} = this.props
        return (loading ? <p className='loading'>{text}</p> : this.props.children || null)
    }
}

export default Loading
