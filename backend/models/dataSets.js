import mongoose, { Schema } from 'mongoose'

const shema = mongoose.Schema({
    text: {
        name: {
            type: String,
            trim: true
        },
        userId: Schema.Types.ObjectId
    }
})

const model = mongoose.model('dataSets', shema)
export default model
