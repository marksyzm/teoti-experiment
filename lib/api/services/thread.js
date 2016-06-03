"use strict";
const moment = require("moment");
const async = require("async");
const _ = require("lodash");

const ThreadModel = require("../models/thread");
const Forum = require("../services/forum");
const Model = require("./model");
const config = require("../../shared/config");
const security = require("../security");

//TODO: this needs a tidy up  - it's a bollocky mess
class Thread extends Model {
    static filterThreadResults (query, self, sort, skip, populate, random, limit, cb) {
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

            self.model.find(query).populate(populate).sort(sort).skip(skip).limit(limit)
              .exec(function (err, threads) {
                  if (err) return cb(err);
                  self.model.count(query, function (err, count) {
                      if (err) { return cb(err); }
                      cb(null, threads, Model.getPagination(count, skip, limit));
                  });
              });
        };
    }

    static create () {
        return new Thread();
    }

    validate (threadId, forumId, cb) {
        this.model.count({ _id: threadId, forum: forumId }, (err, count) => {
            if (err) { cb(err); }
            if (!count) {
                return cb(new Error("Thread does not exist or may have moved."));
            }
            return cb();
        });
    }
    
    validatePost (postId, threadId, forumId, cb) {
        
    }

    constructor () {
        super(ThreadModel);
    }

    find (options, cb) {
        const query = options.query;
        var forum = options.forum;
        var user = options.user;
        var limit = config.get("limit:"+(options.limit || "default" || 100));
        var random = options.sort === "random";
        let sort = options.sort || null;
        var skip = (query.page - 1) * limit;
        var dateLimit = query.dateLimit;
        const populate = "forum firstPostUser lastPostUser firstPost";

        if (!security.hasPermission(user, "delete", "all", "thread")) { query.deleted = false; }

        if (dateLimit > 0) {
            var prevDate = moment().subtract(dateLimit, 'ms').toDate();
            query.created = { $gte: prevDate };
        }

        let newQuery = _.omit(query, ['page', 'dateLimit', 'sort','limit','documents','user']);
        if (!newQuery.hasOwnProperty('sticky')) { delete newQuery.sticky; }

        Forum.filterForumsFromUserGroups(user, forum._id, true, Thread.filterThreadResults(
          newQuery, this, sort, skip, populate, random, limit, cb
        ));
    }

    subscribe (user, threadId, callback) {
      async.waterfall([
        this.findOne.bind(this, { query: { _id: threadId, subscribed: user } }),
        (thread, cb) => this.update({ query: { _id: threadId }, data: { $push: { subscribed: user } }}, cb)
      ], callback);
    }
}


module.exports = Thread;
