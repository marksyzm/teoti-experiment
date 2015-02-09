"use strict";

var Model = require("../services/model"),
    Group = Model.create("group");

var controller = {
    all: function (req, reply) {
        Group.find(req.query, {}, "", function (err, groups) {
            reply(groups);
        });
    },
    get: function (req, reply) {
        Group.findOne({ _id: req.params.id }, "", function (err, group) {
            reply(group);
        });
    },
    post: function (req, reply) {
        Group.save(req.payload, null, function (err, group) {
            reply(group);
        });
    },
    put: function (req, reply) {
        Group.save(req.payload, { _id: req.payload._id }, function (err, group) {
            reply(group);
        });
    }
};

module.exports = controller;