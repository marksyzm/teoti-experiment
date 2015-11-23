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

_.extend(Thread.prototype, {
    find: function (query, forum, user, cb) {
        var limit = config.get("limit:"+(query.limit || "default" || 100));
        var random = query.sort === "random";
        var sort = query.sort;
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