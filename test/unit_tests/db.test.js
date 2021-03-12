const expect = require('chai').expect;
const {executeSQL} = require("../../db/db");


describe('Database Conection', () => {
    it('select query', async() => {
        const username = 'meelan';
        const result = await executeSQL('SELECT username FROM user_table WHERE username = ?',[username]);
        expect(result).to.be.a('array');
    });

    it('insert query', async() => {
        const username = 'meelan';
        const result = await executeSQL('SELECT username FROM user_table WHERE username = ?',[username]);
        expect(result).to.be.a('array');
    });
});