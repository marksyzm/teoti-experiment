"use strict";
var md5 = require("MD5"),
    Boom = require("boom"),
    pbkdf2 = require("pbkdf2");

var Model = require("../services/model"),
    User = Model.create("user");

function checkPassword (rawPassword, savedPassword, salt, algorithm) {
    switch (algorithm) {
        case "pbdkdf2":
            return pbkdf2.compareSync(savedPassword, rawPassword, salt, 1, 20, "sha256");
        default: // md5
            return savedPassword === md5(md5(rawPassword)+salt);
    }
}

var controller = {
    authenticate: function (req, reply) {
        User.findOne({ username: req.payload.username }, "", function (err, user) {
            if (!user) {
                reply(Boom.badRequest("User does not exist."));
                return;
            }

            if (!checkPassword(req.payload.password, user.password, user.salt, user.algorithm)) {
                reply(Boom.badRequest("Password does not match."));
                return;
            }

            reply(user);
        });
    },
    all: function (req, reply) {
        var query = req.query;
        if (query.filter) {
            query.username = new RegExp("^"+query.filter, "i");
            delete query.filter;
        }

        User.find(query, {}, "", function (err, users) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(users);
        });
    },
    get: function (req, reply) {
        User.findOne({ _id: req.params.id }, "", function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },
    post: function (req, reply) {
        User.save(req.payload, null, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },
    put: function (req, reply) {
        User.update({ _id: req.params.id }, req.payload, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },
    del: function (req, reply) {
        User.del({ _id: req.params.id }, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    }
};

module.exports = controller;