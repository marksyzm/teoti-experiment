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

function update (query, user, reply) {
    User.update(query, user, function (err, user) {
        if (err) { return reply(errorHandler(err)); }
        reply(user);
    });
}

var controller = {

    authenticate: function (req, reply) {
        User.authenticate(req.payload.username, req.payload.password, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    all: function (req, reply) {
        User.find(req.query, "", "", function (err, users, pagination) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply({ users: { items: users, pagination: pagination } });
        });
    },

    get: function (req, reply) {
        // if getting account details, return user object as only the session user can get this
        // This is terrible though! Change this!
        if (!req.params || !req.params.userId) {
            if (!req.documents.user) { return reply(null); }
            return reply(req.documents.user);
        }
        // else if doing a search, this will be caught by the permissions plugin
        User.findOne({ _id: req.params.userId }, "", "", function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },

    post: function (req, reply) {
        User.save(req.payload, query, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    put: function (req, reply) {
        update({ _id: req.params.userId }, req.payload, reply);
    },

    del: function (req, reply) {
        User.del({ _id: req.params.userId }, function (err, user) {
            if (err) { return reply(errorHandler(err)); }
            reply(user);
        });
    },

    accountUpdate: function (req, reply) {
        update({ _id: req.documents.user._id }, req.payload, reply);
    },

    changePassword: function (req, reply) {
        if (!req.documents.user) { return reply(Boom.unauthorized("Must be logged in to change password")); }
        User.changePassword(req.documents.user._id, req.payload.password, req.payload.passwordConfirm, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    }
};

module.exports = controller;
