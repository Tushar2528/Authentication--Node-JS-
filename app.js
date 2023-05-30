
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const encrypt = require('mongoose-encryption');

const db = require('./config/mongoose');
const User = require('./models/user_schema');


console.log(process.env.SECRET);

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended : true

}));

// ******************************************************Router Part*******************************
// app.get('/', require('./routes'));
app.get("/", function(req,res){
    res.render("home");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});


// **********************************************************

app.post('/register', function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    console.log(req.body);
    console.log(newUser.email);
    console.log(newUser.password);
    console.log(newUser.confirmPassword);
    if (newUser.password !== newUser.confirmPassword) {
        // Password and confirmPassword do not match
        res.render('register', { error: 'Passwords do not match' });
    } else {
        newUser.save()
            .then(function() {
                res.render('secrets');
            })
            .catch(function(err) {
                console.log(err);
                res.render('register', { error: 'Error occurred while saving user' });
            });
    }
});


// *****************************************************

app.post('/login', function(req,res){
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

// ****************************************************************************Router part end**************************************************


app.listen(8000, function(){
    console.log("Server started on port : 8000");
})