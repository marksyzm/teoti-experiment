"use strict";

var _ = require("lodash"),
    async = require("async"),
    Like = require("../models/like"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, likes) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!likes.length) {
        console.info("\n\nLIKE IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < likes.length;
        },
        function (callback) {
            var like = likes[count];
            count++;

            var data = {
                _id             : like.id,
                user            : like.userid,
                post            : like.postid,
                created         : new Date(like.date * 1000),
                amount          : like.scored
            };

            Like.create(data, function (err, like) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", like._id, "User:", like.user
                    //,"\n", row, "\n\n"
                );

                callback(null);
            });
        },
        function (err) {
            if (err) {
                return callback(err);
            }

            looper();
        }
    );
}

function looper () {
    Like.findOne({}, null, { sort: { _id: -1 } }, function (err, like) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM post_thanks ORDER BY id ASC LIMIT ?",
            queryData = [ size ];

        if (like) {
            query = "SELECT * FROM post_thanks WHERE id > ? ORDER BY id ASC LIMIT ?";
            queryData = [ like._id, size ];
        }

        console.info("\"", query, "\" - id: ", like ? like._id : null);

        mysqlClient.query(query, queryData, getData);
    });
};

module.exports = {
    "import": function (cl, cb) {
        mysqlClient = cl;
        callback = cb;

        looper();
    }
};