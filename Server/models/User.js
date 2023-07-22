const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    blockArray: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);