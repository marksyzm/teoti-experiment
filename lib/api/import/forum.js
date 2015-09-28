"use strict";

var _ = require("lodash");
var async = require("async");
var getSlug = require("speakingurl");

var Forum = require("../models/forum");

var publicForumIds = [15,51,21,26,27,16,35,36,17,42,62,44,19,63,40,43,60,18,20,23,31,32,34,57,48,24,25,59,61,28,29,58,38,39,41,53,55,64,65,66,67,30,33,37,54,-1];

var mysqlClient;
var callback;
var size = 500;

function getData (err, forums) {
    var count = 0;

    if (err) {
        return callback(err);
    }

    if (!forums.length) {
        console.info("\n\nFORUM IMPORT COMPLETE\n\n");
        return callback(null);
    }

    async.whilst(
        function () {
            return count < forums.length;
        },
        function (callback) {
            var forum = forums[count];
            count++;

            var parents = forum.parentlist ? _.map(forum.parentlist.split(","), Number) : [];

            var children = forum.childlist ? _.map(forum.childlist.split(","), Number) : [];
            children.splice(children.indexOf(-1), 1);

            var data = {
                _id             : forum.forumid,
                parent          : forum.parentid,
                parents         : parents,
                children        : children,
                style           : forum.styleid,
                order           : forum.displayorder,
                title           : _.unescape(forum.title),
                slug            : getSlug(_.unescape(forum.title)),
                description     : forum.description,
                icon            : forum.forumid + ".png",
                hashTags        : forum.hashTags,
                public          : publicForumIds.indexOf(forum.forumid) !== -1
            };

            if (!data.title) {
                callback(null);
            }

            Forum.create(data, function (err, forum) {
                if (err) {
                    return callback(err);
                }

                console.info(
                    "Created: id: ", forum._id, "Title:", forum.title
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
    Forum.findOne({}, null, { sort: { _id: -1 } }, function (err, forum) {
        if (err) { return callback(err); }

        var query = "SELECT * FROM forum ORDER BY forumid ASC LIMIT ?",
            queryData = [ size ];

        if (forum) {
            query = "SELECT * FROM forum WHERE forumid > ? ORDER BY forumid ASC LIMIT ?";
            queryData = [ forum._id, size ];
        }

        console.info("\"", query, "\" - forumid: ", forum ? forum._id : null);

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