// require packages

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user_schema');


//Google oauth configuration


const passportGoogle = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'https://nodejs-authentication-ny8r.onrender.com/auth/google/secrets',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              provider: 'google',
            });
            await user.save();
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

module.exports = passportGoogle;





