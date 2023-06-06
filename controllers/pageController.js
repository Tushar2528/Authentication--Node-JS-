//function to load secrets page based on authentication

const passport = require('passport');

module.exports.page = function(req, res){
    if (req.isAuthenticated()){
        res.render('secrets');
    }
    else{
        res.redirect('login');
    }
};