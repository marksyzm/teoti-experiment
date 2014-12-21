"use strict";

var _ = require("lodash"),
    async = require("async"),
    Activity = require("../models/activity"),
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

function getData (err, activities) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!activities.length) {
        console.info("\n\nACTIVITY IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < activities.length;
        },
        function (callback) {
            var activity = activities[count];
            count++;

            var data = {
                _id             : activity.activityid,
                user            : activity.userid,
                itemId          : activity.itemid,
                forum           : activity.forumid,
                method          : activity.method === "insert" ? "create" : activity.method,
                type            : getNotificationTypeNameFromId(activity.type),
                created         : new Date(activity.dateline * 1000),
                value           : activity.extra,
                ip              : activity.ip,
                browser         : activity.browser,
                browserVersion  : activity.browserver,
                os              : activity.os,
                osVersion       : activity.osver,
                sessionId       : activity.sessionid,
                script          : activity.script,
                line            : activity.line
            };

            if (!data.user || !data.itemId || !data.forum || !data.method || !data.type) {
                callback(null);
            }

            Activity.create(data, function (err, activity) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id:", activity._id, " method:", activity.method, " type:", activity.type
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
    Activity.findOne({}, null, { sort: { _id: -1 } }, function (err, activity) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM activity ORDER BY activityid ASC LIMIT ?",
            queryData = [ size ];

        if (activity) {
            query = "SELECT * FROM activity WHERE activityid > ? ORDER BY activityid ASC LIMIT ?";
            queryData = [ activity._id, size ];
        }

        console.info("\"", query, "\" - activityid: ", activity ? activity._id : null);

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