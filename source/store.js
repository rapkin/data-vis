import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'
import getInitialState from './initialState'

const enhancer = applyMiddleware(thunk, promiseMiddleware())
const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = reduxCompose || compose

export default createStore(rootReducer, getInitialState(), composeEnhancers(enhancer))
