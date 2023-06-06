
//Require packages and other files


const passport = require('passport');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user_schema');


//creating the local strategy


passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email, password, done){
        User.findOne({email : email})
        .then(function(user){
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) {
                    req.flash('error', 'Error in finding user!');
                return done(err);
                }
                if (!isMatch) {
                    req.flash('error', 'Invalid Username/Password');
                return done(null, false);
                }
                return done(null, user);
            });
        })
        .catch(function(err){
            req.flash('error', err);
            // console.log("Error in finding user --> Passport");
            return done(err);

        });
    }
        


));

//serializing and deserializing 


passport.serializeUser(function(user, done){
    done(null, user.id)
});


passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        return done(null, user);
    });
});

//Creating methods for checking authentication and setting up the authenticated user


passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return  res.redirect('login');
}

passport.setAuthenticatedUser = function(req,res, next){
    if(req.isAuthenticated()){

        // req.user contains the current signed in user from the session cookie and we are just sending it to the locals for views  
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;