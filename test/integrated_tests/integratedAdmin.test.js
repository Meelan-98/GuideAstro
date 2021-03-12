const request = require('supertest');
const expect = require('chai').expect;

const {BackendStart} = require('../../test_index');
const {cleanup} = require('../cleanup');


let app;
let token;

(async ()=>{
    app =await BackendStart();
})();

describe('Admin routes',()=>{
    
    before((done)=>{
        request(app)
            .post('/auth/login')
            .send({
                UserName : "meelan@gmail.com",
                pass : "password"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            })
        
    });

    after(async()=>{

        console.log("end of testing");
        console.log("db cleanp starts");

        await cleanup();
    });

    describe('Meelan as the Admin User',()=>{

        it("Signup new user",(done)=>{
            request(app)
                .post('/auth/signup')
                .set('Authorization', token)
                .send({
                    "UserName" : "yasindu@gmail.com",
                    "pass" : "password",
                    "type" : "regular",
                    "fname": "yasindu",
                    "lname": "dilshan"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
        })

        it("Adding Astronomy Object",(done)=>{
            request(app)
                .post('/api/AddAstrObj')
                .set('Authorization', token)
                .send({
                    "Tag" : "testing astronomy object",
                    "Image" : "url",
                    "CardText": "cardtext",
                    "Desc" : "description",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
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
                .expect(200,done);
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
                .expect(200,done);
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
                    "Title":"testing news object",
                    "Image":"imageurl",
                    "CardText": "CDTEXT",
                    "Desc" : "data",
                    "tStamp": "2020-3-3"
                })
                .set('Accept','application/json')
                .expect('Content-Type',"text/html; charset=utf-8")
                .expect(200,done);
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
                .expect(200,done);
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
                    "Comment" : "final test comment"
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
                    "currpassword": "password",
                    "newpassword" : "pass"
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

