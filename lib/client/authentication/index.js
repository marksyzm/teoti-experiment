"use strict";

var LocalStrategy = require("passport-local"),
    request = require("request");

var config = require("../config");

function BasicAuth() {
    this.passport = require("passport");

    this.passport.use("provider", new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }));

    this.passport.serializeUser(function(user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });
}

module.exports = new BasicAuth();