"use strict";
var _ = require("lodash");
var moment = require("moment");
var async = require("async");

var PostModel = require("../models/post");
var Model = require("./model");
var config = require("../../shared/config");
var security = require("../security");

var Post = function () {
    Model.call(this, PostModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

Post.prototype = new tmp();
Post.prototype.constructor = Post;

_.extend(Post.prototype, {
    find: function (query, sort, populate, cb) {
        var user = query.user;
        var limit = config.get("limit:"+(query.limit || "default" || 100));
        sort = query.sort;
        var skip = query.page ? (query.page - 1) * limit : null;
        populate = "user parent";

        if (!security.hasPermission(user, "delete", "all", "post")) {
            query.deleted = false;
        }
        query._id = { $ne: query.firstPostId };

        delete query.page;
        delete query.sort;
        delete query.limit;
        delete query.user;
        delete query.firstPostId;
        var self = this;

        async.waterfall([
            function (callback) {
                self.model.count(query, function (err, count) {
                    skip = skip || count - (count % limit);
                    callback(err, Model.getPagination(count, skip, limit));
                });
            },
            function (pagination, callback) {
                //console.log(count, skip, skip / limit);
                self.model.find(query).populate(populate).sort(sort).skip(skip).limit(limit)
                    .exec(function (err, posts) {
                        if (err) return callback(err);
                        self.model.populate(posts, { path: "parent.user", model: "User" }, function (err, posts) {
                            callback(err, pagination, posts);
                        });
                    });
            }
        ], function (err, pagination, posts) {
            cb(err, posts, pagination);
        });

    }
});

Post.create = function () {
    return new Post();
};

module.exports = Post;