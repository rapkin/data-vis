import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'
import getInitialState from './initialState'

export const history = createHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, promiseMiddleware(), router)
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = reduxCompose || compose

export default createStore(rootReducer, getInitialState(), composeEnhancers(enhancer))
