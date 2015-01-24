/*jshint camelcase: false */
"use strict";

var request = require("supertest");
var app = require("../client");
var app = require("../api");
var support = require("./support");

describe("user api", function(){
    var should = require("chai").should();

    describe("when requesting a user /account", function() {

        beforeEach(function () {
            support.passport("dd215cff-8f23-459c-8306-8497fd617238");
        });

        var response;
        var headers;
        var userId = "dd215cff-8f23-459c-8306-8497fd617238";

        it("should respond with 200", function(done){

            support.login(function(err, cookie) {
                request(app)
                    .get("/account")
                    .set("Cookie", cookie)
                    .set("user", userId)
                    .set("X-Requested-With", "xmlhttprequest")
                    .end(function (err, res) {
                        if (err) { return done(err); }
                        response = JSON.parse(res.text);
                        //console.log(response);
                        headers = res.headers;
                        res.status.should.equal(200);
                        done();
                    });
            });
        });

        it("should return response in json", function(){
            headers["content-type"].should.equal("application/json; charset=utf-8");
        });

        it("should contain a user id", function(){
            response.oid.should.equal("dd215cff-8f23-459c-8306-8497fd617238");
        });

        it("should contain a name", function(){
            response.given_name.should.equal("me");
        });

        it("should contain a family name", function(){
            response.family_name.should.equal("meme");
        });

        it("should contain a email", function(){
            response.email.should.equal("me@meme.com");
        });

        it("should contain a language", function(){
            response.language.should.equal("en-gb");
        });

        it("should contain a timeUnit", function(){
            response.timeUnit.should.equal("year");
        });

        it("should contain a falsy hideTour", function(){
            if (typeof response.hideTour === "undefined") {
                should.not.exist(response.hideTour);
            } else {
                response.hideTour.should.not.be.ok;
            }
        });
    });

    describe("when requesting a user with no stored profile /account", function() {

        beforeEach(function () {
            support.passport("dd215cff-8f23-459c-8306-8497fd617231");
        });

        var response;
        var headers;
        var userId = "dd215cff-8f23-459c-8306-8497fd617231";

        it("should respond with 200", function(done){

            support.login(function(err, cookie) {
                request(app)
                    .get("/account")
                    .set("Cookie", cookie)
                    .set("user", userId)
                    .set("X-Requested-With", "xmlhttprequest")
                    .end(function (err, res) {
                        if (err) { return done(err); }
                        response = JSON.parse(res.text);
                        //console.log(response);
                        headers = res.headers;
                        res.status.should.equal(200);
                        done();
                    });
            });
        });

        it("should return response in json", function(){
            headers["content-type"].should.equal("application/json; charset=utf-8");
        });

        it("should contain a user id", function(){
            response.oid.should.equal("dd215cff-8f23-459c-8306-8497fd617231");
        });

        it("should contain a name", function(){
            response.given_name.should.equal("me");
        });

        it("should contain a family name", function(){
            response.family_name.should.equal("meme");
        });

        it("should contain a email", function(){
            response.email.should.equal("me@meme.com");
        });

        it("should contain a language", function(){
            response.language.should.equal("en-gb");
        });

        it("should contain a timeUnit", function(){
            response.timeUnit.should.equal("year");
        });

        it("should contain a falsy hideTour", function(){
            if (typeof response.hideTour === "undefined") {
                should.not.exist(response.hideTour);
            } else {
                response.hideTour.should.not.be.ok;
            }
        });
    });

    describe("when updating a user /account", function() {

        beforeEach(function () {
            support.passport("dd215cff-8f23-459c-8306-8497fd617238");
        });

        var userId = "dd215cff-8f23-459c-8306-8497fd617238";

        var user = {
            language    : "de-de",
            timeStart   : 1412118000001,
            timeEnd     : 1413154800001,
            hideTour    : true
        };

        it("should respond with 204", function(done){

            support.login(function(err, cookie) {
                request(app)
                    .put("/account")
                    .set("Cookie", cookie)
                    .set("user", userId)
                    .send(user)
                    .end(function (err, res) {
                        if (err) { return done(err); }
                        res.status.should.equal(204);
                        done();
                    });
            });
        });
    });
});
