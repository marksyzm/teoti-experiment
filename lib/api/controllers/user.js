"use strict";
var Boom = require("boom");

var User = require("../services/user").create();

function errorHandler(err) {
    if (!err || !err.message) { return Boom.badRequest("Unknown error"); }
    switch (err.message) {
        default:
            return Boom.wrap(err, 400);
    }
}

var controller = {

    authenticate: function (req, reply) {
        User.authenticate(req.payload.username, req.payload.password, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    all: function (req, reply) {
        User.find(req.query, function (err, users, pagination) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ users: { items: users, pagination: pagination } });
        });
    },

    get: function (req, reply) {
        // if getting account details, return user object as only the session user can get this
        if (req.route.path.match(/^\/account/)) {
            if (!req.User) { return reply(null); }
            return reply(req.User);
        }
        // else if doing a search, this will be caught by the permissions plugin
        User.findOne({ _id: req.params.id }, "", "", function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },

    post: function (req, reply) {
        User.save(req.payload, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    put: function (req, reply) {
        User.update(req.params.id, req.payload, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    del: function (req, reply) {
        User.del({ _id: req.params.id }, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    changePassword: function (req, reply) {
        if (!req.User) { return reply(Boom.unauthorized("Must be logged in to change password")); }
        User.changePassword(req.User._id, req.payload.password, req.payload.passwordConfirm, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    }
};

module.exports = controller;