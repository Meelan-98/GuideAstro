const {executeSQL} = require("../db/db");

class spaceOBJ{
    
    constructor(tag,image,cardtext,description,timestamp){
        if (tag){
            this.tag = tag;
        }else{
            this.tag = null;
        }

        if (image){
            this.image = image;
        }else{
            this.image = null;
        }

        if (cardtext){
            this.cardtext = cardtext;
        }else{
            this.cardtext = null;
        }
        
        if (description){
            this.description = description;
        }else{
            this.description = null;
        }

        if (timestamp){
            this.timestamp = timestamp;
        }else{
            this.timestamp = null;
        }

        this.tableName = "astronomical_object";

        
    }

    async setDataByDB(id){

        try{
            const data = await executeSQL(`SELECT name, image, cardText, description, timestamp FROM ${this.tableName} WHERE id = ?`,[id]);

            this.tag = data[0].name;
            this.image = data[0].image;
            this.cardtext = data[0].cardText
            this.description = data[0].description;
            this.timestamp = data[0].timestamp;

            return("Database Read done");

        }catch(e){
            console.log(e);
            return("Error");
        
        }
        
            
    }

    async insertToDB(){

        if (this.tag != null){

            try{
                
                const status = await executeSQL(`SELECT name FROM ${this.tableName} WHERE name = ?`,[this.tag]);
            
                if (status.length>0){
                    return("Error");
                }else{
                    
                    try{
                        await executeSQL(`INSERT INTO ${this.tableName} (name,image,cardText,description,timestamp) VALUES (?,?,?,?,default)`,[this.tag,this.image,this.cardtext,this.description]);
                        return("Data successfully added to the DB");
                    }catch(e){
                        console.log(e);
                        return("Error");
                    }
               
                }
            }catch(e){
                console.log(e);
                return("Error");
            }
  
        }
    }

    async editDataFFO(id,image,cardtext,description,timestamp){

        if(image){
            this.image = image;
        }

        if(cardtext){
            this.cardtext = cardtext;
        }

        if(description){
            this.description = description;
        }

        if(timestamp){
            this.timestamp = timestamp;
        }

        try{
            await executeSQL(`UPDATE ${this.tableName} SET image = ?, cardText = ?, description = ?, timestamp = ? WHERE id = ?`,[this.image,this.cardtext,this.description,this.timestamp,id]);
            return("Successfully Updated");
        }catch(e){
            console.log(e);
            return("Error");
        }

    }

    setTableName(){
        this.tableName = "planet" ;
    }

}

class planet extends spaceOBJ{
    constructor(tag,image,cardtext,description,timestamp){
        super(tag,image,cardtext,description,timestamp);
        this.distance = null;
        this.setTableName();
    }

}


async function getAstrList(count,tbName){
    try{
        console.log(`SELECT * FROM ${tbName} LIMIT ${count}`);
        const data = await executeSQL(`SELECT * FROM ${tbName} LIMIT ${count}`);
        return(data);
    }catch(e){
        console.log(e);
        return("Error");
    }
} 


module.exports = {spaceOBJ,planet,getAstrList};