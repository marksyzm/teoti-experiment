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
        path: "/user/{userId}",
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
        path: "/user/{userId}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "GET",
        path: "/account",
        config: {
            handler: controller.get,
            validate: validate.accountRead
        }
    },
    {
        method: "PUT",
        path: "/account",
        config: {
            handler: controller.accountUpdate,
            validate: validate.accountUpdate
        }
    },
    {
        method: "PUT",
        path: "/account/change-password",
        config: {
            handler: controller.put,
            validate: validate.changePassword
        }
    },
    {
        method: "POST",
        path: "/account",
        config: {
            handler: controller.post,
            validate: validate.accountCreate
        }
    },
    {
        method: "DELETE",
        path: "/user/{userId}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];
