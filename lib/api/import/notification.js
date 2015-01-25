"use strict";

var _ = require("lodash"),
    async = require("async"),
    Notification = require("../models/notification"),
    notificationTypes = require("../data/defaults/notification-types.json"),
    mysqlClient,
    callback,
    size = 500;

function getNotificationTypeNameFromId(id) {
    var notificationType = _.find(notificationTypes, function (notificationType) {
        return notificationType.id === id;
    });

    return notificationType ? notificationType.name : null;
}

function getData (err, notifications) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!notifications.length) {
        console.info("\n\nNOTIFICATION IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < notifications.length;
        },
        function (callback) {
            var notification = notifications[count];
            count++;

            var data = {
                _id             : notification.noteid,
                user            : notification.userid,
                fromUsers       : [ notification.fromuserid ],
                type            : getNotificationTypeNameFromId(notification.extra === "disliked" ? 7 : notification.type),
                itemId          : notification.itemid,
                created         : new Date(notification.dateline * 1000),
                read            : false
            };

            Notification.create(data, function (err, notification) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", notification._id, "Type:", notification.type
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
    Notification.findOne({}, null, { sort: { _id: -1 } }, function (err, notification) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM notification ORDER BY noteid ASC LIMIT ?",
            queryData = [ size ];

        if (notification) {
            query = "SELECT * FROM notification WHERE noteid > ? ORDER BY noteid ASC LIMIT ?";
            queryData = [ notification._id, size ];
        }

        console.info("\"", query, "\" - noteid: ", notification ? notification._id : null);

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