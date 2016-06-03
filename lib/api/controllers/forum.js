"use strict";

var Boom = require("boom");

var Forum = require("../services/forum").create();

var controller = {
    all: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: req.query,
            user: req.documents.user
        });
        Forum.find(options, (err, forums) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forums);
        });
    },

    get: function (req, reply) {
        reply(req.documents.forum);
    },

    post: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            data: req.payload
        });
        Forum.save(options, (err, forum) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    put: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.forumId },
            data: req.payload
        });
        Forum.update(options, (err, forum) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    del: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: { _id: req.params.forumId }
        });
        Forum.del(options, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    }
};

module.exports = controller;
