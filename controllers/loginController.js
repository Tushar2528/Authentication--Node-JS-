
//Require pacakages

const User = require('../models/user_schema');
const passport = require('passport');
const bcrypt = require('bcrypt');


//function to render the login page

module.exports.login = function(req, res) {
  res.render('login');
};


//function to authenticate and create login session for the user
module.exports.loginUser = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Set the error message
      var errorMessage = 'Incorrect password.';
      // Render the login view with the error message
      return res.render('login', { error: errorMessage });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      // Redirect to secrets page on successful login
      req.flash('success', 'Logged In Successfully !');
      res.redirect('/secrets');
    });
  })(req, res, next);
};



  