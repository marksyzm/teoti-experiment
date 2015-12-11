"use strict";
var _ = require("lodash");
var async = require("async");
var getSlug = require("speakingurl");

var ForumModel = require("../models/forum");
var Model = require("./model");

var Forum = function () {
    Model.call(this, ForumModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

Forum.prototype = new tmp();
Forum.prototype.constructor = Forum;

function getGroupsFromId (id, self, cb) {
    Model.prototype.findOne(self, { _id: id }, "groups", "", function (err, forum) {
        if (err) return cb(err, null);
        cb(null, forum.groups);
    });
}

_.extend(Forum.prototype, {
    find: function (query, sort, populate, cb) {
        var user = query.user;
        delete query.user;
        if (!user) query.public = true;
        //now add in super admin permissions!
        Forum.filterForumsFromUserGroups(user, query.parent, false, function (err, forums) {
            if (err) return cb(err, forums);
            var forumIds = forums.map(function (forum) { return forum._id; });
            this.model.find({ _id: { $in : forumIds } }, "", "", cb);
        }.bind(this));
    },

    findOne: function (query, fields, populate, cb) {
        if (!query) query = {};
        if (query.slug && getSlug(query.slug) !== query.slug) {
            return cb(new Error("Invalid slug"),null);
        }
        Model.prototype.findOne.call(this, query, "", "", cb);
    },

    save: function (data, query, cb) {
        var self = this;
        data.slug = getSlug(data.title);

        async.waterfall([
            function (callback) {
                Model.prototype.save.call(self, data, query, callback);
            },
            function (forum, callback) {
                self.getParentsAndPopulateChildren(forum.parent, function (err, parents) {
                    callback(err, forum, parents);
                });
            },
            function (forum, parents, callback) {
                forum.parents = parents;
                if (forum.override) { return callback(null, forum); }
                getGroupsFromId(forum.parent, self, function (err, groups) {
                    forum.groups = groups;
                    callback(null, forum);
                });
            },
            function (forum, cb) {
                Model.prototype.update.call(self, { _id: forum._id }, forum, cb);
            }
        ], cb);
    },

    update: function (query, data, cb) {
        var self = this;

        if (query._id === data.parent) { return cb(new Error("Parent cannot equal id"), data); }

        data.slug = getSlug(data.title);

        async.waterfall([
            function (cb) {
                Model.prototype.update.call(self, query, data, cb);
            },
            function (forum, callback) {
                self.getParentsAndPopulateChildren(forum.parent, function (err, parents) {
                    callback(err, forum, parents);
                });
            },
            function (forum, parents, callback) {
                forum.parents = parents;
                if (forum.override) { return callback(null, forum); }
                getGroupsFromId(forum.parent, self, function (err, groups) {
                    forum.groups = groups;
                    callback(null, forum);
                });
            },
            function (forum, cb) {
                Model.prototype.update.call(self, { _id: forum._id }, forum.toObject(), cb);
            }
        ], cb);
    },

    del: function (query, cb) {
        var self = this;
        // remove forum
        // TODO: remove all child forums, threads, posts
        Model.prototype.del.call(this, query, function (err, item) {
            if (err) { return cb(err, item); }
            self.getParentsAndPopulateChildren(item.parent, function (err, parents) {
                if (err) { return cb(err, parents); }
                cb(err, item);
            });
        });
    },

    /**
     * Loop through, getting forum parents, collecting them as an array and populating their children
     * @param forumParent
     * @param parents
     * @param cb
     */
    getParentsAndPopulateChildren: function (forumParent, cb) {
        var parents = [-1];
        var self = this;

        function looper(forumParent) {
            if (forumParent <= 0) return cb(null, parents);

            Model.prototype.findOne.call(self, { _id: forumParent }, "", "", function (err, forum) {
                if (err) { return cb(err, parents); }
                if (!forum) { return cb(null, parents); }
                parents.push(forum._id);

                self.getAllChildren(forum._id, function (err, children) {
                    if (err) { return cb(err, parents); }
                    forum.children = children;

                    Model.prototype.update.call(self, { _id: forum._id }, forum, function (err) {
                        if (err) { return cb(err, parents); }
                        looper(forum.parent);
                    });
                });
            });
        }

        looper(forumParent);
    },

    getAllChildren: function (parent, cb) {
        var allChildren = [],
            self = this;

        function looper (parents) {
            Model.prototype.find.call(self, { parent: { $in: parents } }, "", "", function (err, forums) {
                if (err || !forums.length) { return cb(err, allChildren); }

                var children = _.pluck(forums, "_id");
                allChildren.push.apply(allChildren, children);

                looper(children);
            });
        }

        looper([ parent ]);
    }
});

Forum.create = function () {
    return new Forum();
};

Forum.filterForumsFromUserGroups = function (user, parent, recursive, cb) {
    var $or = [ { 'public': true } ];
    if (user && user.group && user.group._id) $or.push({ groups: user.group._id });
    var query = { $or: $or };
    query[recursive ? 'parents' : 'parent'] = parent;

    ForumModel.find(query, "_id", "", cb);
};

module.exports = Forum;