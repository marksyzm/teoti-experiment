"use strict";

var config = require("./app/config"),
    mysqlClient = require('mysql').createConnection({
        user: config.get("mysql:user"),
        password: config.get("mysql:password"),
        database: config.get("mysql:database")
    }),
    async = require("async"),
    thread = require("./app/import/thread"),
    post = require("./app/import/post");

async.waterfall([
    function (callback) {
        thread.import(mysqlClient, callback);
    },
    function (callback) {
        post.import(mysqlClient, callback);
    }
], function (err, results) {
    // all done!
});