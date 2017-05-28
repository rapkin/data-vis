import mongoose, { Schema } from 'mongoose'

const shema = mongoose.Schema({
    text: {
        hash: String,
        created: Number,
        userId: Schema.Types.ObjectId // do we need this?
    }
})

const model = mongoose.model('tokens', shema)
export default model
