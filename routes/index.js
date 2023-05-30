const express = require('express');



const router = express.Router();

router.get('/', function(req, res){
    res.render('home');
});

router.get('/login', require('./login'));
router.get('/register', require('./register'));

module.exports = router;