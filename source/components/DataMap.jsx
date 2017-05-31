import React from 'react'
import { Map, Tooltip, Rectangle, TileLayer } from 'react-leaflet'
import { Map as config } from '../../config.json'
const w = 0.5

export default ({items}) =>
    <Map center={config.center} zoom={config.zoom}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        {items.map((item, i) => {
            const {location, value} = item
            const [x, y] = [location.lat, location.lon]
            return <Rectangle
                key={i}
                bounds={[[x, y], [x+value/20, y+w]]} >
                <Tooltip>
                    <span>
                        [{location.lat.toFixed(3)}; {location.lon.toFixed(3)}]
                        <b> {location.name} </b>
                    </span>
                </Tooltip>
            </Rectangle>
        })}
    </Map>
