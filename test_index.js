var express = require('express');
const dotenv = require('dotenv');

var apiController = require("./RouteFacade/APIController");
var authController = require("./RouteFacade/authController");

var {RestoreSession} = require("./MODEL/Authentication");

async function BackendStart(){
    
    var app = express();
    dotenv.config();

    RestoreSession();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "DELETE");
        next();
    });

    app.use('/api',apiController);
    app.use('/auth',authController);

    app.listen(process.env.port);

    return(app);
}

module.exports = {BackendStart}