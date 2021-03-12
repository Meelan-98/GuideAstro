const expect = require('chai').expect;
const {AdminUser} = require('../../MODEL/User');

var admin_user = new AdminUser("meelan@gmail.com","admin","meelan","bandara");




describe('User Model behaviour', () => {

    it('change password', async() => {
        const result = await admin_user.changePass("password","pass");
        expect(result).to.be.equal('Password Changed');
    });

});