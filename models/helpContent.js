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
})
messageSchema.virtual("url").get(function(){
    return `help/${this._id}`;
})
const Message = mongoose.model("Message", messageSchema)
export default Message;