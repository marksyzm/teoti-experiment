"use strict";

var Boom = require("boom");

var Model = require("../services/model"),
    Group = Model.create("group");

var controller = {
    all: function (req, reply) {
        Group.find(req.query, {}, "", function (err, groups) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(groups);
        });
    },
    get: function (req, reply) {
        Group.findOne({ _id: req.params.id }, "", function (err, group) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    },
    post: function (req, reply) {
        Group.save(req.payload, null, function (err, group) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    },
    put: function (req, reply) {
        Group.update({ _id: req.params.id }, req.payload, function (err, group) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    },
    del: function (req, reply) {
        Group.del({ _id: req.params.id }, function (err, group) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    }
};

module.exports = controller;