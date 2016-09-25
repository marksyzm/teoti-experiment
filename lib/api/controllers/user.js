"use strict";
const Boom = require("boom");
const User = require("../services/user").create();

var controller = {

    authenticate: function (req, reply) {
        User.authenticate(req.payload.username, req.payload.password, (err, user) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply(user);
        });
    },

    all: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: req.query,
            sort: req.query.sort
        });
        User.find(options, (err, users, pagination) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply({ users: { items: users, pagination: pagination } });
        });
    },

    get: function (req, reply) {
        // if getting account details, return user object as only the session user can get this
        if (!req.params.userId) {
            if (!req.documents.user) return reply(null);
            return reply(req.documents.user);
        }
        const options = Object.assign({}, req.documents, {
            query: Object.assign({}, req.query, { _id: req.params.userId })
        });
        // else if doing a search, this will be caught by the permissions plugin
        User.findOne(options, (err, user) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply(user);
        });
    },

    post: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            data: req.payload
        });
        User.save(options, (err, user) => {
            if (err) return reply(Boom.wrap(err,400));
            reply(user);
        });
    },

    put: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: Object.assign({}, req.query, { _id: req.params.userId }),
            data: req.payload
        });
        User.save(options, (err, user) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply(user);
        });
    },

    del: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: req.query
        });
        User.del(options, (err, user) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply(user);
        });
    },

    accountUpdate: function (req, reply) {
        const options = Object.assign({}, req.documents, {
            query: Object.assign({}, req.query, { _id: req.documents.user._id}),
            data: req.payload
        });
        User.save(options, (err, user) => {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },

    changePassword: function (req, reply) {
        if (!req.documents.user) return reply(Boom.unauthorized("Must be logged in to change password"));
        User.changePassword(req.documents.user._id, req.payload.password, req.payload.passwordConfirm, (err, user) => {
            if (err) return reply(Boom.wrap(err, 400));
            reply(user);
        });
    }
};

module.exports = controller;
