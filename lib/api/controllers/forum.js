"use strict";

var Boom = require("boom");

var Forum = require("../services/forum").create();

var controller = {
    all: function (req, reply) {
        var query = req.query;
        query.user = req.documents.user;
        Forum.find(req.query, "", "", function (err, forums) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forums);
        });
    },

    get: function (req, reply) {
        reply(req.documents.forum);
    },

    post: function (req, reply) {
        Forum.save(req.payload, null, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    put: function (req, reply) {
        Forum.update({ _id: req.params.forumId }, req.payload, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    del: function (req, reply) {
        Forum.del({ _id: req.params.forumId }, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    }
};

module.exports = controller;
