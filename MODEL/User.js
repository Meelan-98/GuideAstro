const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const uniqid = require('uniqid');
const {spaceOBJ,planet,getAstrList} = require('./SpaceObj');
const news = require('../MODEL/News');


class User{
    constructor(UserName,type,fname,lname,sessionID,lastUsedTime){
        
        this.UserName = UserName;
        this.userTP = type;

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
        if(fname){
            this.fname = fname;
        }
        else{
            this.fname = null;
        }

        if(lname){
            this.lname = lname;
        }
        else{
            this.lname = null;
        }
    }

    getType(){
        return(this.userTP);
    }

    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE session_table SET lu_time= ? WHERE username = ?`,[Number(this.lastUsedTime),this.UserName]);
        }catch(e){
            console.log("Error");
        }
        
    }
    
    async changePass(CurrPassword,NewPassword){
        
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT username,password FROM user_table WHERE username = ?`,[this.UserName]); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE user_table SET password = ? WHERE username = ?`,[hashedPassword,this.UserName]); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }
                
        
    }

    async getAstrObj(id){

        var astrObj = new spaceOBJ();
        const status = await astrObj.setDataByDB(id);

        if (status != "Error"){
            return(astrObj);
        }else{
            return("Error");
        }
    }

    async getPlanet(id){

        var pnet = new planet();

        const status = await pnet.setDataByDB(id);

        if (status != "Error"){
            return(pnet);
        }else{
            return("Error");
        }
    }

    async getObjList(count,tbName){

        return(await getAstrList(count,tbName));
        
    }

    async getNewsList(count){

        var data = new news();

        return(await data.getNewsList(count));

    }

    async getNews(id){

        var data = new news();

        return(await data.getNews(id));

    }

    async addComment(id,comment){

        var data = new news();

        return(await data.addComment(id,comment,this.UserName));
    }

    async getComment(id){

        var data = new news();

        return(await data.getComment(id));
    }

   
}



class AdminUser extends User{
    constructor(UserName,type,fname,lname,sessionID,lastUsedTime){
        super(UserName,type,fname,lname,sessionID,lastUsedTime);        
    }

    async AddAstrObj(tag,image,cardText,description,timestamp){

        var astrObj = new spaceOBJ(tag,image,cardText,description,timestamp);

        return(await astrObj.insertToDB());
    }

    async EditAstrObj(id,image,cardtext,description,timestamp){

        var astrObj = new spaceOBJ();
        await astrObj.setDataByDB(id);

        return(await astrObj.editDataFFO(id,image,cardtext,description,timestamp));

    }

    async EditPlanet(id,image,cardtext,description,timestamp){

        var pnet = new planet();

        await pnet.setDataByDB(id);

        return(pnet.editDataFFO(id,image,cardtext,description,timestamp));

    }

    

    async AddNews(title,image,cardtext,description,timestamp,username){

        var data = new news(username);

        return(await data.setNews(title,image,cardtext,description,timestamp));


    }

    async EditNews(news_id,title,image,cardtext,description,timestamp,username){
        
        var data = new news(username);

        return(await data.editNews(news_id,title,image,cardtext,description,timestamp));
    }


}

module.exports = {User,AdminUser};