// **************************Database part with mongoose********************************
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser : true});


//verifying the connection
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "error connecting to db"));


// Up and running, print the message
db.once('open', function(){
    console.log('Successfully  connected to the database');

});
