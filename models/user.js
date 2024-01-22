const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        required: true,
        type: String,
    },
    last_name: {
        required: true,
        type: String,
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
        maxLength: 40,
    },
    membership_status: {
        reqired: true,
        type: "basic" | "verified_user" | "admin",
        default: "basic"
    }
})
const User = mongoose.model("User", userSchema)
export default User;