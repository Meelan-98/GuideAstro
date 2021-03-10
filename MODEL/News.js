const {executeSQL} = require("../DB/db");

class news{

    constructor(username){
        if (username){
            this.creator = username;
        }
    }

    async setNews(title,image,cardtext,description,timestamp){
        
        try{
            const data = await executeSQL('SELECT * FROM news WHERE title = ?',[title]);

            if (data.length>0){
                return("Error");
            }else{
                await executeSQL('INSERT INTO news (title,image,cardText,description,timestamp) VALUES (?,?,?,?,?)',[title,image,cardtext,description,timestamp]);
                return("News successfully added to the DB");
            }

            
        }catch(e){
            console.log(e);
            return("Error");
        }
        

    }

    async editNews(news_id,title,image,cardtext,description,timestamp){
        try{
            await executeSQL(`UPDATE news SET title = ?, image = ?, cardText = ?, description = ?, timestamp = ? WHERE news_id = ?`,[title,image,cardtext,description,timestamp,news_id]);
            return("Successfully edited the DB");
        }catch(e){
            console.log(e);
            return("Error");
        }
        
    }

    async getNewsList(count){
        try{
            const data = await executeSQL(`SELECT * FROM news LIMIT ${count}`);
            return(data);
        }catch(e){
            console.log(e);
            return("Error");
        }
    }

    async getNews(id){
        try{
            const data = await executeSQL(`SELECT * FROM news WHERE news_id = ?`,[id]);
            return(data);
        }catch(e){
            console.log(e);
            return("Error");
        }
    }

    async addComment(id,comment,username){

        try{
            const data = await executeSQL(`SELECT * FROM news WHERE news_id = ?`,[id]);

            if (data[0]){
                await executeSQL(`INSERT INTO news_comment (username,comment,news_id) VALUES (?,?,?)`,[username,comment,id]);
                return("Comment successfully added to the DB");
            }else{
                return("Error");
            }
            
        }catch(e){
            console.log(e);
            return("Error");
        }
    }

    async getComment(id){

        try{
            const data = await executeSQL(`SELECT * FROM news_comment WHERE news_id =?`,[id]);

            if(data[0]){
                return(data);
            }else{
                return("Error");
            }
        }catch(e){
            console.log(e);
            return("Error");
        }

        
    }


}


module.exports = news;