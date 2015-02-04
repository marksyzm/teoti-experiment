"use strict";

var LocalStrategy = require("passport-local"),
    request = require("request");

var config = require("../config");

function BasicAuth() {
    this.passport = require("passport");

    this.passport.use(new LocalStrategy(function(username, password, done) {
        request({
            uri: config.get("api:url") + "authenticate",
            method: "POST",
            json: true,
            body: {
                username: username,
                password: password
            }
        }, function (err, response, user) {
            if (err) { return done(err); }
            if (response.statusCode !== 200) { return done(null, false); }
            if (!user || !user._id) { return done(null, false); }
            return done(null, user);
        });
    }));

    this.passport.serializeUser(function(user, done) {
        console.log("USER", user);
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        console.log("USER", user);
        done(null, user);
    });
}

module.exports = new BasicAuth();