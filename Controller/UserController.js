const { getAstrList } = require("../MODEL/SpaceObj");


class UserController{

    changePass(method,user){

        const body = method.getBody();

        var CurrPassword = body.currpassword;
        var NewPassword = body.newpassword;

        return(user.changePass(CurrPassword,NewPassword));
    }

    AddAstrObj(method,user){

        const body = method.getBody();

        const tag = body.Tag;
        const image = body.Image;
        const cardText = body.CardText;
        const description = body.Desc;
        const timestamp = body.tStamp;


        return(user.AddAstrObj(tag,image,cardText,description,timestamp));
    }

    EditAstrObj(method,user){

        const body = method.getBody();

        const id = body.ID;
        const image = body.Image;
        const cardText = body.CardText;
        const description = body.Desc;
        const timestamp = body.tStamp;

        if (image == null && description == null ){
            return("Error");
        }else{
            return(user.EditAstrObj(id,image,cardText,description,timestamp));
        }

        
    }

    EditPlanet(method,user){

        const body = method.getBody();

        const id = body.ID;
        const image = body.Image;
        const cardtext = body.CardText;
        const description = body.Desc;
        const timestamp = body.tStamp;

        if (image == null && description == null ){
            return("Error");
        }else{
            return(user.EditPlanet(id,image,cardtext,description,timestamp));
        }
    }

    getAstrObj(method,user){

        const tag = method.searchURL('id');

        return(user.getAstrObj(tag));
    }

    getPlanet(method,user){

        const tag = method.searchURL('id');

        return(user.getPlanet(tag));
    }

    getAstrList(method,user){

        const count = method.searchURL('count');
        const tbName = method.searchURL('tbName');

        return(user.getObjList(count,tbName));
    }

    AddNews(method,user){

        const body = method.getBody();

        const title = body.Title;
        const image = body.Image;
        const cardtext = body.CardText;
        const description = body.Desc;
        const timestamp = body.tStamp;

        return(user.AddNews(title,image,cardtext,description,timestamp,user.UserName));
    }

    EditNews(method,user){

        const body = method.getBody();

        const news_id = body.id;
        const title = body.Title;
        const image = body.Image;
        const cardtext = body.CardText;
        const description = body.Desc;
        const timestamp = body.tStamp;

        return(user.EditNews(news_id,title,image,cardtext,description,timestamp,user.UserName));

    }

    getNewsList(method,user){

        const count = method.searchURL('count');

        return(user.getNewsList(count));
    }

    getNews(method,user){

        const id = method.searchURL('id');

        return(user.getNews(id));
    }

    addComment(method,user){

        const body = method.getBody();

        const news_id = body.id;
        const comment = body.Comment;

        return(user.addComment(news_id,comment));
    }

    getComment(method,user){

        const news_id = method.searchURL('id');

        return(user.getComment(news_id));
    }

    


}


module.exports = UserController;