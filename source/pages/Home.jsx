import React from 'react'
import { authRequired } from '../helpers/auth.jsx'
import { post, put, del, get } from '../api/locations'
import LocationsForm from '../components/LocationsForm.jsx'

@authRequired
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: true, locations: []}
    }

    componentWillMount() {
        this.loadLocations()
    }

    loadLocations() {
        get().then(res => this.setState({locations: res.data.list, loading: false}))
    }

    handleSave(items) {
        this.setState({loading: true})
        const { added, changed, removed} = items
        const toRemove = removed.map(l => l.id)
        const addP = Promise.all(added.map(l => put(l)))
        const saveP = Promise.all(changed.map(l => post(l)))
        const deleteP = toRemove.length > 0 ? del({ids: toRemove}) : Promise.resolve()
        Promise.all([addP, saveP, deleteP]).then(() => this.loadLocations())
    }

    render() {
        const { loading, locations } = this.state
        if (loading) return <p>loading</p>
        return <LocationsForm handleSave={::this.handleSave} locations={locations} />
    }
}
