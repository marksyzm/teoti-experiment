/*jshint camelcase: false */

"use strict";

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var request = require("supertest");
var app = require("../index");

module.exports.passport = function (oid) {
  passport.unuse("provider");

  passport.use("provider", new LocalStrategy(function (u, p, done) {
    done(null, { 
      email : "me@meme.com",
      given_name: "me", 
      family_name: "meme", 
      oid : oid,
      timeUnit: "year"
    });
  }));
};

module.exports.admin = function (callback) {
  //security.getAdminCookie(function(){
      callback();
  //});
};

module.exports.login = function (callback) {
	request(app)
  	.get("/login")
  	.send({ username: "blah@haaaa.net", password: "blalabl" })
  	.expect(302)
  	.expect("Location", "/")
  	.end(function (err, loginResult) {
      //console.log("err, loginResult", err, loginResult);
  	   var cookie = loginResult.header["set-cookie"];
  	   callback(null, cookie);
    });
};