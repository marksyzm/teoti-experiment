/*jshint unused:false*/

var session = require("express-session"),
    MongoStore  = require("connect-mongo")(session);

var config = require("../config");

"use strict";

var middleware = {
    error: function(err, req, res, next){
        res.status(400).json(err);
    },

    noCache: function (req, res, next) {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        res.header("If-Modified-Since", "0");
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
