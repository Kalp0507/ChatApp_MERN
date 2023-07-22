const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true,
        max: 1000
    },
    isStarred: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })

module.exports = mongoose.model("Message", msgSchema)