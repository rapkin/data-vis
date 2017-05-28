import mongoose, { Schema } from 'mongoose'

const shema = mongoose.Schema({
    text: {
        name: {
            type: String,
            lowercase: true,
            trim: true
        },
        password: String,
        type: Number
    }
})

const model = mongoose.model('users', shema)
export default model
