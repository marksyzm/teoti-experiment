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
        case 6: // Admin
            return 1;
        case 5: // Mod
            return 2;
        case 12: // Uber
            return 3;
        case 10: // God
            return 4;
        case 2: // Regular
            return 5;
        case 3: // Regular
            return 5;
        case 8: // Banned
            return 6;
        default: // Regular
            return 5;
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
                callback(null);
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