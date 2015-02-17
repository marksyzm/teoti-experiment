"use strict";

var Boom = require("boom");
var Model = require("../services/model");
var User = Model.create("user");

exports.register = function(server, options, next) {
    server.ext("onPreAuth", function(request, reply) {
        if (!request.headers.userid) { return reply.continue(); }

        User.findOne({ _id: request.headers.userid }, "", "group", function (err, user) {
            if (err) { return reply(Boom.badImplementation(err)); }
            request.User = user;
            reply.continue();
        });
    });

    return next();
};

exports.register.attributes = {
    name: "teoti-user",
    version: "1.0.0-beta"
};