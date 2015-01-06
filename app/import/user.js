"use strict";

var _ = require("lodash"),
    async = require("async"),
    getSlug = require("speakingurl"),
    User = require("../models/user"),
    mysqlClient,
    callback,
    size = 500;

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
                group           : user.usergroupid,
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
                usernameUrl     : getSlug(user.username),
                activate        : user.activate
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
};

module.exports = {
    "import": function (cl, cb) {
        mysqlClient = cl;
        callback = cb;

        looper();
    }
};