import React from 'react'
import { Map, Tooltip, Rectangle, TileLayer } from 'react-leaflet'
import { Map as config } from '../../config.json'
const w = 0.5
const maxH = 2
const getMaxField = (items, name) => {
    if (!items || items.length < 1) return 0
    let max = items[0][name]
    items.forEach(item => {
        if (item[name] > max) max = item[name]
    })
    return max
}

export default ({items, name}) => {
    const maxValue = getMaxField(items, 'value')
    return <Map center={config.center} zoom={config.zoom}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        {items.map((item, i) => {
            const {location, value} = item
            const [x, y] = [location.lat, location.lon]
            return <Rectangle
                key={i}
                bounds={[[x, y], [x+value/maxValue*maxH, y+w]]} >
                <Tooltip>
                    <span>
                        [{location.lat.toFixed(3)}; {location.lon.toFixed(3)}]
                        <b> {location.name} </b><br/>
                        {name}: <b>{value}</b>
                    </span>
                </Tooltip>
            </Rectangle>
        })}
    </Map>
}
