"use strict";
var _ = require("lodash");
var moment = require("moment");

var ThreadModel = require("../models/thread");
var Forum = require("../services/forum");
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

function filterThreadResults (query, self, sort, skip, populate, random, limit, cb) {
    return function (err, forums) {
        if (err) return cb(err, forums);
        var forumIds = forums.map(function (forum) { return forum._id });
        query.forum = { $in: forumIds };

        if (random) {
            var options = { limit: limit, populate: populate };
            self.model.findRandom(query, null, options, function (err, threads) {
                if (err) return cb(err, null, null);
                cb(null, threads, null);
            });
            return;
        }

        self.model.find(query)
            .populate(populate)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec(function (err, threads) {
                if (err) return cb(err);
                self.model.count(query, function (err, count) {
                    if (err) { return cb(err); }
                    cb(null, threads, Model.getPagination(count, skip, limit));
                });
            });
    };
}

_.extend(Thread.prototype, {
    find: function (query, forum, user, cb) {
        var limit = config.get("limit:"+(query.limit || "default" || 100));
        var random = query.sort === "random";
        var sort = "-" + query.sort;
        var skip = (query.page - 1) * limit;
        var dateLimit = query.dateLimit;
        var populate = "forum firstPostUser lastPostUser firstPost";

        if (!security.hasPermission(user, "delete", "all", "thread")) {
            query.deleted = false;
        }

        if (dateLimit > 0) {
            var prevDate = moment().subtract(dateLimit, 'ms').toDate();
            query.created = { $gte: prevDate };
        }

        if (!query.sticky) delete query.sticky;
        delete query.page;
        delete query.dateLimit;
        delete query.sort;
        delete query.limit;

        Forum.filterForumsFromUserGroups(user, forum._id, true, filterThreadResults(
            query, this, sort, skip, populate, random, limit, cb
        ));
    }
});

Thread.create = function () {
    return new Thread();
};

module.exports = Thread;