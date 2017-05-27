import axios from 'axios'
import { SubmissionError } from 'redux-form'

const createHandler = (type, url) => (data) =>
    axios[type](url, data)
        .catch(err => {
            throw new SubmissionError({_error: err.toString()})
        })

export default class Api {
    constructor(root, version = 'api') {
        this.version = version
        this.root = root
        this.routes = {}
    }

    _registerHandler(type, subroute) {
        const segments = []
        if (this.version) segments.push(this.version)
        if (this.root) segments.push(this.root)
        if (subroute) segments.push(subroute)

        const handler = createHandler('post', `/${segments.join('/')}/`)
        this.routes[subroute] = this.routes[subroute] || handler
        this.routes[subroute][type] = handler
        return handler
    }

    get(subroute) {
        return this._registerHandler('get', subroute)
    }

    post(subroute) {
        return this._registerHandler('post', subroute)
    }

    put(subroute) {
        return this._registerHandler('put', subroute)
    }

    expose(exportsObj) {
        for (let key in this.routes) {
            exportsObj[key] = this.routes[key]
        }
        return this.routes
    }
}
