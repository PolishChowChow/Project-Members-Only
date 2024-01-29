exports.passwordMatch = (value, {req }) => {
    return value === req.body.password
}