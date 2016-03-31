"use strict";
const moment = require("moment");
const async = require("async");

const PostModel = require("../models/post");
const Model = require("./model");
const config = require("../../shared/config");
const security = require("../security");

const User = require('./user').create();
const Thread = require('./thread').create();
const Forum = require('./forum').create();

const SCORE_AMOUNT = 5;

class Post extends Model {
  constructor() {
    super(PostModel);
  }

  static create() {
    return new Post();
  }

  find(query, sort, populate, cb) {
    var user = query.user;
    var limit = config.get("limit:" + (query.limit || "default" || 100));
    sort = query.sort;
    var skip = query.page ? (query.page - 1) * limit : null;
    populate = "user parent";

    if (!security.hasPermission(user, "delete", "all", "post")) {
      query.deleted = false;
    }
    query._id = {$ne: query.firstPostId};

    delete query.page;
    delete query.sort;
    delete query.limit;
    delete query.user;
    delete query.firstPostId;

    async.waterfall([
      callback => {
        this.count(query, (err, count) => {
          skip = typeof skip !== 'number' ? count - (count % limit) : skip;
          callback(err, Model.getPagination(count, skip, limit));
        });
      },
      (pagination, callback) => {
        this.model.find(query).populate(populate).sort(sort).skip(skip).limit(limit)
          .exec((err, posts) => {
            if (err) return callback(err);
            this.model.populate(posts, {path: "parent.user", model: "User"}, function (err, posts) {
              callback(err, posts, pagination);
            });
          });
      }
    ], cb);
  }

  save(data, query, cb) {
    async.waterfall([
      this.validateThread.bind(this, data),
      super.save.bind(this),
      this.updateThread.bind(this),
      this.updateThreadUser.bind(this),
      this.updatePostUser.bind(this),
      this.updateForum.bind(this, data),
      this.addActivity.bind(this),
      this.subscribeUser.bind(this),
      this.notify.bind(this)
    ], cb);
  }

  validateThread(post, callback) {
    Thread.validate(post.thread, post.forum, (err) => callback(err, post, null));
  }

  /**
   * Update thread post count, last poster and "updated" date, score
   * @param callback
   */
  updateThread(post, callback) {
    async.waterfall([
      this.count.bind(this, {thread: post.thread, deleted: false}),
      (count, cb) => {
        const data = {
          posts: count,
          lastPoster: post.user,
          $currentDate: {updated: true},
          $inc: {score: SCORE_AMOUNT}
        };
        Thread.update({_id: data.thread}, data, cb);
      }
    ], (err) => callback(err, post));
  }

  /***
   * Update thread user score
   * @param post
   * @param callback
   */
  updateThreadUser(post, callback) {
    async.waterfall([
      Thread.findOne.bind(Thread, {_id: post.thread}, "", ""),
      (thread, cb) => User.update({_id: thread.firstPostUser}, {$inc: {score: SCORE_AMOUNT}}, cb)
    ], (err) => callback(err, post));
  }

  /**
   * update user post count, points, last post date, activity
   * @param post
   * @param callback
   */
  updatePostUser(post, callback) {
    async.waterfall([
      this.count.bind(this, {user: post.user, deleted: false}),
      (count, cb) => {
        const data = {
          posts: count,
          $inc: { score: SCORE_AMOUNT, totalScore: SCORE_AMOUNT },
          $currentDate: {lastActivity: true, lastPost: true}
        };
        User.update({_id: post.user._id}, data, cb);
      }
    ], (err) => callback(err, post));
  }

  updateForum(data, post, callback) {
    // update last post on forum
    Forum.update({_id: data.forum}, {lastPost: post._id}, (err) => callback(err, post));
  }

  addActivity(post, callback) {
    callback(null, post);
  }

  subscribeUser(post, callback) {
    Thread.subscribe(post.user, post.thread, (err) => callback(err, post));
  }

  /**
   * Notify users of new update
   * @param post
   * @param callback
   */
  notify(post, callback) {
    callback(null, post);
  }
}

module.exports = Post;