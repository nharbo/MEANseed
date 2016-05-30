//var expect = require('chai').expect;
//var request = require('request');
//
//
//describe('Seed REST api test', function () {
//    it('should get an array of all jokes in our database', function (done) {
//        request({
//            url: 'http://localhost:3000/api/jokes',
//            method: 'GET',
//            json: true
//        }, function (err, res, body) {
//            if (err) {
//                throw new Error(err);
//            }
//            expect(body).to.have.lengthOf(6);
//            done();
//        });
//    });
//    it('should get a random joke', function (done) {
//        request({
//            url: 'http://localhost:3000/api/joke/random',
//            method: 'GET',
//            json: true
//        }, function (err, res, body) {
//            if (err) {
//                throw new Error(err);
//            }
//            expect(body).to.have.ownProperty('joke');
//            done();
//        });
//    });
//    it('should delete a joke', function (done) {
//        var jokeId = "56e4496078a84e7bf8f7b65b";
//        request({
//            url: 'http://localhost:3000/api/joke/' + jokeId,
//            method: 'DELETE',
//            json: true
//        }, function (err, res, body) {
//            if (err) {
//                throw new Error(err);
//            }
//            expect(body.n).to.equal(1);
//            done();
//        });
//    });
//    it('should add a joke', function (done) {
//        var jokeToBeAdded = {
//            "joke": "This is my joke"
//        };
//        request({
//            url: 'http://localhost:3000/api/joke/',
//            method: 'POST',
//            body: jokeToBeAdded,
//            json: true
//        }, function (err, res, body) {
//            if (err) {
//                throw new Error(err);
//            }
//            expect(body.ops[0].joke).to.equal(jokeToBeAdded.joke);
//            done();
//        });
//    });
//
//    it('should edit a joke', function (done) {
//        var jokeToBeAdded = {
//            "_id": "56e55fa84f0900a412affd69",
//            "joke": "This is my editedJoke"
//        };
//        request({
//            url: 'http://localhost:3000/api/joke/',
//            method: 'PUT',
//            body: jokeToBeAdded,
//            json: true
//        }, function (err, res, body) {
//            if (err) {
//                throw new Error(err);
//            }
//            expect(body.nModified).to.equal(1);
//            done();
//        });
//    });
//
//
//});