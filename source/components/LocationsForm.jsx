import React from 'react'
import styled from 'styled-components'
import { SendButton } from '../elements/buttons.jsx'
import colors from '../colors.js'
import Locations from '../components/Locations.jsx'
import LocationsMap from '../components/LocationsMap.jsx'

const Wrapper = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
`

const LocationsWrapper = styled.div`
    width: 400px;
    padding: 10px;
    overflow: auto;
`

const LocationsMapWrapper = styled.div`
    width: calc(100% - 400px);
`

const ButtonsWrapper = styled.div`
    position: absolute;
    height: 50px;
    bottom: 0;
    right: 0;
    width: calc(100% - 400px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: white;
    z-index: 1000;
`

const CounterEl = styled.span`
    padding: 0 10px;
    color: ${props => colors[props.color]};
`

const Counter = ({color, title, value}) =>
    value ? <CounterEl color={color}>{title}: <b>{value}</b></CounterEl> : null

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.removed = []
        this.state = {
            focused: null,
            locations: this.props.locations
        }
    }

    setFocus(marker) {
        this.setState({focused: marker})
        clearTimeout(this.focusTimeout)
        this.focusTimeout = setTimeout(() => this.setState({focused: null}), 1000)
    }

    changeLocation(oldItem, newFields) {
        const newItem = {...oldItem, ...newFields}
        this.setState({locations: this.state.locations.map(l => l == oldItem ? newItem : l)})
    }

    removeLocation(location) {
        if (location.id) this.removed.push(location)
        this.setState({locations: this.state.locations.filter(l => l != location)})
    }

    addLocation({latlng: {lat, lng}}) {
        const newItem = {name: '', lat, lon: lng}
        this.setState({locations: [...this.state.locations, newItem]})
        this.setFocus(newItem)
    }

    getChangedItems() {
        const { locations } = this.state
        const added = locations.filter(l => !l.id)
        const changed = locations.filter(l => l.id && this.props.locations.indexOf(l) == -1)
        return {added, changed, removed: this.removed}
    }

    saveChanges() {
        this.props.handleSave(this.getChangedItems())
    }

    render() {
        const { focused, locations } = this.state
        const { added, changed, removed } = this.getChangedItems()
        const canSave = added.length > 0 || changed.length > 0 || removed.length > 0

        return <Wrapper>
            <LocationsWrapper>
                <Locations
                    onNavigateTo={::this.setFocus}
                    focused={focused}
                    onChange={::this.changeLocation}
                    onRemove={::this.removeLocation}
                    locations={locations} />
            </LocationsWrapper>

            <LocationsMapWrapper>
                <LocationsMap
                    focused={focused}
                    onMapClick={::this.addLocation}
                    onLocationClick={::this.setFocus}
                    locations={locations} />
            </LocationsMapWrapper>

            {canSave && (
                <ButtonsWrapper>
                    <div>
                        <Counter color='red' title='Removed' value={removed.length} />
                        <Counter color='green' title='Added' value={added.length} />
                        <Counter color='yellow' title='Changed' value={changed.length} />
                    </div>

                    <SendButton onClick={::this.saveChanges}>Save changes</SendButton>
                </ButtonsWrapper>
            )}
        </Wrapper>
    }
}
