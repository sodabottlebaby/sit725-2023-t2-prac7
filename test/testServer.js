var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {expect} = require('chai');
const request = require("request");
require('should-http');


describe('test GET api', function() {
    var url = 'http://localhost:3000/api/cat';
    it ('should return 200 status code', function(done) {
        request(url, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it ('should retrieve cats from DB', function(done) {
        request(url, function(error, response, body) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body)).to.be.an('object');
            done();
        });
    });
});

describe ('test POST api', function(){
    var url = 'http://localhost:3000/api/cat';
    it ('should return 200 status code', function(done) {
        const cat = {
            title: 'testCatTitle',
            subTitle: 'testSubTitle',
            path: 'testPath',
            description: 'testDescription',
        };

        request.post({url, form:cat}, function(error, response){
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it ('post cat to DB', function(done) {
        const cat = {
            title: 'testCatTitle',
            subTitle: 'testSubTitle',
            path: 'testPath',
            description: 'testDescription',
        };

        request.post({url, form:cat}, function(error, response, body){
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body)).to.be.an('object');
            expect(JSON.parse(body).message).to.equal('Cat created successfully!');
            done();
        });
    });
});

describe ('test DELETE api', function(){
    var url = 'http://localhost:3000/api/cat';
    let catID;

    before(function(done) {
        const cat = {
            title: 'testCatTitle',
            subTitle: 'testSubTitle',
            path: 'testPath',
            description: 'testDescription',
        };

        chai.request(url)
        .del('/api/cat')
        .send(cat)
        .end(function(err, res) {
            if (err) {
                done (err);
            } else {
                catID = cat._id;
                done();
            }
            res.should.have.status(200);
            done();
        });
    });

    after(function(done) {
        chai.request(url)
        .del(`/api/cat/${catID}`)
        .end(function(err) {
            if (err) {
                done (err);
            } else {
                done();
            }
        });
    });

    it('should return 200 after deleting a cat from DB', function(done) {
        chai.request(url)
        .del(`/api/cat/${catID}`)
        .end(function(err, res) {
            if (err) {
                done (err);
            } else {
                done();
            }
            res.should.have.status(200);
            done();
        });
    });
});