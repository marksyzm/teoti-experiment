"use strict";

/*jshint camelcase: false */

var async = require("async"),
    Post = require("../models/post"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, posts) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!posts.length) {
        console.info("\n\nPOSTS IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < posts.length;
        },
        function (callback) {
            var post = posts[count];
            count++;

            var data = {
                _id             : post.postid,
                title           : post.title,
                content         : post.pagetext,
                thread          : post.threadid,
                user            : post.userid,
                reply           : post.parentid,
                deleted         : post.visible !== 1,
                pointLock       : post.point_lock,
                score           : post.post_thanks_amount,
                created         : new Date(post.dateline * 1000),
                updated         : new Date(post.updated * 1000)
            };

            if (!data.content) {
                return callback(null);
            }

            Post.create(data, function (err, post) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", post._id, " title:", post.title
                    //,"\n", row, "\n\n"
                );

                callback(null);
            });
        },
        function (err) {
            if (err) { return callback(err); }

            looper();
        }
    );
}

function looper () {
    Post.findOne({}, null, { sort: { _id: -1 } }, function (err, post) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM post ORDER BY postid ASC LIMIT ?",
            queryData = [ size ];

        if (post) {
            query = "SELECT * FROM post WHERE postid > ? ORDER BY postid ASC LIMIT ?";
            queryData = [ post._id, size ];
        }

        console.info("\"", query, "\" - postid: ", post ? post._id : null);

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