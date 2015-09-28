"use strict";
var _ = require("lodash");
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

_.extend(Forum.prototype, {
    find: function (user, query, cb) {
        if (!user) query.public = true;
        //now add in super admin permissions!
        Forum.filterForumsFromUserGroups(user, query.parent, false, function (err, forums) {
            if (err) return cb(err, forums);
            var forumIds = forums.map(function (forum) { return forum._id; });
            this.model.find({ _id: { $in : forumIds } }, "", "", function (err, forums) {
                cb(err, forums);
            });
        }.bind(this));
    },

    findOne: function (id, cb) {
        var query = {};
        if (typeof id === "string") {
            if (getSlug(id) !== id) { return cb(new Error("Invalid slug"),null); }
            query.slug = id;
        } else {
            query._id = id;
        }
        Model.prototype.findOne.call(this, query, "", "", cb);
    },

    save: function (data, query, cb) {
        var self = this;
        data.slug = getSlug(data.title);

        Model.prototype.save.call(this, data, query, function (err, forum) {
            if (err) { return cb(err, forum); }

            self.getParentsAndPopulateChildren(forum.parent, function (err, parents) {
                if (err) { return cb(err, parents); }

                forum.parents = parents;
                Forum.update({ _id: forum._id }, forum, function (err) {
                    cb(err, forum);
                });
            });
        });
    },

    update: function (query, data, cb) {
        var self = this;

        if (query._id === data.parent) { return cb(new Error("Parent cannot equal id"), data); }

        data.slug = getSlug(data.title);

        self.getParentsAndPopulateChildren(data.parent, function (err, parents) {
            if (err) { return cb(err, parents); }

            data.parents = parents;
            Model.prototype.update.call(self, query, data, cb);
        });
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
            self.findOne({ _id: forumParent }, "", "", function (err, forum) {
                if (err) { return cb(err, parents); }
                if (!forum) { return cb(null, parents); }
                parents.push(forum._id);

                self.getAllChildren(forum._id, function (err, children) {
                    if (err) { return cb(err, parents); }
                    forum.children = children;

                    self.update({ _id: forum._id }, forum, function (err) {
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
            self.find({ parent: { $in: parents } }, "", "", function (err, forums) {
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
    if (user.group && user.group._id) $or.push({ groups: user.group._id });
    var query = { $or: $or };
    query[recursive ? 'parents' : 'parent'] = parent;

    ForumModel.find(query, "_id", "", cb);

};

module.exports = Forum;