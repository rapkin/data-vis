import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import api from './api'
import {Flask as config} from './config.json'

mongoose.Promise = Promise
mongoose.connect(config.mongo || 'mongodb://localhost/data-vis')
const port = config.port || 5000
const app = express()

app.use(bodyParser.json())
app.use('/dist/', express.static(path.join(__dirname, '../dist')))
app.use('/api/', api)

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../dist/index.html')))

app.listen(port, () => console.log(`Started on port ${port}`))
