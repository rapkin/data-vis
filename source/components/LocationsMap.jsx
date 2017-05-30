import React from 'react'
import styled from 'styled-components'
import Leaflet from 'leaflet'
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet'
import { Map as config } from '../../config.json'
import colors from '../colors.js'

const buildMarker = (color = 'green') =>
    `<div
        style="
            margin-top: -10px;
            margin-left: -10px;
            width: 20px;
            height: 20px;
            background: ${colors[color]};
            border: 1px solid white;
            border-radius: 50%;
        "
    />`

const markerIcon = Leaflet.divIcon({
    iconSize: null,
    html: buildMarker('red')
})

const Wrapper = styled.div`
    height: calc(100vh - 50px);
    Width: 100%;
`

export default class Home extends React.Component {
    navigateTo(marker) {
        const {lat, lon} = marker
        this.map.leafletElement.panTo({lat, lng: lon})
    }

    componentDidUpdate() {
        if (this.props.focused) this.navigateTo(this.props.focused)
    }

    render() {
        const {locations, onLocationClick, onMapClick} = this.props
        return <Wrapper>
            <Map
                ref={m => this.map = m}
                center={config.center}
                zoom={config.zoom}
                onClick={onMapClick} >

                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                {locations.map((location, i) => (
                    <Marker
                        key={i}
                        onClick={() => onLocationClick(location)}
                        position={[location.lat, location.lon]}
                        icon={markerIcon} >
                        <Tooltip>
                            <span>
                                [{location.lat.toFixed(3)}; {location.lon.toFixed(3)}]
                                <b> {location.name} </b>
                            </span>
                        </Tooltip>
                    </Marker>
                ))}
            </Map>
        </Wrapper>
    }
}
