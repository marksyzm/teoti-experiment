"use strict";

/*jshint camelcase: false */

var async = require("async"),
    getSlug = require("speakingurl"),
    User = require("../models/user"),
    mysqlClient,
    callback,
    size = 500;

function getUserGroup(id) {
    switch (id) {
        case 6:
            return 1; // Admin
        case 5:
            return 2; // Mod
        case 12:
            return 3; // Uber
        case 10:
            return 4; // God
        case 2:
            return 5; // Regular
        case 3:
            return 5; // Regular
        case 8:
            return 6; // Banned
        default:
            return 5; // Regular
    }
}

function getData (err, users) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!users.length) {
        console.info("\n\nUSERS IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < users.length;
        },
        function (callback) {
            var user = users[count];
            count++;

            var data = {
                _id             : user.userid,
                group           : getUserGroup(user.usergroupid),
                username        : user.username,
                title           : user.usertitle,
                password        : user.password,
                passwordDate    : new Date(user.passworddate),
                salt            : user.salt,
                email           : user.email,
                style           : user.styleid,
                joined          : user.joined ? new Date(user.joindate * 1000) : null,
                lastVisited     : user.lastvisited ? new Date(user.lastvisit * 1000) : null,
                lastActivity    : user.lastactivity ? new Date(user.lastactivity * 1000) : null,
                lastPost        : user.lastpost ? new Date(user.lastpost * 1000) : null,
                birthday        : new Date(user.birthday_search),
                posts           : user.posts,
                threads         : user.threads,
                notifications   : user.notifications,
                messages        : user.pmtotal,
                messagesUnread  : user.pmunread,
                timezoneOffset  : user.timezoneoffset,
                avatar          : user.avatar,
                location        : user.location,
                score           : user.post_thanks_thanked_times,
                totalScore      : user.user_total_score,
                slug            : getSlug(user.username),
                active          : true,
                activationCode  : user.activate,
                resetPassword   : false
            };

            if (!data.email || !data.username || !data.password) {
                return callback(null);
            }

            User.create(data, function (err, user) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", user._id, " title:", user.title
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
    User.findOne({}, null, { sort: { _id: -1 } }, function (err, user) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM user ORDER BY userid ASC LIMIT ?",
            queryData = [ size ];

        if (user) {
            query = "SELECT * FROM user WHERE userid > ? ORDER BY userid ASC LIMIT ?";
            queryData = [ user._id, size ];
        }

        console.info("\"", query, "\" - userid: ", user ? user._id : null);

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