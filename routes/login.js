const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get("/login", loginController.login);


router.post('/login', function(req,res){
    const username  = req.body.username;
    const password = req.body.password;

    User.findOne({email : username})
    .then(function(user){
        if (user){
            if (user.password === password){
                res.render('secrets');
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
});

module.exports = router;
