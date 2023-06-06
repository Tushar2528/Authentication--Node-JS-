
//Require all the packages

const mongoose = require('mongoose');
const md5 = require("md5");
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

//Defing the mongoose schema for our  user


const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    confirmPassword : String,
    googleId : String
});

//Passport js plugins

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());




//serializing and deserializing the user and session
passport.serializeUser(function(user,done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){

    User.findById(id)
    .then((user) => {
        done(null, user);
    })
    .catch((err) => {
        done(err);
    });


    
});


module.exports = User;

