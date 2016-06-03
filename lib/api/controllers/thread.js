"use strict";

var Boom = require("boom");

var Thread = require("../services/thread").create();

var controller = {

    all: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: req.query,
            sort: req.query.sort
        });
        Thread.find(options, (err, threads, pagination) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ forum: options.forum, threads: { items: threads, pagination: pagination } });
        });
    },

    get: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.threadId },
            populate: "firstPost firstPostUser forum"
        });
        Thread.findOne(options, (err, thread) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    post: function (req, reply) {
        const options = {
            data: req.payload
        };
        Thread.save(options, (err, thread) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    put: function (req, reply) {
        const options = {
            query: { _id: req.params.threadId },
            data: req.payload
        };
        Thread.update(options, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    del: function (req, reply) {
        const options = {
            query: { _id: req.params.threadId }
        };
        Thread.del(options, (err, thread) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    }
};

module.exports = controller;
