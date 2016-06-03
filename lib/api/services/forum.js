"use strict";
var _ = require("lodash");
var async = require("async");
var getSlug = require("speakingurl");

var ForumModel = require("../models/forum");
var Model = require("./model");

class Forum extends Model {
    constructor() {
        super(ForumModel);
    }

    static create() {
        return new Forum();
    }

    static filterForumsFromUserGroups(user, parent, recursive, cb) {
        var $or = [{'public': true}];
        if (user && user.group && user.group._id) $or.push({groups: user.group._id});
        var query = {$or: $or};
        query[recursive ? 'parents' : 'parent'] = parent;

        ForumModel.find(query, "_id", "", cb);
    }

    find(options, cb) {
        const query = options.query;
        const user = options.user;
        if (!user) query.public = true;
        //now add in super admin permissions!
        Forum.filterForumsFromUserGroups(user, query.parent, false, (err, forums) => {
            if (err) return cb(err, forums);
            var forumIds = forums.map((forum) => forum._id);
            this.model.find({_id: {$in: forumIds}}, "", "", cb);
        });
    }

    findOne(options, cb) {
        const query = options.query || {};
        if (query.slug && getSlug(query.slug) !== query.slug) {
            return cb(new Error("Invalid forum slug"), null);
        }
        super.findOne(options, cb);
    }

    save(options, cb) {
        const data = options.data;
        data.slug = getSlug(data.title);

        const waterfall = [
            (callback) => super.save(options, callback),
            ...this.getForumParentChildrenUpdateSequence()
        ];

        async.waterfall(waterfall, cb);
    }

    update(options, cb) {
        const data = options.data;
        const query = options.query;
        if (query._id === data.parent) {
            return cb(new Error("Parent cannot equal id"), data);
        }

        if (data.title) {
            data.slug = getSlug(data.title);
        }

        let waterfall = [
            (cb) => super.update(options, cb)
        ];

        if (data.parent) {
            waterfall = [ ...waterfall, ...this.getForumParentChildrenUpdateSequence() ];
        }

        async.waterfall(waterfall, cb);
    }

    del(options, cb) {
        // TODO: archive all child forums, threads, posts
        super.del(options, (err, item) => {
            if (err) return cb(err, item);
            this.getParentsAndPopulateChildren(item.parent, (err, parents) => {
                if (err) return cb(err, parents);
                cb(err, item);
            });
        });
    }

    getForumParentChildrenUpdateSequence() {
        return [
            (forum, callback) => {
                this.getParentsAndPopulateChildren(forum.parent, (err, parents) => {
                    callback(err, forum, parents);
                });
            },
            (forum, parents, callback) => {
                forum.parents = parents;
                if (forum.override) {
                    return callback(null, forum);
                }
                // TODO: I think we already have this in the forum object - double check this please
                this.getGroupsFromId(forum.parent, (err, groups) => {
                    forum.groups = groups;
                    callback(null, forum);
                });
            },
            (forum, cb) => {
                const options = {
                    query: {_id: forum._id},
                    data: forum.toObject()
                }
                super.update(options, cb);
            }
        ];
    }

    /**
     *
     * @param id
     * @param cb
     */
    getGroupsFromId(id, cb) {
        const options = {
            query: {_id: id},
            fields: "groups"
        };
        super.findOne(options, (err, forum) => {
            if (err) return cb(err, null);
            cb(null, forum.groups);
        });
    }

    /**
     * Loop through, getting forum parents, collecting them as an array and populating their children
     * @param forumParent
     * @param parents
     * @param cb
     */
    getParentsAndPopulateChildren(forumParent, cb) {
        var parents = [-1];

        const looper = (forumParent) => {
            if (forumParent <= 0) return cb(null, parents);
            const options = {
                query: { _id: forumParent }
            };

            super.findOne(options, (err, forum) => {
                if (err) return cb(err, parents);
                if (!forum) return cb(null, parents);
                parents.push(forum._id);

                this.getAllChildrenAndGroups(forum._id, (err, children, groups) => {
                    if (err) { return cb(err, parents); }
                    forum.children = children;
                    forum.groups = groups;
                    const options = {
                        query: {_id: forum._id},
                        data: forum.toObject()
                    };
                    super.update(options, (err) => {
                        if (err) { return cb(err, parents); }
                        looper(forum.parent);
                    });
                });
            });
        };

        looper(forumParent);
    }

    getAllChildrenAndGroups(parent, cb) {
        const allChildren = [];
        const allGroups = [];

        const looper = (parents, groups) => {
            super.find({parent: {$in: parents}}, "", "", (err, forums) => {
                if (err || !forums.length) {
                    return cb(err, allChildren, allGroups);
                }

                const children = _.uniq(_.pluck(forums, "_id"));
                const groups = _.uniq(_.flatten(_.pluck(forums, "groups")));
                allChildren.push.apply(allChildren, children);
                allGroups.push.apply(allGroups, groups);

                looper(children);
            });
        }

        looper([parent]);
    }
}

module.exports = Forum;
