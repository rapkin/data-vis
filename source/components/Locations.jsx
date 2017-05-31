import React from 'react'
import styled from 'styled-components'
import { RawStyledInput } from '../elements/forms.jsx'
import { Icon } from '../elements/icons.jsx'
import { RemoveButton } from '../elements/buttons.jsx'

const Item = styled.div`
    position: relative;
    margin-top: 10px;
    border-radius: 5px;
    width: 100%;
    padding: 20px 10px;
    background: ${props => props.active ? '#a8d2aa': 'white'};
`

const NavigateIcon = styled(Icon)`
    color: #333;
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
`

const Tip = styled.p`
    text-align: center;
    color: #777;
`

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
                <Item key={i} active={focused == location}>
                    <span ref={`el${i}`}>
                        <i>Lat</i>: {location.lat.toFixed(3)},
                        <i> Lon</i>: {location.lon.toFixed(3)}
                        <NavigateIcon
                            name='crosshairs'
                            onClick={() => onNavigateTo(location)} />
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
