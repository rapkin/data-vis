import React from 'react'
import styled from 'styled-components'
import Leaflet from 'leaflet'
import { Map, Marker, Tooltip, TileLayer, Rectangle } from 'react-leaflet'
import { Mapbox as config } from '../../config.json'
import { authRequired } from '../helpers/auth.jsx'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme
const [cx, cy] = config.center

const MapWrapper = styled.div`
    height: calc(100vh - 50px);
`

@authRequired
export default class Home extends React.Component {
    render() {
        return (
            <MapWrapper>
                <Map center={config.center} zoom={config.zoom} >
                    <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    <Marker position={config.center}>
                        <Tooltip>
                            <span>test</span>
                        </Tooltip>
                    </Marker>

                    <Rectangle bounds={[[cx, cy], [cx+2, cy+2]]} />
                </Map>
            </MapWrapper>
        )
    }
}
