"use strict";

var Boom = require("boom");

var Model = require("../services/model"),
    Group = Model.create("group");

var controller = {
    all: function (req, reply) {
        const options = {
            query: req.query
        };
        Group.find(options, (err, groups) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(groups);
        });
    },
    get: function (req, reply) {
        const options = {
            query: { _id: req.params.groupId }
        };
        Group.findOne(options, (err, group) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!group) { return reply(Boom.notFound("Group not found")); }
            reply(group);
        });
    },
    post: function (req, reply) {
        const options = {
            data: req.payload
        };
        Group.save(options, (err, group) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    },
    put: function (req, reply) {
        const options = {
            query: { _id: req.params.groupId },
            data: req.payload
        };
        Group.update(options, (err, group) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    },
    del: function (req, reply) {
        const options = {
            query: { _id: req.params.groupId }
        };
        Group.del(options, (err, group) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(group);
        });
    }
};

module.exports = controller;
