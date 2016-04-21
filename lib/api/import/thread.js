"use strict";

/*jshint camelcase: false */

var async = require("async");
var getSlug = require("speakingurl");
var Thread = require("../models/thread");
var _ = require("lodash");
var mysqlClient;
var callback;
var size = 500;

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
                        function (err, lastPosts) {
                            if (err) { return callback(err); }
                            var lastPost = lastPosts[0] || {};

                            mysqlClient.query(
                                "SELECT * FROM post WHERE postid = ?",
                                [thread.firstpostid],
                                buildMongoData(thread, subscribeThreads, lastPost, callback)
                            );
                        }
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

function getMedia (pagetext) {
    if (!pagetext) { return null; }
    var youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var matches = pagetext.match(youtubeRegex);
    if (!matches) { return null; }
    return "https://www.youtube.com/watch?v=" + matches[1];
}

function buildMongoData (thread, subscribeThreads, lastPost, callback) {
    return function (err, firstPosts) {
        if (err) { return callback(err); }

        var subscribers = _.pluck(subscribeThreads, "userid"),
            firstPost = firstPosts[0] || {};

        var threadData = {
            _id             : thread.threadid,
            title           : _.unescape(thread.title),
            type            : thread.threadtype ? "blog" : null,
            slug            : getSlug(thread.title) || thread.threadid,
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
            media           : getMedia(firstPost.pagetext),
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