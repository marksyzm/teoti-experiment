"use strict";

var Boom = require("boom");

var Model = require("../services/model");
var Shout = Model.create("shout");

var controller = {
    all: function (req, reply) {
        req.query.forum = 0;
        Shout.find(req.query, { "created": -1 }, "user", function (err, shouts) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ shouts: shouts });
        });
    },
    get: function (req, reply) {
        Shout.findOne({ _id: req.params.id }, "", "user", function (err, shout) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!shout) { return reply(Boom.notFound("Shout not found")); }
            reply(shout);
        });
    },
    post: function (req, reply) {
        req.payload.user = req.User._id;
        req.payload.forum = 0;
        Shout.save(req.payload, null, function (err, shout) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    },
    put: function (req, reply) {
        Shout.update({ _id: req.params.id }, req.payload, function (err, shout) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    },
    del: function (req, reply) {
        Shout.del({ _id: req.params.id }, function (err, shout) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    }
};

module.exports = controller;