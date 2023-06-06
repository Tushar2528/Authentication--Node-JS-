//Require the necessary pacakages and initialize the router

const express = require('express');
const router = express.Router();
const passport = require('passport');

//Require all the necessary controller files for accessing the controller actions


const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const pageController = require('../controllers/pageController');
const resetPasswordController = require('../controllers/resetPasswordController');

//Rendering the home page


router.get('/', function(req, res){
    res.render('home');
});

//defining all the routes and the associated controller actions


router.get('/register', registerController.register);
router.post('/register',registerController.registerUser);

router.get('/secrets', pageController.page);

router.get('/login', loginController.login);
router.post('/login'  , loginController.loginUser);

router.get('/logout', logoutController.logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


router.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  }
);


router.get('/reset', resetPasswordController.resetPage);
router.post('/reset', resetPasswordController.resetPassword);


module.exports = router;