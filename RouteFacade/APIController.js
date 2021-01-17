var express = require('express');
var router = express.Router();

const UserController = require("../Controller/UserController");
const Method = require("../Controller/method");
const {ExtractUser,logout} = require("../MODEL/Authentication");
const {ResponseHandler} = require("../Controller/ResponseController");

var uController = new UserController();

router.use(ExtractUser)


////////////////////////////////////////////////////// GET Requests


////////////////////////////////////////////////////// POST Requests

router.post('/changepass',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.changePass(method,req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});





////////////////////////////////////////////////////// UPDATE Requests

////////////////////////////////////////////////////// DELETE Requests

router.delete('/logout',async function(req, res){
    
    var method = new Method(req,res);
    
    const status = await logout(req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);
    

});


module.exports = router;