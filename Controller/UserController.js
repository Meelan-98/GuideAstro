const { getAstrList } = require("../MODEL/SpaceObj");


class UserController{

    changePass(method,user){

        var CurrPassword = method.searchURL('currpassword');
        var NewPassword = method.searchURL('newpassword');

        return(user.changePass(CurrPassword,NewPassword));
    }

    AddAstrObj(method,user){

        const tag = method.searchURL('tag');
        const image = method.searchURL('image');
        const description = method.searchURL('desc');

        return(user.AddAstrObj(tag,image,description));
    }

    EditAstrObj(method,user){

        const tag = method.searchURL('tag');
        const image = method.searchURL('image');
        const description = method.searchURL('desc');

        if (image == null && description == null ){
            return("Error");
        }else{
            return(user.EditAstrObj(tag,image,description));
        }

        
    }

    EditPlanet(method,user){

        const tag = method.searchURL('tag');
        const image = method.searchURL('image');
        const description = method.searchURL('desc');

        if (image == null && description == null ){
            return("Error");
        }else{
            return(user.EditPlanet(tag,image,description));
        }
    }

    getAstrObj(method,user){

        const tag = method.searchURL('tag');

        return(user.getAstrObj(tag));
    }

    getPlanet(method,user){

        const tag = method.searchURL('tag');

        return(user.getPlanet(tag));
    }

    getAstrList(method,user){

        const count = method.searchURL('count');
        const tbName = method.searchURL('tbName');

        return(user.getObjList(count,tbName));
    }

    


}


module.exports = UserController;