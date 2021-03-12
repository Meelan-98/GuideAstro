const expect = require('chai').expect;

var {spaceOBJ,getAstrList} = require('../../MODEL/SpaceObj');

var spcob = new spaceOBJ();



describe('Space Object Model behaviour', () => {

    it('Constructing space object', async() => {
        const result = await spcob.setDataByDB(5);
        expect(result).to.be.equal('Database Read done');
    });

    it('Editing a space object', async() => {
        const result = await spcob.editDataFFO(5,"image","card edit","lassana lamaya",new Date());
        expect(result).to.be.equal('Successfully Updated');
    });

    it('Get a planet object', async() => {
        const result = await getAstrList(5,"planet");
        expect(result).to.be.a('Array');
    });  

    it('Get a astro object', async() => {
        const result = await getAstrList(5,"astronomical_object");
        expect(result).to.be.a('Array');
    }); 

});