import React from 'react'
import styled from 'styled-components'
import Leaflet from 'leaflet'
import { connect } from 'react-redux'
import { Map, Marker, Tooltip, TileLayer, Rectangle } from 'react-leaflet'
import { Map as config } from '../../config.json'
import { authRequired } from '../helpers/auth.jsx'
import decode from 'jwt-decode'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme
const [cx, cy] = config.center

const MapWrapper = styled.div`
    height: calc(100vh - 50px);
`

@authRequired
@connect((state) => ({authToken: state.auth.token}))
export default class Home extends React.Component {
    render() {
        const userId = decode(this.props.authToken).user_id
        if (this.props.authToken) return <h1>Hi, your id {userId}</h1>
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
