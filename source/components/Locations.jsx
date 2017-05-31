import React from 'react'
import { RawStyledInput } from '../elements/forms.jsx'
import { RemoveButton } from '../elements/buttons.jsx'
import { Item, Tip } from '../elements/common.jsx'

export default class Locations extends React.Component {
    componentDidUpdate() {
        const index = this.props.locations.indexOf(this.props.focused)
        if (index > -1) this.refs[`el${index}`].parentElement.scrollIntoView()
    }

    render() {
        const {locations, focused, onNavigateTo, onChange, onRemove} = this.props
        return <div>
            <Tip>Click on map to add new location</Tip>
            {locations.map((location, i) => (
                <Item
                    onClick={() => onNavigateTo(location)}
                    active={focused == location}
                    key={i} >
                    <span ref={`el${i}`}>
                        <i>Lat</i>: {location.lat.toFixed(3)},
                        <i> Lon</i>: {location.lon.toFixed(3)}
                    </span>
                    <RawStyledInput
                        label='Location name'
                        onChange={e => onChange(location, {name: e.target.value})}
                        value={location.name} />
                    <RemoveButton onClick={() => onRemove(location)} />
                </Item>
            ))}
        </div>
    }
}
