"use strict";

var _ = require("lodash"),
    Thread = require("../models/thread"),
    async = require("async"),
    mysqlClient,
    callback,
    size = 100;

function getData (err, threads) {
    var rows = [];

    if (err) {
        return callback(err);
    }

    threads.forEach(function (thread) {
        mysqlClient.query(
            "SELECT * FROM subscribethread WHERE threadid = ?",
            [ thread.threadid ],
            buildMongoData(rows, thread)
        );
    });

    if (!threads.length) {
        callback(null);
    }
}

function buildMongoData (rows, thread) {
    return function (err, subscribeThreads) {
        if (err) {
            return callback(err);
        }

        var subscribers = _.pluck(subscribeThreads, "userid");

        var rowData = {
            id              : thread.threadid,
            title           : thread.title,
            type            : thread.type,
            firstPost       : thread.firstpostid,
            firstPostUser   : thread.postuserid,
            lastPost        : { type: Number, ref: "Post" },
            lastPostUser    : { type: Number, ref: "User" },
            forum           : thread.forumid,
            created         : new Date(thread.dateline),
            replyCount      : thread.replyCount,
            viewCount       : thread.views,
            open            : !!thread.open,
            deleted         : Number(thread.visible) !== 1,
            sticky          : !!thread.sticky,
            description     : thread.description,
            related         : thread.related,
            thumbnail       : thread.thumbnail,
            score           : thread.thread_score,
            style           : thread.styleid,
            subscribers     : subscribers
        };

        rows.push(rowData);

        Thread.create(rows, function (err) {
            if (err) {
                return callback(err);
            }

            for (var i = 1; i < arguments.length; i++) {
                console.info("Created: \"", rowData);
            }

            looper(position + size);
        });
    }
}

function looper (position) {
    mysqlClient.query(
        "SELECT * FROM thread WHERE threadid > (SELECT MAX(threadid) FROM thread) LIMIT ?," + size,
        [position],
        getData
    );
};

module.exports = {
    "import": function (cl, cb) {
        mysqlClient = cl;
        callback = cb;
        looper(0);
    }
};