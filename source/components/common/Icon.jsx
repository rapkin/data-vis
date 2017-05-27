import React from 'react'

class Icon extends React.Component {
    render() {
        const {className, name, title, style, spin, pulse} = this.props
        const classNames = ['fa fa-'+name, className]
        if (spin) classNames.push('fa-spin')
        if (pulse) classNames.push('fa-pulse')
        return (
            <i title={title} className={classNames.join(' ')} style={style} />
        )
    }
}

export default Icon
