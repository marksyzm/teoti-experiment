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
            if (response.statusCode !== 200) {
                return done(null, false, { message: user.message });
            }
            if (!user || !user._id) { return done(null, false, { message: "Wrong credentials" }); }
            return done(null, user._id);
        });
    }));

    this.passport.serializeUser(function(id, done) {
        done(null, id);
    });

    this.passport.deserializeUser(function(id, done) {
        done(null, id);
    });
}

module.exports = new BasicAuth();