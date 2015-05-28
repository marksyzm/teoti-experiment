"use strict";

/*jshint camelcase: false */

var _ = require("lodash"),
    async = require("async"),
    getSlug = require("speakingurl"),
    Thread = require("../models/thread"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, threads) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!threads.length) {
        console.info("\n\nTHREADS IMPORT COMPLETE\n\n");
        return callback(null);
    }
    
    async.whilst(
        function () {
            return count < threads.length;
        },
        function (callback) {
            var thread = threads[count];
            count++;

            mysqlClient.query(
                "SELECT * FROM subscribethread WHERE threadid = ?",
                [ thread.threadid ],
                function (err, subscribeThreads) {
                    if (err) {
                        return callback(err);
                    }

                    mysqlClient.query(
                        "SELECT * FROM post WHERE threadid = ? ORDER BY postid DESC LIMIT 1",
                        [ thread.threadid ],
                        buildMongoData(thread, subscribeThreads, callback)
                    );
                }
            );
        },
        function (err) {
            if (err) {
                return callback(err);
            }

            looper();
        }
    );


}

function buildMongoData (thread, subscribeThreads, callback) {
    return function (err, lastPosts) {
        if (err) {
            return callback(err);
        }

        var subscribers = _.pluck(subscribeThreads, "userid"),
            lastPost = lastPosts[0] || {};

        var threadData = {
            _id             : thread.threadid,
            title           : thread.title,
            type            : thread.threadtype ? "blog" : null,
            slug            : getSlug(thread.title),
            firstPost       : thread.firstpostid,
            firstPostUser   : thread.postuserid,
            lastPost        : lastPost.postid,
            lastPostUser    : lastPost.userid,
            forum           : thread.forumid,
            updated         : new Date(thread.lastpost * 1000),
            created         : new Date(thread.dateline * 1000),
            replyCount      : thread.replycount,
            viewCount       : thread.views,
            open            : !!thread.open,
            deleted         : thread.visible !== 1,
            sticky          : !!thread.sticky,
            description     : thread.description,
            related         : thread.related,
            thumbnail       : thread.thumbnail,
            score           : thread.thread_score,
            style           : thread.styleid,
            subscribers     : subscribers
        };

        Thread.create(threadData, function (err, thread) {
            if (err) {
                return callback(err);
            }

            console.info(
                "Created: id: ", thread._id, " subscribers:", thread.subscribers.length
                //,"\n", row, "\n\n"
            );

            callback(null);
        });
    };
}

function looper () {
    Thread.findOne({}, null, { sort: { _id: -1 } }, function (err, thread) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM thread ORDER BY threadid ASC LIMIT ?",
            queryData = [ size ];

        if (thread) {
            query = "SELECT * FROM thread WHERE threadid > ? ORDER BY threadid ASC LIMIT ?";
            queryData = [ thread._id, size ];
        }

        console.info("\"", query, "\" - threadid: ", thread ? thread._id : null);

        mysqlClient.query(query, queryData, getData);
    });
}

module.exports = {
    "import": function (cl, cb) {
        mysqlClient = cl;
        callback = cb;

        looper();
    }
};