const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model('bookingSchema', bookingSchema)