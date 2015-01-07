"use strict";

var config = require("./app/config"),
    mysqlClient = require('mysql').createConnection({
        user: config.get("mysql:user"),
        password: config.get("mysql:password"),
        database: config.get("mysql:database")
    }),
    async = require("async"),
    _ = require("lodash"),
    importers = require("./app/import");

var importerItems = [
    "thread",
    "post",
    "user",
    "activity",
    "conversation",
    "message",
    "forum",
    "notification",
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