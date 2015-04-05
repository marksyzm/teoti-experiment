"use strict";

var Boom = require("boom");

var Thread = require("../services/thread").create();

var controller = {

    all: function (req, reply) {
        Thread.find(req.query, req.Forum, req.User, function (err, threads) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ forum: req.Forum, threads: threads });
        });
    },

    get: function (req, reply) {
        Thread.findOne(req.params.id, function (err, thread) {
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
        Thread.update({ _id: req.params.id }, req.payload, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    },

    del: function (req, reply) {
        Thread.del({ _id: req.params.id }, function (err, thread) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(thread);
        });
    }
};

module.exports = controller;