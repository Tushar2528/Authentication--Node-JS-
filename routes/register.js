const express = require('express');
const router = express.Router();

router.get("/register", function(req,res){
    res.render("register");
});


router.post('/register', function(req, res){
    const newUser = new User({
        email : req.body.username,
        password : req.body.password
    });

    newUser.save()
    .then(function(){
        res.render('secrets');
    })
    .catch(function(err){
        console.log(err);
    });
});

module.exports = router;