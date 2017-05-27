import React from 'react'

export const Icon = ({className, name, title, style, spin, pulse}) => {
    const classNames = ['fa fa-'+name, className]
    if (spin) classNames.push('fa-spin')
    if (pulse) classNames.push('fa-pulse')

    return <i title={title} className={classNames.join(' ')} style={style} />
}
