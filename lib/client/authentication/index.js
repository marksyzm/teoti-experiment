"use strict";

var LocalStrategy = require("passport-local"),
    request = require("request");

var config = require("../config");

function BasicAuth() {
    this.passport = require("passport");

    this.passport.use("provider", new LocalStrategy(function(username, password, done) {
        request({
            uri: config("api:url"),
            method: "POST",
            json: true,
            body: {
                username: username,
                password: password
            }
        }, function (err, response, user) {
            console.log(user);
            if (err) { return done(err); }
            if (response.status !== 200) { return done(null, false); }
            /*if (!response.success) { return done(null, false); }*/
            return done(null, user);
        });
    }));

    this.passport.serializeUser(function(user, done) {
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = new BasicAuth();