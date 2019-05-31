
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup')
const passport = require('passport');
const app = express();

mongoose.connect('mongodb://localhost:27017/ElbrusKudos', { useNewUrlParser: true });

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/index");
const authRouter = require('./routes/auth-routes')

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
