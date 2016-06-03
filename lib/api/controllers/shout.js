"use strict";

var Boom = require("boom");

var Model = require("../services/model");
var Shout = Model.create("shout");

var controller = {
    all: function (req, reply) {
        const options = {
            query: Object.assign({}, req.query, { forum: 0 }),
            sort: "-created",
            populate: "user"
        };
        Shout.find(options, (err, shouts) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ shouts: shouts });
        });
    },
    get: function (req, reply) {
        const options = {
            query: { _id: req.params.shoutId },
            populate: "user"
        };
        Shout.findOne(options, (err, shout) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!shout) { return reply(Boom.notFound("Shout not found")); }
            reply(shout);
        });
    },
    post: function (req, reply) {
        const options = {
            data: Object.assign({}, req.payload, {
                user: req.documents.user._id,
                forum: 0
            })
        };
        Shout.save(options, (err, shout) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    },
    
    put: function (req, reply) {
        const options = {
            data: req.payload,
            query: { _id: req.params.shoutId }
        }
        Shout.update(options, (err, shout) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    },
    del: function (req, reply) {
        const options = {
            query: { _id: req.params.shoutId }
        };
        Shout.del(options, function (err, shout) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(shout);
        });
    }
};

module.exports = controller;
