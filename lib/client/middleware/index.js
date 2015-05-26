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
    })/*,

    forumSlug: function (req, res, next, forumSlug) {
        request({
            uri: config.get("api:url") + "forum/" + forumSlug,
            method: "GET",
            json: true
        }, function (err, response, forum) {
            if (err) {
                return next(new Error("Could not connect to forum API"));
            }
            if (response.statusCode !== 200) {
                return next(new Error("No access to forum"));
            }
            if (!forum || !forum._id) {
                return next(new Error("Forum does not exist"));
            }
            req.forum = forum;
            next();
        });
    }*/
};

module.exports = middleware;
