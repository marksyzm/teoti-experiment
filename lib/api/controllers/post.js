"use strict";

var Boom = require("boom");

var Post = require("../services/post").create();

var controller = {

    all: function (req, reply) {
        var query = req.query;
        query.user = req.User;
        query.thread = req.params.threadId;
        Post.find(req.query, "", "", function (err, posts, pagination) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ items: posts, pagination: pagination });
        });
    },

    get: function (req, reply) {
        Post.findOne({ _id: req.params.postId }, "", "user parent", function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    },

    post: function (req, reply) {
        req.payload.thread = req.params.threadId;
        req.payload.user = req.User._id;
        Post.save(req.payload, null, function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply("Success").created(req.route.path+"/"+post._id);
        });
    },

    put: function (req, reply) {
        Post.update({ _id: req.params.threadId }, req.payload, function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    },

    del: function (req, reply) {
        Post.del({ _id: req.params.threadId }, function (err, post) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(post);
        });
    }
};

module.exports = controller;