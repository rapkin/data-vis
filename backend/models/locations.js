import mongoose, { Schema } from 'mongoose'

const shema = mongoose.Schema({
    text: {
        name: {
            type: String,
            trim: true
        },
        lat: Number,
        lon: Number,
        userId: Schema.Types.ObjectId
    }
})

const model = mongoose.model('locations', shema)
export default model
