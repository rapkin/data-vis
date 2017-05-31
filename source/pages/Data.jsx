import React from 'react'
import { authRequired } from '../helpers/auth.jsx'
import {
    post as saveDataSet,
    put as addDataSet,
    del as removeDataSet,
    get as getDataSets
} from '../api/dataSets'
import {
    post as saveDataEntry,
    put as addDataEntry,
    del as removeDataEntries,
    get as getDataEntries
} from '../api/dataEntries'
import { get as getLocations } from '../api/locations'
import { Loading } from '../elements/common.jsx'
import {
    MapWrapper,
    SideWrapper,
    FullWrapper,
    ButtonsWrapper,
    Item,
    Tip,
    Counter
} from '../elements/common.jsx'
import LocationsMap from '../components/LocationsMap.jsx'
import { RawStyledInput } from '../elements/forms.jsx'
import { RemoveButton, SendButton, ClearButton } from '../elements/buttons.jsx'

@authRequired
export default class DataPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            items: [],
            locations: [],
            active: null,
            adding: false,
            dataValues: []
        }
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        const getSetsP = this.loadDataSets()
        const getLocsP = getLocations().then(res => this.setState({locations: res.data.list}))
        const getValuesP = this.loadDataEntries()
        Promise.all([getSetsP, getLocsP, getValuesP]).then(() => this.setState({loading: false}))
    }

    loadDataSets() {
        return getDataSets().then(res => this.setState({items: res.data.list}))
    }

    loadDataEntries() {
        return getDataEntries().then(res => this.setState({dataValues: res.data.list}))
    }

    focusLocationMap(location) {
        this.setState({focusedMapLocation: location})
        clearTimeout(this.fousTimeout)
        this.fousTimeout = setTimeout(() => this.setState({focusedMapLocation: null}), 1000)
    }

    focusLocationInput(location) {
        this.setState({focusedInputLocation: location})
        clearTimeout(this.fousTimeout)
        this.fousTimeout = setTimeout(() => this.setState({focusedInputLocation: null}), 1000)
    }

    componentDidUpdate() {
        const index = this.state.locations.indexOf(this.state.focusedInputLocation)
        if (!this.refs[`el${index}`]) return
        this.refs[`el${index}`].parentElement.scrollIntoView()
    }

    remove(dataSet) {
        this.setState({
            active: null,
            dataValues: this.state.dataValues.filter(v => v.set_id != dataSet.id),
            items: this.state.items.filter(d => d != dataSet)
        })
        removeDataSet({ids: [dataSet.id]})
    }

    changeName(dataSet, name) {
        this.setState({
            items: this.state.items.map(d => d.id != dataSet.id ? d : {...d, name})
        })
    }

    addDataSet() {
        this.setState({adding: true})
        addDataSet({name: ''}).then(() => {
            this.loadDataSets().then(() => this.setState({adding: false}))
        })
        // .then(() =>
        //     this.setState({
        //         items: [...this.state.items, {name: 'added', id: Date.now()}],
        //         adding: false
        //     })
        // )
    }

    findDataEntry(location) {
        const { active, dataValues } = this.state
        return dataValues.find(v => v.location_id == location.id && v.set_id == active)
    }

    getValue(location) {
        const found = this.findDataEntry(location)
        return found ? found.value : ''
    }

    changeValue(location, value) {
        const { active, dataValues } = this.state
        const found = this.findDataEntry(location)
        if (found) {
            this.setState({
                dataValues: dataValues.map(v => v == found ? {...v, value, changed: true} : v)
            })
        } else {
            const newValue = {location_id: location.id, set_id: active, value, new: true}
            this.setState({dataValues: [...dataValues, newValue]})
        }
    }

    getChanged() {
        const added = this.state.dataValues.filter(v => v.new)
        const changed = this.state.dataValues.filter(v => v.changed && !v.new)
        return {added, changed}
    }

    saveChanges() {
        const { added, changed } = this.getChanged()
        this.setState({loading: true})
        const addP = added.map(v => {
            const {value, set_id, location_id, time = Date.now()} = v
            return addDataEntry({value, set_id, location_id, time})
        })

        const saveP = changed.map(v => {
            const {value, set_id, location_id, time = Date.now(), id} = v
            return saveDataEntry({value, set_id, location_id, time, id})
        })

        Promise.all([addP, saveP]).then(() => {
            this.loadDataEntries().then(() => this.setState({
                loading: false,
                active: null,
                adding: false
            }))
        })
    }

    clearValue(location) {
        const found = this.findDataEntry(location)
        if (!found) return
        if (!found.new) removeDataEntries({ids: [found.id]})
        this.setState({dataValues: this.state.dataValues.filter(v => v != found)})
    }

    render() {
        const {
            loading,
            adding,
            items,
            locations,
            active,
            focusedInputLocation,
            focusedMapLocation
        } = this.state
        const { added, changed } = this.getChanged()
        const canSave = added.length > 0 || changed.length > 0
        const activeItem = items.find(d => d.id == active)

        if (loading) return <Loading />
        return <FullWrapper>
            <SideWrapper>
                {items.map((dataSet, i) =>
                    <Item
                        key={i}
                        active={active && dataSet.id == active}
                        onClick={() => this.setState({active: dataSet.id})}>
                        <span>Click to input data</span>
                        <RawStyledInput
                            label='Data set name'
                            onBlur={() => saveDataSet(dataSet)}
                            onChange={(e) => this.changeName(dataSet, e.target.value)}
                            value={dataSet.name} />
                        <RemoveButton onClick={() => this.remove(dataSet)} />
                    </Item>
                )}
                <Tip>
                    <SendButton disabled={adding} onClick={::this.addDataSet}>Add new</SendButton>
                </Tip>
            </SideWrapper>

            <SideWrapper>
                {activeItem && locations.map((location, i) =>
                    <Item
                        active={focusedInputLocation == location}
                        onClick={() => this.focusLocationMap(location)}
                        key={i} >
                        <span ref={`el${i}`}>
                            <b>{location.name} </b>
                            [{location.lat.toFixed(3)}; {location.lon.toFixed(3)}]
                        </span>
                        <RawStyledInput
                            label={`Value of ${activeItem.name}`}
                            onFocus={() => this.focusLocationMap(location)}
                            onChange={(e) => this.changeValue(location, e.target.value)}
                            value={this.getValue(location)} />

                        {this.findDataEntry(location) && (
                            <ClearButton onClick={() => this.clearValue(location)} />
                        )}
                    </Item>
                )}
                {!activeItem && <Tip>Select data set to input data</Tip>}
            </SideWrapper>

            <MapWrapper>
                <LocationsMap
                    onLocationClick={::this.focusLocationInput}
                    focused={focusedMapLocation}
                    locations={locations} />

                {canSave && (
                    <ButtonsWrapper>
                        <div>
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
