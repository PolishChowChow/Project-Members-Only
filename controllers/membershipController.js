require("dotenv").config()
const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const { validationResult } = require("express-validator")
exports.get_upgrade_membership = (req, res, next) => {
    res.render("upgrade-membership", {
        error: ""
    })
}
exports.post_upgrade_membership = asyncHandler(async(req, res, next) => {
    const id = req.session.passport.user
    const { code } = req.body;
    if(code === process.env.MEMBERSHIP_CODE){
        await User.findByIdAndUpdate(id, {
            membership_status: "member"
        })
        res.redirect("/")
    }
    else{
        res.redirect("/upgrade-to-member")
    }
})
exports.get_upgrade_membership_to_admin = (req, res, next) => {
    res.render("upgrade-membership", {
        error: ""
    })
}
exports.post_upgrade_membership_to_admin = asyncHandler(async(req, res, next) => {
    const id = req.session.passport.user
    const { code } = req.body;
    const result = validationResult(req)
    if(result.errors.length > 0){
        res.render("upgrade-membership",{
            error: result.errors[0].msg
        })
    }
    if(code === process.env.MEMBERSHIP_ADMIN_CODE){
        await User.findByIdAndUpdate(id, {
            membership_status: "admin"
        })
        res.redirect("/")
    }
    else{
        res.redirect("/upgrade-to-admin")
    }
})