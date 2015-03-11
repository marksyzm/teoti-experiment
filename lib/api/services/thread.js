"use strict";
var _ = require("lodash");

var ThreadModel = require("../models/thread"),
    Model = require("./model"),
    config = require("../config"),
    security = require("../security");

var Thread = function () {
    Model.call(this, ThreadModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

Thread.prototype = new tmp();
Thread.prototype.constructor = Thread;

_.extend(Thread.prototype, {
    find: function (query, forum, user, cb) {
        var children = forum.children,
            limit = config.get("threads:limit"),
            sort = "-" + query.sort,
            skip = (query.page - 1) * limit;

        children.push(forum._id);
        query.forum = { $in: children };

        if (!security.hasPermission(user, "update", "all", "thread")) {
            query.deleted = false;
        }

        delete query.page;
        delete query.sort;

        this.model.find(query)
            .populate("forum firstPostUser lastPostUser firstPost")
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function (err, threads) {
                return cb(err, threads);
            });
    }
});

Thread.create = function () {
    return new Thread();
};

module.exports = Thread;