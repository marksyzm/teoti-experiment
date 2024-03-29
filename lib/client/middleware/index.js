/*jshint unused:false*/

"use strict";

var session = require("express-session"),
    request = require("request"),
    MongoStore  = require("connect-mongo")(session);

var config = require("../../shared/config");

var middleware = {
    error: function(err, req, res, next){
        if (req.xhr) {
            res.status(400).json(err);
        } else {
            console.log(err);
            res.render("error", { error: err });
        }
    },

    noCache: function (req, res, next) {
        if (!req.originalUrl.match(/^\/sickle/)) {
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            res.header("If-Modified-Since", "0");
        }
        next();
    },

    session: session({
        "secret": config.get("express:session:secret"),
        "resave": config.get("express:session:resave"),
        "saveUninitialized": config.get("express:session:saveUninitialized"),
        store: new MongoStore({
            "url": config.get("mongo:url"),
            "autoRemove": config.get("mongoStore:autoRemove"),
            "autoRemoveInterval": config.get("mongoStore:autoRemoveInterval")
        })
    })
};

module.exports = middleware;
