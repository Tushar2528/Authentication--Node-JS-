//Creating a custom middleware for flash messages

module.exports.setFlash = function(req, res, nexct){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    nexct();
}