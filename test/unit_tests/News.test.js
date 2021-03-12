const expect = require('chai').expect;

const nws = require('../../MODEL/News');

const news = new nws();

describe('News Model behaviour', () => {

    it('adding a news', async() => {
        const result = await news.setNews("final unit test","image","cardtext","description",new Date());
        expect(result).to.be.equal('News successfully added to the DB');
    });

    it('editing a news', async() => {
        const result = await news.editNews(10,"tets news","img test", "","sds",new Date());
        expect(result).to.be.equal('Successfully edited the DB');
    });

    it('get news list', async() => {
        const result = await news.getNewsList(10);
        expect(result).to.be.a('Array');
    });

    it('get news', async() => {
        const result = await news.getNews(10);
        expect(result).to.be.a('Array');
    });

    it('Adding a comment', async() => {
        const result = await news.addComment(10,"comment test","meelan");
        expect(result).to.be.equal('Comment successfully added to the DB');
    });

    it('get comment of a news given id', async() => {
        const result = await news.getComment(1);
        expect(result).to.be.a('Array');
    });

});