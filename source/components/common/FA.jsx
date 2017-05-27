import React from 'react'

class FA extends React.Component {
    render() {
        const {className, name, title} = this.props
        return (
            <i title={title} className={['fa fa-'+name, className].join(' ')} />
        )
    }
}

export default FA
