// **************************Database part with mongoose********************************
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL );



//verifying the connection
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "error connecting to db"));


// Up and running, print the message
db.once('open', function(){
    console.log('Successfully  connected to the database');

});
