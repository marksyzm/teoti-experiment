"use strict";
var _ = require("lodash"),
    getSlug = require("speakingurl");

var ForumModel = require("../models/forum"),
    Model = require("./model");

var Forum = function () {
    Model.call(this, ForumModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

Forum.prototype = new tmp();
Forum.prototype.constructor = Forum;

_.extend(Forum.prototype, {
    save: function (data, query, cb) {
        var self = this;
        data.slug = getSlug(data.title);

        Model.prototype.save.call(this, data, query, function (err, forum) {
            if (err) { return cb(err, forum); }

            self.getParentsAndPopulateChildren(forum.parent, function (err, parentList) {
                if (err) { return cb(err, parentList); }

                forum.parentList = parentList;
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

        self.getParentsAndPopulateChildren(data.parent, function (err, parentList) {
            if (err) { return cb(err, parentList); }

            data.parentList = parentList;
            Model.prototype.update.call(self, query, data, cb);
        });
    },

    del: function (query, cb) {
        var self = this;
        // remove forum
        // TODO: remove all child forums, threads, posts
        Model.prototype.del.call(this, query, function (err, item) {
            if (err) { return cb(err, item); }
            self.getParentsAndPopulateChildren(item.parent, function (err, parentList) {
                if (err) { return cb(err, parentList); }
                cb(err, item);
            });
        });
    },

    /**
     * Loop through, getting forum parents, collecting them as an array and populating their children
     * @param forumParent
     * @param parentList
     * @param cb
     */
    getParentsAndPopulateChildren: function (forumParent, cb) {
        var parentList = [],
            self = this;

        function looper(forumParent) {
            if (forumParent > 0) {
                self.findOne({ _id: forumParent }, "", "", function (err, forum) {
                    if (err) { return cb(err, parentList); }
                    if (!forum) { return cb(null, parentList); }
                    parentList.push(forum._id);

                    self.getAllChildren(forum._id, function (err, children) {
                        if (err) { return cb(err, parentList); }
                        forum.children = children;

                        self.update({ _id: forum._id }, forum, function (err) {
                            if (err) { return cb(err, parentList); }
                            looper(forum.parent);
                        });
                    });
                });
            } else {
                cb(null, parentList);
            }
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

exports.create = function () {
    return new Forum();
};