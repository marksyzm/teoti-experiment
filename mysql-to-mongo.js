"use strict";

var config = require("./lib/shared/config");
var mysqlClient = require('mysql').createConnection({
        user: config.get("mysql:user"),
        password: config.get("mysql:password"),
        database: config.get("mysql:database")
    });
var async = require("async");
var _ = require("lodash");
var importers = require("./lib/api/import");

var importerItems = [
    "thread",
    "post",
    "user",
    "activity",
    "conversation",
    "message",
    "forum",
    "notification",
    "score",
    "like",
    "shout",
    "sitelog",
];

importerItems = _.map(importerItems, function (importerItem) {
    return function (callback) {
        var importer = importers.get(importerItem);
        if (!importer) {
            return callback(new Error("Importer does not exist"));
        }
        if (!importer.import) {
            return callback(new Error("Importer is invalid"));
        }
        importer.import(mysqlClient, callback);
    };
})

async.series(importerItems, function (err) {
    // all done!
    if (err) {
        console.error(err);
    } else {
        console.info("\n\n\nIMPORT COMPLETE!");
    }
});