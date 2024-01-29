const passport = require("passport")
const Message = require("../models/message")
const asyncHandler = require("express-async-handler")
exports.get_homepage = asyncHandler(async(req, res, next) => {
    const messages = await Message.find({})
    .populate("user_id")
    res.render("index", {
        messages,
        user: req.user
    })
})
exports.get_log_in = (req, res, next) => {
    res.render("log-in")
}
exports.post_log_in = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
})
exports.get_log_out = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err)
        }
        res.redirect("/")
    })
}

