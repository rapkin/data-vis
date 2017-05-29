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

render((
    <Provider store={store}>
        <Router>
            <Root>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path='/registration' component={Registration} />
            </Root>
        </Router>
    </Provider>
), document.getElementById('root'))
