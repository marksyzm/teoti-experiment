"use strict";

var controller = require("../controllers").user,
    validate = require("../validate").user;

module.exports = [
    {
        method: "POST",
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
    },
    {
        method: "PUT",
        path: "/account",
        config: {
            handler: controller.put,
            validate: validate.account
        }
    },
    {
        method: "DELETE",
        path: "/user/{id}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];