const request = require('supertest');
const {revertPass} = require('../cleanup');

const {BackendStart} = require('../../test_index');

let app;
let token;

(async ()=>{
    app =await BackendStart();
})();

describe('General User routes',()=>{
    
    before((done)=>{
        request(app)
            .post('/auth/login')
            .send({
                UserName : "tharinda@gmail.com",
                pass : "pass"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            })
        
    });

    after(async()=>{
        await revertPass()
    });

    
    describe('Tharinda as the regular user',()=>{

        it("Signup new user",(done)=>{
            request(app)
                .post('/auth/signup')
                .set('Authorization', token)
                .send({
                    "UserName" : "dinetgmil.com",
                    "pass" : "pass",
                    "type" : "admin",
                    "fname": "dineth",
                    "lname": "pramod"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        it("Adding Astronomy Object",(done)=>{
            request(app)
                .post('/api/AddAstrObj')
                .set('Authorization', token)
                .send({
                    "Tag" : "final test",
                    "Image" : "url",
                    "CardText": "cardtext",
                    "Desc" : "description",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        it("Editing Astronomy Object",(done)=>{
            console.log(token);
            request(app)
                .put('/api/EditAstrObj')
                .set('Authorization', token)
                .send({
                    "ID" : 6,
                    "Image" : "url edit",
                    "CardText": "cardtext",
                    "Desc" : "description edit",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        it("Editing planet",(done)=>{
            request(app)
                .put('/api/EditPlanet')
                .set('Authorization', token)
                .send({
                    "ID" : 10,
                    "Image" : "url",
                    "CardText": "cardtext",
                    "Desc" : "description",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        

        it("Getting a list of astro objects",(done)=>{
            request(app)
                .get('/api/getAstrList?count=5&tbName=astronomical_object')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Getting an astro object",(done)=>{
            request(app)
                .get('/api/getAstrObj?id=5')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Getting a planet",(done)=>{
            request(app)
                .get('/api/getPlanet?id=6')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Adding a news",(done)=>{
            request(app)
                .post('/api/AddNews')
                .set('Authorization', token)
                .send({
                    "Title":"test news integrated",
                    "Image":"imageurl",
                    "CardText": "CDTEXT",
                    "Desc" : "data",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        it("Editing a news",(done)=>{
            request(app)
                .put('/api/EditNews')
                .set('Authorization', token)
                .send({
                    "id":10,
                    "Title":"title",
                    "Image":"imageurl",
                    "CardText": "CDTEXT",
                    "Desc" : "data",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(203,done);
        })

        it("Getting a news list",(done)=>{
            request(app)
                .get('/api/getNewsList?count=5')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Getting a news",(done)=>{
            request(app)
                .get('/api/getNews?id=2')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Adding a comment",(done)=>{
            request(app)
                .post('/api/addComment')
                .set('Authorization', token)
                .send({
                    "id": 10,
                    "Comment" : "comment inte test"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
        })

        it("Getting all the comments",(done)=>{
            request(app)
                .get('/api/getComment?id=1')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200,done);
        })

        it("Change Password",(done)=>{
            request(app)
                .post('/api/changepass')
                .set('Authorization', token)
                .send({
                    "currpassword": "pass",
                    "newpassword" : "password"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
        })

        it("logout",(done)=>{
            request(app)
                .delete('/api/logout')
                .set('Authorization', token)
                .send()
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
        })

    });
    
})  