const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../db/db");
const {sign, verify} = require("jsonwebtoken");
const Method = require("../Controller/method");
const {User,AdminUser} = require("../MODEL/User");
const { parse } = require('querystring');
const ACCESS_TOKEN_SECRECT = "SEGProject";

var users = new Map();

async function signup(method){

    const superUser = await UserForSignup(method);
    
    console.log();

    if(superUser.getType() == "regular"){
        return ("AccessDenied");
    }else{
        const body = method.getBody();

        const username = body.UserName;
        const password = body.pass;
        const type     = body.type;
        const fName    = body.fname;
        const lName    = body.lname;

        if(type!="admin" && type!="regular"){
            return("Error");
        }

        try{
            const data = await executeSQL('SELECT username FROM user_table WHERE username = ?',[username]);
            
            if(data[0]){

                return ("Error");
            
            }else{
                
                const hashedPassword = await hash(password,10);
                await executeSQL('INSERT INTO user_table SET ?',{username:username,password:hashedPassword,type:type,fname:fName,lname:lName});
                
                console.log(username + " successfuly added");
                return ("User added");
            }

        }catch(e){
            
            return ("Error");
            
        }  
    }

     
}

async function login(method){

    const body = method.getBody();

    const username = body.UserName;
    const password = body.pass;

    
    
    try{

        const credential = await executeSQL('SELECT username , password, fname, lname, Type FROM user_table WHERE username =?',[username]);
       
        const status = await compare(password,credential[0].password);
        const type = credential[0].Type;
        const fname = credential[0].fname;
        const lname = credential[0].lname;
        
        if (status){

            var user = userCreator(username,type,fname,lname);

            if (users.has(username)){

                users.delete(username);

                await executeSQL('UPDATE session_table SET session_id = ?, lu_time=? WHERE username= ?',[user.sessionID,Number(new Date().getTime()),this.username]);
                
                console.log("User Already Exists, logging out previous users");

            }else{

                try{
                    await executeSQL('INSERT INTO session_table VALUES (?,?,?)',[user.UserName,user.sessionID,Number(new Date().getTime())]);
                }
                catch(e){
                    console.log("Error");
                }
            }
    
            users.set(username,user);

    
            const token = getAccessToken({sessionID:user.sessionID,UserName:user.UserName});
    
            //method.setToken(token,true,50000000);

            console.log(username + " Successfully Logged In !!!");

            return ({"token":token,"user":user,"type":type});

        }else{
            return("Error");
        }

    }catch(e){
        return("Error");
    }

    
    
}

async function logout(user){

    users.delete(user.UserName);

    try{
        await executeSQL('DELETE FROM session_table WHERE username= ?',[user.UserName]);
    }
    catch(e){
        console.log("database error");
    }
    
    return(user.UserName + " Successfully Logged Out !!!")

}



const getAccessToken = (data)=>{
    token = sign(data, ACCESS_TOKEN_SECRECT,{expiresIn:"500m"});
    return token;
};



var ExtractUser =async function(req,res, next){

    var method = new Method(req,res);

    var token = method.getToken();

    try{
        const {sessionID,UserName} = verify(token,ACCESS_TOKEN_SECRECT);

        if(sessionID){
            
            var user = users.get(UserName);
            await user.setLastUsedTime();
            req.user = user;
        }

        next();
    }
    catch(err){
        console.log("Invaild token"); //when token expires
        res.sendStatus(203);
    }

    
    
}


var RestoreSession = async function(){

    console.log("Restoring Sessions");

    var data = null;

    try{
        data = await executeSQL('SELECT * FROM session_table LEFT JOIN User_table on session_table.username = user_table.username');
    }catch(e){
        console.log("error");
    }
   

    for (const [key, value] of data.entries()){

        var user = userCreator(value.username,value.Type,value.fname,value.lname,value.session_id,value.lu_time);
        users.set(value.username,user)
    
    }

    ShowCurrentUsers();
}


function userCreator(username,type,fname,lname,sessionID,lastUsedTime){
    if(type=="regular"){
        var user = new User(username,type,fname,lname,sessionID,lastUsedTime);
    }else if (type=="admin"){
        var user = new AdminUser(username,type,fname,lname,sessionID,lastUsedTime);
    }

    return(user)
}

function ShowCurrentUsers(){

    var CurrUsers = "Logged in: ";

    for (const [key, value] of users.entries()){
        CurrUsers = CurrUsers + value.UserName + "  " ;
    }

    if (CurrUsers=="Logged in: "){
        console.log("Nobody Logged in");
    }else{
        console.log(CurrUsers);
    }

    

}


var UserForSignup =async function(method){

    var token = method.getToken();

    try{
        const {sessionID,UserName} = verify(token,ACCESS_TOKEN_SECRECT);

        if(sessionID){
            var user = users.get(UserName);
            await user.setLastUsedTime();
            return(user)
        }
    }
    catch(err){
        return("Invalid Token")
    }

    
    
}

module.exports = {login,signup,getAccessToken,ExtractUser,RestoreSession,logout,ShowCurrentUsers};


