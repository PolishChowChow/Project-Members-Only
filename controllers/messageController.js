const { validationResult } = require("express-validator")
const Message = require("../models/message")
const asyncHandler = require("express-async-handler")
exports.get_add_message = (req, res, next) => {
    res.render("add-message", {
        error: ""
    })
}
exports.post_add_message = asyncHandler(async(req, res, next) => {
    const result = validationResult(req)
    if(result.errors.length > 0){
        res.redirect("/message/add", {
            error: result.errros.msg[0]
        })
    }
    else{
        const id = req.session.passport.user
        const { title, content}  = req.body
        const message = new Message({
            title,
            content,
            user_id: id,
            timestamp: new Date().toLocaleDateString(),
        })
        await message.save();
        res.redirect("/")
    }
})
exports.post_message_remove = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await Message.findByIdAndDelete(id)
    res.redirect("/")
})