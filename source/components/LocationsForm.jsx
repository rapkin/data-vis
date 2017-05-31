import React from 'react'
import { SendButton } from '../elements/buttons.jsx'
import Locations from '../components/Locations.jsx'
import LocationsMap from '../components/LocationsMap.jsx'
import {
    FullWrapper,
    MapWrapper,
    SideWrapper,
    SearchInput,
    ButtonsWrapper,
    Counter
} from '../elements/common.jsx'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.removed = []
        this.state = {
            search: '',
            focusedOnMap: null,
            focusedOnForm: null,
            locations: this.props.locations
        }
    }

    setMapFocus(marker) {
        this.setState({focusedOnMap: marker})
        clearTimeout(this.focusMapTimeout)
        this.focusMapTimeout = setTimeout(() => this.setState({focusedOnMap: null}), 1000)
    }

    setFormFocus(marker) {
        this.setState({focusedOnForm: marker})
        clearTimeout(this.focusFormTimeout)
        this.focusFormTimeout = setTimeout(() => this.setState({focusedOnForm: null}), 1000)
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
        this.setFormFocus(newItem)
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
        const { focusedOnForm, focusedOnMap, locations, search } = this.state
        const { added, changed, removed } = this.getChangedItems()
        const canSave = added.length > 0 || changed.length > 0 || removed.length > 0
        const filtered = !search ? locations : locations
            .filter(l => l.name.toLowerCase().indexOf(search.toLowerCase()) > -1)

        return <FullWrapper>
            <SideWrapper>
                <SearchInput
                    onChange={(e) => this.setState({search: e.target.value})}
                    placeholder='Search location'
                    value={search} />
                <Locations
                    onNavigateTo={::this.setMapFocus}
                    focused={focusedOnForm}
                    search={search}
                    onChange={::this.changeLocation}
                    onRemove={::this.removeLocation}
                    locations={filtered} />
            </SideWrapper>

            <MapWrapper>
                <LocationsMap
                    focused={focusedOnMap}
                    onMapClick={::this.addLocation}
                    onLocationClick={::this.setFormFocus}
                    locations={filtered} />

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
            </MapWrapper>
        </FullWrapper>
    }
}
