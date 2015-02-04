"use strict";
var md5 = require("MD5"),
    Boom = require("boom"),
    pbkdf2 = require("pbkdf2");

var User = require("../models/user");

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
        User.findOne({ username: req.payload.username }, function (err, user) {
            if (err) {
                reply(Boom.badImplementation("Something went horribly wrong."));
            }

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
    }
};

module.exports = controller;