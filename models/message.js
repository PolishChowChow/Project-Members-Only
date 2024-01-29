const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 80,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        required: true,
    },
    user_id: {
        required: true,
        ref: 'User',
        type: Schema.ObjectId,
    }
})
const Message = mongoose.model("Message", messageSchema)
module.exports = Message;