import React from 'react'
import { authRequired } from '../helpers/auth.jsx'
import LocationsForm from '../components/LocationsForm.jsx'

@authRequired
export default class Home extends React.Component {
    render() {
        return <LocationsForm />
    }
}
