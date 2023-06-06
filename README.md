This is the NodeJS-Authentication project built using Node JS, MongoDB , Express and EJS.
This project uses passportJS local strategy to authenticate the user. Google authorization is also implemented here using the
google OAuth strategy as part of the passport package while bcrpy has been used for password encryption.

The basic structure of the application is as follows :

1- We have the main app.js file which which is the entry point for our application. Here all the essential pacakages are required, passport authentication
has been setup and passport session has been initialized and the port has been defined at which we expect our application to run.

2- We have the views folder which contains all the .ejs files(sort of HTML code) for all the pages that are being rendered after successful or unsuccessful authentication.
We have the home file, secrets page which is loaded after the registrationor login is successful, we have login.ejs file, register.ejs file and the reset.ejs 
file which is rendered when we want to reset the password.

3- Then we have the routes folder which has the entry point and only filr index.js which contains the routes that have been defined against all the controller actions.

4- After that we have the controllers folder which contains all the controller logics for login, register, reset etc. After hitting any route whatever 
action has to be performed is defined in the various files of this folder.

5- Then we have the models folder which as of now only has the user_schema.js file. In this file we have the schema defined for what details of the user need to be stored 
within the database.

6- At last, we have the config folder which contains all the files for the configuration like mongoose config file, files for passport local and passport google oauth
strategy and a custom made middleware to implement flash messages.

All the required dependencies are provided in the package.json file within the project folder. To install thode dependencies, simply run "npm install" in the terminal of 
VSCode or whatever IDE you are using.

Hosted link for the application - https://nodejs-authentication-ny8r.onrender.com
