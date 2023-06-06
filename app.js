
//Require all the necessary packages installed using npm.
//Require all the exported filed from different subfolders

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const flash = require('connect-flash');
const customMVare = require('./config/middleware');
const passportLocal = require('./config/passport-local-strategy');

const db = require('./config/mongoose');
const User = require('./models/user_schema');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  resave : false,
  cookie : {
    maxAge : (1000 *60 *100)
  }
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser());
app.use(flash());
app.use(customMVare.setFlash);



// Passport Configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport Google OAuth Strategy
passportGoogle(passport);

// Router
app.use('/', require('./routes'));


//Providing the port to the app to be available on the web
app.listen(8000, function () {
  console.log("Server started on port: 8000");
});












