//Require pacakages

const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user_schema');


//Function to load the reset page

module.exports.resetPage = function(req, res) {
  res.render('reset');
};


//function to reset the password

module.exports.resetPassword = async function(req, res) {

  //getting the fields from req.body

  const username = req.body.username;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  //putting up a check if the new password and confirm new passwords do not match to display appropriate message on screen
  if (newPassword !== confirmNewPassword) {
    
    return res.render('reset', { error: 'New passwords do not match' });
  }

  try {
    const user = await User.findOne({ username: username }).exec();

    if (!user) {
      return res.render('reset', { error: 'User not found' });
    }

    // Set the new password using setPassword method
    await user.setPassword(newPassword);

    // Save the updated user object
    await user.save();

    // Authenticate the user with the new password
    req.login(user, function(err) {
      if (err) {
        console.log(err);
        return res.redirect('/reset');
      }
      req.flash('success', 'Password reset successfull');
      return res.render('login');
      
    });
  } catch (err) {
    console.log(err);
    res.redirect('/reset');
  }
};

