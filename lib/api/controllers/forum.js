"use strict";

var Boom = require("boom");

var Forum = require("../services/forum").create();

var controller = {
    all: function (req, reply) {
        Forum.find(req.query, { order: 1 }, "parent", function (err, forums) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forums);
        });
    },

    get: function (req, reply) {
        Forum.findOne({ _id: req.params.id }, "", "", function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    post: function (req, reply) {
        Forum.save(req.payload, null, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    put: function (req, reply) {
        Forum.update({ _id: req.params.id }, req.payload, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    },

    del: function (req, reply) {
        Forum.del({ _id: req.params.id }, function (err, forum) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(forum);
        });
    }
};

module.exports = controller;