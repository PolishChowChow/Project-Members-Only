const User = require("../models/user")
exports.doesUserWithThisUsernameExists = async(value) => {
    const result = await User.find({
        username: value,
    })
    return result.length === 0
}