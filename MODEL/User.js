const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../db/db");
const uniqid = require('uniqid');


class User{
    constructor(UserName,type,sessionID,lastUsedTime){
        
        this.UserName = UserName;
        var userType = type;

        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(lastUsedTime){
            this.lastUsedTime = lastUsedTime;
        }
        else{
            this.lastUsedTime = Number(new Date().getTime());
        }
    }

    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE session_table SET lu_time= ${Number(this.lastUsedTime)} WHERE username = '${this.UserName}'`);
        }catch(e){
            console.log("Error");
        }
        
    }
    
    async changePass(CurrPassword,NewPassword){
        
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT username,password FROM user_table WHERE username = '${this.UserName}'`); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE user_table SET password = '${hashedPassword}' WHERE username = '${this.UserName}' `); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }
                
        
    }

   
}



class AdminUser extends User{
    constructor(UserName,type){
        super(UserName,type);        
    }

    addNewSpaceObj(){

    }

    updateSpaceObj(){

    }

    addNews(){

    }


}

module.exports = {User,AdminUser};