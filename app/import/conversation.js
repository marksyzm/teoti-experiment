"use strict";

var _ = require("lodash"),
    async = require("async"),
    Conversation = require("../models/conversation"),
    mysqlClient,
    callback,
    size = 500;

function getData (err, conversations) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!conversations.length) {
        console.info("\n\nCONVERSATION IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < conversations.length;
        },
        function (callback) {
            var conversation = conversations[count];
            count++;

            mysqlClient.query(
                "SELECT * FROM pm WHERE pmtextid = ? ORDER BY pmid",
                [ conversation.pmtextid ],
                buildMongoData(conversation, callback)
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

function buildMongoData (conversation, callback) {
    return function (err, pms) {
        if (err) {
            return callback(err);
        }

        var users = _.pluck(pms, "userid");

        var read = _.pluck(_.filter(pms, function (pm) {
            return !!pm.messageread;
        }), "userid");

        var data = {
            _id             : conversation.threadid,
            createdBy       : conversation.fromuserid,
            created         : new Date(conversation.dateline * 1000),
            updated         : new Date(conversation.lastpm * 1000),
            title           : conversation.title,
            users           : users,
            read            : read
        };

        Conversation.create(data, function (err, conversation) {
            if (err) {
                return callback(err);
            }

            console.info(
                "Created: id: ", conversation._id, " users:", conversation.users.length
                //,"\n", row, "\n\n"
            );

            callback(null);
        });
    }
}

function looper () {
    Conversation.findOne({}, null, { sort: { _id: -1 } }, function (err, conversation) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM pmtext ORDER BY pmtextid ASC LIMIT ?",
            queryData = [ size ];

        if (conversation) {
            query = "SELECT * FROM pmtext WHERE pmtextid > ? ORDER BY pmtextid ASC LIMIT ?";
            queryData = [ conversation._id, size ];
        }

        console.info("\"", query, "\" - conversationid: ", conversation ? conversation._id : null);

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