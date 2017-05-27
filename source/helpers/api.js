import { SubmissionError } from 'redux-form'
import axios from 'axios'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const createHandler = (type, url) => (data) =>
    sleep(1000).then(() => axios[type](url, data)
        .catch(err => {
            throw new SubmissionError({_error: err.toString()})
        })
    )

export default class Api {
    constructor(root, version = 'api') {
        this.version = version
        this.root = root
        this.routes = {}
    }

    _registerHandler(type, subroute) {
        const handler = createHandler('post', `/${this.root}/${subroute}/`)
        this.routes[subroute] = this.routes[subroute] || handler
        this.routes[subroute][type] = handler
        return handler
    }

    get(subroute = '') {
        return this._registerHandler('get', subroute)
    }

    post(subroute = '') {
        return this._registerHandler('post', subroute)
    }

    put(subroute = '') {
        return this._registerHandler('put', subroute)
    }

    expose(exportsObj) {
        for (let key in this.routes) {
            exportsObj[key] = this.routes[key]
        }
        return this.routes
    }
}
