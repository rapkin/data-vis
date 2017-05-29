import React from 'react'
import styled from 'styled-components'
import Leaflet from 'leaflet'
import { connect } from 'react-redux'
import { Map, Marker, Popup, Tooltip, TileLayer } from 'react-leaflet'
import { Map as config } from '../../config.json'
import { authRequired } from '../helpers/auth.jsx'
import { RawStyledInput } from '../elements/forms.jsx'
import { Icon } from '../elements/icons.jsx'
import { RemoveButton, ButtonRed } from '../elements/buttons.jsx'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme

const Wrapper = styled.div`
    height: calc(100vh - 50px);
    Width: 100%;
`

const ItemsWrapper = styled(Wrapper)`
    overflow-y: auto;
    width: 50%;
    padding: 10px;
`

const RootWrapper = styled(Wrapper)`
    display: flex;
`

const Item = styled.div`
    position: relative;
    margin-top: 10px;
    border-radius: 5px;
    width: 100%;
    padding: 20px 10px;
    background: ${props => props.active ? '#a8d2aa': 'white'};
`

const PopupForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;

    > div {
        margin-top: 0;
    }

    button {
        margin-left: 10px;
    }
`

@authRequired
@connect((state) => ({authToken: state.auth.token}))
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            focused: null
        }
    }

    onClick(e) {
        this.setState({markers: [...this.state.markers, {...e.latlng, name: ''}]})
    }

    setMarkerName(marker, name) {
        const markers = this.state.markers
        const index = markers.findIndex(m => m == marker)
        const newMarker = {...markers[index], name}
        this.setState({markers: markers.map((m, i) => i == index ? newMarker : m)})
    }

    removeMarker(location) {
        this.setState({markers: this.state.markers.filter(loc => loc != location)})
    }

    render() {
        const {markers, focused} = this.state
        return <RootWrapper>
            <ItemsWrapper>
                <p>Click on map to add new location</p>
                {markers.map((marker, i) => (
                    <Item key={i} active={i == focused}>
                        <span>
                            <i>Lat</i>: {marker.lat.toFixed(3)},
                            <i>Lon</i>: {marker.lng.toFixed(3)}
                        </span>
                        <RawStyledInput
                            label='Location name'
                            onChange={e => this.setMarkerName(marker, e.target.value)}
                            value={marker.name} />
                        <RemoveButton onClick={() => this.removeMarker(marker)} />
                    </Item>
                ))}
            </ItemsWrapper>

            <Wrapper>
                <Map
                    ref={m => this.map = m}
                    center={config.center}
                    zoom={config.zoom}
                    onClick={::this.onClick} >

                    <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    {markers.map((marker, i) => (
                        <Marker key={i} position={[marker.lat, marker.lng]}>
                            <Popup>
                                <PopupForm>
                                    <RawStyledInput
                                        label='Location name'
                                        onFocus={() => this.setState({focused: i})}
                                        onBlur={() => this.setState({focused: null})}
                                        onChange={e => this.setMarkerName(marker, e.target.value)}
                                        value={marker.name} />
                                    <ButtonRed
                                        onClick={() => this.removeMarker(marker)}>
                                        <Icon name='times-circle' />
                                    </ButtonRed>
                                </PopupForm>
                            </Popup>
                            <Tooltip>
                                <span>
                                    [{marker.lat.toFixed(3)}; {marker.lng.toFixed(3)}]
                                    <b> {marker.name} </b>
                                </span>
                            </Tooltip>
                        </Marker>
                    ))}
                </Map>
            </Wrapper>
        </RootWrapper>
    }
}
