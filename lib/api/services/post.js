"use strict";
const moment = require("moment");
const async = require("async");
const _ = require("lodash");

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

    /**
     * Find all posts according to query
     * @param query
     * @param sort
     * @param populate
     * @param cb
     */
    find(options, cb) {
        const query = options.query;
        const sort = options.sort;
        const user = options.user;
        const populate = "user parent";
        const limit = config.get("limit:" + (query.limit || "default" || 100));
        let skip = query.page ? (query.page - 1) * limit : null;

        if (!security.hasPermission(user, "delete", "all", "post")) {
            query.deleted = false;
        }
        query._id = {$ne: query.firstPostId};

        const find = _.omit(query, ['page', 'sort', 'limit', 'firstPostId']);

        async.waterfall([
            callback => {
                this.count(find, (err, count) => {
                    skip = typeof skip !== 'number' ? count - (count % limit) : skip;
                    callback(err, Model.getPagination(count, skip, limit));
                });
            },
            (pagination, callback) => {
                this.model.find(find).populate(populate).sort(sort).skip(skip).limit(limit)
                    .exec((err, posts) => {
                        if (err) return callback(err);
                        this.model.populate(posts, {path: "parent.user", model: "User"}, function (err, posts) {
                            callback(err, posts, pagination);
                        });
                    });
            }
        ], cb);
    }

    /**
     * Save the post
     * @param data
     * @param query
     * @param cb
     * @returns {*}
     */
    save(options, cb) {
        const data = options.data;
        const user = options.user;
        if (!security.hasPermission(user, "create", "own", "post")) {
            return cb(new Error("Invalid post create permission"));
        }

        async.waterfall([
            this.validateThread.bind(this, options),
            (options, callback) => {
                super.save(options, (err, post) => {
                    options.post = post;
                    callback(err, options);
                });
            },
            this.updateThread.bind(this),
            this.updateThreadUser.bind(this),
            this.updatePostUser.bind(this),
            this.updateForum.bind(this),
            this.addActivity.bind(this),
            this.subscribeUser.bind(this),
            this.notify.bind(this)
        ], cb);
    }

    /**
     * Make sure thread is associated with forum
     * @param post
     * @param query
     * @param callback
     */
    validateThread(options, callback) {
        const thread = options.thread;
        const forum = options.forum;
        Thread.validate(thread._id, forum._id, (err) => callback(err, options));
    }

    /**
     * Make sure thread is associated with forum
     * @param post
     * @param query
     * @param callback
     */
    validateThreadPost(options, callback) {
        const post = options.post;
        Thread.validatePost(post.thread._id, post.forum._id, post._id, (err) => callback(err, options));
    }

    /**
     * Update thread post count, last poster and "updated" date, score
     * @param callback
     */
    updateThread(options, callback) {
        const post = options.post;
        async.waterfall([
            this.count.bind(this, {thread: post.thread, deleted: false}),
            (count, cb) => {
                const data = {
                    posts: count,
                    lastPoster: post.user,
                    $currentDate: {updated: true},
                    $inc: {score: SCORE_AMOUNT}
                };
                const query = {_id: data.thread};

                Thread.update({ query, data }, cb);
            }
        ], (err) => callback(err, options));
    }

    /***
     * Update thread user score
     * @param post
     * @param callback
     */
    updateThreadUser(options, callback) {
        const post = options.post;
        const threadOptions = { query: {_id: post.thread} };
        async.waterfall([
            Thread.findOne.bind(Thread, threadOptions),
            (thread, cb) => User.update({
                query: {_id: thread.firstPostUser},
                data: {$inc: {score: SCORE_AMOUNT}}
            }, cb)
        ], (err) => callback(err, options));
    }

    /**
     * update user post count, points, last post date, activity
     * @param post
     * @param callback
     */
    updatePostUser(options, callback) {
        const post = options.post;
        async.waterfall([
            this.count.bind(this, {user: post.user, deleted: false}),
            (count, cb) => {
                const data = {
                    posts: count,
                    $inc: {score: SCORE_AMOUNT, totalScore: SCORE_AMOUNT},
                    $currentDate: {lastActivity: true, lastPost: true}
                };
                User.update({_id: post.user._id}, data, cb);
            }
        ], (err) => callback(err, options));
    }

    /**
     * update last post on forum
     * @param data
     * @param post
     * @param callback
     */
    updateForum(options, callback) {
        const post = options.post;
        const forumOptions = { query:{_id: options.forum._id}, data: {lastPost: post._id}}
        Forum.update(forumOptions, (err) => callback(err, options));
    }

    /**
     * Add activity log
     * @param post
     * @param callback
     */
    addActivity(options, callback) {
        callback(null, options);
    }

    /**
     * Add user to thread subscribers list
     * @param post
     * @param callback
     */
    subscribeUser(options, callback) {
        const post = options.post;
        Thread.subscribe(post.user, post.thread, (err) => callback(err, options));
    }

    /**
     * Notify users of new update
     * @param post
     * @param callback
     */
    notify(options, callback) {
        callback(null, options);
    }

    update(options, cb) {
        if (!options.post || !options.user) {
            return cb(new Error('No post or user data provided.'));
        }
        async.waterfall([
            this.validateThreadPost.bind(this, options),
            // update
            super.update.bind(this),
            // update user last activity
            this.updateUserActivity.bind(this)
        ], (err) => cb(err, options.post));
    }

    /**
     * update user post count, points, last post date, activity
     * @param post
     * @param callback
     */
    updateUserActivity(options, callback) {
        const data = {
            $currentDate: {lastActivity: true}
        };
        User.update({ query: {_id: options.user._id}, data }, (err, post) => {
            options.post = post;
            callback(err, options);
        });
    }
    
    del(query, cb) {
        if (!query.post || !query.user) {
            return cb(new Error('No post or user data provided.'));
        }
        async.waterfall([
            this.validateThreadPost.bind(this, query.post),
            () => {
                super.del(query, cb);
            }
        ], cb);
    }
}

module.exports = Post;
