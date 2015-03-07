"use strict";

var controller = require("../controllers").thread,
    validate = require("../validate").thread;

module.exports = [
    {
        method: "GET",
        path: "/forum/{id}/thread",
        config: {
            handler: controller.all,
            validate: validate.all
        }
    },
    {
        method: "GET",
        path: "/forum/{id}/thread/{threadId}",
        config: {
            handler: controller.get,
            validate: validate.get
        }
    },
    {
        method: "POST",
        path: "/forum/{id}/thread",
        config: {
            handler: controller.post,
            validate: validate.post
        }
    },
    {
        method: "PUT",
        path: "/forum/{id}/thread/{threadId}",
        config: {
            handler: controller.put,
            validate: validate.put
        }
    },
    {
        method: "DELETE",
        path: "/forum/{id}/thread/{threadId}",
        config: {
            handler: controller.del,
            validate: validate.del
        }
    }
];