"use strict";

var Boom = require("boom");

var Post = require("../services/post").create();

var controller = {

    all: function (req, reply) {
        const query = Object.assign({}, req.query, { thread: req.params.threadId });
        const options = Object.assign({}, req.documents, {
            query,
            sort: req.query.sort
        });
        Post.find(options, (err, posts, pagination) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ items: posts, pagination: pagination });
        });
    },

    get: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.postId },
            populate: "user parent"
        });
        Post.findOne(options, function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    },

    post: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            data: req.payload,
        });
        Post.save(options, (err, post) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply("Success").created(req.route.path+"/"+post._id);
        });
    },

    put: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.postId },
            data: req.payload,
        });
        Post.update(options, function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    },

    del: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.postId }
        });
        Post.del(options, (err, post) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    }
};

module.exports = controller;
