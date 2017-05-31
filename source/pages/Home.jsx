import React from 'react'
import styled from 'styled-components'
import colors from '../colors.js'
import { authRequired } from '../helpers/auth.jsx'
import { get as getDataSets } from '../api/dataSets'
import { get as getDataEntries } from '../api/dataEntries'
import { get as getLocations } from '../api/locations'
import { Loading } from '../elements/common.jsx'
import {
    MapWrapper,
    FullWrapper,
    ButtonsWrapper,
    Counter
} from '../elements/common.jsx'
import DataMap from '../components/DataMap.jsx'
import { OutlineButtonGreen } from '../elements/buttons.jsx'

const DataSetsWrapper = styled(ButtonsWrapper)`
    background: rgba(255, 255, 255, 0.8);
    justify-content: flex-start;
`

const DataSetButton = styled(OutlineButtonGreen)`
    font-size: 16px;
    text-transform: none;
    margin: 0 5px;
    ${props => props.active && `
        background: ${colors.green};
        color: white;
    `}
`

@authRequired
export default class DataPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            dataSets: [],
            locations: [],
            dataEntries: [],
            selected: null
        }
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        const getSetsP = getDataSets().then(res => this.setState({dataSets: res.data.list}))
        const getLocsP = getLocations().then(res => this.setState({locations: res.data.list}))
        const getValuesP = getDataEntries().then(res => this.setState({dataEntries: res.data.list}))
        Promise.all([getSetsP, getLocsP, getValuesP]).then(() => this.setState({loading: false}))
    }

    getDataItems() {
        const { dataEntries, locations, selected } = this.state
        if (!selected) return []
        const locs = {}
        locations.forEach(l => locs[l.id] = l)
        return dataEntries
            .filter(v => v.set_id == selected.id )
            .map(v => ({
                ...v,
                location: locs[v.location_id],
            }))
    }

    render() {
        const { loading, dataSets, selected } = this.state

        if (loading) return <Loading />
        return <FullWrapper>
            <MapWrapper>
                <DataMap items={this.getDataItems()} name={selected && selected.name} />

                <DataSetsWrapper>
                    <Counter color='green' title='Select' value=' ' />
                    {dataSets.map(set =>
                        <DataSetButton
                            onClick={() => this.setState({selected: set})}
                            active={selected == set}
                            key={set.id}>
                            {set.name}
                        </DataSetButton>
                    )}
                </DataSetsWrapper>
            </MapWrapper>
        </FullWrapper>
    }
}
