"use strict";

var controller = require('src/controllers/user');
var validate = require('src/validate/user');

module.exports = [
    {
        method: "GET",
        path: "/authenticate",
        config: {
            handler: controller.authenticate,
            validate: validate.authenticate
        }
    },
    {
        method: "GET",
        path: "/user",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/user/{id}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/user",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/user/{id}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    }
];