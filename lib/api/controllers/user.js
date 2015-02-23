"use strict";
var md5 = require("MD5"),
    Boom = require("boom"),
    pbkdf2 = require("pbkdf2"),
    getSlug = require("speakingurl"),
    generatePassword = require("password-generator"),
    _ = require("lodash");

var Model = require("../services/model"),
    email = require("../email");

var User = Model.create("user");

function checkPassword (rawPassword, savedPassword, salt, algorithm) {
    switch (algorithm) {
        case "pbdkdf2":
            return pbkdf2.compareSync(savedPassword, rawPassword, salt, 1, 20, "sha256");
        default: // md5
            return savedPassword === md5(md5(rawPassword)+salt);
    }
}

function checkUsernameEmail(id, username, email, cb) {
    User.findOne({ username: username }, "", "", function (err, user) {
        if (err) { cb(err); }
        if ((user && !id) || (user && id && user._id !== id)) {
            cb(new Error("Another user has this username"));
        }
        User.findOne({ email: email }, "", "", function (err, user) {
            if (err) { cb(err); }
            if ((user && !id) || (user && id && user._id !== id)) {
                cb(new Error("Another user has this email address"));
            }
            cb(null);
        });
    });
}

function setUserPassword (user) {
    user.algorithm = "pbdkdf2";
    user.salt = pbkdf2.generateSaltSync(32);
    user.password = pbkdf2.hashSync(user.password, user.salt, 1, 20, "sha256");
}

function handleRegisterUser (user, reply) {
    if (user.register) {
        delete user.register;
        if (!user.password) {
            reply(Boom.badRequest("Password must be supplied"));
            return false;
        }

        if (user.password !== user.passwordConfirm) {
            reply(Boom.badRequest("Passwords do not match"));
            return false;
        }

        if (user.email !== user.emailConfirm) {
            reply(Boom.badRequest("Passwords do not match"));
            return false;
        }
    }
    return true;
}

var controller = {

    authenticate: function (req, reply) {
        User.findOne({ username: req.payload.username }, "password salt algorithm", "", function (err, user) {
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
            query.username = new RegExp("^"+query.filter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
            delete query.filter;
        }

        User.find(query, {}, "", function (err, users) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(users);
        });
    },

    get: function (req, reply) {
        if (req.route.path.match(/^\/account/)) {
            if (!req.User) { return reply(Boom.notFound("No account details")); }
            return reply(req.User);
        }
        User.findOne({ _id: req.params.id }, "", "", function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!user) { return reply(Boom.notFound("User not found")); }
            reply(user);
        });
    },

    post: function (req, reply) {
        var user = _.extend({}, req.payload);
        checkUsernameEmail(null, user.username, req.payload.email, function (err) {
            if (err) { return reply(Boom.wrap(err, 400)); }

            if (!handleRegisterUser(user, reply)) { return; }

            if (!user.password) {
                user.password = generatePassword();
                setUserPassword(user);
                user.resetPassword = true;
            }

            user.usernameUrl = getSlug(user.username);

            var salt = pbkdf2.generateSaltSync(32);
            user.activationCode = pbkdf2.hashSync(user.username, salt, 1, 20, "sha256");

            setUserPassword(user);

            User.save(user, null, function (err, user) {
                if (err) { return reply(Boom.wrap(err, 400)); }
                if (!user.active) {
                    email.activateUser(user, function (err) {
                        if (err) { return reply(Boom.wrap(err, 400)); }
                        reply(user);
                    });
                    return;
                }
                reply(user);
            });
        });
    },

    put: function (req, reply) {
        var user = _.extend({}, req.payload),
            sendEmail = false;

        checkUsernameEmail(req.params.id, user.username, user.email, function (err) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (user.username) { user.usernameUrl = getSlug(user.username); }
            if (user.password) { setUserPassword(user); }
            if (!user.active && user.sendEmail) {
                sendEmail = true;
                delete user.sendEmail;
            }
            User.update({ _id: req.params.id }, user, function (err, user) {
                if (err) { return reply(Boom.wrap(err, 400)); }
                if (sendEmail) {
                    email.activateUser(user, function (err) {
                        if (err) { return reply(Boom.wrap(err, 400)); }
                        reply(user);
                    });
                    return;
                }
                reply(user);
            });
        });
    },

    del: function (req, reply) {
        User.del({ _id: req.params.id }, function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            reply(user);
        });
    },

    changePassword: function (req, reply) {
        User.findOne({ _id: req.params.id }, "", "", function (err, user) {
            if (err) { return reply(Boom.wrap(err, 400)); }
            if (!user) { return reply(Boom.notFound("User not found")); }
            if (!checkPassword(req.payload.password, user.password, user.salt, user.algorithm)) {
                setUserPassword(user);

                User.update({ _id: req.params.id }, req.payload, function (err, user) {
                    if (err) { return reply(Boom.wrap(err, 400)); }
                    reply(user);
                });
            }
        });
    }
};

module.exports = controller;