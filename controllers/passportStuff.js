const LocalStrategy = require("passport-local");
const User = require("../models/user")
const bcrypt = require("bcrypt")
exports.defaultStrategy = new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const isValidPassword = bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
exports.userSerialization = (user, done) => {
    done(null, user.id)
}
exports.userDeserialization = (async(id, done) => {
    try{
        const user = await User.findById(id)
        done(null, user)
    }
    catch(error){
        done(error)
    }
})
exports.setLocalUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next()
}