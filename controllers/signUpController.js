const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const { validationResult } = require("express-validator")
exports.get_sign_up = (req, res, next) => {
    res.render("sign-up", {
        error: ""
    })
}
exports.post_sign_up = asyncHandler(async(req, res, next) => {
    const result = validationResult(req)
    if(result.errors.length > 0){
        res.render("sign-up",{
            error: result.errors[0].msg
        })
    }
    else{
        const { first_name, last_name, username, password } = req.body;
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if(err){
                res.redirect("/sign-up")
            }
            else{
                const user = new User({
                    first_name,
                    last_name,
                    username,
                    password: hashedPassword,
                })
                await user.save();
                res.redirect("/")
            }
        })
    }
    
})