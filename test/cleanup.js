const {executeSQL} = require("../db/db");
const {AdminUser,User} = require('../MODEL/User');

async function cleanup(){
    
    const username = 'yasindu@gmail.com';
    await executeSQL('delete from user_table where username = ? ',[username]);
          
    const tag1 = 'testing astronomy object';
    await executeSQL('delete from astronomical_object where name = ? ',[tag1]);
           
    const tag2 = 'testing news object';
    await executeSQL('delete from news where title = ? ',[tag2]);
           
    var admin_user = new AdminUser("meelan@gmail.com","admin","meelan","bandara");
    await admin_user.changePass("pass","password");

}

async function revertPass(){

    var general_user = new User("tharinda@gmail.com","general","kaveen","bandara");
    await general_user.changePass("password","pass");

}



module.exports = {cleanup,revertPass};