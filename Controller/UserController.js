

class UserController{

    async changePass(method,user){

        var CurrPassword = method.searchURL('currpassword');
        var NewPassword = method.searchURL('newpassword');

        return(user.changePass(CurrPassword,NewPassword));
    }


}


module.exports = UserController;