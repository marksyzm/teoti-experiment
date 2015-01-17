"use strict";

var async = require("async"),
    Sitelog = require("../models/sitelog"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, sitelogs) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!sitelogs.length) {
        console.info("\n\nSITELOG IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < sitelogs.length;
        },
        function (callback) {
            var sitelog = sitelogs[count];
            count++;

            var data = {
                _id:        sitelog.sitelogid,
                user:       sitelog.giverid,
                fromUser:   sitelog.getterid,
                points:     sitelog.sitelogpts,
                message:    sitelog.message,
                created:    new Date(sitelog.dateline * 1000)
            };

            Sitelog.create(data, function (err, sitelog) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", sitelog._id, "User:", sitelog.user
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
    Sitelog.findOne({}, null, { sort: { _id: -1 } }, function (err, sitelog) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM sitelog ORDER BY sitelogid ASC LIMIT ?",
            queryData = [ size ];

        if (sitelog) {
            query = "SELECT * FROM sitelog WHERE sitelogid > ? ORDER BY sitelogid ASC LIMIT ?";
            queryData = [ sitelog._id, size ];
        }

        console.info("\"", query, "\" - sid: ", sitelog ? sitelog._id : null);

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