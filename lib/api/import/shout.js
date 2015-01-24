"use strict";

/*jshint camelcase: false */

var async = require("async"),
    Shout = require("../models/shout"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, shouts) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!shouts.length) {
        console.info("\n\nSHOUT IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < shouts.length;
        },
        function (callback) {
            var shout = shouts[count];
            count++;

            var data = {
                _id             : shout.sid,
                user            : shout.s_by,
                forum           : shout.forumid,
                created         : new Date(shout.s_time * 1000),
                message         : shout.s_shout
            };

            Shout.create(data, function (err, shout) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", shout._id, "User:", shout.user
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
    Shout.findOne({}, null, { sort: { _id: -1 } }, function (err, shout) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM shout ORDER BY sid ASC LIMIT ?",
            queryData = [ size ];

        if (shout) {
            query = "SELECT * FROM shout WHERE sid > ? ORDER BY sid ASC LIMIT ?";
            queryData = [ shout._id, size ];
        }

        console.info("\"", query, "\" - sid: ", shout ? shout._id : null);

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