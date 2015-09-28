"use strict";

var async = require("async"),
    Message = require("../models/message"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, messages) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!messages.length) {
        console.info("\n\nMESSAGE IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < messages.length;
        },
        function (callback) {
            var message = messages[count];
            count++;

            var data = {
                _id             : message.pmnodeid,
                user            : message.userid,
                conversation    : message.pmtextid,
                created         : new Date(message.dateline * 1000),
                bbcode          : message.message,
                html            : message.html
            };

            if (!data.bbcode) return callback(null);

            Message.create(data, function (err, message) {
                if (err) return callback(err);
                console.info("Created: id: ", message._id);
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
    Message.findOne({}, null, { sort: { _id: -1 } }, function (err, message) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM pmnode ORDER BY pmnodeid ASC LIMIT ?",
            queryData = [ size ];

        if (message) {
            query = "SELECT * FROM pmnode WHERE pmnodeid > ? ORDER BY pmnodeid ASC LIMIT ?";
            queryData = [ message._id, size ];
        }

        console.info("\"", query, "\" - pmnodeid: ", message ? message._id : null);

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