"use strict";

var Boom = require("boom");

var Thread = require("../services/thread").create();

var controller = {

    all: function (req, reply) {
        var query = req.query;
        query.forum = req.documents.forum;
        query.user = req.documents.user;
        Thread.find(req.query, "", "", function (err, threads, pagination) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ forum: req.documents.forum, threads: { items: threads, pagination: pagination } });
        });
    },

    get: function (req, reply) {
        Thread.findOne({ _id: req.params.threadId }, "", "firstPost firstPostUser forum", function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    post: function (req, reply) {
        Thread.save(req.payload, null, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    put: function (req, reply) {
        Thread.update({ _id: req.params.threadId }, req.payload, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    del: function (req, reply) {
        Thread.del({ _id: req.params.threadId }, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    }
};

module.exports = controller;
