//Require packages

const User = require('../models/user_schema');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { UserExistsError } = require('passport-local-mongoose');


//function to load register page

module.exports.register = async function(req, res){
    try{
        res.render('register');
    }
    catch(err){
        console.log(err);
    }
    
}


//function to check for user registration

module.exports.registerUser = async function(req, res) {
  try {
    const u = await User.findOne({ email: req.body.username }).exec();

    if (u) {
      return res.render('register', { error: { field: 'username', message: 'User already exists!' } });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.render('register', { error: { field: 'confirmPassword', message: 'Passwords do not match' } });
    }

    const newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, function(err, user) {

      //getting the error message and checking the message contents to determine if the user already exists
      
      if (err && err.message === 'A user with the given username is already registered') {

        //displaying error message on the screen

        return res.render('register', { error: { field: 'username', message: 'User already exists!' } });
      }

      if (err) {
        console.log(err);
        return res.redirect('/register');
      }

      passport.authenticate('local')(req, res, function() {

        //on scuccessful authentication displaying the secrets page

        req.flash('success', 'Registration Successful!');
        return res.redirect('/secrets');
      });
    });
  } catch (err) {
    console.log(err);
    return res.redirect('/register');
  }
};


  
