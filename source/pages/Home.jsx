import React from 'react'
import Leaflet from 'leaflet'
import { Map, Marker, Tooltip, TileLayer, Rectangle } from 'react-leaflet'
import { Mapbox as config } from '../../config.json'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme
const [cx, cy] = config.center

class Home extends React.Component {
    render() {
        return (
            <Map center={config.center} zoom={config.zoom}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                <Marker position={config.center}>
                    <Tooltip>
                        <span>test</span>
                    </Tooltip>
                </Marker>

                <Rectangle bounds={[[cx, cy], [cx+2, cy+2]]} />
            </Map>
        )
    }
}

export default Home
