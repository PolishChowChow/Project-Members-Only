require("dotenv").config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const app = express();
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user.js")
const { defaultStrategy, userSerialization, userDeserialization, setLocalUser } = require("./controllers/passportStuff");

//connection setup
const connectionURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
mongoose.connect(connectionURL)
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "daskndas;",
  resave: false,
  saveUninitialized: true
}))
passport.use(defaultStrategy);
passport.serializeUser(userSerialization)
passport.deserializeUser(userDeserialization);
  
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(passport.initialize())
app.use(passport.session())
app.use(setLocalUser)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
