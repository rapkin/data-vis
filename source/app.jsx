import React from 'react'
import {render} from 'react-dom'
import {Route} from 'react-router'
import {ConnectedRouter as Router} from 'react-router-redux'
import {Provider} from 'react-redux'
import store, {history} from './store'

import Root from './components/Root.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

render((
    <Provider store={store}>
        <Router history={history}>
            <Root>
                <Route exact path='/' component={Login} />
                <Route path='/login' component={Login} />
            </Root>
        </Router>
    </Provider>
), document.getElementById('root'))
