import mongoose, { Schema } from 'mongoose'

const shema = mongoose.Schema({
    text: {
        time: Number,
        value: Number,
        locationId: Schema.Types.ObjectId,
        dataSetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId
    }
})

const model = mongoose.model('dataEntries', shema)
export default model
