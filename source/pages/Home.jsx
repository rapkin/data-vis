import React from 'react'
import Leaflet from 'leaflet'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme

const position = [51.505, -0.09]
class Home extends React.Component {
    render() {
        return (
            <Map center={position} zoom={13}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                <Marker position={position}>
                    <Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default Home
