"use strict";
var _ = require("lodash");

var ThreadModel = require("../models/thread"),
    Model = require("./model"),
    config = require("../../shared/config"),
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
        var children = forum.children;
        var limit = config.get("limit:"+(query.limit || 'main'));
        var sort = "-" + query.sort;
        var skip = (query.page - 1) * limit;
        var random = query.random;
        var populate = "forum firstPostUser lastPostUser firstPost";

        children.push(forum._id);
        query.forum = { $in: children };

        if (!security.hasPermission(user, "update", "all", "thread")) {
            query.deleted = false;
        }

        delete query.page;
        delete query.sort;
        delete query.random;
        delete query.limit;

        if (random) {
            var find = this.model.findRandom().populate(populate);
        } else {
            var find = this.model.find(query).populate(populate).sort(sort).skip(skip);
        }

        find
            .limit(limit)
            .exec(function (err, threads) {
                if (err) { return cb(err); }
                this.model.count(query, function (err, count) {
                    if (err) { return cb(err); }
                    cb(null, threads, Model.getPagination(count, skip, limit));
                });
            }.bind(this));
    }
});

Thread.create = function () {
    return new Thread();
};

module.exports = Thread;