"use strict";
var _ = require("lodash");
var md5 = require("MD5");
var pbkdf2 = require("pbkdf2");
var generatePassword = require("password-generator");
var getSlug = require("speakingurl");

var UserModel = require("../models/user");
var Model = require("./model");
var email = require("../email");
var config = require("../../shared/config");

var User = function () {
    Model.call(this, UserModel);
};

var tmp = function () {};
tmp.prototype = Model.prototype;

User.prototype = new tmp();
User.prototype.constructor = User;

function checkPassword (rawPassword, savedPassword, salt, algorithm) {
    switch (algorithm) {
        case "pbdkdf2":
            return pbkdf2.compareSync(savedPassword, rawPassword, salt, 1, 20, "sha256");
        default: // md5
            return savedPassword === md5(md5(rawPassword)+salt);
    }
}

function handleRegisterUser (user) {
    if (user.register) {
        delete user.register;
        if (!user.password) { return "Password must be supplied"; }
        if (user.password !== user.passwordConfirm) { return "Passwords do not match"; }
        if (user.email !== user.emailConfirm) { "Passwords do not match"; }
    }
    return null;
}

function setUserPassword (user) {
    user.algorithm = "pbdkdf2";
    user.salt = pbkdf2.generateSaltSync(32);
    user.password = pbkdf2.hashSync(user.password, user.salt, 1, 20, "sha256");
}

_.extend(User.prototype, {
    /**
     * General user authentication with password switching based on algorithm type
     * @param username
     * @param password
     * @param cb
     */
    authenticate: function (username, password, cb) {
        this.findOne({ username: username }, "password salt algorithm", "", function (err, user) {
            if (!user) {
                return cb(new Error("User does not exist."), null);
            }

            if (!checkPassword(password, user.password, user.salt, user.algorithm)) {
                return cb(new Error("Password does not match."), null);
            }

            cb(null, user);
        });
    },

    /**
     * Find users and allow to apply a filter to search by username
     * @param query
     * @param cb
     */
    find: function (query, cb) {
        var limit = config.get("limit:"+(query.limit || 'main'));
        var sort = query.sort;
        var skip = (query.page - 1) * limit;

        if (query.filter) {
            query.username = new RegExp("^"+query.filter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        }

        delete query.page;
        delete query.filter;
        delete query.limit;
        delete query.sort;

        this.model.find(query)
            .limit(limit)
            .sort(sort)
            .exec(function(err, users) {
                if (err) { return cb(err); }
                this.model.count(query, function (err, count) {
                    if (err) { return cb(err); }
                    cb(null, users, Model.getPagination(count, skip, limit));
                });
            }.bind(this));
    },

    save: function (user, cb) {
        var self = this;
        self.checkUsernameEmail(null, user.username, user.email, function (err) {
            if (err) { return cb(err, null); }

            var registerUserError = handleRegisterUser(user);
            if (registerUserError) { return cb(new Error(registerUserError), null); }

            if (!user.password) {
                user.password = generatePassword();
                user.resetPassword = true;
            }

            user.slug = getSlug(user.username);

            var salt = pbkdf2.generateSaltSync(32);
            user.activationCode = pbkdf2.hashSync(user.username, salt, 1, 20, "sha256");

            setUserPassword(user);

            Model.prototype.save.call(self, user, null, function (err, user) {
                if (err) { return cb(err, null); }
                if (!user.active) {
                    email.activateUser(user, function (err) {
                        if (err) { return cb(err, null); }
                        cb(err, user);
                    });
                    return;
                }
                cb(err, user);
            });
        });
    },

    update: function (userId, user, cb) {
        var self = this,
            sendEmail = false;

        self.checkUsernameEmail(userId, user.username, user.email, function (err) {
            if (err) { return cb(err, null); }
            if (user.username) { user.slug = getSlug(user.username); }
            if (user.password) { setUserPassword(user); }
            if (!user.active && user.sendEmail) {
                sendEmail = true;
                delete user.sendEmail;
            }
            Model.prototype.update.call(self, { _id: userId }, user, function (err, user) {
                if (err) { return cb(err, null); }
                if (sendEmail) {
                    email.activateUser(user, function (err) {
                        if (err) { return cb(err, null); }
                        cb(null, user);
                    });
                    return;
                }
                cb(null, user);
            });
        });
    },

    checkUsernameEmail: function (id, username, email, cb) {
        var self = this;
        self.findOne({ username: username }, "", "", function (err, user) {
            if (err) { return cb(err); }
            if ((user && !id) || (user && id && user._id !== id)) {
                return cb(new Error("Another user has this username"));
            }
            self.findOne({ email: email }, "", "", function (err, user) {
                if (err) { return cb(err); }
                if ((user && !id) || (user && id && user._id !== id)) {
                    return cb(new Error("Another user has this email address"));
                }
                cb(null);
            });
        });
    },

    changePassword: function (userId, password, passwordConfirm, cb) {
        var self = this;
        if (password !== passwordConfirm) {
            return cb(new Error("Passwords do not match"), null);
        }
        self.findOne({ _id: userId }, "password salt algorithm", "", function (err, user) {
            if (err) { return cb(err, null); }
            if (!user) { return cb(new Error("User not found"), null); }
            if (!checkPassword(password, user.password, user.salt, user.algorithm)) {
                setUserPassword(user);

                Model.prototype.update.call.update(self, { _id: userId }, user, function (err, user) {
                    if (err) { return cb(err, 400); }
                    cb(null, user);
                });
            }
        });
    }
});

User.create = function () {
    return new User();
};

module.exports = User;