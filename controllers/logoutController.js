
// function for logging the user out of the session
module.exports.logout = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged Out Successfully !');
        res.redirect('/');
      });
}