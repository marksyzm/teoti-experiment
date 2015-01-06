"use strict";

var _ = require("lodash"),
    async = require("async"),
    getSlug = require("speakingurl"),
    Forum = require("../models/forum"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, forums) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!forums.length) {
        console.info("\n\nFORUM IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < forums.length;
        },
        function (callback) {
            var forum = forums[count];
            count++;

            var data = {
                _id             : forum.forumid,
                parent          : forum.parentid,
                parentList      : forum.parentlist ? _.map(forum.parentlist.split(","), Number) : [],
                style           : forum.styleid,
                title           : forum.title,
                slug            : getSlug(forum.title),
                description     : forum.description,
                icon            : forum.forumid + ".png",
                hashTags        : forum.hashTags
            };

            if (!data.title) {
                callback(null);
            }

            Forum.create(data, function (err, forum) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", forum._id, "Title:", forum.title
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
    Forum.findOne({}, null, { sort: { _id: -1 } }, function (err, forum) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM forum ORDER BY forumid ASC LIMIT ?",
            queryData = [ size ];

        if (forum) {
            query = "SELECT * FROM forum WHERE forumid > ? ORDER BY forumid ASC LIMIT ?";
            queryData = [ forum._id, size ];
        }

        console.info("\"", query, "\" - forumid: ", forum ? forum._id : null);

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