"use strict";
var _ = require("lodash");
var moment = require("moment");

var ThreadModel = require("../models/thread");
var Model = require("./model");
var config = require("../../shared/config");
var security = require("../security");

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
        var random = query.sort === "random";
        var sort = "-" + query.sort;
        var skip = (query.page - 1) * limit;
        var dateLimit = query.dateLimit;
        var populate = "forum firstPostUser lastPostUser firstPost";

        children.push(forum._id);
        query.forum = { $in: children };

        if (!security.hasPermission(user, "update", "all", "thread")) {
            query.deleted = false;
        }

        if (dateLimit > 0) {
            var prevDate = moment().subtract(dateLimit, 'ms').toDate();
            query.created = { $gte: prevDate };
        }

        if (!query.sticky) { delete query.sticky; }
        delete query.page;
        delete query.dateLimit;
        delete query.sort;
        delete query.limit;

        if (random) {
            var options = { limit: limit, populate: populate };
            this.model.findRandom(query, null, options, function (err, threads) {
                if (err) { return cb(err, null, null); }
                cb(null, threads, null);
            }.bind(this));
            return;
        }

        this.model.find(query)
            .populate(populate)
            .sort(sort)
            .skip(skip)
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