"use strict";

var config = require("./app/config"),
    mysqlClient = require('mysql').createConnection({
        user: config.get("mysql:user"),
        password: config.get("mysql:password"),
        database: config.get("mysql:database")
    }),
    async = require("async"),
    thread = require("./app/import/thread"),
    post = require("./app/import/post"),
    user = require("./app/import/user"),
    activity = require("./app/import/activity");

async.series([
    function (callback) {
        thread.import(mysqlClient, callback);
    },
    function (callback) {
        post.import(mysqlClient, callback);
    },
    function (callback) {
        user.import(mysqlClient, callback);
    },
    function (callback) {
        activity.import(mysqlClient, callback);
    }
], function (err) {
    // all done!
    if (err) {
        console.error(err);
    } else {
        console.info("\n\n\nIMPORT COMPLETE!");
    }
});