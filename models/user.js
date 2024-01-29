const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        required: true,
        type: String,
        minLength: 5,
        maxLength: 50,
    },
    last_name: {
        required: true,
        type: String,
        minLength: 5,
        maxLength: 50,
    },
    username: {
        required: true,
        type: String,
        minLength: 5,
        maxLength: 100,
    },
    password: {
        required: true,
        type: String,
        minLength: 8,
    },
    membership_status: {
        required: true,
        type: String,
        default: "basic"
    }
})
const User = mongoose.model("User", userSchema)
module.exports = User;