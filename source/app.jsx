import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Root from './components/Root.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Registration from './pages/Registration.jsx'
import Locations from './pages/Locations.jsx'
import Data from './pages/Data.jsx'

import Leaflet from 'leaflet'
Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/' // fixme

render((
    <Provider store={store}>
        <Router>
            <Root>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path='/registration' component={Registration} />
                <Route path='/locations' component={Locations} />
                <Route path='/data' component={Data} />
            </Root>
        </Router>
    </Provider>
), document.getElementById('root'))
