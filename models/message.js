const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    title: {
        required: true,
        type: String,
        max_length: 80,
    },
    content: {
        required: true,
        type: String,
    },
    timestamp:{
        required: true,
        type: Date,
    },
    user_id: {
        required: true,
        type: Schema.ObjectId.User,
    }
})
const Message = mongoose.model("Message", messageSchema)
export default Message;