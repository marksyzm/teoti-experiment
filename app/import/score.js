"use strict";

var _ = require("lodash"),
    async = require("async"),
    Score = require("../models/score"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, scores) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!scores.length) {
        console.info("\n\nSCORE IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < scores.length;
        },
        function (callback) {
            var score = scores[count];
            count++;

            var data = {
                _id             : score.noteid,
                user            : score.userid,
                post            : score.postid,
                created         : new Date(score.dateline * 1000),
                amount          : score.amount,
                like            : false
            };

            Score.create(data, function (err, score) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", score._id, "User:", score.user
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
    Score.findOne({}, null, { sort: { _id: -1 } }, function (err, score) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM points ORDER BY pointid ASC LIMIT ?",
            queryData = [ size ];

        if (score) {
            query = "SELECT * FROM points WHERE pointid > ? ORDER BY pointid ASC LIMIT ?";
            queryData = [ score._id, size ];
        }

        console.info("\"", query, "\" - noteid: ", score ? score._id : null);

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